import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Search, Upload, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import ProductFormDialog from "./ProductFormDialog";
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

const categories = ["All", "Pickles", "Spices", "Raw Chillies", "Masalas", "Powders", "Oils & Ghee", "Others"];

const InventoryTab = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_variants(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const toggleAvailability = useMutation({
    mutationFn: async ({ id, available }: { id: string; available: boolean }) => {
      const { error } = await supabase.from("products").update({ available }).eq("id", id);
      if (error) throw error;
      const product = products.find((p: any) => p.id === id);
      await supabase.from("inventory_logs").insert({
        action_type: "availability_toggled",
        product_name: product?.name ?? "",
        details: `Set to ${available ? "available" : "unavailable"}`,
        admin_email: user?.email ?? "",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Availability updated");
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, is_featured }: { id: string; is_featured: boolean }) => {
      const { error } = await supabase.from("products").update({ is_featured } as any).eq("id", id);
      if (error) throw error;
      const product = products.find((p: any) => p.id === id);
      await supabase.from("inventory_logs").insert({
        action_type: "featured_toggled",
        product_name: product?.name ?? "",
        details: is_featured ? "Marked as Premium Seller (visible on home)" : "Removed from Premium Seller",
        admin_email: user?.email ?? "",
      });
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["public-products"] });
      toast.success(vars.is_featured ? "Added to home page" : "Removed from home page");
    },
    onError: (err: any) => toast.error(err.message || "Failed to update"),
  });

  const toggleBulkSale = useMutation({
    mutationFn: async ({ id, bulk_sale }: { id: string; bulk_sale: boolean }) => {
      const { error } = await supabase.from("products").update({ bulk_sale } as any).eq("id", id);
      if (error) throw error;
      const product = products.find((p: any) => p.id === id);
      await supabase.from("inventory_logs").insert({
        action_type: "bulk_sale_toggled",
        product_name: product?.name ?? "",
        details: bulk_sale ? "Bulk sale ON (1kg/5kg/20kg/custom, no prices)" : "Bulk sale OFF (variants with prices)",
        admin_email: user?.email ?? "",
      });
    },
    onSuccess: (_d, vars) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["public-products"] });
      toast.success(vars.bulk_sale ? "Bulk sale enabled" : "Showing per-variant prices");
    },
    onError: (err: any) => toast.error(err.message || "Failed to update"),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const product = products.find((p: any) => p.id === id);
      
      // Delete product image from storage if exists
      if (product?.image_url) {
        const imagePath = product.image_url.split("/").pop();
        if (imagePath) {
          await supabase.storage.from("product-images").remove([imagePath]);
        }
      }

      // Delete variants first (in case cascade isn't set)
      await supabase.from("product_variants").delete().eq("product_id", id);
      
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      await supabase.from("inventory_logs").insert({
        action_type: "product_deleted",
        product_name: product?.name ?? "",
        details: "Product deleted",
        admin_email: user?.email ?? "",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
      setDeleteId(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete product");
    },
  });

  const getStockStatus = (product: any) => {
    const variants = product.product_variants;
    if (!variants?.length) return "no_variants";
    const totalStock = variants.reduce((sum: number, v: any) => sum + (v.stock || 0), 0);
    const hasLow = variants.some((v: any) => v.stock > 0 && v.stock <= v.threshold);
    // Treat manually-disabled products as out of stock
    if (product.available === false || totalStock === 0) return "out_of_stock";
    if (hasLow) return "low_stock";
    return "in_stock";
  };

  const filtered = products
    .filter((p: any) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false) ||
        p.product_variants?.some(
          (v: any) =>
            v.weight?.toLowerCase().includes(q) ||
            v.id.toLowerCase().includes(q) ||
            String(v.price).includes(q),
        );
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      const status = getStockStatus(p);
      const matchStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" && status === "in_stock") ||
        (stockFilter === "Low Stock" && status === "low_stock") ||
        (stockFilter === "Out of Stock" && status === "out_of_stock");
      const matchAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available" && p.available) ||
        (availabilityFilter === "Unavailable" && !p.available);
      const min = minPrice ? Number(minPrice) : null;
      const max = maxPrice ? Number(maxPrice) : null;
      const prices = (p.product_variants || []).map((v: any) => Number(v.price));
      const matchPrice =
        (min === null || prices.some((pr: number) => pr >= min)) &&
        (max === null || prices.some((pr: number) => pr <= max));
      return matchSearch && matchCategory && matchStock && matchAvailability && matchPrice;
    })
    .sort((a: any, b: any) => {
      const aStock = a.product_variants?.reduce((s: number, v: any) => s + (v.stock || 0), 0) ?? 0;
      const bStock = b.product_variants?.reduce((s: number, v: any) => s + (v.stock || 0), 0) ?? 0;
      const aPrice = Math.min(...((a.product_variants || []).map((v: any) => Number(v.price)).concat([Infinity])));
      const bPrice = Math.min(...((b.product_variants || []).map((v: any) => Number(v.price)).concat([Infinity])));
      switch (sortBy) {
        case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "name_asc": return a.name.localeCompare(b.name);
        case "name_desc": return b.name.localeCompare(a.name);
        case "stock_asc": return aStock - bStock;
        case "stock_desc": return bStock - aStock;
        case "price_asc": return aPrice - bPrice;
        case "price_desc": return bPrice - aPrice;
        default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const activeFilterCount =
    (categoryFilter !== "All" ? 1 : 0) +
    (stockFilter !== "All" ? 1 : 0) +
    (availabilityFilter !== "All" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (search ? 1 : 0);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStockFilter("All");
    setAvailabilityFilter("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">In Stock</Badge>;
      case "low_stock":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Low Stock</Badge>;
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">No Variants</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, description, weight, price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => { setEditProduct(null); setShowForm(true); }}
          className="bg-[hsl(0,40%,30%)] hover:bg-[hsl(0,40%,25%)] text-white"
        >
          <Plus className="h-4 w-4 mr-1.5" /> Add Product
        </Button>
      </div>

      {/* Advanced filters row */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Availability:</span>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
          >
            <option>All</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Price ₹:</span>
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-8 w-20 text-xs"
          />
          <span className="text-xs text-muted-foreground">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-8 w-20 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name_asc">Name A→Z</option>
            <option value="name_desc">Name Z→A</option>
            <option value="price_asc">Price low→high</option>
            <option value="price_desc">Price high→low</option>
            <option value="stock_asc">Stock low→high</option>
            <option value="stock_desc">Stock high→low</option>
          </select>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          {activeFilterCount > 0 && (
            <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={resetFilters}>
              Clear filters ({activeFilterCount})
            </Button>
          )}
        </div>
      </div>

      {/* Category & stock pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? "bg-[hsl(0,40%,30%)] text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="border-l border-border mx-1" />
        {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => (
          <button
            key={s}
            onClick={() => setStockFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              stockFilter === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="whitespace-nowrap">Premium Seller</TableHead>
              <TableHead className="whitespace-nowrap">Bulk Sale</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">Loading...</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">No products found</TableCell>
              </TableRow>
            ) : (
              filtered.map((product: any) => {
                const status = getStockStatus(product);
                const totalStock = product.product_variants?.reduce((s: number, v: any) => s + (v.stock || 0), 0) ?? 0;
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">No img</div>
                        )}
                        <span className="font-medium text-sm">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        {product.product_variants?.slice(0, 3).map((v: any) => (
                          <div key={v.id} className="text-xs text-muted-foreground">
                            {v.weight} — ₹{v.price}
                          </div>
                        ))}
                        {(product.product_variants?.length || 0) > 3 && (
                          <span className="text-xs text-muted-foreground">+{product.product_variants.length - 3} more</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{totalStock}</TableCell>
                    <TableCell>{statusBadge(status)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={product.available}
                        onCheckedChange={(checked) => toggleAvailability.mutate({ id: product.id, available: checked })}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={product.is_featured ? "default" : "outline"}
                        onClick={() => toggleFeatured.mutate({ id: product.id, is_featured: !product.is_featured })}
                        className={`h-8 gap-1.5 ${product.is_featured ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500" : ""}`}
                      >
                        <Star className={`h-3.5 w-3.5 ${product.is_featured ? "fill-white" : ""}`} />
                        {product.is_featured ? "Premium" : "Mark Premium"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={!!product.bulk_sale}
                          onCheckedChange={(checked) => toggleBulkSale.mutate({ id: product.id, bulk_sale: checked })}
                        />
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                          {product.bulk_sale ? "Bulk (no price)" : "Per-variant"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(product.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => { setEditProduct(product); setShowForm(true); }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Form Dialog */}
      <ProductFormDialog
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditProduct(null); }}
        product={editProduct}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. All variants will also be deleted.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteProduct.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryTab;
