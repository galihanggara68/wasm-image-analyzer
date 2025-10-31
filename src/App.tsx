import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadCard } from './components/UploadCard';
import { BasicAnalysis } from './components/BasicAnalysis';
import { TextureAnalysis } from './components/TextureAnalysis';
import { OptionsPanel } from './components/OptionsPanel';
import { Footer } from './components/Footer';
import type { BasicAnalysisResult, TextureAnalysisResult, OperationStatus } from './types';
import './App.css';
import { pyodideService } from './services/pyodideService';

function App() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [basicAnalysisResult, setBasicAnalysisResult] = useState<BasicAnalysisResult | null>(null);
  const [textureAnalysisResult, setTextureAnalysisResult] = useState<TextureAnalysisResult | null>(null);
  const [status, setStatus] = useState('Initializing Packages...');
  const [operationStatus, setOperationStatus] = useState<OperationStatus>('idle');
  const [isPyodideReady, setIsPyodideReady] = useState(false);

  // Options state
  const [gridSize, setGridSize] = useState(8);
  const [patchSize, setPatchSize] = useState(21);
  const [glcmLevels, setGlcmLevels] = useState(256);

  useEffect(() => {
    const initializePyodide = async () => {
      try {
        setStatus('Loading Packages... (this may take a few seconds)');
        await pyodideService.initialize();
        setStatus('Ready');
        setIsPyodideReady(true);
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        setStatus('Error initializing Pyodide');
        setOperationStatus('error');
      }
    };

    initializePyodide();
  }, []);

  const handleFileChange = (file: File | null) => {
    setCurrentFile(file);
    setBasicAnalysisResult(null);
    setTextureAnalysisResult(null);
    setOperationStatus('idle');
  };

  const handleAnalyzeBasic = async () => {
    if (!currentFile || !isPyodideReady) return;

    try {
      setOperationStatus('basic-running');
      setBasicAnalysisResult(null);

      const result = await pyodideService.analyzeBasic(currentFile);
      setBasicAnalysisResult(result);
      setOperationStatus('basic-done');
    } catch (error) {
      console.error('Basic analysis failed:', error);
      setOperationStatus('error');
    }
  };

  const handleAnalyzeTexture = async () => {
    if (!currentFile || !isPyodideReady) return;

    try {
      setOperationStatus('texture-running');
      setTextureAnalysisResult(null);

      const result = await pyodideService.analyzeTexture(currentFile, gridSize, patchSize, glcmLevels);
      setTextureAnalysisResult(result);
      setOperationStatus('texture-done');
    } catch (error) {
      console.error('Texture analysis failed:', error);
      setOperationStatus('error');
    }
  };

  return (
    <div className="w-full mx-auto my-6 p-5">
      <Header />

      <UploadCard
        currentFile={currentFile}
        onFileChange={handleFileChange}
        onAnalyzeBasic={handleAnalyzeBasic}
        onAnalyzeTexture={handleAnalyzeTexture}
        status={status}
        operationStatus={operationStatus}
        isDisabled={!isPyodideReady}
      />

      <section className="mt-4.5">
        <div className="grid grid-cols-2 gap-4">
          <BasicAnalysis data={basicAnalysisResult} />
          <TextureAnalysis data={textureAnalysisResult} />
        </div>

        <OptionsPanel
          gridSize={gridSize}
          patchSize={patchSize}
          glcmLevels={glcmLevels}
          onGridSizeChange={setGridSize}
          onPatchSizeChange={setPatchSize}
          onGlcmLevelsChange={setGlcmLevels}
          operationStatus={operationStatus}
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
