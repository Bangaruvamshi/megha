import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import imgChilliPowder from "@/assets/products/chilli-powder.jpg";
import imgAvakaya from "@/assets/products/avakaya-pickle.jpg";
import imgDryRedChilli from "@/assets/products/raw-chillies-category.jpg";

const categories = [
  { name: "Pickles", image: imgAvakaya, description: "Authentic homemade pickles", filter: "Pickles" },
  { name: "Spices & Powders", image: imgChilliPowder, description: "Premium spice powders & masalas", filter: "Spices" },
  { name: "Raw Chillies", image: imgDryRedChilli, description: "Bulk raw chillies — all varieties", filter: "Raw Chillies" },
];

const CategorySection = () => (
  <section className="pt-6 md:pt-8 pb-2 md:pb-4">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 md:mb-8"
      >
        <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">Categories</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
          Shop by Category
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Explore our range of premium spices, pickles & raw chillies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.filter}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/products`}
              className="block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 group"
            >
              <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={512} height={512} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="p-4 sm:p-5 text-center">
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-semibold text-foreground">{cat.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategorySection;
