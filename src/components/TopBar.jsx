import { AnimatePresence, motion as Motion } from 'framer-motion'

function Pill({ label, value, color }) {
  return (
    <div className={`${color} flex items-center gap-1.5 rounded-full px-3 py-1 shadow-sm`}>
      <span className="text-[10px] text-white/70">{label}:</span>
      <span className="text-xs font-bold text-white">{value}</span>
    </div>
  )
}

export default function TopBar({ week, cost, alerts }) {
  const day = ((week - 1) % 7) + 1

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/80 px-5 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">🍺</span>
        <span className="text-base font-black text-white">Beer Game</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Pill label="Participant" value="You" color="bg-slate-600" />
        <Pill label="Step" value={week} color="bg-blue-600" />
        <Pill label="Day" value={day} color="bg-violet-600" />
        <Pill label="Cost" value={`$${cost.toFixed(0)}`} color="bg-rose-600" />
      </div>

      <AnimatePresence mode="wait">
        {alerts.length > 0 ? (
          <Motion.div
            key="alert"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="rounded-full border border-rose-500/50 bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300"
          >
            ⚠ {alerts[0]}
          </Motion.div>
        ) : (
          <Motion.div
            key="ok"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300"
          >
            ✓ Nominal
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
