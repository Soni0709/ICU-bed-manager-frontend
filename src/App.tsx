import { useState } from 'react';
import { Bed, UrgencyLevel } from './types/bed';
import { mockBeds } from './data/mockBeds';
import { BedTile } from './components/bedTile';
import { AssignPatientModal } from './components/AssignPatientModal';
import { Toaster, toast } from 'sonner';

function App() {
  const [beds, setBeds] = useState<Bed[]>(mockBeds);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate statistics
  const availableCount = beds.filter((b) => b.state === 'available').length;
  const occupiedCount = beds.filter((b) => b.state === 'occupied').length;
  const maintenanceCount = beds.filter((b) => b.state === 'maintenance').length;

  // Handle assign - open modal
  const handleAssign = (bed: Bed) => {
    setSelectedBed(bed);
    setModalOpen(true);
  };

  // Handle assign submit - update bed state
  const handleAssignSubmit = (patientName: string, urgencyLevel: UrgencyLevel) => {
    if (!selectedBed) return;

    // Update bed in state
    setBeds((prevBeds) =>
      prevBeds.map((bed) =>
        bed.id === selectedBed.id
          ? {
              ...bed,
              state: 'occupied' as const,
              patient_name: patientName,
              urgency_level: urgencyLevel,
              assigned_at: new Date().toISOString(),
            }
          : bed
      )
    );

    // Show success toast
    toast.success(`Patient assigned to ${selectedBed.bed_number}`, {
      description: `${patientName} - ${urgencyLevel.toUpperCase()} urgency`,
    });
  };

  // Handle discharge
  const handleDischarge = (bed: Bed) => {
    setBeds((prevBeds) =>
      prevBeds.map((b) =>
        b.id === bed.id
          ? {
              ...b,
              state: 'maintenance' as const,
              discharged_at: new Date().toISOString(),
            }
          : b
      )
    );

    // Show success toast
    toast.success(`Patient discharged from ${bed.bed_number}`, {
      description: 'Bed moved to maintenance',
    });
  };

  // Handle clean
  const handleClean = (bed: Bed) => {
    setBeds((prevBeds) =>
      prevBeds.map((b) =>
        b.id === bed.id
          ? {
              ...b,
              state: 'available' as const,
              patient_name: null,
              urgency_level: null,
              assigned_at: null,
              discharged_at: null,
            }
          : b
      )
    );

    // Show success toast
    toast.success(`${bed.bed_number} cleaned`, {
      description: 'Bed is now available',
    });
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-semibold uppercase tracking-wide">
                  Available
                </p>
                <p className="text-4xl font-bold text-green-700 mt-2">
                  {availableCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-semibold uppercase tracking-wide">
                  Occupied
                </p>
                <p className="text-4xl font-bold text-red-700 mt-2">
                  {occupiedCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-semibold uppercase tracking-wide">
                  Maintenance
                </p>
                <p className="text-4xl font-bold text-yellow-700 mt-2">
                  {maintenanceCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full"></div>
            </div>
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

      {/* Assign Patient Modal */}
      <AssignPatientModal
        bed={selectedBed}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAssignSubmit}
      />

      {/* Sonner Toaster */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;