-- Restore safe invoker semantics on the public view
ALTER VIEW public.product_variants_public SET (security_invoker = on);

-- Allow public SELECT on the underlying table, but only on non-sensitive columns.
-- stock and threshold remain admin-only via the existing admin policies + column grants.
REVOKE SELECT ON public.product_variants FROM anon, authenticated;
GRANT SELECT (id, product_id, weight, price, compare_price, created_at, updated_at)
  ON public.product_variants TO anon, authenticated;

-- Add a permissive SELECT policy so RLS allows reading rows (column-level grants
-- restrict which columns can actually be returned).
DROP POLICY IF EXISTS "Public can read variant pricing" ON public.product_variants;
CREATE POLICY "Public can read variant pricing"
  ON public.product_variants
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Ensure the view itself is selectable
GRANT SELECT ON public.product_variants_public TO anon, authenticated;