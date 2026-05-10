import { Package, ShoppingCart, Clock, AlertTriangle } from "lucide-react";

interface OverviewProps {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  lowStockAlerts: number;
  revenue: number;
}

const AdminOverview = ({ totalProducts, totalOrders, pendingOrders, lowStockAlerts, revenue }: OverviewProps) => {
  const cards = [
    { label: "Total Products", value: totalProducts, icon: Package, color: "text-[hsl(0,60%,25%)]", bg: "bg-[hsl(0,60%,25%,0.08)]" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-[hsl(38,60%,40%)]", bg: "bg-[hsl(38,60%,40%,0.08)]" },
    { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-[hsl(38,80%,50%)]", bg: "bg-[hsl(38,80%,50%,0.08)]" },
    { label: "Low Stock Alerts", value: lowStockAlerts, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/8" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-card rounded-2xl border border-border p-5 space-y-3">
          <div className={`inline-flex p-2.5 rounded-xl ${card.bg}`}>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{card.label === "Low Stock Alerts" ? card.value : card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOverview;
