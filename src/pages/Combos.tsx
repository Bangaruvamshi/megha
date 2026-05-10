import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { combos } from "@/data/combos";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Tag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ComboCard = ({ combo, index }: { combo: typeof combos[0]; index: number }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: combo.id,
      name: combo.name,
      weight: combo.totalWeight,
      price: combo.discountedPrice,
      isCombo: true,
    });
    toast.success(`${combo.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 border border-border/50 group"
    >
      {/* Top visual */}
      <div className="relative bg-gradient-to-br from-primary/15 via-secondary/10 to-primary/5 p-6 pb-4">
        {combo.badge && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
            {combo.badge}
          </span>
        )}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>

        <div className="flex items-center justify-center pt-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="text-center mt-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {combo.totalWeight}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-heading text-lg font-semibold text-foreground text-center">{combo.name}</h3>
        <ul className="space-y-1.5">
          {combo.items.map((item) => (
            <li key={item.name} className="text-sm text-muted-foreground flex items-center gap-2">
              <Tag className="w-3 h-3 text-secondary shrink-0" />
              {item.name} <span className="text-xs opacity-60">({item.weight})</span>
            </li>
          ))}
        </ul>


        <Button
          onClick={handleAdd}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-xl h-10 text-sm font-medium"
        >
          <ShoppingCart className="w-4 h-4 mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

const Combos = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">Save More</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">Combo Packs</h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Get the best value with our curated combo packs — handpicked favourites at special prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo, i) => (
            <ComboCard key={combo.id} combo={combo} index={i} />
          ))}
        </div>
      </div>
    </section>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Combos;
