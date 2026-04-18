import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip, Filler)

export default function ChartPanel({ history }) {
  const data = {
    labels: history.weeks,
    datasets: [
      {
        label: 'Inventory',
        data: history.inventory,
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.12)',
        tension: 0.35,
        fill: true,
      },
      {
        label: 'Demand',
        data: history.demand,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.06)',
        tension: 0.35,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 550, easing: 'easeInOutQuad' },
    plugins: {
      legend: { labels: { color: '#cbd5e1' } },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
      },
    },
  }

  return (
    <section className="glow-card h-80 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4">
      <h2 className="mb-3 text-lg font-semibold text-slate-100">Simulation Trends</h2>
      <Line data={data} options={options} />
    </section>
  )
}
