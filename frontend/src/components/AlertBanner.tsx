"use client";

import { useCrowdStore } from "@/store/useCrowdStore";
import { AlertTriangle, Lightbulb } from "lucide-react";

export default function AlertBanner() {
  const { alerts } = useCrowdStore();
  const activeAlerts = alerts.filter(a => a.active);

  if (activeAlerts.length === 0) return null;

  return (
    <div className="z-20 space-y-2">
      {activeAlerts.map(alert => (
        <div key={alert.id} className="relative overflow-hidden bg-alertYellow/10 border border-alertYellow/30 rounded-2xl p-4 flex items-start gap-3 shadow-[0_4px_20px_rgba(245,158,11,0.15)] backdrop-blur-md">
          <div className="absolute top-0 left-0 w-1 h-full bg-alertYellow" />
          <div className="p-2 bg-alertYellow/20 rounded-full shrink-0">
            {alert.type === 'ai_suggestion' ? (
              <Lightbulb className="text-alertYellow" size={18} />
            ) : (
              <AlertTriangle className="text-alertRed" size={18} />
            )}
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-alertYellow mb-1">Smart Alert</h4>
            <p className="text-xs text-gray-200 leading-relaxed">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
