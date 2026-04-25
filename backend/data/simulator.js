const zones = [
  { id: 'gate-1', type: 'gate', name: 'North Gate', crowdLevel: 'low', occupancy: 20 },
  { id: 'gate-2', type: 'gate', name: 'South Gate', crowdLevel: 'high', occupancy: 85 },
  { id: 'gate-3', type: 'gate', name: 'East Gate', crowdLevel: 'medium', occupancy: 60 },
  { id: 'food-north', type: 'food', name: 'Pizza & Burgers (North)', crowdLevel: 'high', queueTimeMin: 15 },
  { id: 'food-south', type: 'food', name: 'Tacos (South)', crowdLevel: 'low', queueTimeMin: 2 },
  { id: 'washroom-east', type: 'washroom', name: 'Restroom (East)', crowdLevel: 'low', queueTimeMin: 0 },
  { id: 'washroom-west', type: 'washroom', name: 'Restroom (West)', crowdLevel: 'medium', queueTimeMin: 4 },
  { id: 'block-a', type: 'seating', name: 'Block A Seating', crowdLevel: 'medium', occupancy: 50 },
  { id: 'block-b', type: 'seating', name: 'Block B Seating', crowdLevel: 'high', occupancy: 95 }
];

const initialData = {
  timestamp: Date.now(),
  zones,
  alerts: []
};

// Fluctuate stats
function simulateTick(state) {
  const newZones = state.zones.map(zone => {
    const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
    let newStat = zone.type === 'food' || zone.type === 'washroom' ? zone.queueTimeMin + change : zone.occupancy + change;
    
    if (newStat < 0) newStat = 0;
    if (zone.type !== 'food' && zone.type !== 'washroom' && newStat > 100) newStat = 100;

    let level = 'low';
    if (zone.type === 'food' || zone.type === 'washroom') {
      if (newStat > 5) level = 'medium';
      if (newStat > 10) level = 'high';
      return { ...zone, queueTimeMin: newStat, crowdLevel: level };
    } else {
      if (newStat > 40) level = 'medium';
      if (newStat > 80) level = 'high';
      return { ...zone, occupancy: newStat, crowdLevel: level };
    }
  });

  // AI Rule-based alert check
  const alerts = [];
  const southGate = newZones.find(z => z.id === 'gate-2');
  const northGate = newZones.find(z => z.id === 'gate-1');
  
  if (southGate.crowdLevel === 'high' && northGate.crowdLevel === 'low') {
    alerts.push({
      id: `alert-${Date.now()}`,
      message: 'South Gate is heavily congested. AI Suggests: Route to North Gate for 5 min faster entry.',
      type: 'ai_suggestion',
      active: true
    });
  }

  return {
    timestamp: Date.now(),
    zones: newZones,
    alerts
  };
}

module.exports = { initialData, simulateTick };
