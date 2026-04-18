import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const GameContext = createContext(null)

const randomDemand = () => Math.floor(Math.random() * 9) + 4
const clampOrder = (value) => Math.max(0, Number.isFinite(value) ? Math.floor(value) : 0)

const initialDemand = randomDemand()

export function GameProvider({ children }) {
  const [week, setWeek] = useState(1)
  const [inventory, setInventory] = useState(42)
  const [backlog, setBacklog] = useState(0)
  const [demand, setDemand] = useState(initialDemand)
  const [cost, setCost] = useState(0)
  const [incomingShipments, setIncomingShipments] = useState(6)
  const [pendingOrder, setPendingOrder] = useState(12)
  const [shipmentPipeline, setShipmentPipeline] = useState([8, 6])
  const [orderPipeline, setOrderPipeline] = useState([10, 9])
  const [alerts, setAlerts] = useState([])
  const [history, setHistory] = useState({
    weeks: [1],
    inventory: [42],
    demand: [initialDemand],
  })

  const updateAlerts = useCallback((nextBacklog, nextInventory) => {
    const messages = []
    if (nextBacklog >= 15) messages.push('Backlog critical')
    if (nextInventory <= 5) messages.push('Low inventory')
    setAlerts(messages)
  }, [])

  const placeOrder = useCallback((amount) => {
    setPendingOrder(clampOrder(Number(amount)))
  }, [])

  const nextTurn = useCallback(() => {
    const nextDemand = randomDemand()
    const orderQty = clampOrder(pendingOrder)
    const arriving = shipmentPipeline[1]
    const available = inventory + arriving
    const totalRequired = demand + backlog
    const fulfilled = Math.min(available, totalRequired)
    const nextBacklog = Math.max(0, totalRequired - fulfilled)
    const nextInventory = Math.max(0, available - fulfilled)
    const produced = orderPipeline[1] + Math.floor(Math.random() * 4)
    const nextShipmentPipeline = [produced, shipmentPipeline[0]]
    const nextOrderPipeline = [orderQty, orderPipeline[0]]
    const nextCost = cost + nextBacklog * 2.2 + nextInventory * 0.55
    const nextWeek = week + 1

    setIncomingShipments(arriving)
    setInventory(nextInventory)
    setBacklog(nextBacklog)
    setDemand(nextDemand)
    setShipmentPipeline(nextShipmentPipeline)
    setOrderPipeline(nextOrderPipeline)
    setCost(Number(nextCost.toFixed(2)))
    setWeek(nextWeek)
    updateAlerts(nextBacklog, nextInventory)
    setHistory((prev) => ({
      weeks: [...prev.weeks, nextWeek],
      inventory: [...prev.inventory, nextInventory],
      demand: [...prev.demand, nextDemand],
    }))
  }, [backlog, cost, demand, inventory, orderPipeline, pendingOrder, shipmentPipeline, updateAlerts, week])

  const value = useMemo(
    () => ({
      week,
      inventory,
      backlog,
      demand,
      cost,
      incomingShipments,
      pendingOrder,
      shipmentPipeline,
      orderPipeline,
      alerts,
      history,
      placeOrder,
      nextTurn,
    }),
    [
      alerts,
      backlog,
      cost,
      demand,
      history,
      incomingShipments,
      inventory,
      nextTurn,
      orderPipeline,
      pendingOrder,
      placeOrder,
      shipmentPipeline,
      week,
    ],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
