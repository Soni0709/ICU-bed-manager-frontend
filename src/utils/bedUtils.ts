import { BedState } from '../types/bed';

// Get color classes for each bed state
export const getBedColor = (state: BedState): string => {
  const colorMap: Record<BedState, string> = {
    available: 'bg-green-800 hover:bg-green-600',
    occupied: 'bg-red-800 hover:bg-red-600',
    maintenance: 'bg-yellow-800 hover:bg-yellow-600',
  };
  return colorMap[state];
};

// Get readable label for state
export const getStateLabel = (state: BedState): string => {
  const labelMap: Record<BedState, string> = {
    available: 'Available',
    occupied: 'Occupied',
    maintenance: 'Maintenance',
  };
  return labelMap[state];
};

// Get urgency badge color
export const getUrgencyColor = (urgency: string): string => {
  const urgencyMap: Record<string, string> = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-purple-100 text-purple-800',
  };
  return urgencyMap[urgency] || 'bg-gray-100 text-gray-800';
};