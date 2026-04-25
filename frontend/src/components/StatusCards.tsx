"use client";

import { useState } from "react";
import { useCrowdStore } from "@/store/useCrowdStore";
import { Clock, Users } from "lucide-react";

function FoodZoneItem({ zone, joinQueue }: { zone: any; joinQueue: (zoneId: string) => Promise<boolean> }) {
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-between items-center bg-black/20 rounded-xl p-3 border border-white/5">
      <span className="text-xs font-semibold text-gray-200">{zone.name}</span>
      <div className="flex items-center gap-3">
        <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${
          zone.crowdLevel === 'low' ? 'bg-alertGreen/20 text-alertGreen border border-alertGreen/20' :
          zone.crowdLevel === 'medium' ? 'bg-alertYellow/20 text-alertYellow border border-alertYellow/20' :
          'bg-alertRed/20 text-alertRed border border-alertRed/20'
        }`}>
          {zone.queueTimeMin} min
        </span>
        <button 
          disabled={isJoined || isLoading}
          onClick={async () => {
            setIsLoading(true);
            const ok = await joinQueue(zone.id);
            setIsLoading(false);

            if (ok) {
              setIsJoined(true);
            } else {
              alert("Network error.");
            }
          }}
          className={`text-[11px] font-bold px-3 py-1 rounded-md transition-transform ${
            isJoined 
              ? 'bg-alertGreen/20 text-alertGreen border border-alertGreen/30 cursor-default' 
              : 'bg-white text-black hover:bg-gray-200 active:scale-95'
          }`}
        >
          {isLoading ? '...' : isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    </div>
  );
}

export default function StatusCards() {
  const { zones, joinQueue } = useCrowdStore();

  const foodZones = zones.filter(z => z.type === 'food');
  const gateZones = zones.filter(z => z.type === 'gate');

  return (
    <div className="space-y-3 pb-4">
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Live Status</h2>
      
      <div className="flex flex-col gap-4">
        {/* Food Wait Times */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-accent/20 rounded-lg">
                <Clock size={16} className="text-accent" />
              </div>
              <h3 className="text-sm font-bold text-white">Food Queues</h3>
            </div>
          </div>
          
          <div className="space-y-3 relative z-10">
            {foodZones.map(zone => (
              <FoodZoneItem key={zone.id} zone={zone} joinQueue={joinQueue} />
            ))}
          </div>
        </div>

        {/* Gate Congestion */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-alertGreen/10 blur-[50px] pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-alertGreen/20 rounded-lg">
                <Users size={16} className="text-alertGreen" />
              </div>
              <h3 className="text-sm font-bold text-white">Gate Traffic</h3>
            </div>
          </div>
          
          <div className="space-y-4 relative z-10">
            {gateZones.map(zone => (
              <div key={zone.id} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-gray-300">{zone.name}</span>
                  <span className="text-[10px] font-mono text-gray-500">{zone.occupancy}% full</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      zone.crowdLevel === 'low' ? 'bg-alertGreen shadow-[0_0_10px_rgba(16,185,129,0.5)]' :
                      zone.crowdLevel === 'medium' ? 'bg-alertYellow shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                      'bg-alertRed shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                    }`} 
                    style={{ width: `${zone.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
