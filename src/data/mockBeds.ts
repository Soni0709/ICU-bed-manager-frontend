import { Bed } from '../types/bed';

// Generate 20 mock beds
export const mockBeds: Bed[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  bed_number: `ICU-${String(i + 1).padStart(2, '0')}`,
  state: i < 15 ? 'available' : i < 18 ? 'occupied' : 'maintenance',
  patient_name: i >= 15 && i < 18 ? `Patient ${i - 14}` : null,
  urgency_level: i >= 15 && i < 18 ? (['high', 'critical', 'medium'] as const)[i - 15] : null,
  assigned_at: i >= 15 && i < 18 ? new Date().toISOString() : null,
  discharged_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

/*
This creates:
- ICU-01 to ICU-15: Available (green)
- ICU-16 to ICU-18: Occupied (red) with patients
- ICU-19 to ICU-20: Maintenance (yellow)
*/