import { motion } from "framer-motion";
import { Warehouse, ShoppingBag, Award, type LucideIcon } from "lucide-react";

type Card = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
};

const cards: Card[] = [
  {
    icon: Warehouse,
    title: "Bulk Supply",
    description:
      "We supply to hotels, restaurants & colleges with homemade quality products",
    iconColor: "text-[#991B1B]",
    iconBg: "bg-[#991B1B]/10",
  },
  {
    icon: ShoppingBag,
    title: "Wholesale Dealer",
    description:
      "Wholesale dealer for chilly powder, turmeric & masala powders",
    iconColor: "text-[#C2410C]",
    iconBg: "bg-[#C2410C]/10",
  },
  {
    icon: Award,
    title: "Best Quality",
    description:
      "Homemade style, natural ingredients, no artificial preservatives",
    iconColor: "text-[#92400E]",
    iconBg: "bg-[#92400E]/10",
  },
];

const FeatureCards = () => (
  <section className="py-8 md:py-10 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group bg-card rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-xl border border-border/60 hover:border-primary/30 transition-all duration-300 text-center"
          >
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-2xl ${card.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5`}
            >
              <card.icon
                className={`w-8 h-8 ${card.iconColor}`}
                strokeWidth={1.6}
              />
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3 tracking-tight">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
