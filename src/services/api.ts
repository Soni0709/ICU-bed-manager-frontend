import axios, { AxiosResponse } from 'axios';
import { Bed, AssignPatientRequest } from '../types/bed';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Services
export const bedApi = {
  // GET /beds - Fetch all beds
  getAllBeds: async (): Promise<Bed[]> => {
    const response: AxiosResponse<Bed[]> = await api.get('/beds');
    return response.data;
  },

  // POST /beds/:id/assign - Assign patient to bed
  assignPatient: async (
    id: number,
    data: AssignPatientRequest
  ): Promise<Bed> => {
    const response: AxiosResponse<Bed> = await api.post(
      `/beds/${id}/assign`,
      data
    );
    return response.data;
  },

  // POST /beds/:id/discharge - Discharge patient from bed
  dischargePatient: async (id: number): Promise<Bed> => {
    const response: AxiosResponse<Bed> = await api.post(
      `/beds/${id}/discharge`
    );
    return response.data;
  },

  // POST /beds/:id/clean - Mark bed as cleaned
  cleanBed: async (id: number): Promise<Bed> => {
    const response: AxiosResponse<Bed> = await api.post(`/beds/${id}/clean`);
    return response.data;
  },

  // GET /beds/export - Export CSV
  exportCSV: (): void => {
    window.open('http://localhost:3000/beds/export', '_blank');
  },
};

export default api;