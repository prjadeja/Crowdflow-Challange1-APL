import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { BACKEND_URL, hasBackendUrl } from '@/config/backend';

export type Zone = {
  id: string;
  type: 'gate' | 'food' | 'washroom' | 'seating';
  name: string;
  crowdLevel: 'low' | 'medium' | 'high';
  occupancy?: number;
  queueTimeMin?: number;
};

export type Alert = {
  id: string;
  message: string;
  type: string;
  active: boolean;
};

interface CrowdState {
  socket: Socket | null;
  isConnected: boolean;
  zones: Zone[];
  alerts: Alert[];
  connect: () => void;
  disconnect: () => void;
  activeRoute: string | null;
  setActiveRoute: (route: string | null) => void;
}

export const useCrowdStore = create<CrowdState>((set, get) => ({
  socket: null,
  isConnected: false,
  zones: [],
  alerts: [],
  activeRoute: null,
  setActiveRoute: (route) => set({ activeRoute: route }),
  
  connect: () => {
    if (get().socket) return; // Already connected
    if (!hasBackendUrl) {
      console.warn('NEXT_PUBLIC_BACKEND_URL is missing. Skipping socket connection.');
      return;
    }

    const socket = io(BACKEND_URL);

    socket.on('connect', () => {
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('simulation_update', (data: { timestamp: number, zones: Zone[], alerts: Alert[] }) => {
      set({ zones: data.zones, alerts: data.alerts });
    });

    set({ socket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  }
}));
