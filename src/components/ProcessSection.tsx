import { motion } from "framer-motion";
import imgSourcing from "@/assets/process-sourcing.jpg";
import imgSunDrying from "@/assets/process-sundrying.jpg";
import imgGrinding from "@/assets/process-grinding.jpg";
import imgQuality from "@/assets/process-quality.jpg";
import imgPackaging from "@/assets/process-packaging.jpg";
import imgDelivery from "@/assets/process-delivery.jpg";

const steps = [
  { num: 1, image: imgSourcing, title: "Sourcing", desc: "Hand-picked from trusted farms across India" },
  { num: 2, image: imgSunDrying, title: "Sun Drying", desc: "Traditional sun-drying for natural flavour" },
  { num: 3, image: imgGrinding, title: "Stone Grinding", desc: "Cold stone-ground to preserve aroma" },
  { num: 4, image: imgQuality, title: "Quality Check", desc: "Rigorous testing for purity & potency" },
  { num: 5, image: imgPackaging, title: "Packaging", desc: "Sealed fresh in food-grade packaging" },
  { num: 6, image: imgDelivery, title: "Delivery", desc: "Fast, safe delivery to your doorstep" },
];

const ProcessSection = () => (
  <section className="bg-[#1A0A00] py-10 md:py-14 overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
      >
        <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">
          Farm to Table
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-3">
          How We Make It
        </h2>
        <p className="text-white/40 mt-3">
          From farm to your kitchen — our traditional process
        </p>
      </motion.div>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative">
        {/* Connector line */}
        <div className="absolute top-[120px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C] to-[#C9A84C]/20" />

        <div className="grid grid-cols-6 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden w-full aspect-square mb-6 ring-2 ring-[#C9A84C]/20">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/60 to-transparent" />
              </div>

              {/* Numbered circle on line */}
              <div className="w-10 h-10 rounded-full bg-[#C9A84C] text-[#1A0A00] font-heading font-bold text-sm flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(201,168,76,0.4)] relative z-10">
                {s.num}
              </div>

              <h3 className="font-heading font-bold text-white text-sm mb-1">
                {s.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-10">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C9A84C]/20 via-[#C9A84C] to-[#C9A84C]/20" />

        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-4 items-start"
            >
              {/* Numbered circle */}
              <div className="absolute -left-10 w-8 h-8 rounded-full bg-[#C9A84C] text-[#1A0A00] font-heading font-bold text-xs flex items-center justify-center shadow-[0_0_16px_rgba(201,168,76,0.4)] z-10">
                {s.num}
              </div>

              <div className="flex gap-3 flex-1">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 ring-1 ring-[#C9A84C]/20">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-sm">{s.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
