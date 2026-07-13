import { create } from 'zustand';
import { vehicles as initialVehicles, Vehicle } from '@/lib/data';

export type Lead = {
  id: string;
  name: string;
  phone: string;
  cep: string;
  vehicleInterest: string;
  status: 'novo' | 'em_negociacao' | 'vendido' | 'esfriou';
  date: string;
};

const initialLeads: Lead[] = [
  { id: '1', name: 'Roberto Almeida', phone: '5516999991111', cep: '15900-000', vehicleInterest: 'Toyota Corolla GLi 1.8 AT 2011', status: 'em_negociacao', date: '2023-10-25' },
  { id: '2', name: 'Julia Mendes', phone: '5516999992222', cep: '15900-123', vehicleInterest: 'Honda Civic LXS 1.8 AT 2008', status: 'novo', date: '2023-10-26' },
  { id: '3', name: 'Carlos Santana', phone: '5516999993333', cep: '15902-456', vehicleInterest: 'Fiat Strada 1.8 Adventure', status: 'esfriou', date: '2023-10-20' },
  { id: '4', name: 'Amanda Costa', phone: '5516999994444', cep: '15901-789', vehicleInterest: 'Chevrolet Astra 2.0 Elegance', status: 'novo', date: '2023-10-27' },
];

interface AppState {
  vehicles: Vehicle[];
  leads: Lead[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  deleteLead: (id: string) => void; // LGPD
}

export const useAppStore = create<AppState>((set) => ({
  vehicles: initialVehicles,
  leads: initialLeads,
  addVehicle: (vehicle) => set((state) => ({ vehicles: [vehicle, ...state.vehicles] })),
  updateVehicle: (id, updatedFields) => set((state) => ({
    vehicles: state.vehicles.map(v => v.id === id ? { ...v, ...updatedFields } : v)
  })),
  deleteVehicle: (id) => set((state) => ({ vehicles: state.vehicles.filter(v => v.id !== id) })),
  deleteLead: (id) => set((state) => ({ leads: state.leads.filter(l => l.id !== id) })),
}));
