import type { OperationStatus } from '../types';

interface UploadCardProps {
  currentFile: File | null;
  onFileChange: (file: File | null) => void;
  onAnalyzeBasic: () => void;
  onAnalyzeTexture: () => void;
  status: string;
  operationStatus: OperationStatus;
  isDisabled: boolean;
}

export const UploadCard = ({
  currentFile,
  onFileChange,
  onAnalyzeBasic,
  onAnalyzeTexture,
  status,
  operationStatus,
  isDisabled
}: UploadCardProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  const isRunning = operationStatus.includes('running');

  return (
    <section className="bg-gradient-to-b from-yellow-50 to-orange-50 p-6 rounded-3xl shadow-lg border-t-4 border-yellow-400">
      {/* Status at Top */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h3 className="font-bold text-slate-800">Choose an image to analyze</h3>
        </div>

        <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${
          status.includes('Ready')
            ? 'bg-green-100 text-green-800 border border-green-200'
            : status.includes('Loading')
            ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : status.includes('Error')
            ? 'bg-red-100 text-red-800 border border-red-200'
            : 'bg-gray-100 text-gray-800 border border-gray-200'
        }`}>
          {status.includes('Ready') && (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {status.includes('Loading') && (
            <svg className="w-3 h-3 mr-1.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {status.includes('Error') && (
            <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {status}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

        {/* File Input Section - Takes more space */}
        <div className="lg:col-span-7">
          {!currentFile ? (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isRunning}
              className="cursor-pointer block w-full h-24 text-sm text-transparent file:invisible
                file:mr-4 file:py-2.5 file:px-5
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                file:cursor-pointer
                file:transition-colors
                file:duration-200
                file:ease-in-out
                file:shadow-sm
                file:hover:shadow-md
                disabled:file:opacity-50
                disabled:file:cursor-not-allowed
                border-2 border-dashed border-blue-300 rounded-2xl
                bg-white/80 backdrop-blur-sm
                hover:bg-white/90 hover:border-blue-400
                transition-all duration-200
                hover:shadow-md"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <svg className="w-8 h-8 mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-slate-500 text-sm font-medium">Click to browse or drag & drop</span>
              <span className="text-slate-400 text-xs mt-1">PNG, JPG, GIF up to 10MB</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white border-2 border-blue-200 rounded-2xl">
            <div className="flex items-center flex-1 min-w-0">
              <svg className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {currentFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => onFileChange(null)}
              disabled={isRunning}
              className="ml-3 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        </div>

        {/* Right Side - Action Buttons Only */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-neutral-900 px-6 py-3 rounded-2xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 min-w-[140px]"
              onClick={onAnalyzeBasic}
              disabled={!currentFile || isDisabled || isRunning}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analyze Basic
            </button>
            <button
              className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-2xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 min-w-[140px]"
              onClick={onAnalyzeTexture}
              disabled={!currentFile || isDisabled || isRunning}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Analyze Texture
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};