// Fallback images for products when no image_url is set in the database
import imgAvakaya from "@/assets/products/mango-pickle-new.png";
import imgLemon from "@/assets/products/lemon-pickle-new.png";
import imgRedChilli from "@/assets/products/red-chilli-pickle-new.png";
import imgGinger from "@/assets/products/ginger-pickle.jpg";
import imgAmla from "@/assets/products/amla-pickle-new.png";
import imgTomato from "@/assets/products/tomato-pickle-new.png";
import imgGongura from "@/assets/products/gongura-pickle-new.png";
import imgGarlic from "@/assets/products/garlic-pickle-new.png";
import imgChilliPowder from "@/assets/products/chilli-powder.jpg";
import imgCoriander from "@/assets/products/coriander-powder.jpg";
import imgTurmeric from "@/assets/products/turmeric-powder.jpg";
import imgIdlyKaram from "@/assets/products/idly-karam-new.png";
import imgGaramMasala from "@/assets/products/garam-masala.jpg";
import imgBiryaniMasala from "@/assets/products/biryani-masala.jpg";
import imgDryRedChilli from "@/assets/products/chilli-341-new.png";
import imgKashmiriChilli from "@/assets/products/chilli-byadgi-new.png";
import imgChickenPickle from "@/assets/products/chicken-pickle.jpg";
import imgFishPickle from "@/assets/products/fish-pickle.jpg";
import imgPrawnPickle from "@/assets/products/prawn-pickle.jpg";
import imgChickenMasala from "@/assets/products/chicken-masala.jpg";
import imgSambarPowder from "@/assets/products/sambar-powder.jpg";
import imgRasamPowder from "@/assets/products/rasam-powder.jpg";
import imgKarapodi from "@/assets/products/karapodi.jpg";
import imgKandiPodi from "@/assets/products/kandi-podi.jpg";
import imgPalliPodi from "@/assets/products/palli-podi.jpg";
import imgNuvvulaPodi from "@/assets/products/nuvvula-podi.jpg";
import imgGheeKaram from "@/assets/products/ghee-karam.jpg";
import imgSambarKaram from "@/assets/products/sambar-karam.jpg";
import imgCuminPowder from "@/assets/products/cumin-powder.jpg";
import imgGingerPowder from "@/assets/products/ginger-powder.jpg";
import imgCurryLeaves from "@/assets/products/curry-leaves-powder.jpg";
import imgMoringa from "@/assets/products/moringa-powder.jpg";
import imgChana from "@/assets/products/chana-powder.jpg";
import imgJaggery from "@/assets/products/jaggery-powder.jpg";
import imgA2Ghee from "@/assets/products/a2-ghee.jpg";
import imgGroundnutOil from "@/assets/products/groundnut-oil.jpg";

const fallbackImages: Record<string, string> = {
  "Mango Pickle": imgAvakaya,
  "Lemon Pickle": imgLemon,
  "Red Chilli Pickle": imgRedChilli,
  "Gooseberry (Amla) Pickle": imgAmla,
  "Tomato Pickle": imgTomato,
  "Garlic Pickle": imgGarlic,
  "Gongura Pickle": imgGongura,
  "Ginger Pickle": imgGinger,
  "Chicken Pickle": imgChickenPickle,
  "Fish Pickle": imgFishPickle,
  "Prawn Pickle": imgPrawnPickle,
  "Chilli Powder": imgChilliPowder,
  "Coriander (Dhaniya) Powder": imgCoriander,
  "Turmeric Powder": imgTurmeric,
  "Idly Powder": imgIdlyKaram,
  "Garam Masala": imgGaramMasala,
  "Custom Blended Masalas": imgBiryaniMasala,
  "Chicken Masala": imgChickenMasala,
  "Sambar Powder": imgSambarPowder,
  "Rasam Powder": imgRasamPowder,
  "Biryani Masala": imgBiryaniMasala,
  "Karapodi": imgKarapodi,
  "Kandi Podi": imgKandiPodi,
  "Palli Podi": imgPalliPodi,
  "Nuvvula Podi": imgNuvvulaPodi,
  "Ghee Karam": imgGheeKaram,
  "Sambar Karam": imgSambarKaram,
  "Cumin Powder": imgCuminPowder,
  "Ginger Powder": imgGingerPowder,
  "Curry Leaves Powder": imgCurryLeaves,
  "Moringa Powder": imgMoringa,
  "Chana Powder": imgChana,
  "Jaggery Powder": imgJaggery,
  "Teja Chillies (S17)": imgDryRedChilli,
  "341 Variety Chillies": imgDryRedChilli,
  "Byadgi 5531 Chillies": imgKashmiriChilli,
  "A2 Ghee": imgA2Ghee,
  "Groundnut Oil": imgGroundnutOil,
};

export const getProductImage = (name: string, imageUrl: string | null): string => {
  if (imageUrl) return imageUrl;
  return fallbackImages[name] || imgChilliPowder;
};
