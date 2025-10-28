import React from 'react';
import { motion } from 'framer-motion';

// Category data and simple copy from the spec
const CATEGORIES = [
  { key: 'A', title: 'E‑Commerce Platforms', color: '#3B82F6', integrations: ['Shopify', 'WooCommerce', 'Magento'] },
  { key: 'B', title: 'Checkout / Auth', color: '#004EEB', integrations: ['KwikCheckout', 'KwikPass'], examples: ['Mamaearth', 'MyGlamm'], value: '+22% conversion' },
  { key: 'C', title: 'Payments', color: '#00B3A4', integrations: ['CRED', 'Visa', 'Razorpay'], examples: ['Boat', 'SleepyCat'], value: '+18% success rate' },
  { key: 'D', title: 'Recovery / Messaging', color: '#06B6D4', integrations: ['QuickReply', 'KwikChat'], examples: ['Power Gummies'], value: '2× cart recovery' },
  { key: 'E', title: 'Marketing / CRM', color: '#10B981', integrations: ['MoEngage', 'Netcore'], examples: ['The Man Company'], value: '+30% re‑engagement' },
  { key: 'F', title: 'Shipping / Logistics', color: '#F59E0B', integrations: ['KwikShip', 'Base'] },
  { key: 'G', title: 'Discount / Financing', color: '#8B5CF6', integrations: ['Discount Engines', 'Kwik Financial Services'] },
  { key: 'H', title: 'Analytics / BI', color: '#6366F1', integrations: ['Segment', 'Google Tag Manager'], examples: ['Noise', 'Plum Goodness'], value: '+12% performance gain' },
  { key: 'I', title: 'Developer Integrations', color: '#0EA5E9', integrations: ['SDK', 'APIs', 'Webhooks'] },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angle = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export default function FlowMap({ onNodeClick }) {
  // Layout constants
  const W = 1000;
  const H = 680;
  const center = { x: W / 2, y: H / 2 };
  const radius = 240;

  const nodes = CATEGORIES.map((cat, i) => {
    const angle = (360 / CATEGORIES.length) * i;
    const { x, y } = polarToCartesian(center.x, center.y, radius, angle);
    return { ...cat, x, y };
  });

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop / Tablet: SVG flow map */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-[680px]"
          aria-label="GoKwik ecosystem flow map"
          role="img"
        >
          {/* subtle background grid pulse */}
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,78,235,0.12)" />
              <stop offset="100%" stopColor="rgba(0,78,235,0)" />
            </radialGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.06)" />
            </filter>
          </defs>

          {/* glow behind hub */}
          <circle cx={center.x} cy={center.y} r={120} fill="url(#hubGlow)" />

          {/* connection paths */}
          {nodes.map((n) => {
            // quadratic curve control point closer to hub for a gentle arc
            const cx1 = (n.x + center.x) / 2;
            const cy1 = (n.y + center.y) / 2 - 40;
            const d = `M ${n.x} ${n.y} Q ${cx1} ${cy1} ${center.x} ${center.y}`;
            return (
              <path
                key={`path-${n.key}`}
                d={d}
                stroke="rgba(0,78,235,0.15)"
                strokeWidth="2"
                fill="none"
                aria-label={`${n.title} integrates with GoKwik`}
              />
            );
          })}

          {/* hub node */}
          <g>
            <circle cx={center.x} cy={center.y} r={64} fill="#FFFFFF" filter="url(#shadow)" />
            <circle cx={center.x} cy={center.y} r={76} fill="none" stroke="rgba(0,78,235,0.12)" />
            <text x={center.x} y={center.y + 4} textAnchor="middle" fontWeight="700" fontSize="16" fill="#004EEB">
              GoKwik
            </text>
          </g>

          {/* category nodes */}
          {nodes.map((n) => (
            <g key={n.key} transform={`translate(${n.x},${n.y})`}>
              <circle r={48} fill="#FFFFFF" filter="url(#shadow)" />
              <circle r={60} fill="none" stroke={n.color} opacity="0.25" />
              <text x={0} y={72} textAnchor="middle" fontSize="12" fontWeight="600" fill="#1D2939">
                {n.title}
              </text>

              {/* tiny integration bubbles around the node */}
              {n.integrations?.slice(0, 3).map((name, idx) => {
                const angle = (idx / Math.max(3, n.integrations.length)) * 360;
                const p = polarToCartesian(0, 0, 72, angle);
                return (
                  <g key={`${n.key}-${idx}`} transform={`translate(${p.x},${p.y})`}>
                    <circle r={10} fill="#F7F9FC" stroke="#E5E7EB" />
                  </g>
                );
              })}

              {/* invisible hit area for interaction */}
              <a
                role="button"
                aria-label={`${n.title} details`}
                onClick={() => onNodeClick(n)}
                tabIndex={0}
              >
                <circle r={72} fill="transparent" />
              </a>
            </g>
          ))}
        </svg>
      </div>

      {/* Mobile: stacked categories */}
      <div className="md:hidden px-4">
        <div className="grid grid-cols-1 gap-4">
          {CATEGORIES.map((n) => (
            <motion.button
              key={`m-${n.key}`}
              onClick={() => onNodeClick(n)}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004EEB]/40"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block h-10 w-10 rounded-full" style={{ backgroundColor: n.color, opacity: 0.15 }} />
                <div>
                  <div className="text-sm font-semibold text-[#1D2939]">{n.title}</div>
                  <div className="text-xs text-[#667085] mt-0.5">{n.integrations.join(' • ')}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
