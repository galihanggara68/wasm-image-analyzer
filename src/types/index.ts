export interface ColorStats {
  r: number;
  g: number;
  b: number;
}

export interface GrayscaleStats {
  mean: number;
  std: number;
  min: number;
  max: number;
}

export interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
  gray: number[];
  bins: number[];
}

export interface BasicAnalysisResult {
  filename: string;
  shape: number[];
  stats: {
    color_means: ColorStats;
    grayscale: GrayscaleStats;
  };
  histogram: HistogramData;
  edges_image: string;
  corners_image: string;
  corners_count: number;
}

export interface TextureFeatures {
  contrast: number;
  dissimilarity: number;
  homogeneity: number;
  energy: number;
  correlation: number;
  ASM: number;
}

export interface TextureAnalysisResult {
  filename: string;
  grid_size: number;
  patch_size: number;
  features_list: string[];
  regional_texture: TextureFeatures[][];
  average_texture: TextureFeatures;
  contrast_heatmap: string;
}

export type OperationStatus = 'idle' | 'basic-running' | 'basic-done' | 'texture-running' | 'texture-done' | 'error';