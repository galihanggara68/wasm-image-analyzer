# Image Analysis Studio

A modern, professional React application for comprehensive image analysis powered by WebAssembly and Pyodide. Process images directly in your browser with advanced computer vision algorithms including basic analysis, texture analysis, and GLCM feature extraction.

## ✨ Features

### 🔍 **Basic Image Analysis**
- **Color Statistics**: Mean RGB values and color distribution
- **Grayscale Analysis**: Statistical measures (mean, std, min, max)
- **Color Histograms**: Interactive plots for RGB channels
- **Edge Detection**: Canny edge detection with visualization
- **Corner Detection**: Harris corner detection with marked points

### 🌾 **Texture Analysis**
- **GLCM Features**: Gray-Level Co-occurrence Matrix analysis
- **Regional Analysis**: Grid-based texture feature extraction
- **Multiple Features**: Contrast, dissimilarity, homogeneity, energy, correlation, ASM
- **Heatmaps**: Visual representation of texture contrast across regions
- **Configurable Parameters**: Adjustable grid size, patch size, and quantization levels

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Status**: Dynamic status indicators with visual feedback
- **Interactive Charts**: Powered by Plotly.js for dynamic data visualization
- **Drag & Drop**: Intuitive file upload with preview
- **Professional Styling**: Built with Tailwind CSS for modern aesthetics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd wasm-image-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Build for Production

```bash
npm run build
```

### 🚀 GitHub Pages Deployment

This application is configured for automatic deployment to GitHub Pages. When you push changes to the `main` branch, the GitHub Actions workflow will automatically build and deploy your app.

#### Automatic Deployment (Recommended)

1. **Push to main branch** - The app will automatically deploy to GitHub Pages
2. **Visit your GitHub Pages URL** - Usually available at: `https://[username].github.io/wasm-image-analyzer/`

#### Manual Deployment (Optional)

If you need to deploy manually:

```bash
# Deploy to GitHub Pages
npm run deploy
```

#### Setup Requirements

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` and `/ (root)`

2. **Configure Base Path** (if needed):
   - Update `base: '/wasm-image-analyzer/'` in `vite.config.ts`
   - Replace with your actual repository name

3. **GitHub Actions** will handle the rest automatically!

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Plotly.js + react-plotly.js
- **Image Processing**: Pyodide (WebAssembly Python runtime)
- **Computer Vision**: scikit-image, numpy, matplotlib
- **Development**: ESLint, TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx
│   ├── UploadCard.tsx
│   ├── BasicAnalysis.tsx
│   ├── TextureAnalysis.tsx
│   ├── OptionsPanel.tsx
│   └── Footer.tsx
├── services/            # Business logic
│   └── pyodideService.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── App.css              # Global styles
```

## 🔧 Configuration

### Texture Analysis Parameters

The application provides configurable parameters for texture analysis:

- **Grid Size**: Controls the division of image into regions (4, 8, 12, 16)
- **Patch Size**: Window size for GLCM computation (11, 21, 31, 41 pixels)
- **GLCM Levels**: Quantization levels for gray values (64, 256)

## 🎯 Usage

1. **Upload an Image**: Click "Browse files..." or drag & drop an image
2. **Basic Analysis**: Click "Analyze Basic" for color and edge analysis
3. **Texture Analysis**:
   - Configure analysis parameters in the Options panel
   - Click "Analyze Texture" for GLCM-based texture features
4. **View Results**: Interactive charts and visualizations for both analyses

## 📊 Analysis Results

### Basic Analysis Outputs:
- Color channel statistics and histograms
- Edge detection visualization
- Corner detection with marked points
- Image dimensions and file information

### Texture Analysis Outputs:
- Regional GLCM feature values
- Average texture statistics
- Contrast heatmap visualization
- Expandable cell-by-cell feature details

## 🌟 Key Features

- **🔒 Privacy**: All processing happens locally in your browser
- **⚡ Performance**: WebAssembly ensures fast image processing
- **📱 Responsive**: Works on all device sizes
- **🎨 Professional**: Modern UI with smooth animations and transitions
- **🔧 Customizable**: Adjustable parameters for texture analysis
- **📈 Interactive**: Dynamic charts and visualizations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pyodide** - WebAssembly Python runtime
- **scikit-image** - Image processing algorithms
- **Plotly.js** - Interactive charting library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server