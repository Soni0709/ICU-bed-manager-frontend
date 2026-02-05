import { useState } from 'react';
import { Bed, UrgencyLevel } from '../types/bed';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';

interface AssignPatientModalProps {
  bed: Bed | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (patientName: string, urgencyLevel: UrgencyLevel) => void;
}

export const AssignPatientModal: React.FC<AssignPatientModalProps> = ({
  bed,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [patientName, setPatientName] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel | ''>('');
  const [errors, setErrors] = useState<{ name?: string; urgency?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; urgency?: string } = {};
    
    if (!patientName.trim()) {
      newErrors.name = 'Patient name is required';
    }
    
    if (!urgencyLevel) {
      newErrors.urgency = 'Urgency level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    onSubmit(patientName.trim(), urgencyLevel as UrgencyLevel);
    handleClose();
  };

  const handleClose = () => {
    setPatientName('');
    setUrgencyLevel('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Assign Patient to {bed?.bed_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Patient Name Input */}
          <div className="space-y-2">
            <Label htmlFor="patient-name">Patient Name *</Label>
            <Input
              id="patient-name"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Urgency Level Select */}
          <div className="space-y-2">
            <Label htmlFor="urgency-level">Urgency Level *</Label>
            <Select
              value={urgencyLevel}
              onValueChange={(value) => {
                setUrgencyLevel(value as UrgencyLevel);
                setErrors((prev) => ({ ...prev, urgency: undefined }));
              }}
            >
              <SelectTrigger 
                id="urgency-level"
                className={errors.urgency ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Low
                  </span>
                </SelectItem>
                <SelectItem value="medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Medium
                  </span>
                </SelectItem>
                <SelectItem value="high">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    High
                  </span>
                </SelectItem>
                <SelectItem value="critical">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Critical
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.urgency && (
              <p className="text-sm text-red-500">{errors.urgency}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Assign Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};