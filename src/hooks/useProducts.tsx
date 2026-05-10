import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbProduct {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
  available: boolean;
  is_featured?: boolean;
  bulk_sale?: boolean;
  created_at: string;
  updated_at: string;
  product_variants: DbVariant[];
}

export interface DbVariant {
  id: string;
  product_id: string;
  weight: string;
  price: number;
  compare_price: number | null;
  stock: number;
  threshold: number;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      // Fetch products
      const { data: products, error: pError } = await supabase
        .from("products")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: true });
      if (pError) throw pError;

      // Fetch variants from public view (excludes stock/threshold)
      const { data: variants, error: vError } = await supabase
        .from("product_variants_public" as any)
        .select("*");
      if (vError) throw vError;

      // Combine products with their variants
      return (products || []).map((p: any) => ({
        ...p,
        product_variants: (variants || [])
          .filter((v: any) => v.product_id === p.id)
          .map((v: any) => ({ ...v, stock: 0, threshold: 0 })),
      })) as DbProduct[];
    },
    staleTime: 1000 * 60 * 2, // 2 min cache
  });
};
