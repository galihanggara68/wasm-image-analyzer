export const Header = () => {
  return (
    <header className="text-center mb-5">
      <div className="inline-block text-center">
        <div className="flex items-center justify-center mb-2">
          <svg className="w-8 h-8 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <h1
            className="text-4xl m-0 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Image Analysis Studio
          </h1>
        </div>
        <p className="text-xs text-slate-600 mt-1.5">
          Discover insights in your images — runs fully in browser using Pyodide.
        </p>
      </div>
    </header>
  );
};