import type { BasicAnalysisResult, TextureAnalysisResult } from '../types';

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

class PyodideService {
  private pyodide: any = null;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    if (this.pyodide) return;
    if (this.isInitializing && this.initPromise) return this.initPromise;

    this.isInitializing = true;
    this.initPromise = this.doInitialize();
    return this.initPromise;
  }

  private async doInitialize(): Promise<void> {
    try {
      // Load Pyodide script if not already loaded
      if (!window.loadPyodide) {
        await this.loadPyodideScript();
      }

      this.pyodide = await window.loadPyodide();
      await this.pyodide.loadPackage(['numpy', 'scikit-image', 'matplotlib']);
      this.pyodide.runPython("import matplotlib; matplotlib.use('Agg')");
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  private loadPyodideScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async analyzeBasic(file: File): Promise<BasicAnalysisResult> {
    await this.initialize();

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    this.pyodide.FS.writeFile('input.png', uint8Array);

    const code = `
import json, base64, io
import numpy as np
from skimage import io as skio, color, filters, feature, util, exposure
import matplotlib.pyplot as plt

# read image
img = skio.imread('input.png')
orig_shape = img.shape
if img.ndim == 2:
    rgb = np.stack([img,img,img], axis=-1)
else:
    rgb = img[...,:3]

# color means
means = { 'r': float(np.mean(rgb[...,0])), 'g': float(np.mean(rgb[...,1])), 'b': float(np.mean(rgb[...,2])) }

# hist per channel (256 bins)
h_r, _ = np.histogram(rgb[...,0].flatten(), bins=256, range=(0,255))
h_g, _ = np.histogram(rgb[...,1].flatten(), bins=256, range=(0,255))
h_b, _ = np.histogram(rgb[...,2].flatten(), bins=256, range=(0,255))

# grayscale and stats
gray = color.rgb2gray(rgb) if rgb.ndim==3 else rgb
gray_u8 = util.img_as_ubyte(gray)
# some basic stats
gr_stats = { 'mean': float(np.mean(gray_u8)), 'std': float(np.std(gray_u8)), 'min': int(np.min(gray_u8)), 'max': int(np.max(gray_u8)) }

# edges (canny)
edges = feature.canny(gray)
# create edge image overlay
fig, ax = plt.subplots(1,1,figsize=(6,6))
ax.imshow(edges, cmap='gray')
ax.axis('off')
buf = io.BytesIO(); plt.savefig(buf, format='png', bbox_inches='tight'); buf.seek(0)
edges_b64 = base64.b64encode(buf.read()).decode('utf-8'); buf.close(); plt.close(fig)

# corners: harris + overlay
coords = feature.corner_peaks(feature.corner_harris(util.img_as_float(gray)), min_distance=5)
fig, ax = plt.subplots(1,1,figsize=(6,6))
ax.imshow(rgb)
ys, xs = coords[:,0], coords[:,1]
ax.plot(xs, ys, 'ro', markersize=4)
ax.axis('off')
buf = io.BytesIO(); plt.savefig(buf, format='png', bbox_inches='tight'); buf.seek(0)
corners_b64 = base64.b64encode(buf.read()).decode('utf-8'); buf.close(); plt.close(fig)

# grayscale histogram (simple)
hist, bins = np.histogram(gray_u8.flatten(), bins=256, range=(0,255))

result = {
  'filename': 'input.png',
  'shape': list(orig_shape),
  'stats': {
    'color_means': means,
    'grayscale': gr_stats
  },
  'histogram': {
    'r': h_r.tolist(), 'g': h_g.tolist(), 'b': h_b.tolist(), 'gray': hist.tolist(), 'bins': list(bins[:-1])
  },
  'edges_image': edges_b64,
  'corners_image': corners_b64,
  'corners_count': int(len(coords))
}
json.dumps(result)
    `;

    const result = this.pyodide.runPython(code);
    return JSON.parse(result);
  }

  async analyzeTexture(file: File, gridSize: number, patchSize: number, levels: number): Promise<TextureAnalysisResult> {
    await this.initialize();

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    this.pyodide.FS.writeFile('input.png', uint8Array);

    const code = `
import json, base64, io
import numpy as np
from skimage import io as skio, color, feature, util, exposure
import matplotlib.pyplot as plt

img = skio.imread('input.png')
orig_shape = img.shape
if img.ndim == 2:
    rgb = np.stack([img,img,img], axis=-1)
else:
    rgb = img[...,:3]
gray = color.rgb2gray(rgb) if rgb.ndim==3 else rgb
gray_u8 = util.img_as_ubyte(gray)

H, W = gray_u8.shape
# grid division
GS = ${gridSize}
ps = ${patchSize}
levels = ${levels}
cell_h = H // GS
cell_w = W // GS

features = ['contrast','dissimilarity','homogeneity','energy','correlation','ASM']
regional = []
# use reduced levels to speed up if levels < 256
if levels != 256:
    # rescale to [0, levels-1]
    gray_rescaled = exposure.rescale_intensity(gray_u8, in_range=(0,255), out_range=(0,levels-1)).astype(np.uint8)
else:
    gray_rescaled = gray_u8

for i in range(GS):
    row = []
    for j in range(GS):
        y0 = i*cell_h
        x0 = j*cell_w
        y1 = y0 + cell_h if (i<GS-1) else H
        x1 = x0 + cell_w if (j<GS-1) else W
        patch = gray_rescaled[y0:y1, x0:x1]
        # if patch too small, pad
        if patch.shape[0] < 3 or patch.shape[1] < 3:
            vals = {f:0.0 for f in features}
            row.append(vals); continue
        # compute glcm. choose distance relative to patch size, clamped
        d = max(1, min(5, (min(patch.shape)//4)))
        try:
            glcm = feature.graycomatrix(patch, distances=[d], angles=[0], levels=levels, symmetric=True, normed=True)
            vals = {f: float(feature.graycoprops(glcm, f)[0,0]) for f in features}
        except Exception as e:
            vals = {f:0.0 for f in features}
        row.append(vals)
    regional.append(row)

# compute average per feature across cells
import math
flat = [cell for row in regional for cell in row]
avg = {}
for f in features:
    vals = [c[f] for c in flat]
    avg[f] = float(sum(vals)/len(vals)) if len(vals)>0 else 0.0

# create contrast heatmap image
contrast_map = np.array([[cell['contrast'] for cell in row] for row in regional])
fig, ax = plt.subplots(1,1,figsize=(6,4))
im = ax.imshow(contrast_map, cmap='inferno')
ax.set_title('Contrast heatmap (grid)')
ax.axis('off')
fig.colorbar(im, ax=ax, fraction=0.046, pad=0.02)
buf = io.BytesIO(); plt.savefig(buf, format='png', bbox_inches='tight'); buf.seek(0)
contrast_b64 = base64.b64encode(buf.read()).decode('utf-8'); buf.close(); plt.close(fig)

# also create combined texture maps using interpolation to original size for visualization
# create full-size maps by upscaling the per-cell values
import scipy.ndimage as ndi
maps = {}
for f in features:
    arr = np.zeros((GS,GS), dtype=float)
    for i in range(GS):
        for j in range(GS):
            arr[i,j] = regional[i][j][f]
    # zoom to image size
    zoom_y = float(H)/GS
    zoom_x = float(W)/GS
    full = ndi.zoom(arr, (zoom_y, zoom_x), order=1)
    maps[f] = full.tolist()

result = {
  'filename':'input.png', 'grid_size': GS, 'patch_size': ps, 'features_list': features,
  'regional_texture': regional, 'average_texture': avg,
  'contrast_heatmap': contrast_b64
}
json.dumps(result)
    `;

    const result = this.pyodide.runPython(code);
    return JSON.parse(result);
  }
}

export const pyodideService = new PyodideService();