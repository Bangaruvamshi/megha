import { motion } from "framer-motion";
import { Sprout, Network, ShieldCheck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import imgWarehouse from "@/assets/hero-chillies-3.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const features = [
  {
    icon: Sprout,
    title: "Trusted Raw Material Sourcing",
    desc: "Direct sourcing from farmers and trusted agricultural markets.",
  },
  {
    icon: Network,
    title: "Strong Supply Network",
    desc: "Reliable distribution and wholesale connections across regions.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First Approach",
    desc: "Strict selection and handling process for every product batch.",
  },
  {
    icon: Award,
    title: "Tradition & Experience",
    desc: "Years of expertise in spices, pickles, and raw chillies industry.",
  },
];

const ParentCompanySection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FBF3E4]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] font-heading font-semibold text-xs uppercase tracking-[0.25em]">
              Our Foundation
            </span>
            <span className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#1A0A00] leading-tight">
            Powered by <span className="text-[#8B1A1A]">Ayyappa Trading Co.</span>
          </h2>
          <p className="text-[#1A0A00]/60 mt-4 italic font-serif text-base md:text-lg">
            The foundation behind Sri Megha Enterprises
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">
          <motion.div {...fadeUp} className="space-y-5">
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1A0A00] leading-snug">
              Ayyappa Trading Co. — The Backbone of Sri Megha Enterprises
            </h3>
            <div className="space-y-4 text-[#1A0A00]/70 leading-relaxed text-[15px]">
              <p>
                Sri Megha Enterprises proudly operates under Ayyappa Trading Co., the parent company
                that has been deeply rooted in the spice and raw chilli trade for years. With strong
                experience in sourcing premium agricultural products from trusted farmers and markets,
                Ayyappa Trading Co. forms the foundation that powers the quality and authenticity of
                every Sri Megha product.
              </p>
              <p>
                From carefully selected raw chillies and spices to traditional processing and
                distribution, every stage begins with the expertise and network built by Ayyappa
                Trading Co. Their commitment to purity, consistency, and trusted sourcing helps Sri
                Megha Enterprises deliver authentic flavours to homes, restaurants, and businesses
                across India.
              </p>
              <p>
                The relationship between Ayyappa Trading Co. and Sri Megha Enterprises represents a
                blend of strong trading heritage and modern branding — where tradition, trust, and
                quality come together.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] relative">
              <img
                src={imgWarehouse}
                alt="Ayyappa Trading Co. - traditional spice and chilli trading"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-[#C9A84C] mb-1">
                  Since Generations
                </p>
                <p className="font-display text-xl font-semibold">
                  Trusted Sourcing • Authentic Trade
                </p>
              </div>
            </div>
            <div className="absolute -top-5 -right-5 bg-[#C9A84C] text-[#1A0A00] rounded-2xl px-5 py-3 shadow-xl hidden md:block">
              <p className="font-display text-sm font-bold">Parent Company</p>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#C9A84C]/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center mb-4 group-hover:bg-[#8B1A1A] transition-colors">
                <f.icon className="w-6 h-6 text-[#8B1A1A] group-hover:text-[#C9A84C] transition-colors" />
              </div>
              <h4 className="font-heading text-base font-bold text-[#1A0A00] mb-2 leading-snug">
                {f.title}
              </h4>
              <p className="text-[#1A0A00]/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12">
          <div className="relative bg-[#1A0A00] rounded-3xl px-8 py-10 md:px-12 md:py-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
            <span className="font-display text-6xl text-[#C9A84C]/40 leading-none block mb-2">
              “
            </span>
            <p className="font-display text-xl md:text-2xl text-white italic leading-relaxed">
              Every authentic flavour begins with trusted sourcing.
            </p>
            <p className="text-[#C9A84C] font-heading text-xs uppercase tracking-[0.25em] mt-4">
              — Ayyappa Trading Co.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#8B1A1A] text-white font-heading font-semibold px-8 py-3 rounded-xl hover:bg-[#6F1414] transition-colors text-sm shadow-lg"
          >
            Explore Products
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border-2 border-[#8B1A1A] text-[#8B1A1A] font-heading font-semibold px-8 py-3 rounded-xl hover:bg-[#8B1A1A] hover:text-white transition-colors text-sm"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ParentCompanySection;
