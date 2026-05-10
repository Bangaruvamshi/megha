import { ShieldCheck, Package, Sprout, Truck } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: ShieldCheck, label: "100% Fresh Quality" },
  { icon: Package, label: "Hygienic Packaging" },
  { icon: Sprout, label: "Farm Direct Sourcing" },
  { icon: Truck, label: "Fast Delivery" },
];

const TrustStrip = () => (
  <section className="bg-primary/5 border-y border-primary/10">
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-2.5"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <span className="text-sm font-medium text-foreground/80 font-body">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
