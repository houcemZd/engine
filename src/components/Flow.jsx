import { motion as Motion } from 'framer-motion'
import { useDayPhase } from '../hooks/useDayPhase'

const nodes = ['Factory', 'Distributor', 'Wholesaler', 'Retailer']

const markerPositions = ['left-[10%]', 'left-[36%]', 'left-[62%]', 'left-[88%]']

function truck(duration, delay, colorClass, direction = 'left') {
  const x = direction === 'left' ? ['85%', '5%'] : ['5%', '85%']
  return (
    <Motion.div
      className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-md px-2 py-0.5 text-xs font-bold text-slate-950 ${colorClass}`}
      animate={{ x }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      🚚
    </Motion.div>
  )
}

export default function Flow({ demand, week, shipmentPipeline, orderPipeline }) {
  const speed = Math.max(4, 14 - demand * 0.6)
  const phase = useDayPhase(week)
  const isNight = phase === 'night'

  return (
    <section className="glow-card relative overflow-hidden rounded-2xl border border-slate-700/60 p-4">
      <Motion.div
        className="absolute inset-0"
        animate={{
          background: isNight
            ? 'linear-gradient(180deg, #020617 0%, #0f172a 55%, #111827 100%)'
            : 'linear-gradient(180deg, #0f172a 0%, #1d4ed8 50%, #155e75 100%)',
        }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-x-0 top-4 z-10 flex items-center justify-between px-6">
        <Motion.div
          animate={isNight ? { x: 240, y: 6, opacity: 0.6 } : { x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`h-12 w-12 rounded-full ${
            isNight ? 'bg-slate-200/80 shadow-[0_0_18px_rgba(226,232,240,0.35)]' : 'bg-yellow-300 shadow-[0_0_24px_rgba(253,224,71,0.55)]'
          }`}
        />
        <div className="text-xs text-slate-100/90">
          {isNight ? 'Night shift logistics' : 'Day shift logistics'}
        </div>
      </div>
      <div className="relative z-10 mt-10 rounded-xl border border-slate-600/40 bg-emerald-500/20 p-5">
        <div className="mb-4 h-2 rounded-full bg-emerald-400/35" />
        <div className="road relative h-14 rounded-full border border-slate-500/40">
          {truck(speed, 0, 'bg-emerald-400', 'left')}
          {truck(speed, speed / 2, 'bg-emerald-500', 'left')}
          {truck(speed * 1.1, speed / 3, 'bg-orange-400', 'right')}
          {truck(speed * 1.1, (speed * 2) / 3, 'bg-orange-500', 'right')}
        </div>
        <div className="relative mt-5 h-14">
          {nodes.map((node, index) => (
            <div
              key={node}
              className={`absolute top-0 -translate-x-1/2 ${markerPositions[index]} text-center`}
            >
              <div className="mx-auto h-4 w-4 rounded-full bg-slate-100 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
              <p className="mt-1 text-xs font-semibold text-slate-100">{node}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-100/90 md:grid-cols-4">
          <p>Shipment stage 1: {shipmentPipeline[0]}</p>
          <p>Shipment stage 2: {shipmentPipeline[1]}</p>
          <p>Order stage 1: {orderPipeline[0]}</p>
          <p>Order stage 2: {orderPipeline[1]}</p>
        </div>
      </div>
    </section>
  )
}
