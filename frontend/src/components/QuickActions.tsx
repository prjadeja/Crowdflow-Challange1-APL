"use client";

import { Navigation, Coffee, ShieldAlert } from "lucide-react";
import { useCrowdStore } from "@/store/useCrowdStore";

export default function QuickActions() {
  const { setActiveRoute, activeRoute } = useCrowdStore();

  return (
    <div className="space-y-3">
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => setActiveRoute(activeRoute === 'food' ? null : 'food')}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 ${activeRoute === 'food' ? 'bg-accent/20 border-accent/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'bg-white/5 border-white/5 hover:bg-white/10'} border`}
        >
          <div className={`p-2 rounded-full ${activeRoute === 'food' ? 'bg-accent/30 text-white' : 'bg-white/5 text-accent'}`}>
            <Coffee size={20} />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Food</span>
        </button>
        
        <button 
          onClick={() => setActiveRoute(activeRoute === 'exit' ? null : 'exit')}
          className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 ${activeRoute === 'exit' ? 'bg-alertGreen/20 border-alertGreen/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/5 hover:bg-white/10'} border`}
        >
          <div className={`p-2 rounded-full ${activeRoute === 'exit' ? 'bg-alertGreen/30 text-white' : 'bg-white/5 text-alertGreen'}`}>
            <Navigation size={20} />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Exit</span>
        </button>

        <button 
          onClick={() => alert("Emergency SOS Triggered! Authorities notified.")}
          className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 bg-alertRed/10 border border-alertRed/20 hover:bg-alertRed/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        >
          <div className="p-2 rounded-full bg-alertRed/20 text-alertRed">
            <ShieldAlert size={20} />
          </div>
          <span className="text-[10px] font-semibold tracking-wide text-alertRed">SOS</span>
        </button>
      </div>
    </div>
  );
}
