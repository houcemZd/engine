import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { useGame } from '../context/GameContext'

export default function OrderPanel() {
  const { pendingOrder, placeOrder, nextTurn } = useGame()
  const [value, setValue] = useState(String(pendingOrder))

  const submitOrder = (event) => {
    event.preventDefault()
    placeOrder(Number(value))
    nextTurn()
  }

  return (
    <section className="glow-card rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4">
      <h2 className="text-lg font-semibold text-slate-100">Order Console</h2>
      <p className="mt-1 text-sm text-slate-400">Set your upstream order, then run the next week.</p>
      <form onSubmit={submitOrder} className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-cyan-500 transition focus:ring-2"
          placeholder="Place order quantity"
        />
        <Motion.button
          type="submit"
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-900/40"
        >
          Place Order & Next Week
        </Motion.button>
      </form>
    </section>
  )
}
