import type { OperationStatus } from '../types';

interface OptionsPanelProps {
  gridSize: number;
  patchSize: number;
  glcmLevels: number;
  onGridSizeChange: (size: number) => void;
  onPatchSizeChange: (size: number) => void;
  onGlcmLevelsChange: (levels: number) => void;
  operationStatus: OperationStatus;
}

export const OptionsPanel = ({
  gridSize,
  patchSize,
  glcmLevels,
  onGridSizeChange,
  onPatchSizeChange,
  onGlcmLevelsChange,
  operationStatus
}: OptionsPanelProps) => {
  const isRunning = operationStatus.includes('running');

  return (
    <div className="mt-4.5 bg-white p-3.5 rounded-2xl shadow-sm border-l-6 border-purple-400">
      <h3 className="mt-0 flex items-center">
        <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Options
      </h3>
      <div className="flex gap-3 items-center flex-wrap">
        <label className="text-xs text-slate-600 flex items-center">
          Grid size:
          <select
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </label>
        <label className="text-xs text-slate-600 flex items-center">
          Patch size:
          <select
            value={patchSize}
            onChange={(e) => onPatchSizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value={11}>11</option>
            <option value={21}>21</option>
            <option value={31}>31</option>
            <option value={41}>41</option>
          </select>
        </label>
        <label className="text-xs text-slate-600 flex items-center">
          GLCM Levels:
          <select
            value={glcmLevels}
            onChange={(e) => onGlcmLevelsChange(Number(e.target.value))}
            disabled={isRunning}
            className="ml-2 px-2 py-1 text-xs border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value={64}>64</option>
            <option value={256}>256</option>
          </select>
        </label>
        <div className="ml-auto flex items-center">
          <span className="text-xs text-slate-600 mr-2">Status:</span>
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
            operationStatus === 'idle'
              ? 'bg-gray-100 text-gray-700 border border-gray-200'
            : operationStatus.includes('basic-running')
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            : operationStatus.includes('basic-done')
              ? 'bg-green-100 text-green-800 border border-green-200'
            : operationStatus.includes('texture-running')
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
            : operationStatus.includes('texture-done')
              ? 'bg-green-100 text-green-800 border border-green-200'
            : operationStatus === 'error'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-gray-100 text-gray-700 border border-gray-200'
          }`}>
            {operationStatus === 'idle' && (
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            )}
            {(operationStatus.includes('basic-running') || operationStatus.includes('texture-running')) && (
              <svg className="w-3 h-3 mr-1.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {(operationStatus.includes('basic-done') || operationStatus.includes('texture-done')) && (
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            {operationStatus === 'error' && (
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            {operationStatus.replace('-', ' ').replace('basic running', 'Analyzing Basic Feature...').replace('texture running', 'Analyzing Texture...').replace('basic done', 'Basic Complete').replace('texture done', 'Texture Complete') || 'idle'}
          </div>
        </div>
      </div>
    </div>
  );
};