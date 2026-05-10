ALTER VIEW public.product_variants_public SET (security_invoker = off);
GRANT SELECT ON public.product_variants_public TO anon, authenticated;