import { useState } from 'react';
import { Bed } from './types/bed';
import { mockBeds } from './data/mockBeds';
import { BedTile } from './components/bedTile';

function App() {
  const [beds, setBeds] = useState<Bed[]>(mockBeds);

  // Placeholder handlers (will implement later)
  const handleAssign = (bed: Bed) => {
    console.log('Assign patient to:', bed.bed_number);
  };

  const handleDischarge = (bed: Bed) => {
    console.log('Discharge patient from:', bed.bed_number);
  };

  const handleClean = (bed: Bed) => {
    console.log('Clean bed:', bed.bed_number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              ICU Bed Manager
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time bed tracking and patient management
            </p>
          </div>
        </div>

        {/* Bed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {beds.map((bed) => (
            <BedTile
              key={bed.id}
              bed={bed}
              onAssign={handleAssign}
              onDischarge={handleDischarge}
              onClean={handleClean}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;