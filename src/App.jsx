import ChartPanel from './components/ChartPanel'
import Dashboard from './components/Dashboard'
import Flow from './components/Flow'
import OrderPanel from './components/OrderPanel'
import TopBar from './components/TopBar'
import { useGame } from './context/GameContext'

export default function App() {
  const {
    week,
    inventory,
    backlog,
    demand,
    cost,
    incomingShipments,
    shipmentPipeline,
    orderPipeline,
    alerts,
    history,
  } = useGame()

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-5 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <TopBar week={week} cost={cost} alerts={alerts} />
        <Flow
          demand={demand}
          week={week}
          shipmentPipeline={shipmentPipeline}
          orderPipeline={orderPipeline}
        />
        <Dashboard
          inventory={inventory}
          backlog={backlog}
          demand={demand}
          incomingShipments={incomingShipments}
        />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <OrderPanel />
          <ChartPanel history={history} />
        </div>
      </div>
    </main>
  )
}
