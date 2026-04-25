import type { Alert, Zone } from "@/store/useCrowdStore";

export type CrowdSnapshot = {
  timestamp: number;
  zones: Zone[];
  alerts: Alert[];
};

export const initialSnapshot: CrowdSnapshot = {
  timestamp: Date.now(),
  zones: [
    { id: "gate-1", type: "gate", name: "North Gate", crowdLevel: "low", occupancy: 20 },
    { id: "gate-2", type: "gate", name: "South Gate", crowdLevel: "high", occupancy: 85 },
    { id: "gate-3", type: "gate", name: "East Gate", crowdLevel: "medium", occupancy: 60 },
    { id: "food-north", type: "food", name: "Pizza & Burgers (North)", crowdLevel: "high", queueTimeMin: 15 },
    { id: "food-south", type: "food", name: "Tacos (South)", crowdLevel: "low", queueTimeMin: 2 },
    { id: "washroom-east", type: "washroom", name: "Restroom (East)", crowdLevel: "low", queueTimeMin: 0 },
    { id: "washroom-west", type: "washroom", name: "Restroom (West)", crowdLevel: "medium", queueTimeMin: 4 },
    { id: "block-a", type: "seating", name: "Block A Seating", crowdLevel: "medium", occupancy: 50 },
    { id: "block-b", type: "seating", name: "Block B Seating", crowdLevel: "high", occupancy: 95 },
  ],
  alerts: [],
};

function toCrowdLevel(value: number, medium: number, high: number): Zone["crowdLevel"] {
  if (value > high) return "high";
  if (value > medium) return "medium";
  return "low";
}

export function simulateTick(snapshot: CrowdSnapshot): CrowdSnapshot {
  const zones = snapshot.zones.map((zone) => {
    const change = Math.floor(Math.random() * 11) - 5;

    if (zone.type === "food" || zone.type === "washroom") {
      const next = Math.max(0, (zone.queueTimeMin ?? 0) + change);
      const crowdLevel = toCrowdLevel(next, 5, 10);
      return { ...zone, queueTimeMin: next, crowdLevel };
    }

    const next = Math.max(0, Math.min(100, (zone.occupancy ?? 0) + change));
    const crowdLevel = toCrowdLevel(next, 40, 80);
    return { ...zone, occupancy: next, crowdLevel };
  });

  const alerts: Alert[] = [];
  const southGate = zones.find((z) => z.id === "gate-2");
  const northGate = zones.find((z) => z.id === "gate-1");

  if (southGate?.crowdLevel === "high" && northGate?.crowdLevel === "low") {
    alerts.push({
      id: `alert-${Date.now()}`,
      message: "South Gate is heavily congested. AI Suggests: Route to North Gate for 5 min faster entry.",
      type: "ai_suggestion",
      active: true,
    });
  }

  return { timestamp: Date.now(), zones, alerts };
}

export function applyJoinQueue(snapshot: CrowdSnapshot, zoneId: string): CrowdSnapshot {
  const zones = snapshot.zones.map((zone) => {
    if (zone.id !== zoneId) return zone;
    if (zone.type !== "food" && zone.type !== "washroom") return zone;

    const next = Math.max(0, (zone.queueTimeMin ?? 0) + 2);
    const crowdLevel = toCrowdLevel(next, 5, 10);
    return { ...zone, queueTimeMin: next, crowdLevel };
  });

  return { ...snapshot, timestamp: Date.now(), zones };
}
