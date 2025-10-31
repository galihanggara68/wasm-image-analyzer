import type { TextureAnalysisResult } from '../types';

interface TextureAnalysisProps {
  data: TextureAnalysisResult | null;
}

export const TextureAnalysis = ({ data }: TextureAnalysisProps) => {
  if (!data) {
    return (
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border-l-6 border-green-400">
        <h2 className="mt-0 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Texture Analysis
        </h2>
        <div className="text-xs text-slate-600">No texture analysis yet.</div>
        <div className="mt-3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3.5 rounded-2xl shadow-sm border-l-6 border-green-400">
      <h2 className="mt-0 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Texture Analysis
      </h2>
      <div className="text-xs text-slate-600">
        <strong>File:</strong> {data.filename} • <strong>Grid:</strong> {data.grid_size}×{data.grid_size}
      </div>
      <div className="mt-3">
        {/* Contrast heatmap */}
        <div className="text-center">
          <img
            src={`data:image/png;base64,${data.contrast_heatmap}`}
            className="max-w-full rounded-3xl block mx-2"
            alt="Contrast heatmap"
          />
        </div>

        {/* Average texture table */}
        <div className="mt-3 bg-white p-3 rounded-2xl">
          <h4 className="m-0 mb-1.5">Average Texture Features</h4>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {data.features_list.map(feature => (
                  <th key={feature} className="p-2 border-t border-gray-100 text-center">
                    {feature}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.features_list.map(feature => (
                  <td key={feature} className="p-2 border-t border-gray-100 text-center">
                    {(data.average_texture[feature as keyof typeof data.average_texture] || 0).toFixed(4)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Regional grid expandable */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 mt-3">
          {data.regional_texture.flat().map((cell, index) => (
            <details key={index} className="bg-gradient-to-r from-yellow-50 to-white p-2.5 rounded-2xl">
              <summary className="font-bold">Cell #{index + 1}</summary>
              <ul className="list-none p-1.5 py-0">
                {Object.entries(cell).map(([key, value]) => (
                  <li
                    key={key}
                    className="flex justify-between py-0.5"
                  >
                    <span className="capitalize text-slate-600">
                      {key}
                    </span>
                    <strong>{value.toFixed(4)}</strong>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};