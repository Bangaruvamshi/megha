export interface ComboItem {
  name: string;
  weight: string;
}

export interface Combo {
  id: string;
  name: string;
  items: ComboItem[];
  totalWeight: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  badge: string | null;
}

export const combos: Combo[] = [
  {
    id: "c1",
    name: "Special Combo",
    items: [
      { name: "Turmeric Powder", weight: "250g" },
      { name: "Red Chilli Powder", weight: "250g" },
      { name: "Cumin Powder", weight: "250g" },
      { name: "Coriander Powder", weight: "250g" },
    ],
    totalWeight: "1kg",
    originalPrice: 1330,
    discountedPrice: 1096,
    discountPercent: 18,
    badge: "Best Seller",
  },
  {
    id: "c2",
    name: "Exotic Combo",
    items: [
      { name: "Turmeric Powder", weight: "333g" },
      { name: "Kashmiri Chilli Powder", weight: "333g" },
      { name: "Coriander Powder", weight: "334g" },
    ],
    totalWeight: "1kg",
    originalPrice: 2040,
    discountedPrice: 1700,
    discountPercent: 17,
    badge: "Popular",
  },
  {
    id: "c3",
    name: "Exotic Combo",
    items: [
      { name: "Turmeric Powder", weight: "166g" },
      { name: "Chilli Powder", weight: "167g" },
      { name: "Coriander Powder", weight: "167g" },
    ],
    totalWeight: "500g",
    originalPrice: 1048,
    discountedPrice: 887,
    discountPercent: 15,
    badge: null,
  },
  {
    id: "c4",
    name: "Premium Combo",
    items: [
      { name: "Turmeric Powder", weight: "250g" },
      { name: "Chilli Powder", weight: "250g" },
      { name: "Coriander Powder", weight: "250g" },
      { name: "Garam Masala", weight: "250g" },
    ],
    totalWeight: "1kg",
    originalPrice: 1615,
    discountedPrice: 1339,
    discountPercent: 17,
    badge: "Best Value",
  },
  {
    id: "c5",
    name: "Pickle Lovers Pack",
    items: [
      { name: "Avakaya Pickle", weight: "500g" },
      { name: "Gongura Pickle", weight: "250g" },
      { name: "Lemon Pickle", weight: "250g" },
    ],
    totalWeight: "1kg",
    originalPrice: 620,
    discountedPrice: 499,
    discountPercent: 20,
    badge: "Hot Deal",
  },
  {
    id: "c6",
    name: "Kitchen Essentials",
    items: [
      { name: "Chilli Powder", weight: "500g" },
      { name: "Turmeric Powder", weight: "250g" },
      { name: "Sambar Powder", weight: "200g" },
      { name: "Garam Masala", weight: "100g" },
    ],
    totalWeight: "1050g",
    originalPrice: 795,
    discountedPrice: 649,
    discountPercent: 18,
    badge: null,
  },
];
