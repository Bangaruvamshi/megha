
-- Replace broad authenticated policy with admin-only for full variant data
DROP POLICY IF EXISTS "Authenticated can read all variants" ON public.product_variants;

-- Only admins can read full variant data (including stock/threshold)
CREATE POLICY "Admins can read all variants"
ON public.product_variants
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
