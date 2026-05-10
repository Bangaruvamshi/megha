import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingCart, ClipboardList, Users, FileText, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminOverview from "@/components/admin/AdminOverview";
import InventoryTab from "@/components/admin/InventoryTab";
import OrdersTab from "@/components/admin/OrdersTab";
import CustomersTab from "@/components/admin/CustomersTab";
import UsersTab from "@/components/admin/UsersTab";
import InventoryLogsTab from "@/components/admin/InventoryLogsTab";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const tabs = [
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "logs", label: "Inventory Logs", icon: ClipboardList },
  { id: "customers", label: "Customers", icon: Users },
  { id: "users", label: "Users", icon: FileText },
];

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inventory");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
    if (!loading && user && !isAdmin) {
      navigate("/");
    }
  }, [loading, user, isAdmin, navigate]);

  // Overview stats
  const { data: products = [] } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*, product_variants(*)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.status === "pending").length;
  const lowStockAlerts = products.filter((p: any) =>
    p.product_variants?.some((v: any) => v.stock > 0 && v.stock <= v.threshold)
  ).length;
  const revenue = orders.filter((o: any) => o.status === "delivered").reduce((s: number, o: any) => s + Number(o.total), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Inventory & Order Management</h1>
            <p className="text-muted-foreground text-sm">Manage products, stock, orders & images</p>
          </div>
          <Button variant="outline" onClick={() => { signOut(); navigate("/"); }} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Overview Cards */}
        <AdminOverview
          totalProducts={totalProducts}
          totalOrders={totalOrders}
          pendingOrders={pendingOrders}
          lowStockAlerts={lowStockAlerts}
          revenue={revenue}
        />

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pb-8">
          {activeTab === "inventory" && <InventoryTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "logs" && <InventoryLogsTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "users" && <UsersTab />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
