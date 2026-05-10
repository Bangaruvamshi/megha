
-- 1. Fix: Replace permissive INSERT policy with RESTRICTIVE
DROP POLICY IF EXISTS "Non-admins cannot insert roles" ON public.user_roles;

-- The "Admins can manage roles" ALL policy already covers INSERT for admins.
-- We don't need another INSERT policy. The ALL policy is the only one that allows INSERT.
-- Since no other permissive INSERT policy exists, non-admins are blocked.

-- 2. Fix: Remove anon direct access to product_variants (stock/threshold exposed)
DROP POLICY IF EXISTS "Public can read variant pricing" ON public.product_variants;

-- Grant anon access to the view instead (which excludes stock/threshold)
GRANT SELECT ON public.product_variants_public TO anon;
GRANT SELECT ON public.product_variants_public TO authenticated;
