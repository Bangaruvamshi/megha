import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Pencil, Trash2, ToggleLeft, BarChart3 } from "lucide-react";

const actionIcons: Record<string, any> = {
  product_added: Plus,
  product_updated: Pencil,
  product_deleted: Trash2,
  stock_changed: BarChart3,
  availability_toggled: ToggleLeft,
};

const actionColors: Record<string, string> = {
  product_added: "bg-green-100 text-green-700",
  product_updated: "bg-blue-100 text-blue-700",
  product_deleted: "bg-red-100 text-red-700",
  stock_changed: "bg-yellow-100 text-yellow-700",
  availability_toggled: "bg-purple-100 text-purple-700",
};

const InventoryLogsTab = () => {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["admin-inventory-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/8">
          <Package className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Inventory History</h3>
          <p className="text-xs text-muted-foreground">Recent admin actions</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-6 space-y-4">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-8">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No logs yet</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log: any) => {
              const Icon = actionIcons[log.action_type] || Package;
              const color = actionColors[log.action_type] || "bg-gray-100 text-gray-700";
              return (
                <div key={log.id} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{log.product_name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {log.action_type.replace(/_/g, " ")}
                      </Badge>
                    </div>
                    {log.details && <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {log.admin_email} · {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryLogsTab;
