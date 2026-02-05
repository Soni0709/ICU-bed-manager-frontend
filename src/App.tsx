import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-red-800 ">
              ICU Bed Manager
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time bed tracking and patient management
            </p>
          </div>
        </div>

        {/* Content will go here */}
        <div className="bg-white rounded-lg shadow p-8">
          <p className="text-gray-500">Bed grid will appear here...</p>
        </div>
      </div>
    </div>
  );
}

export default App;