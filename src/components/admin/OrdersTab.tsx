import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, ShoppingCart, Clock, RefreshCw, CheckCircle, Truck } from "lucide-react";
import { toast } from "sonner";

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const filterStatuses = ["All", ...statusOptions.map(s => s.charAt(0).toUpperCase() + s.slice(1))];

const OrdersTab = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [period, setPeriod] = useState("All Time");
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
  });

  const getDateFilter = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    if (period === "Today") return d.toDateString() === now.toDateString();
    if (period === "This Week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return d >= weekAgo;
    }
    if (period === "This Month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    return true;
  };

  const filtered = orders.filter((o: any) => {
    const matchSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) || o.order_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter.toLowerCase();
    const matchDate = getDateFilter(o.created_at);
    return matchSearch && matchStatus && matchDate;
  });

  // Stats
  const totalOrders = orders.length;
  const pending = orders.filter((o: any) => o.status === "pending").length;
  const processing = orders.filter((o: any) => o.status === "processing").length;
  const delivered = orders.filter((o: any) => o.status === "delivered").length;
  const revenue = orders.filter((o: any) => o.status === "delivered").reduce((s: number, o: any) => s + Number(o.total), 0);

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      processing: "bg-orange-100 text-orange-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  };

  const paymentBadge = (status: string) => {
    return status === "paid"
      ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>
      : <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Unpaid</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-[hsl(38,60%,40%)]", bg: "bg-[hsl(38,60%,40%,0.08)]" },
          { label: "Pending", value: pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Processing", value: processing, icon: RefreshCw, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Delivered", value: delivered, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Revenue", value: `₹${revenue.toLocaleString()}`, icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${s.bg}`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Period + Search */}
      <div className="flex flex-wrap gap-2 items-center">
        {["All Time", "Today", "This Week", "This Month"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              period === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {filterStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Tracking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No orders found</TableCell></TableRow>
            ) : (
              filtered.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">#{order.order_id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="font-semibold">₹{Number(order.total).toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(val) => updateStatus.mutate({ id: order.id, status: val })}>
                      <SelectTrigger className={`h-8 w-32 text-xs ${statusColor(order.status)} border-0`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{paymentBadge(order.payment_status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{order.tracking_id || "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersTab;
