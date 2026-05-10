import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroSpices from "@/assets/hero-spices-1.jpg";
import heroSpices640 from "@/assets/hero-spices-1-640w.jpg";
import heroSpices1024 from "@/assets/hero-spices-1-1024w.jpg";
import heroPickles from "@/assets/hero-pickles-2.jpg";
import heroPickles640 from "@/assets/hero-pickles-2-640w.jpg";
import heroPickles1024 from "@/assets/hero-pickles-2-1024w.jpg";
import heroChillies from "@/assets/hero-chillies-3.jpg";
import heroChillies640 from "@/assets/hero-chillies-3-640w.jpg";
import heroChillies1024 from "@/assets/hero-chillies-3-1024w.jpg";

const slides = [
  {
    image: heroSpices,
    srcSet: `${heroSpices640} 640w, ${heroSpices1024} 1024w, ${heroSpices} 1920w`,
    subtitle: "Sri Megha Enterprises — Guntur's Finest Spice Brand",
    title: "Premium Guntur",
    highlight: "Chilli Powders.",
    description: "100% natural, no preservatives, no artificial colours — authentic taste from sun-dried Guntur chillies, stone-ground to perfection.",
  },
  {
    image: heroPickles,
    srcSet: `${heroPickles640} 640w, ${heroPickles1024} 1024w, ${heroPickles} 1920w`,
    subtitle: "Authentic Andhra Taste — Made with Love",
    title: "Handcrafted",
    highlight: "Pickles & Masalas.",
    description: "Farm-fresh ingredients, age-old recipes, pure oil — traditional pickles that bring homemade flavour to every meal.",
  },
  {
    image: heroChillies,
    srcSet: `${heroChillies640} 640w, ${heroChillies1024} 1024w, ${heroChillies} 1920w`,
    subtitle: "Wholesale & Bulk Supply — Hotels, Restaurants & More",
    title: "Raw Chillies &",
    highlight: "Turmeric Fingers.",
    description: "Teja S17, 341, Byadgi 5531 — all grades available. Salem, Rajapuri & Dheshamuri turmeric. Bulk orders welcome.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Preload images so swaps never show a black frame
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center overflow-hidden bg-neutral-900">
      {/* Stacked images — all mounted, only active is visible. Pure CSS opacity crossfade = no black flash */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            srcSet={s.srcSet}
            sizes="100vw"
            alt={s.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
      ))}

      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-5 sm:space-y-6 text-center flex flex-col items-center"
        >
          <span className="inline-block bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-primary/30">
            {slide.subtitle}
          </span>

          <h1 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-bold text-white leading-[1.1]">
            {slide.title}
            <span className="text-secondary block">{slide.highlight}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-lg leading-relaxed mx-auto">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center">
            <Link to="/products">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:opacity-90 text-sm sm:text-base px-8 sm:px-10 rounded-xl shadow-lg"
              >
                Shop Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <a href="https://wa.me/917702869101?text=Hi, I'd like to get a quote for your products" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-sm sm:text-base px-8 sm:px-10 rounded-xl"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Get Quote
              </Button>
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "w-10 bg-secondary" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
