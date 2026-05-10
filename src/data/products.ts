import imgAvakaya from "@/assets/products/avakaya-pickle.jpg";
import imgGongura from "@/assets/products/gongura-pickle.jpg";
import imgLemon from "@/assets/products/lemon-pickle.jpg";
import imgTomato from "@/assets/products/tomato-pickle.jpg";
import imgRedChilliPickle from "@/assets/products/red-chilli-pickle.jpg";
import imgGingerPickle from "@/assets/products/ginger-pickle.jpg";
import imgChilliPowder from "@/assets/products/chilli-powder.jpg";
import imgTurmeric from "@/assets/products/turmeric-powder.jpg";
import imgCoriander from "@/assets/products/coriander-powder.jpg";
import imgGaramMasala from "@/assets/products/garam-masala.jpg";
import imgIdlyKaram from "@/assets/products/idly-karam.jpg";
import imgDryRedChilli from "@/assets/products/dry-red-chilli.jpg";
import imgKashmiriChilli from "@/assets/products/kashmiri-chilli.jpg";
import imgBiryaniMasala from "@/assets/products/biryani-masala.jpg";

export type Category = "All" | "Pickles" | "Spices" | "Raw Chillies";

export interface WeightOption {
  weight: string;
  price: number;
  originalPrice?: number;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  type: "veg" | "non-veg";
  weights: WeightOption[];
  description: string;
  image: string;
  highlights?: string[];
  varieties?: string[];
}

export const categories: Category[] = ["All", "Pickles", "Spices", "Raw Chillies"];

export const products: Product[] = [
  // Pickles
  { id: "p1", name: "Mango Pickle", category: "Pickles", type: "veg", description: "Traditional Andhra raw mango pickle with mustard & chilli — authentic homemade taste", image: imgAvakaya, highlights: ["No preservatives", "Sun-dried mangoes"], weights: [{ weight: "100g", price: 60, originalPrice: 80 }, { weight: "250g", price: 140, originalPrice: 190 }, { weight: "500g", price: 260, originalPrice: 350 }, { weight: "1kg", price: 490, originalPrice: 650 }] },
  { id: "p2", name: "Lemon Pickle", category: "Pickles", type: "veg", description: "Refreshing tangy lemon pickle balanced with aromatic spices and pure oil", image: imgLemon, highlights: ["Traditional recipe", "Tangy & spicy"], weights: [{ weight: "100g", price: 50, originalPrice: 70 }, { weight: "250g", price: 120, originalPrice: 165 }, { weight: "500g", price: 220, originalPrice: 300 }, { weight: "1kg", price: 400, originalPrice: 550 }] },
  { id: "p3", name: "Red Chilli Pickle", category: "Pickles", type: "veg", description: "Made from fresh red chillies blended with premium spices and pure oil for intense heat", image: imgRedChilliPickle, highlights: ["Intense heat", "Pure oil"], weights: [{ weight: "100g", price: 55, originalPrice: 75 }, { weight: "250g", price: 130, originalPrice: 175 }, { weight: "500g", price: 240, originalPrice: 320 }, { weight: "1kg", price: 450, originalPrice: 600 }] },
  { id: "p4", name: "Gooseberry (Amla) Pickle", category: "Pickles", type: "veg", description: "Nutritious gooseberry pickle with aromatic spices — tangy, healthy & delicious", image: imgGingerPickle, highlights: ["Rich in Vitamin C", "Healthy"], weights: [{ weight: "100g", price: 60, originalPrice: 80 }, { weight: "250g", price: 140, originalPrice: 190 }, { weight: "500g", price: 260, originalPrice: 350 }, { weight: "1kg", price: 490, originalPrice: 650 }] },
  { id: "p5", name: "Tomato Pickle", category: "Pickles", type: "veg", description: "Traditional tomato pickle slow-cooked with ripe tomatoes and aromatic Indian spices", image: imgTomato, highlights: ["Slow-cooked", "Rich & tangy"], weights: [{ weight: "100g", price: 55, originalPrice: 75 }, { weight: "250g", price: 125, originalPrice: 170 }, { weight: "500g", price: 230, originalPrice: 310 }, { weight: "1kg", price: 430, originalPrice: 580 }] },
  { id: "p6", name: "Garlic Pickle", category: "Pickles", type: "veg", description: "Bold garlic pickle with premium spices — pungent, flavourful & perfect with any meal", image: imgGongura, highlights: ["Bold flavour", "Handcrafted"], weights: [{ weight: "100g", price: 55, originalPrice: 75 }, { weight: "250g", price: 130, originalPrice: 175 }, { weight: "500g", price: 240, originalPrice: 320 }, { weight: "1kg", price: 450, originalPrice: 600 }] },
  { id: "p7", name: "Gongura Pickle", category: "Pickles", type: "veg", description: "Tangy sorrel leaf pickle — authentic Andhra flavour passed down through generations", image: imgGongura, highlights: ["100% natural", "Authentic Andhra"], weights: [{ weight: "100g", price: 55, originalPrice: 75 }, { weight: "250g", price: 130, originalPrice: 175 }, { weight: "500g", price: 240, originalPrice: 320 }, { weight: "1kg", price: 450, originalPrice: 600 }] },

  // Spices
  { id: "s1", name: "Chilli Powder", category: "Spices", type: "veg", description: "Sun-dried Guntur chillies, finely ground for rich colour, bold aroma & perfect spiciness", image: imgChilliPowder, highlights: ["No artificial colours", "100% natural"], weights: [{ weight: "100g", price: 45, originalPrice: 60 }, { weight: "250g", price: 110, originalPrice: 150 }, { weight: "500g", price: 200, originalPrice: 270 }, { weight: "1kg", price: 380, originalPrice: 510 }] },
  { id: "s2", name: "Coriander (Dhaniya) Powder", category: "Spices", type: "veg", description: "Finely ground coriander seeds with mild earthy taste and rich fragrance for everyday cooking", image: imgCoriander, highlights: ["Earthy aroma", "Freshly ground"], weights: [{ weight: "100g", price: 35, originalPrice: 50 }, { weight: "250g", price: 85, originalPrice: 115 }, { weight: "500g", price: 160, originalPrice: 215 }, { weight: "1kg", price: 300, originalPrice: 400 }] },
  { id: "s3", name: "Turmeric Powder", category: "Spices", type: "veg", description: "Carefully selected turmeric fingers, dried and ground to retain natural colour and potency", image: imgTurmeric, highlights: ["High curcumin", "No preservatives"], varieties: ["Salem", "Rajapuri", "Dheshamuri"], weights: [{ weight: "100g", price: 40, originalPrice: 55 }, { weight: "250g", price: 95, originalPrice: 130 }, { weight: "500g", price: 175, originalPrice: 235 }, { weight: "1kg", price: 330, originalPrice: 440 }] },
  { id: "s4", name: "Idly Powder", category: "Spices", type: "veg", description: "Traditional South Indian spice blend for idly, dosa & uttapam with roasted lentils", image: imgIdlyKaram, highlights: ["Roasted spices", "Bold taste"], weights: [{ weight: "100g", price: 55, originalPrice: 75 }, { weight: "250g", price: 130, originalPrice: 175 }, { weight: "500g", price: 240, originalPrice: 320 }, { weight: "1kg", price: 440, originalPrice: 590 }] },
  { id: "s5", name: "Garam Masala", category: "Spices", type: "veg", description: "Rich aromatic blend of whole spices, roasted and ground to perfection for curries & gravies", image: imgGaramMasala, highlights: ["Whole spices", "Roasted & ground"], weights: [{ weight: "100g", price: 80, originalPrice: 110 }, { weight: "250g", price: 190, originalPrice: 255 }, { weight: "500g", price: 350, originalPrice: 470 }, { weight: "1kg", price: 650, originalPrice: 870 }] },
  { id: "s6", name: "Custom Blended Masalas", category: "Spices", type: "veg", description: "Custom spice blends crafted to your specific requirements — perfect for restaurants & hotels", image: imgBiryaniMasala, highlights: ["Custom blends", "Bulk available"], weights: [{ weight: "100g", price: 70, originalPrice: 95 }, { weight: "250g", price: 165, originalPrice: 220 }, { weight: "500g", price: 310, originalPrice: 410 }, { weight: "1kg", price: 580, originalPrice: 770 }] },

  // Raw Chillies (Bulk)
  { id: "r1", name: "Teja Chillies (S17)", category: "Raw Chillies", type: "veg", description: "Premium Teja S17 variety — high pungency, deep red colour, ideal for chilli powder & export", image: imgDryRedChilli, highlights: ["High pungency", "Export quality"], varieties: ["Deluxe", "Best", "Medium Best", "Medium"], weights: [{ weight: "100g", price: 40, originalPrice: 55 }, { weight: "250g", price: 95, originalPrice: 130 }, { weight: "500g", price: 175, originalPrice: 235 }, { weight: "1kg", price: 330, originalPrice: 440 }] },
  { id: "r2", name: "341 Variety Chillies", category: "Raw Chillies", type: "veg", description: "341 variety dry red chillies with vibrant colour and strong aroma — perfect for pickles & curries", image: imgDryRedChilli, highlights: ["Vibrant colour", "Strong aroma"], weights: [{ weight: "100g", price: 40, originalPrice: 55 }, { weight: "250g", price: 95, originalPrice: 130 }, { weight: "500g", price: 175, originalPrice: 235 }, { weight: "1kg", price: 330, originalPrice: 440 }] },
  { id: "r3", name: "Byadgi 5531 Chillies", category: "Raw Chillies", type: "veg", description: "Syngenta Byadgi 5531 — deep red colour, mild heat, perfect for gravies & colour-rich dishes", image: imgKashmiriChilli, highlights: ["Deep red colour", "Mild heat"], weights: [{ weight: "100g", price: 50, originalPrice: 70 }, { weight: "250g", price: 120, originalPrice: 160 }, { weight: "500g", price: 220, originalPrice: 295 }, { weight: "1kg", price: 400, originalPrice: 535 }] },
];
