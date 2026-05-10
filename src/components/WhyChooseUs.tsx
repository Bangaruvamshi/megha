import { motion } from "framer-motion";
import imgSourcing from "@/assets/why-sourcing.jpg";
import imgQuality from "@/assets/why-quality.jpg";
import imgTraditional from "@/assets/why-traditional.jpg";
import imgPackaging from "@/assets/why-packaging.jpg";
import imgExport from "@/assets/why-export.jpg";

const steps = [
  { num: "01", image: imgSourcing, title: "Sourcing from Local Farms" },
  { num: "02", image: imgQuality, title: "Quality Inspection" },
  { num: "03", image: imgTraditional, title: "Traditional Preparation" },
  { num: "04", image: imgPackaging, title: "Hygienic Packaging" },
  { num: "05", image: imgExport, title: "Global Export Logistics" },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-12 md:py-20 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-14"
      >
        <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">
          Our Process
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 italic">
          Process
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width={768}
                height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Number badge */}
              <span className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-sm text-secondary font-heading font-bold text-xs px-2.5 py-1 rounded-lg border border-secondary/30">
                {s.num}
              </span>
            </div>
            {/* Title below image */}
            <div className="mt-3">
              <div className="w-8 h-0.5 bg-secondary mb-2" />
              <h3 className="font-heading text-sm md:text-base font-semibold text-primary-foreground">
                {s.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
