import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useDayPhase } from '../hooks/useDayPhase'
import NodePopup from './NodePopup'

const VB_W = 1000
const VB_H = 480

// [x, y, fontSize, emoji]
const TREES = [
  [55, 60, 32, '🌲'], [175, 78, 28, '🌳'], [285, 50, 30, '🌲'],
  [95, 152, 26, '🌲'], [228, 138, 24, '🌳'], [68, 252, 26, '🌲'],
  [198, 270, 22, '🌳'], [315, 242, 26, '🌲'], [382, 162, 22, '🌳'],
  [708, 58, 28, '🌲'], [802, 44, 26, '🌳'], [922, 68, 28, '🌲'],
  [972, 140, 24, '🌲'], [758, 140, 22, '🌳'], [688, 110, 24, '🌲'],
  [858, 118, 22, '🌳'],
  [730, 384, 26, '🌲'], [818, 426, 24, '🌳'], [950, 374, 26, '🌲'],
  [742, 468, 22, '🌳'],
]

const NODES = [
  { id: 'retailer',   label: 'E-Retailer',    icon: '🏪', vx: 128, vy: 170 },
  { id: 'wholesaler', label: 'Parcel Drop',    icon: '🏬', vx: 768, vy: 148 },
  { id: 'factory',    label: 'Phone Factory',  icon: '🏭', vx: 865, vy: 418 },
]

const vpx = (x) => `${(x / VB_W) * 100}%`
const vpy = (y) => `${(y / VB_H) * 100}%`

export default function GameMap({ demand, week, shipmentPipeline, orderPipeline, inventory, backlog }) {
  const phase = useDayPhase(week)
  const isNight = phase === 'night'
  const [activeNode, setActiveNode] = useState(null)
  const speed = Math.max(5, 15 - demand * 0.55)

  const skyTop = isNight ? '#0f172a' : '#7dd3fc'
  const skyBot = isNight ? '#1e293b' : '#e0f2fe'
  const grassTop = isNight ? '#166534' : '#86efac'
  const grassBot = isNight ? '#14532d' : '#22c55e'

  const handleNodeClick = (node) => {
    setActiveNode((prev) => (prev?.id === node.id ? null : node))
  }

  const STARS = [
    { l: '22%', t: '7%' }, { l: '38%', t: '4%' }, { l: '52%', t: '9%' },
    { l: '62%', t: '5%' }, { l: '30%', t: '13%' }, { l: '46%', t: '2%' },
  ]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl" style={{ height: 420 }}>
      {/* ── SVG scenic background ── */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gmSkyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={skyTop} />
            <stop offset="100%" stopColor={skyBot} />
          </linearGradient>
          <linearGradient id="gmWaterG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="gmGrassG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={grassTop} />
            <stop offset="100%" stopColor={grassBot} />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width={VB_W} height={VB_H} fill="url(#gmSkyG)" />

        {/* Water (fills center/lower) */}
        <polygon
          points="315,242 665,202 1000,222 1000,480 0,480 0,305"
          fill="url(#gmWaterG)"
          opacity={isNight ? 0.7 : 0.9}
        />
        {/* Water shimmer lines */}
        <line x1="342" y1="344" x2="585" y2="332" stroke="white" strokeWidth="1.5" opacity="0.22" />
        <line x1="302" y1="378" x2="648" y2="362" stroke="white" strokeWidth="1" opacity="0.15" />
        <line x1="422" y1="418" x2="705" y2="402" stroke="white" strokeWidth="1" opacity="0.12" />

        {/* Left land patch (Retailer area) */}
        <polygon points="0,0 462,0 478,228 348,288 0,312" fill="url(#gmGrassG)" />

        {/* Top-right land patch (Wholesaler area) */}
        <polygon points="628,0 1000,0 1000,258 840,240 652,170" fill="url(#gmGrassG)" />

        {/* Bottom-right land patch (Factory area) */}
        <polygon points="762,302 1000,280 1000,480 698,480" fill="url(#gmGrassG)" />

        {/* ── Roads ── */}
        {/* Left road: Retailer → water edge */}
        <path d="M128,192 L390,208" stroke="#6b7280" strokeWidth="22" strokeLinecap="butt" fill="none" />
        <path d="M128,192 L390,208" stroke="#d1d5db" strokeWidth="17" fill="none" />
        <path d="M128,192 L390,208" stroke="white" strokeWidth="2" strokeDasharray="22 13" opacity="0.75" fill="none" />

        {/* Right road: water edge → Wholesaler */}
        <path d="M648,192 L815,182" stroke="#6b7280" strokeWidth="22" strokeLinecap="butt" fill="none" />
        <path d="M648,192 L815,182" stroke="#d1d5db" strokeWidth="17" fill="none" />
        <path d="M648,192 L815,182" stroke="white" strokeWidth="2" strokeDasharray="22 13" opacity="0.75" fill="none" />

        {/* Right vertical road: Wholesaler → Factory */}
        <path d="M875,182 L875,398" stroke="#6b7280" strokeWidth="22" strokeLinecap="butt" fill="none" />
        <path d="M875,182 L875,398" stroke="#d1d5db" strokeWidth="17" fill="none" />
        <path d="M875,182 L875,398" stroke="white" strokeWidth="2" strokeDasharray="22 13" opacity="0.75" fill="none" />

        {/* ── Trees ── */}
        {TREES.map(([x, y, size, emoji], i) => (
          <text key={i} x={x} y={y} fontSize={size} textAnchor="middle">{emoji}</text>
        ))}

        {/* Rocks near water edge */}
        <ellipse cx="492" cy="280" rx="18" ry="11" fill="#94a3b8" opacity="0.7" />
        <ellipse cx="524" cy="274" rx="11" ry="7" fill="#94a3b8" opacity="0.55" />
        <ellipse cx="362" cy="382" rx="15" ry="9" fill="#64748b" opacity="0.6" />
        <ellipse cx="582" cy="310" rx="12" ry="7" fill="#94a3b8" opacity="0.5" />
      </svg>

      {/* ── Sun / Moon ── */}
      <Motion.div
        className="absolute rounded-full"
        animate={{
          left: isNight ? '72%' : '6%',
          width: isNight ? 34 : 46,
          height: isNight ? 34 : 46,
          backgroundColor: isNight ? '#e2e8f0' : '#fde047',
          boxShadow: isNight
            ? '0 0 16px rgba(226,232,240,0.38)'
            : '0 0 28px rgba(253,224,71,0.68)',
        }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        style={{ top: 14 }}
      />

      {/* ── Stars (night only) ── */}
      <AnimatePresence>
        {isNight && STARS.map((s, i) => (
          <Motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{ left: s.l, top: s.t, width: 3, height: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </AnimatePresence>

      {/* ── Trucks – Left road (Retailer ↔ water edge, stage 1) ── */}
      <Motion.div
        className="absolute select-none text-base"
        style={{ top: '36%' }}
        animate={{ left: ['10%', '36%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >🚛</Motion.div>

      <Motion.div
        className="absolute select-none text-base"
        style={{ top: '38%' }}
        animate={{ left: ['36%', '10%'] }}
        transition={{ duration: speed * 0.9, repeat: Infinity, ease: 'linear', delay: speed * 0.45 }}
      >🚚</Motion.div>

      {/* ── Boats – Water crossing (stage 2) ── */}
      <Motion.div
        className="absolute select-none"
        style={{ fontSize: 26 }}
        animate={{ left: ['34%', '63%'], top: ['49%', '47%'] }}
        transition={{ duration: speed * 1.4, repeat: Infinity, ease: 'linear' }}
      >🚢</Motion.div>

      <Motion.div
        className="absolute select-none"
        style={{ fontSize: 22 }}
        animate={{ left: ['63%', '34%'], top: ['47%', '49%'] }}
        transition={{ duration: speed * 1.4, repeat: Infinity, ease: 'linear', delay: speed * 0.7 }}
      >🛥️</Motion.div>

      {/* ── Trucks – Right road (Wholesaler ↔ Factory, vertical) ── */}
      <Motion.div
        className="absolute select-none text-base"
        style={{ left: '84%' }}
        animate={{ top: ['34%', '74%'] }}
        transition={{ duration: speed * 0.85, repeat: Infinity, ease: 'linear' }}
      >🚛</Motion.div>

      <Motion.div
        className="absolute select-none text-base"
        style={{ left: '85.5%' }}
        animate={{ top: ['74%', '34%'] }}
        transition={{ duration: speed * 0.85, repeat: Infinity, ease: 'linear', delay: speed * 0.42 }}
      >🚚</Motion.div>

      {/* ── Supply-chain node buildings ── */}
      {NODES.map((node) => (
        <button
          key={node.id}
          title={node.label}
          className="absolute flex cursor-pointer flex-col items-center"
          style={{ left: vpx(node.vx), top: vpy(node.vy), transform: 'translate(-50%, -50%)' }}
          onClick={() => handleNodeClick(node)}
        >
          <div
            className={`rounded-xl border-2 bg-white px-2.5 py-2 shadow-lg transition-all duration-200 hover:scale-110 ${
              activeNode?.id === node.id
                ? 'border-blue-400 ring-2 ring-blue-400/60'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <span className="block text-2xl leading-none">{node.icon}</span>
          </div>
          <div className="mt-1 rounded-full bg-white/92 px-2 py-0.5 text-[11px] font-bold text-gray-800 shadow">
            {node.label}
          </div>
          {node.id === 'retailer' && (
            <div className="mt-0.5 rounded-full bg-orange-400/90 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
              Stock: {inventory}
            </div>
          )}
        </button>
      ))}

      {/* ── Two-stage pipeline badges ── */}
      <div className="absolute bottom-2.5 right-2.5 z-10 flex gap-1.5">
        <div className="rounded-lg bg-emerald-700/80 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          📦 Ship: {shipmentPipeline[0]} → {shipmentPipeline[1]}
        </div>
        <div className="rounded-lg bg-orange-600/80 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          📋 Order: {orderPipeline[0]} → {orderPipeline[1]}
        </div>
      </div>

      {/* ── Phase label ── */}
      <div className="absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
        {isNight ? '🌙 Night shift' : '☀️ Day shift'}
      </div>

      {/* ── Node popup ── */}
      <AnimatePresence>
        {activeNode && (
          <NodePopup
            node={activeNode}
            inventory={inventory}
            backlog={backlog}
            demand={demand}
            shipmentPipeline={shipmentPipeline}
            orderPipeline={orderPipeline}
            onClose={() => setActiveNode(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
