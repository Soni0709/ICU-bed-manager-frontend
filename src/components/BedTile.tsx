import { Bed } from '../types/bed';
import { Button } from './ui/button';
import { getBedColor, getStateLabel } from '../utils/bedUtils';

interface BedTileProps {
  bed: Bed;
  onAssign: (bed: Bed) => void;
  onDischarge: (bed: Bed) => void;
  onClean: (bed: Bed) => void;
}

export const BedTile: React.FC<BedTileProps> = ({
  bed,
  onAssign,
  onDischarge,
  onClean,
}) => {
  return (
    <div
      className={`${getBedColor(bed.state)} p-6 rounded-lg text-white shadow-lg transition-all transform hover:scale-105`}
    >
      {/* Bed Number */}
      <h3 className="text-xl font-bold mb-2">{bed.bed_number}</h3>
      
      {/* State Label */}
      <p className="text-sm font-semibold mb-4 uppercase tracking-wide">
        {getStateLabel(bed.state)}
      </p>

      {/* Patient Info (only for occupied beds) */}
      {bed.state === 'occupied' && bed.patient_name && (
        <div className="mb-4 bg-white/20 backdrop-blur-sm p-3 rounded">
          <p className="font-semibold text-base">{bed.patient_name}</p>
          <p className="text-xs mt-1 uppercase tracking-wide">
            Urgency: <span className="font-bold">{bed.urgency_level}</span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4">
        {bed.state === 'available' && (
          <Button
            onClick={() => onAssign(bed)}
            variant="secondary"
            className="w-full"
          >
            Assign Patient
          </Button>
        )}
        
        {bed.state === 'occupied' && (
          <Button
            onClick={() => onDischarge(bed)}
            variant="secondary"
            className="w-full"
          >
            Discharge Patient
          </Button>
        )}
        
        {bed.state === 'maintenance' && (
          <Button
            onClick={() => onClean(bed)}
            variant="secondary"
            className="w-full"
          >
            Mark as Cleaned
          </Button>
        )}
      </div>
    </div>
  );
};