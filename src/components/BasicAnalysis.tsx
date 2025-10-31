import Plot from 'react-plotly.js';
import type { BasicAnalysisResult } from '../types';

interface BasicAnalysisProps {
  data: BasicAnalysisResult | null;
}

export const BasicAnalysis = ({ data }: BasicAnalysisProps) => {

  if (!data) {
    return (
      <div className="bg-white p-3.5 rounded-2xl shadow-sm border-l-6 border-yellow-400">
        <h2 className="mt-0 flex items-center">
          <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Basic Analysis
        </h2>
        <div className="text-xs text-slate-600">No analysis yet.</div>
        <div className="flex flex-col gap-4.5 mt-3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3.5 rounded-2xl shadow-sm border-l-6 border-yellow-400">
      <h2 className="mt-0 flex items-center">
        <svg className="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Basic Analysis
      </h2>
      <div className="text-xs text-slate-600">
        <strong>File:</strong> {data.filename} &nbsp; • &nbsp;
        <strong>Size:</strong> {data.shape[1]} × {data.shape[0]} px
        <div className="mt-2">
          <strong>Color means:</strong> R:{data.stats.color_means.r.toFixed(2)} G:{data.stats.color_means.g.toFixed(2)} B:{data.stats.color_means.b.toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col gap-4.5 mt-3">
        {/* Grayscale stats bar */}
        <div className="bg-white p-2.5 rounded-3xl">
          <h4 className="m-0 mb-1.5">Grayscale Stats</h4>
          <Plot
            data={[{
              x: Object.keys(data.stats.grayscale),
              y: Object.values(data.stats.grayscale),
              type: 'bar',
              marker: { color: '#a3895d' }
            }]}
            layout={{
              title: { text: 'Grayscale Statistics' },
              height: 240,
              paper_bgcolor: '#fdfcf5',
              plot_bgcolor: '#fdfcf5',
              margin: { l: 40, r: 20, t: 40, b: 40 }
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>

        {/* Color means */}
        <div className="bg-white p-2.5 rounded-3xl mt-2.5">
          <h4 className="m-0 mb-1.5">Mean Color Values</h4>
          <Plot
            data={[{
              x: ['Red', 'Green', 'Blue'],
              y: [data.stats.color_means.r, data.stats.color_means.g, data.stats.color_means.b],
              type: 'bar',
              marker: { color: ['#ff4d4d', '#4dff4d', '#4d4dff'] }
            }]}
            layout={{
              title: { text: 'Mean Color Values' },
              height: 240,
              paper_bgcolor: '#fdfcf5',
              plot_bgcolor: '#fdfcf5',
              margin: { l: 40, r: 20, t: 40, b: 40 }
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>

        {/* Color histogram */}
        <div className="bg-white p-2.5 rounded-3xl mt-2.5">
          <h4 className="m-0 mb-1.5">Color Histograms</h4>
          <Plot
            data={[
              { x: data.histogram.bins, y: data.histogram.r, name: 'Red', mode: 'lines', line: { color: 'red' } },
              { x: data.histogram.bins, y: data.histogram.g, name: 'Green', mode: 'lines', line: { color: 'green' } },
              { x: data.histogram.bins, y: data.histogram.b, name: 'Blue', mode: 'lines', line: { color: 'blue' } }
            ]}
            layout={{
              title: { text: 'Color Histograms' },
              height: 260,
              paper_bgcolor: '#fdfcf5',
              plot_bgcolor: '#fdfcf5',
              margin: { l: 40, r: 20, t: 40, b: 40 },
              xaxis: { title: 'Pixel Value' },
              yaxis: { title: 'Count' }
            }}
            config={{ responsive: true }}
            style={{ width: '100%' }}
          />
        </div>

        {/* Edge and corner images */}
        <div className="mt-3">
          <h4 className="mt-3">Detected Edges and Corners</h4>
          <div className="flex gap-3 flex-wrap justify-center">
            <img
              className="max-w-full rounded-3xl block mx-2"
              src={`data:image/png;base64,${data.edges_image}`}
              alt="Edges"
            />
            <img
              className="max-w-full rounded-3xl block mx-2"
              src={`data:image/png;base64,${data.corners_image}`}
              alt="Corners"
            />
          </div>
        </div>
      </div>
    </div>
  );
};