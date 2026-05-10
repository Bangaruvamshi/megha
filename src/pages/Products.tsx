import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


type Category = string;

const Products = () => {
  const { data: products = [], isLoading } = useProducts();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      const variants = p.product_variants || [];
      if (variants.length === 0) return false;
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const clearAll = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold text-primary uppercase tracking-[0.15em] mb-3 font-heading">Category</h3>
        <div className="space-y-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted/60"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>


      <button onClick={clearAll} className="w-full text-sm text-muted-foreground hover:text-destructive font-medium transition-colors text-center py-2">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">Our Collection</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1">Our Products</h1>
          </motion.div>

          <div className="flex gap-6">
            <aside className="hidden md:block w-[240px] lg:w-[260px] shrink-0">
              <div className="sticky top-[80px] bg-card rounded-2xl border border-border/50 shadow-card p-5 max-h-[calc(100vh-100px)] overflow-y-auto">
                <SidebarContent />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="flex gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <button
                  onClick={() => setMobileSidebar(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {selectedCategory !== "All" && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs text-muted-foreground">Active:</span>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}><X className="w-3 h-3" /></button>
                  </span>
                </div>
              )}

              <p className="text-sm text-muted-foreground mb-4">
                Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>

              {isLoading ? (
                <div className="text-center py-20 text-muted-foreground">Loading products...</div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No products found.</p>
                  <button onClick={clearAll} className="text-primary font-medium mt-3 hover:underline">
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={() => setMobileSidebar(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-card z-50 md:hidden overflow-y-auto shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-heading font-semibold text-foreground">Filters</h2>
                <button onClick={() => setMobileSidebar(false)} className="p-1.5 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5"><SidebarContent /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
