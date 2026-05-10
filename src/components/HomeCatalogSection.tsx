import { motion } from "framer-motion";
import { Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProducts, DbProduct } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/productImages";

const HomeCatalogSection = () => {
  const { data: products = [], isLoading } = useProducts();
  const catalogProducts = products.slice(0, 6);

  return (
    <section id="catalog" className="pt-6 md:pt-10 pb-8 md:pb-10 bg-[#FDF6EC]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-6 md:mb-8"
        >
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">
            Our Catalog
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1A0A00] mt-3">
            Our Finest Collection
          </h2>
          <p className="text-[#1A0A00]/60 mt-3 text-base md:text-lg">
            Naturally processed, no artificial colours or preservatives — trusted taste for everyday cooking
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12 text-[#1A0A00]/50">Loading products...</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6 space-y-5 md:space-y-6">
            {catalogProducts.map((product, i) => (
              <CatalogCard key={product.id} product={product} i={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
        >
          <Link to="/products">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-10 font-heading font-semibold text-sm border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A]/5"
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const BULK_WEIGHTS = ["1kg", "5kg", "20kg"];

function CatalogCard({ product, i }: { product: DbProduct; i: number }) {
  const variants = product.product_variants || [];
  const [selectedWeight, setSelectedWeight] = useState<string>("1kg");
  const [customKg, setCustomKg] = useState<string>("");
  const [showCustom, setShowCustom] = useState(false);
  const { addToCart } = useCart();

  const image = getProductImage(product.name, product.image_url);
  const finalWeight = showCustom && customKg ? `${customKg}kg` : selectedWeight;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${finalWeight}`,
      name: product.name,
      weight: finalWeight,
      price: variants[0]?.price ?? 0,
      image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.03 }}
      className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-6px_rgba(26,10,0,0.1)] hover:shadow-[0_16px_48px_-12px_rgba(139,26,26,0.2)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={product.name}
          className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          width={640}
          height={480}
        />
        <span className="absolute top-3 left-3 bg-[#1A0A00]/70 backdrop-blur-sm text-white text-[10px] font-heading font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {product.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-2.5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className={`w-3.5 h-3.5 ${j < 4 ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-[#C9A84C]/20 text-[#C9A84C]/20"}`} />
          ))}
        </div>

        <h3 className="font-display text-base sm:text-lg font-bold text-[#1A0A00] leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-[#1A0A00]/50 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {BULK_WEIGHTS.map((w) => (
            <button
              key={w}
              onClick={() => { setSelectedWeight(w); setShowCustom(false); }}
              className={`text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full border transition-all ${
                !showCustom && w === selectedWeight
                  ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                  : "bg-transparent text-[#1A0A00]/60 border-[#1A0A00]/15 hover:border-[#8B1A1A]/40"
              }`}
            >
              {w}
            </button>
          ))}
          <button
            onClick={() => setShowCustom(true)}
            className={`text-[11px] font-heading font-semibold px-3 py-1.5 rounded-full border transition-all ${
              showCustom
                ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                : "bg-transparent text-[#1A0A00]/60 border-[#1A0A00]/15 hover:border-[#8B1A1A]/40"
            }`}
          >
            Enter Kg value
          </button>
        </div>

        {showCustom && (
          <div className="flex items-center gap-1.5 mt-1">
            <input
              type="number"
              min="1"
              value={customKg}
              onChange={(e) => setCustomKg(e.target.value)}
              placeholder="e.g. 50"
              className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-[#1A0A00]/15 bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/30"
            />
            <span className="text-xs font-medium text-[#1A0A00]/60">kg</span>
          </div>
        )}

        <div className="flex items-end justify-end mt-auto pt-3 border-t border-[#1A0A00]/5">
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-xs px-4 h-9 font-heading font-semibold gap-1.5 shadow-md"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeCatalogSection;
