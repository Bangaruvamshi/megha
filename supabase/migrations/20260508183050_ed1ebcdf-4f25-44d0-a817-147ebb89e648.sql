DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND payment_status = 'unpaid'
  AND status = 'pending'
  AND total > 0
);

DROP POLICY IF EXISTS "Users can insert own order items" ON public.order_items;
CREATE POLICY "Users can insert own order items"
ON public.order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
      AND orders.payment_status = 'unpaid'
  )
  AND quantity > 0
  AND price >= 0
);