import { motion } from "framer-motion";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { getProductImage } from "@/lib/productImages";

const badgeColor: Record<string, string> = {
  "Best Seller": "bg-secondary text-white",
  "Fresh Stock": "bg-primary text-white",
  "Popular": "bg-accent text-accent-foreground",
};

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const { addToCart } = useCart();
  const featuredOnly = products.filter((p: any) => p.is_featured);
  const featured = (featuredOnly.length > 0 ? featuredOnly : products).slice(0, 8);

  return (
    <section id="products" className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">
            Our Collection
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Carefully selected premium products for you
          </p>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {featured.map((p, i) => {
              const variants = p.product_variants || [];
              const defaultVariant = variants.find(v => v.weight === "250g") || variants[0];
              if (!defaultVariant) return null;
              const image = getProductImage(p.name, p.image_url);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-card rounded-2xl overflow-hidden group shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 border border-border/50"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={512}
                      height={384}
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm bg-secondary text-white">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      ))}
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-1">
                      {p.description}
                    </p>

                    

                    <Button
                      size="sm"
                      onClick={() => addToCart({
                        id: `${p.id}-${defaultVariant.id}`,
                        name: p.name,
                        weight: defaultVariant.weight,
                        price: defaultVariant.price,
                        image,
                      })}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-10 text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" /> Add to Cart
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
