import Card from './Card'

export default function Dashboard({ inventory, backlog, demand, incomingShipments }) {
  return (
    <section className="dashboard-grid">
      <Card title="Inventory" value={inventory} tone="cyan" warning={inventory <= 5} />
      <Card title="Backlog" value={backlog} tone="rose" warning={backlog >= 15} />
      <Card title="Demand" value={demand} tone="amber" />
      <Card title="Incoming Shipments" value={incomingShipments} tone="emerald" />
    </section>
  )
}
