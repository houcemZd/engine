import { AnimatePresence, motion as Motion } from 'framer-motion'

export default function TopBar({ week, cost, alerts }) {
  return (
    <header className="glow-card rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-300">Beer Game Control</p>
          <h1 className="text-2xl font-bold text-slate-100">Week {week}</h1>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-2 text-right">
          <p className="text-xs text-slate-400">Total Cost</p>
          <p className="text-xl font-semibold text-rose-300">${cost.toFixed(2)}</p>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <Motion.div
          key={alerts.join('|') || 'stable'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mt-3 min-h-6 text-sm"
        >
          {alerts.length > 0 ? (
            <p className="font-semibold text-rose-300">⚠ {alerts.join(' • ')}</p>
          ) : (
            <p className="text-emerald-300">All systems nominal.</p>
          )}
        </Motion.div>
      </AnimatePresence>
    </header>
  )
}
