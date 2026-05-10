import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { useState } from "react";

const CustomersTab = () => {
  const [search, setSearch] = useState("");

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      // Get all orders grouped by email
      const { data: orders, error } = await supabase
        .from("orders")
        .select("customer_name, customer_email, customer_phone, total, created_at");
      if (error) throw error;

      const map = new Map<string, any>();
      orders?.forEach((o) => {
        const existing = map.get(o.customer_email);
        if (existing) {
          existing.orders_count += 1;
          existing.total_spent += Number(o.total);
          if (new Date(o.created_at) < new Date(existing.joined_date)) {
            existing.joined_date = o.created_at;
          }
        } else {
          map.set(o.customer_email, {
            name: o.customer_name,
            email: o.customer_email,
            phone: o.customer_phone || "—",
            orders_count: 1,
            total_spent: Number(o.total),
            joined_date: o.created_at,
          });
        }
      });
      return Array.from(map.values());
    },
  });

  const filtered = customers.filter(
    (c: any) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[hsl(38,60%,40%,0.08)]">
          <Users className="h-5 w-5 text-[hsl(38,60%,40%)]" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Customers</h3>
          <p className="text-xs text-muted-foreground">{customers.length} total customers</p>
        </div>
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No customers found</TableCell></TableRow>
            ) : (
              filtered.map((c: any) => (
                <TableRow key={c.email}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="text-sm">{c.phone}</TableCell>
                  <TableCell className="font-medium">{c.orders_count}</TableCell>
                  <TableCell className="font-semibold">₹{c.total_spent.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(c.joined_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersTab;
