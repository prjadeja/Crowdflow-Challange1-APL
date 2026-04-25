"use client";

import { useCrowdStore } from "@/store/useCrowdStore";

export default function StadiumMap() {
  const { zones, activeRoute } = useCrowdStore();

  const getColor = (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return "#333";
    
    switch(zone.crowdLevel) {
      case 'low': return "var(--alertGreen)";
      case 'medium': return "var(--alertYellow)";
      case 'high': return "var(--alertRed)";
      default: return "#333";
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto perspective-1000">
      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id="pitchGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer stadium bounds */}
        <ellipse cx="250" cy="250" rx="220" ry="200" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="10 10"/>

        {/* Base Field */}
        {/* Base Cricket Field */}
        <g transform="translate(0, 0)">
          {/* Outfield */}
          <ellipse cx="250" cy="250" rx="140" ry="140" fill="#064e3b" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          
          {/* Inner Circle (30-yard circle) */}
          <ellipse cx="250" cy="250" rx="65" ry="65" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* The Pitch (Central dirt rectangle) */}
          <rect x="238" y="210" width="24" height="80" fill="#a16207" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          
          {/* Crease Lines (Top) */}
          <line x1="235" y1="215" x2="265" y2="215" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          <line x1="238" y1="225" x2="262" y2="225" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          
          {/* Crease Lines (Bottom) */}
          <line x1="235" y1="285" x2="265" y2="285" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          <line x1="238" y1="275" x2="262" y2="275" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />

          {/* Wickets (Stumps) */}
          <rect x="248" y="212" width="4" height="3" fill="#fbbf24" />
          <rect x="248" y="285" width="4" height="3" fill="#fbbf24" />
          
          <text x="250" y="250" fill="rgba(255,255,255,0.2)" fontSize="20" fontWeight="900" textAnchor="middle" alignmentBaseline="middle" letterSpacing="4" style={{pointerEvents: 'none'}} transform="rotate(-90 250 250)">PITCH</text>
        </g>

        {/* Block A (North) */}
        <path 
          className="region transition-all duration-700 ease-in-out hover:brightness-125"
          d="M 170 120 Q 250 40 330 120 L 390 80 Q 250 -20 110 80 Z" 
          fill={getColor('block-a')}
          filter="url(#glow)"
        />
        <text x="250" y="70" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">North Stand</text>

        {/* Block B (South) */}
        <path 
          className="region transition-all duration-700 ease-in-out hover:brightness-125"
          d="M 170 380 Q 250 460 330 380 L 390 420 Q 250 520 110 420 Z" 
          fill={getColor('block-b')}
          filter="url(#glow)"
        />
        <text x="250" y="430" fill="#fff" fontSize="13" fontWeight="bold" textAnchor="middle" className="pointer-events-none drop-shadow-md">South Stand</text>

        {/* Gates */}
        <g transform="translate(60, 100)">
          <circle className="region" cx="0" cy="0" r="28" fill={getColor('gate-1')} filter="url(#glow)" />
          <text x="0" y="4" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="pointer-events-none">G1</text>
        </g>
        
        <g transform="translate(440, 400)">
          <circle className="region" cx="0" cy="0" r="28" fill={getColor('gate-2')} filter="url(#glow)" />
          <text x="0" y="4" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="pointer-events-none">G2</text>
        </g>

        <g transform="translate(460, 250)">
          <circle className="region" cx="0" cy="0" r="28" fill={getColor('gate-3')} filter="url(#glow)" />
          <text x="0" y="4" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="pointer-events-none">G3</text>
        </g>

        {/* Food */}
        <g transform="translate(40, 220)">
          <rect className="region" x="-25" y="-25" width="50" height="50" rx="12" fill={getColor('food-north')} filter="url(#glow)" />
          <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="600" textAnchor="middle" className="pointer-events-none">Food</text>
        </g>

        <g transform="translate(440, 120)">
          <rect className="region" x="-25" y="-25" width="50" height="50" rx="12" fill={getColor('food-south')} filter="url(#glow)" />
          <text x="0" y="4" fill="#fff" fontSize="11" fontWeight="600" textAnchor="middle" className="pointer-events-none">Food</text>
        </g>

        {/* Washrooms */}
        <g transform="translate(80, 350)">
          <circle className="region" cx="0" cy="0" r="20" fill={getColor('washroom-west')} />
          <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" className="pointer-events-none">WC</text>
        </g>

        <g transform="translate(380, 280)">
          <circle className="region" cx="0" cy="0" r="20" fill={getColor('washroom-east')} />
          <text x="0" y="4" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" className="pointer-events-none">WC</text>
        </g>

        {/* Navigation Routes */}
        {activeRoute === 'food' && (
          <path 
            d="M 250 380 Q 150 250 40 220" 
            stroke="var(--accent)" 
            strokeWidth="6" 
            strokeDasharray="12 12" 
            fill="none" 
            className="animate-[dash_1s_linear_infinite] drop-shadow-[0_0_8px_var(--accent)]"
          />
        )}
        {activeRoute === 'exit' && (
          <path 
            d="M 250 120 Q 200 110 60 100" 
            stroke="var(--alertGreen)" 
            strokeWidth="6" 
            strokeDasharray="12 12" 
            fill="none" 
            className="animate-[dash_1s_linear_infinite] drop-shadow-[0_0_8px_var(--alertGreen)]"
          />
        )}
      </svg>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -24; }
        }
      `}} />
    </div>
  );
}
