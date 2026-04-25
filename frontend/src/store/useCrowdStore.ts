import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { BACKEND_URL, hasBackendUrl } from '@/config/backend';
import { applyJoinQueue, initialSnapshot, simulateTick } from '@/lib/localSimulation';

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
  joinQueue: (zoneId: string) => Promise<boolean>;
  activeRoute: string | null;
  setActiveRoute: (route: string | null) => void;
}

let localTimer: ReturnType<typeof setInterval> | null = null;

export const useCrowdStore = create<CrowdState>((set, get) => ({
  socket: null,
  isConnected: false,
  zones: initialSnapshot.zones,
  alerts: [],
  activeRoute: null,
  setActiveRoute: (route) => set({ activeRoute: route }),
  
  connect: () => {
    if (get().socket || localTimer) return; // Already connected
    if (!hasBackendUrl) {
      let localState = { ...initialSnapshot };
      set({ zones: localState.zones, alerts: localState.alerts, isConnected: true });

      localTimer = setInterval(() => {
        localState = simulateTick(localState);
        set({ zones: localState.zones, alerts: localState.alerts, isConnected: true });
      }, 5000);
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
    if (localTimer) {
      clearInterval(localTimer);
      localTimer = null;
      set({ isConnected: false });
    }
  },

  joinQueue: async (zoneId: string) => {
    if (!hasBackendUrl) {
      set((state) => {
        const next = applyJoinQueue(
          { timestamp: Date.now(), zones: state.zones, alerts: state.alerts },
          zoneId
        );
        return { zones: next.zones, alerts: next.alerts };
      });
      return true;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/queue/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId }),
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}));
