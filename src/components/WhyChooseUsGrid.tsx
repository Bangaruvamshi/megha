import { motion } from "framer-motion";
import { Leaf, Palette, ShieldCheck, ChefHat, Truck, Award } from "lucide-react";

const items = [
  { icon: Leaf, title: "100% Natural", description: "Pure ingredients with zero chemicals or artificial additives" },
  { icon: Palette, title: "No Artificial Colors", description: "Natural colour from sun-dried spices, no synthetic dyes" },
  { icon: ShieldCheck, title: "Hygienic Preparation", description: "Processed in clean, controlled environments" },
  { icon: ChefHat, title: "Authentic Taste", description: "Traditional recipes passed down through generations" },
  { icon: Award, title: "Premium Quality", description: "Carefully selected ingredients from trusted farms" },
  { icon: Truck, title: "Pan-India Delivery", description: "Fast and reliable delivery across India" },
];

const WhyChooseUsGrid = () => (
  <section id="why-choose" className="relative">
    {/* Gold divider top */}
    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

    <div className="bg-[#6B1A1A] py-10 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-14"
        >
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">
            Quality You Can Trust
          </h2>
          <p className="text-white/50 mt-3 text-base md:text-lg">
            Every product is made with care, tradition, and a commitment to purity
          </p>
        </motion.div>

        {/* Desktop: 4-column grid. Mobile: horizontal scroll */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((item, i) => (
            <TrustCard key={item.title} item={item} i={i} />
          ))}
        </div>

        {/* Mobile: horizontal scroll marquee-like */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {items.map((item, i) => (
              <div key={item.title} className="w-[200px] shrink-0">
                <TrustCard item={item} i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Gold divider bottom */}
    <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
  </section>
);

function TrustCard({ item, i }: { item: typeof items[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="text-center group"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
        <item.icon className="w-7 h-7 text-[#C9A84C]" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-sm font-bold text-white mb-1.5">
        {item.title}
      </h3>
      <p className="text-xs text-white/50 leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  );
}

export default WhyChooseUsGrid;
