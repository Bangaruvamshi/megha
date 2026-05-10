import { motion } from "framer-motion";
import offerChillyPowder from "@/assets/offer-chilly-powder.jpg";
import offerWholesale from "@/assets/offer-wholesale.jpg";
import offerRawChillies from "@/assets/offer-raw-chillies.jpg";
import offerTurmeric from "@/assets/offer-turmeric.jpg";

const offers = [
  {
    image: offerChillyPowder,
    title: "Pickle-Grade Chilly Powder",
    description: "Our specialty — coarse-ground chilly powder, perfectly suited for traditional Andhra pickles.",
    accent: "from-[hsl(0,75%,55%)] to-[hsl(15,85%,50%)]",
  },
  {
    image: offerWholesale,
    title: "Wholesale & Bulk Supply",
    description: "Trusted dealer of chilly powder, turmeric and masala powders to hotels, restaurants & retailers.",
    accent: "from-[hsl(28,90%,55%)] to-[hsl(38,95%,55%)]",
  },
  {
    image: offerRawChillies,
    title: "Premium Raw Chillies",
    description: "Teja S17, 341, Sannam 334, Armour, Syngenta Byadgi 5531 — Deluxe to Medium grades.",
    accent: "from-[hsl(0,65%,40%)] to-[hsl(10,75%,45%)]",
  },
  {
    image: offerTurmeric,
    title: "Turmeric Fingers",
    description: "Hand-picked Salem, Rajapuri & Dheshamuri varieties — vivid colour, rich aroma, true purity.",
    accent: "from-[hsl(45,95%,50%)] to-[hsl(35,90%,50%)]",
  },
];

const HighlightsStrip = () => (
  <section className="bg-gradient-to-b from-secondary to-secondary/90 py-10 md:py-12 relative overflow-hidden">
    {/* Decorative background blobs */}
    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary-foreground/10 blur-3xl pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <span className="inline-block text-[11px] sm:text-xs font-heading font-bold tracking-[0.25em] uppercase text-secondary-foreground/70 mb-3">
          Our Specialties
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground leading-tight">
          What We Offer
        </h2>
        <div className="w-16 h-1 bg-secondary-foreground/40 mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {offers.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group relative bg-card rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_hsl(0_0%_0%/0.15)] hover:shadow-[0_20px_40px_-8px_hsl(0_0%_0%/0.25)] transition-shadow duration-500"
          >
            {/* Image header */}
            <div className={`relative h-44 md:h-48 bg-gradient-to-br ${item.accent} overflow-hidden`}>
              <img
                src={item.image}
                alt={item.title}
                width={800}
                height={500}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} mix-blend-multiply opacity-25`} />
            </div>

            {/* Body */}
            <div className="p-5 md:p-6">
              <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom accent bar */}
            <div className={`h-1 bg-gradient-to-r ${item.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HighlightsStrip;
