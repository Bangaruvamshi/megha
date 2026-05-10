
WITH new_products AS (
  INSERT INTO public.products (name, category, description, available)
  VALUES
    ('Mango Pickle', 'Pickles', 'Traditional Andhra raw mango pickle with mustard & chilli — authentic homemade taste.', true),
    ('Lemon Pickle', 'Pickles', 'Refreshing tangy lemon pickle balanced with aromatic spices and pure oil.', true),
    ('Red Chilli Pickle', 'Pickles', 'Made from fresh red chillies blended with premium spices and pure oil.', true),
    ('Gooseberry (Amla) Pickle', 'Pickles', 'Nutritious gooseberry pickle with aromatic spices — tangy, healthy & delicious.', true),
    ('Tomato Pickle', 'Pickles', 'Traditional tomato pickle slow-cooked with ripe tomatoes and aromatic Indian spices.', true),
    ('Garlic Pickle', 'Pickles', 'Bold garlic pickle with premium spices — pungent, flavourful & perfect with any meal.', true),
    ('Gongura Pickle', 'Pickles', 'Tangy authentic Andhra gongura pickle bursting with traditional flavour.', true),
    ('Chilli Powder', 'Spices', 'Sun-dried red chilli powder, finely ground for rich colour, heat and aromatic spice.', true),
    ('Coriander (Dhaniya) Powder', 'Spices', 'Freshly ground coriander seeds with mild earthy fragrance for everyday cooking.', true),
    ('Turmeric Powder', 'Spices', 'Carefully selected turmeric, finely ground and pure for rich natural colour and potency.', true),
    ('Idly Powder', 'Spices', 'Traditional South Indian spice blend — perfect for idly, dosa & uttapam with melted ghee.', true),
    ('Garam Masala', 'Spices', 'Rich aromatic blend of whole spices, roasted and ground to perfection for curries & gravies.', true),
    ('Custom Blended Masalas', 'Spices', 'Custom spice blends crafted to your specific requirements — perfect for restaurants & hotels.', true),
    ('Teja Chillies (S17)', 'Raw Chillies', 'Premium Teja S17 variety — high pungency, deep red colour, ideal for chilli powder & export.', true),
    ('341 Variety Chillies', 'Raw Chillies', '341 variety dried red chillies with vibrant colour and strong aroma — perfect for pickles & curries.', true),
    ('Byadgi 5531 Chillies', 'Raw Chillies', 'Famous Byadgi 5531 — deep red colour, mild heat, perfect for gravies & colour-rich dishes.', true)
  RETURNING id, name
),
base_prices AS (
  SELECT * FROM (VALUES
    ('Mango Pickle', 140, 190),
    ('Lemon Pickle', 120, 165),
    ('Red Chilli Pickle', 130, 175),
    ('Gooseberry (Amla) Pickle', 140, 180),
    ('Tomato Pickle', 125, 170),
    ('Garlic Pickle', 130, 175),
    ('Gongura Pickle', 130, 175),
    ('Chilli Powder', 110, 140),
    ('Coriander (Dhaniya) Powder', 85, 110),
    ('Turmeric Powder', 95, 130),
    ('Idly Powder', 130, 175),
    ('Garam Masala', 190, 255),
    ('Custom Blended Masalas', 165, 220),
    ('Teja Chillies (S17)', 95, 130),
    ('341 Variety Chillies', 95, 130),
    ('Byadgi 5531 Chillies', 120, 160)
  ) AS t(name, base_price, base_compare)
)
INSERT INTO public.product_variants (product_id, weight, price, compare_price, stock, threshold)
SELECT
  np.id,
  w.weight,
  ROUND(bp.base_price * w.mult)::numeric,
  ROUND(bp.base_compare * w.mult)::numeric,
  100,
  10
FROM new_products np
JOIN base_prices bp ON bp.name = np.name
CROSS JOIN (VALUES
  ('100g', 0.5),
  ('250g', 1.0),
  ('500g', 1.8),
  ('1kg', 3.4)
) AS w(weight, mult);
