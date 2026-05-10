import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/productImages";
import type { DbProduct } from "@/hooks/useProducts";

interface ProductCardProps {
  product: DbProduct;
  index: number;
}

const BULK_WEIGHTS = ["1kg", "5kg", "20kg"];

const ProductCard = ({ product, index }: ProductCardProps) => {
  const variants = product.product_variants || [];
  const isBulk = product.bulk_sale !== false; // default ON if undefined
  const [selectedWeight, setSelectedWeight] = useState<string>(isBulk ? "1kg" : variants[0]?.weight || "");
  const [customKg, setCustomKg] = useState<string>("");
  const [showCustom, setShowCustom] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();

  const image = getProductImage(product.name, product.image_url);
  const finalWeight = isBulk && showCustom && customKg ? `${customKg}kg` : selectedWeight;
  const selectedVariant = !isBulk ? variants.find((v) => v.weight === selectedWeight) || variants[0] : null;

  const handleBulkOrder = () => {
    addToCart({
      id: `${product.id}-${finalWeight}`,
      name: product.name,
      weight: finalWeight,
      price: 0,
      image,
    });
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addToCart({
      id: `${product.id}-${selectedVariant.id}`,
      name: product.name,
      weight: selectedVariant.weight,
      price: selectedVariant.price,
      image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 border border-border/50 group flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={640}
          height={512}
        />
        <div className="absolute top-3 right-3 flex flex-col items-center gap-1.5">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="w-9 h-9 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
          <span className="w-7 h-7 rounded-md flex items-center justify-center shadow-md border-2 bg-white border-green-600" title="Vegetarian">
            <span className="w-3 h-3 rounded-full bg-green-600" />
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-1.5">
        <span className="text-[10px] sm:text-xs font-semibold text-secondary uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="font-heading text-sm sm:text-base font-bold text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {isBulk ? (
          <>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {BULK_WEIGHTS.map((w) => (
                <button
                  key={w}
                  onClick={() => { setSelectedWeight(w); setShowCustom(false); }}
                  className={`text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                    !showCustom && w === selectedWeight
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {w}
                </button>
              ))}
              <button
                onClick={() => setShowCustom(true)}
                className={`text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                  showCustom
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                Enter Kg value
              </button>
            </div>

            {showCustom && (
              <div className="flex items-center gap-1.5 mt-2">
                <input
                  type="number"
                  min="1"
                  value={customKg}
                  onChange={(e) => setCustomKg(e.target.value)}
                  placeholder="e.g. 50"
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <span className="text-xs font-medium text-muted-foreground">kg</span>
              </div>
            )}

            <div className="flex items-end justify-end mt-auto pt-3">
              <a
                href={`https://wa.me/917702869101?text=${encodeURIComponent(`Hi, I'd like a bulk order of ${product.name} — ${finalWeight}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBulkOrder}
                className="inline-flex items-center gap-1.5 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full text-xs px-4 h-9 font-medium transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                Order
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedWeight(v.weight)}
                  className={`text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                    v.weight === selectedWeight
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {v.weight}
                </button>
              ))}
            </div>

            <div className="flex items-end justify-between mt-auto pt-3 gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Price</span>
                <span className="font-heading text-base font-bold text-foreground">
                  ₹{Number(selectedVariant?.price ?? 0).toFixed(0)}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground rounded-full text-xs px-4 h-9 font-medium transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
