import { useState } from 'react'
import ChartPanel from './components/ChartPanel'
import GameMap from './components/GameMap'
import TopBar from './components/TopBar'
import { useGame } from './context/GameContext'

const NAV_ITEMS = [
  { icon: '🗺️', label: 'Map' },
  { icon: '📊', label: 'Stats' },
  { icon: '📋', label: 'Orders' },
  { icon: '⚙️', label: 'Settings' },
]

export default function App() {
  const {
    week,
    inventory,
    backlog,
    demand,
    cost,
    shipmentPipeline,
    orderPipeline,
    alerts,
    history,
  } = useGame()

  const [activeNav, setActiveNav] = useState(0)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900">
      {/* ── Left icon sidebar ── */}
      <aside className="flex w-14 flex-col items-center gap-3 border-r border-slate-700/60 bg-slate-800 py-5">
        <div className="mb-3 text-2xl">🍺</div>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            title={item.label}
            onClick={() => setActiveNav(i)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all ${
              activeNav === i
                ? 'bg-emerald-500 shadow-lg shadow-emerald-900/40'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-slate-700/60 px-4 py-3">
          <TopBar week={week} cost={cost} alerts={alerts} />
        </div>

        {/* Scrollable game content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            <GameMap
              demand={demand}
              week={week}
              shipmentPipeline={shipmentPipeline}
              orderPipeline={orderPipeline}
              inventory={inventory}
              backlog={backlog}
            />
            <ChartPanel history={history} />
          </div>
        </div>
      </div>
    </div>
  )
}
