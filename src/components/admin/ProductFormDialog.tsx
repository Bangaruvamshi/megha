import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const categories = ["Pickles", "Spices", "Masalas", "Powders", "Oils & Ghee", "Others"];

interface Variant {
  id?: string;
  weight: string;
  price: string;
  compare_price: string;
  stock: string;
  threshold: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

const ProductFormDialog = ({ isOpen, onClose, product }: Props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Pickles");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [variants, setVariants] = useState<Variant[]>([{ weight: "", price: "", compare_price: "", stock: "100", threshold: "10" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description || "");
      setImagePreview(product.image_url || null);
      setVariants(
        product.product_variants?.map((v: any) => ({
          id: v.id,
          weight: v.weight,
          price: String(v.price),
          compare_price: v.compare_price ? String(v.compare_price) : "",
          stock: String(v.stock),
          threshold: String(v.threshold),
        })) || [{ weight: "", price: "", compare_price: "", stock: "100", threshold: "10" }]
      );
    } else {
      setName("");
      setCategory("Pickles");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setVariants([{ weight: "", price: "", compare_price: "", stock: "100", threshold: "10" }]);
    }
  }, [product, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const addVariant = () => {
    setVariants([...variants, { weight: "", price: "", compare_price: "", stock: "100", threshold: "10" }]);
  };

  const removeVariant = (idx: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== idx));
    }
  };

  const updateVariant = (idx: number, field: keyof Variant, value: string) => {
    const updated = [...variants];
    updated[idx] = { ...updated[idx], [field]: value };
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category) {
      toast.error("Name and category are required");
      return;
    }
    if (variants.some((v) => !v.weight || !v.price)) {
      toast.error("All variants need weight and price");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = product?.image_url || null;

      // If image was removed
      if (!imagePreview && product?.image_url) {
        // Delete old image from storage
        const oldPath = product.image_url.split("/").pop();
        if (oldPath) {
          await supabase.storage.from("product-images").remove([oldPath]);
        }
        imageUrl = null;
      }

      // Upload image if new file selected
      if (imageFile) {
        // Delete old image first if replacing
        if (product?.image_url) {
          const oldPath = product.image_url.split("/").pop();
          if (oldPath) {
            await supabase.storage.from("product-images").remove([oldPath]);
          }
        }
        const ext = imageFile.name.split(".").pop();
        const path = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("product-images").upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from("product-images").getPublicUrl(path);
        imageUrl = publicUrl.publicUrl;
      }

      if (product) {
        // Update existing product
        const { error } = await supabase.from("products").update({ name, category, description, image_url: imageUrl }).eq("id", product.id);
        if (error) throw error;

        // Delete old variants and insert new
        await supabase.from("product_variants").delete().eq("product_id", product.id);
        const variantRows = variants.map((v) => ({
          product_id: product.id,
          weight: v.weight,
          price: parseFloat(v.price),
          compare_price: v.compare_price ? parseFloat(v.compare_price) : null,
          stock: parseInt(v.stock) || 0,
          threshold: parseInt(v.threshold) || 10,
        }));
        const { error: vErr } = await supabase.from("product_variants").insert(variantRows);
        if (vErr) throw vErr;

        await supabase.from("inventory_logs").insert({
          action_type: "product_updated",
          product_name: name,
          details: `Updated product with ${variants.length} variant(s)`,
          admin_email: user?.email ?? "",
        });
        toast.success("Product updated!");
      } else {
        // Create new product
        const { data: newProduct, error } = await supabase.from("products").insert({ name, category, description, image_url: imageUrl }).select().single();
        if (error) throw error;

        const variantRows = variants.map((v) => ({
          product_id: newProduct.id,
          weight: v.weight,
          price: parseFloat(v.price),
          compare_price: v.compare_price ? parseFloat(v.compare_price) : null,
          stock: parseInt(v.stock) || 0,
          threshold: parseInt(v.threshold) || 10,
        }));
        const { error: vErr } = await supabase.from("product_variants").insert(variantRows);
        if (vErr) throw vErr;

        await supabase.from("inventory_logs").insert({
          action_type: "product_added",
          product_name: name,
          details: `Added with ${variants.length} variant(s)`,
          admin_email: user?.email ?? "",
        });
        toast.success("Product added!");
      }

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          {/* Image upload */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-xl object-cover border" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs hover:bg-destructive/90"
                  >
                    ✕
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{imagePreview ? "Change image" : "Upload image"}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Variants (Weight & Price)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Variant
              </Button>
            </div>
            {variants.map((v, i) => (
              <div key={i} className="grid grid-cols-6 gap-2 items-end">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Weight</span>
                  <Input value={v.weight} onChange={(e) => updateVariant(i, "weight", e.target.value)} placeholder="250g" required />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Price (₹)</span>
                  <Input type="number" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} placeholder="120" required />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">MRP (₹)</span>
                  <Input type="number" value={v.compare_price} onChange={(e) => updateVariant(i, "compare_price", e.target.value)} placeholder="150" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Stock</span>
                  <Input type="number" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Threshold</span>
                  <Input type="number" value={v.threshold} onChange={(e) => updateVariant(i, "threshold", e.target.value)} />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(i)} disabled={variants.length === 1} className="h-9 w-9 text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[hsl(0,40%,30%)] hover:bg-[hsl(0,40%,25%)] text-white">
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
