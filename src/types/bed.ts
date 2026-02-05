// Bed state types
export type BedState = 'available' | 'occupied' | 'maintenance';

// Urgency level types
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

// Main Bed interface
export interface Bed {
  id: number;
  bed_number: string;
  state: BedState;
  patient_name: string | null;
  urgency_level: UrgencyLevel | null;
  assigned_at: string | null;
  discharged_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssignPatientRequest {
  patient_name: string;
  urgency_level: UrgencyLevel;
}

export interface ApiErrorResponse {
  error: string;
}
