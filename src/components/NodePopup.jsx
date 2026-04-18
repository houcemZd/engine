import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export default function NodePopup({ node, inventory, backlog, demand, shipmentPipeline, orderPipeline, onClose }) {
  const { pendingOrder, placeOrder, nextTurn } = useGame()
  const [orderQty, setOrderQty] = useState(String(pendingOrder))

  const handleOrder = (e) => {
    e.preventDefault()
    placeOrder(Number(orderQty))
    nextTurn()
    onClose()
  }

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 10 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="absolute left-3 top-3 z-30 w-62 overflow-hidden rounded-2xl bg-white shadow-2xl"
      style={{ width: 248 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-emerald-500 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{node.icon}</span>
          <div>
            <p className="text-sm font-bold leading-tight text-white">{node.label}</p>
            <p className="text-[10px] text-emerald-100">▶ Now playing</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full px-1.5 py-0.5 text-sm font-bold text-white/70 transition hover:bg-white/20 hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Stock / Cost row */}
        <div className="mb-3 flex gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400">Stock</p>
            <p className="text-2xl font-bold text-gray-800">{inventory}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400">Cost</p>
            <p className="text-2xl font-bold text-gray-800">{backlog}</p>
          </div>
        </div>

        {/* Three-stat row */}
        <div className="mb-3 grid grid-cols-3 gap-1 text-center">
          <div className="rounded-lg bg-slate-100 px-1 py-1.5">
            <p className="text-[9px] text-gray-400">Order exp.</p>
            <p className="text-sm font-bold text-gray-700">{orderPipeline[1]}</p>
          </div>
          <div className="rounded-lg bg-slate-100 px-1 py-1.5">
            <p className="text-[9px] text-gray-400">Material</p>
            <p className="text-sm font-bold text-gray-700">{shipmentPipeline[1]}</p>
          </div>
          <div className="rounded-lg bg-rose-50 px-1 py-1.5">
            <p className="text-[9px] text-rose-400">Backlog</p>
            <p className="text-sm font-bold text-rose-600">{backlog}</p>
          </div>
        </div>

        {/* Demand */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
          <span>Demand this week:</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-700">
            {demand}
          </span>
        </div>

        {/* Divider */}
        <div className="mb-2 border-t border-gray-100" />

        {/* Order form */}
        <form onSubmit={handleOrder} className="flex items-center gap-2">
          <span className="text-2xl font-black text-rose-500">→</span>
          <input
            type="number"
            min="0"
            value={orderQty}
            onChange={(e) => setOrderQty(e.target.value)}
            className="w-16 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-sm font-semibold text-gray-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          />
          <Motion.button
            type="submit"
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
            className="flex-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-rose-600"
          >
            Order
          </Motion.button>
        </form>

        <p className="mt-1.5 text-center text-[10px] text-gray-400">
          +{shipmentPipeline[0]} arriving next stage
        </p>
      </div>
    </Motion.div>
  )
}
