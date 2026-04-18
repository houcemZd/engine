import { motion as Motion } from 'framer-motion'

function formatValue(value) {
  if (typeof value === 'number') return value.toLocaleString()
  return value
}

export default function Card({ title, value, tone = 'slate', warning = false }) {
  const toneMap = {
    slate: 'from-slate-800/80 to-slate-900/80 border-slate-700/60',
    cyan: 'from-cyan-800/70 to-slate-900/80 border-cyan-700/60',
    amber: 'from-amber-800/70 to-slate-900/80 border-amber-700/60',
    rose: 'from-rose-800/70 to-slate-900/80 border-rose-600/70',
    emerald: 'from-emerald-800/70 to-slate-900/80 border-emerald-700/60',
  }

  return (
    <Motion.article
      layout
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={`glow-card rounded-2xl border bg-gradient-to-br p-4 ${toneMap[tone] ?? toneMap.slate}`}
      animate={warning ? { scale: [1, 1.02, 1], opacity: [1, 0.88, 1] } : { scale: 1, opacity: 1 }}
      transition={warning ? { duration: 0.8, repeat: Infinity } : { duration: 0.25 }}
    >
      <p className="text-xs uppercase tracking-widest text-slate-400">{title}</p>
      <Motion.p
        key={`${title}-${value}`}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-2 text-3xl font-semibold text-slate-100"
      >
        {formatValue(value)}
      </Motion.p>
    </Motion.article>
  )
}
