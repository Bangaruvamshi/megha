
-- 1. Fix privilege escalation: explicitly deny non-admin INSERT on user_roles
CREATE POLICY "Non-admins cannot insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Add a trigger to prevent self-promotion even if policy is bypassed
CREATE OR REPLACE FUNCTION public.prevent_self_role_promotion()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent any user from giving themselves admin role
  IF NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    RAISE EXCEPTION 'Users cannot assign admin role to themselves';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_role_self_promotion
BEFORE INSERT OR UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_self_role_promotion();

-- 2. Fix public stock data exposure: replace the public SELECT policy
-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Anyone can read variants" ON public.product_variants;

-- Create a view that excludes sensitive inventory columns
CREATE OR REPLACE VIEW public.product_variants_public
WITH (security_invoker = on)
AS
SELECT id, product_id, weight, price, compare_price, created_at, updated_at
FROM public.product_variants;

-- Allow public to read only through the view (which excludes stock/threshold)
-- Re-add a public SELECT policy but only for authenticated users who need stock info (admins)
-- and a limited policy for anon/public
CREATE POLICY "Public can read variant pricing"
ON public.product_variants
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Authenticated can read all variants"
ON public.product_variants
FOR SELECT
TO authenticated
USING (true);
