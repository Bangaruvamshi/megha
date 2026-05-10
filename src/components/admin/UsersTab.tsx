import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Shield, ShieldOff, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UsersTab = () => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles, error } = await supabase.from("profiles").select("*");
      if (error) throw error;

      const { data: roles } = await supabase.from("user_roles").select("*");

      return profiles.map((p: any) => ({
        ...p,
        roles: roles?.filter((r: any) => r.user_id === p.id).map((r: any) => r.role) || [],
      }));
    },
  });

  const toggleAdmin = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      if (isAdmin) {
        // Remove admin role
        const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
        if (error) throw error;
      } else {
        // Add admin role
        const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" as any });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User role updated");
    },
    onError: (err: any) => toast.error(err.message),
  });

  // Only show admin users in this tab; customers live in the Customers tab.
  const adminUsers = users.filter((u: any) => u.roles.includes("admin"));
  const filtered = adminUsers.filter((u: any) => {
    const name = u.full_name?.toLowerCase() || "";
    return name.includes(search.toLowerCase()) || u.id.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/8">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Admin Users</h3>
          <p className="text-xs text-muted-foreground">{adminUsers.length} admin{adminUsers.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No users found</TableCell></TableRow>
            ) : (
              filtered.map((u: any) => {
                const isAdmin = u.roles.includes("admin");
                const isSelf = u.id === currentUser?.id;
                return (
                  <TableRow key={u.id}>
                    <TableCell>
                      <p className="font-medium">{u.full_name || "—"}</p>
                    </TableCell>
                    <TableCell className="text-sm">{u.phone || "—"}</TableCell>
                    <TableCell>
                      {isAdmin ? (
                        <Badge className="bg-[hsl(0,40%,30%)] text-white hover:bg-[hsl(0,40%,30%)]">Admin</Badge>
                      ) : (
                        <Badge variant="secondary">Customer</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {!isSelf && (
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleAdmin.mutate({ userId: u.id, isAdmin })}
                            className="text-xs"
                          >
                            {isAdmin ? <ShieldOff className="h-3.5 w-3.5 mr-1" /> : <Shield className="h-3.5 w-3.5 mr-1" />}
                            {isAdmin ? "Remove Admin" : "Make Admin"}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTab;
