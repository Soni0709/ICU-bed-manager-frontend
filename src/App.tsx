import { useState, useEffect } from 'react';
import { Bed, UrgencyLevel } from './types/bed';
import { bedApi } from './services/api';
import { BedTile } from './components/BedTile';
import { AssignPatientModal } from './components/AssignPatientModal';
import { Button } from './components/ui/button';
import { Toaster, toast } from 'sonner';
import { Download, RefreshCw } from 'lucide-react';
import { AxiosError } from 'axios';

function App() {
  const [beds, setBeds] = useState<Bed[]>([]);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Calculate statistics
  const availableCount = beds.filter((b) => b.state === 'available').length;
  const occupiedCount = beds.filter((b) => b.state === 'occupied').length;
  const maintenanceCount = beds.filter((b) => b.state === 'maintenance').length;

  // Fetch beds from API
  const fetchBeds = async () => {
    try {
      setLoading(true);
      const data = await bedApi.getAllBeds();
      setBeds(data);
    } catch (error) {
      console.error('Error fetching beds:', error);
      toast.error('Failed to fetch bed data', {
        description: 'Please check if the backend server is running',
      });
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Fetch beds on mount
  useEffect(() => {
    fetchBeds();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    toast.promise(fetchBeds(), {
      loading: 'Refreshing bed data...',
      success: 'Bed data refreshed',
      error: 'Failed to refresh data',
    });
  };

  // Handle export
  const handleExport = () => {
    try {
      bedApi.exportCSV();
      toast.success('CSV export started');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  // Handle assign - open modal
  const handleAssign = (bed: Bed) => {
    setSelectedBed(bed);
    setModalOpen(true);
  };

  // Handle assign submit - call API
  const handleAssignSubmit = async (
    patientName: string,
    urgencyLevel: UrgencyLevel
  ) => {
    if (!selectedBed) return;

    try {
      const updatedBed = await bedApi.assignPatient(selectedBed.id, {
        patient_name: patientName,
        urgency_level: urgencyLevel,
      });

      // Update bed in local state
      setBeds((prevBeds) =>
        prevBeds.map((bed) => (bed.id === updatedBed.id ? updatedBed : bed))
      );

      toast.success(`Patient assigned to ${selectedBed.bed_number}`, {
        description: `${patientName} - ${urgencyLevel.toUpperCase()} urgency`,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error || 'Failed to assign patient';
      
      toast.error('Assignment failed', {
        description: errorMessage,
      });
    }
  };

  // Handle discharge - call API
  const handleDischarge = async (bed: Bed) => {
    try {
      const updatedBed = await bedApi.dischargePatient(bed.id);

      // Update bed in local state
      setBeds((prevBeds) =>
        prevBeds.map((b) => (b.id === updatedBed.id ? updatedBed : b))
      );

      toast.success(`Patient discharged from ${bed.bed_number}`, {
        description: 'Bed moved to maintenance',
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error || 'Failed to discharge patient';
      
      toast.error('Discharge failed', {
        description: errorMessage,
      });
    }
  };

  // Handle clean - call API
  const handleClean = async (bed: Bed) => {
    try {
      const updatedBed = await bedApi.cleanBed(bed.id);

      // Update bed in local state
      setBeds((prevBeds) =>
        prevBeds.map((b) => (b.id === updatedBed.id ? updatedBed : b))
      );

      toast.success(`${bed.bed_number} cleaned`, {
        description: 'Bed is now available',
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const errorMessage =
        axiosError.response?.data?.error || 'Failed to clean bed';
      
      toast.error('Cleaning failed', {
        description: errorMessage,
      });
    }
  };

  // Initial loading state
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading bed data...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : beds.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No beds found. Please check the backend.</p>
          </div>
        ) : (
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
        )}
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