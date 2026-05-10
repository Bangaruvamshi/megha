import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Award, Leaf, Users, Truck, ShieldCheck, Star, Clock, Heart, Package } from "lucide-react";
import imgHeroSpices from "@/assets/hero-spices-1.jpg";
import imgProcess from "@/assets/process-sourcing.jpg";
import imgGrinding from "@/assets/process-grinding.jpg";
import imgQuality from "@/assets/process-quality.jpg";
import imgChilli from "@/assets/products/chilli-powder.jpg";
import imgTurmeric from "@/assets/products/turmeric-powder.jpg";
import imgAvakaya from "@/assets/products/avakaya-pickle.jpg";
import imgBiryani from "@/assets/products/biryani-masala.jpg";
import imgGhee from "@/assets/products/a2-ghee.jpg";
import imgLemon from "@/assets/products/lemon-pickle.jpg";
import imgChicken from "@/assets/products/chicken-pickle.jpg";
import imgGongura from "@/assets/products/gongura-pickle.jpg";
import ParentCompanySection from "@/components/ParentCompanySection";

const storyImages = [
  { src: imgChilli, alt: "Premium Guntur Chilli Powder" },
  { src: imgAvakaya, alt: "Traditional Avakaya Pickle" },
  { src: imgTurmeric, alt: "Pure Turmeric Powder" },
  { src: imgBiryani, alt: "Aromatic Biryani Masala" },
  { src: imgGhee, alt: "Pure A2 Ghee" },
  { src: imgLemon, alt: "Homemade Lemon Pickle" },
  { src: imgChicken, alt: "Spicy Chicken Pickle" },
  { src: imgGongura, alt: "Tangy Gongura Pickle" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stats = [
  { value: "14+", label: "Years of Trust", icon: Clock },
  { value: "500+", label: "Happy Customers", icon: Heart },
  { value: "38+", label: "Premium Products", icon: Package },
  { value: "100%", label: "Natural & Pure", icon: Leaf },
];

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "No artificial colours, preservatives, or additives. Every product is made with pure, hand-picked ingredients.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    desc: "FSSAI certified. Every batch undergoes rigorous quality checks to ensure consistency and purity.",
  },
  {
    icon: Users,
    title: "Wholesale & Retail",
    desc: "Serving hotels, restaurants, colleges, and individual homes with the same premium quality since 2010.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    desc: "From Guntur to your doorstep — reliable shipping across India with careful packaging.",
  },
  {
    icon: Award,
    title: "Guntur Heritage",
    desc: "Rooted in the spice capital of India. Our chillies and spices carry the authentic Guntur legacy.",
  },
  {
    icon: Star,
    title: "Handcrafted Process",
    desc: "Traditional sun-drying, stone-grinding, and hand-blending methods passed down through generations.",
  },
];

const timeline = [
  { year: "2010", title: "The Beginning", desc: "Sri Megha Enterprises was founded in Guntur with a mission to bring pure, authentic spices from farm to kitchen." },
  { year: "2013", title: "Wholesale Expansion", desc: "Started bulk supply to hotels, restaurants, and colleges across Andhra Pradesh and Telangana." },
  { year: "2016", title: "Product Range Growth", desc: "Expanded from raw chillies to a full range of spice powders, masalas, pickles, and traditional podis." },
  { year: "2020", title: "Online Presence", desc: "Launched online ordering to serve customers across India, bringing Guntur flavours nationwide." },
  { year: "2024", title: "38+ Products & Growing", desc: "Today we offer 38+ handcrafted products with FSSAI certification, trusted by hundreds of families." },
];

const About = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % storyImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero Banner */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgHeroSpices} alt="Spices" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A00]/90 via-[#1A0A00]/75 to-[#1A0A00]/50" />
      </div>
      <div className="relative container mx-auto px-4 py-24 md:py-36">
        <motion.div {...fadeUp} className="max-w-2xl space-y-5">
          <span className="inline-block text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">
            Est. 2010 • Guntur, Andhra Pradesh
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
            The Authentic Taste of <span className="text-[#C9A84C]">Tradition</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl">
            From the heart of India's spice capital, Sri Megha Enterprises brings you handcrafted spices, 
            sun-dried pickles, and premium raw chillies — pure, natural, and made with love.
          </p>
          <div className="flex items-center gap-2 text-white/60 text-sm pt-2">
            <MapPin className="w-4 h-4 text-[#C9A84C]" />
            <span>121-1-86, Peda Palakaluru Road, Guntur – 522009</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats Strip */}
    <section className="bg-[#8B1A1A]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="py-8 md:py-10 text-center"
            >
              <s.icon className="w-6 h-6 text-[#C9A84C] mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-display font-bold text-white">{s.value}</p>
              <p className="text-white/60 text-sm font-heading mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Our Story */}
    <section className="py-16 md:py-24 bg-[#FDF6EC]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div {...fadeUp} className="space-y-6">
            <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A0A00]">
              Rooted in Guntur's Rich Spice Heritage
            </h2>
            <div className="space-y-4 text-[#1A0A00]/70 leading-relaxed">
              <p>
                Founded in 2010, Sri Megha Enterprises began as a small family venture in Guntur — the undisputed 
                spice capital of India. What started with a passion for authentic flavours has grown into a trusted 
                brand serving hundreds of families, hotels, restaurants, and institutions across the country.
              </p>
              <p>
                We specialize in premium spice powders, traditional pickles, aromatic masala blends, and bulk raw 
                chillies including Teja S17, 341, Sannam 334, Armour, and Syngenta Byadgi 5531 in grades from 
                Deluxe to Medium. Our turmeric range includes the prized Salem, Rajapuri, and Dheshamuri varieties.
              </p>
              <p>
                Every product is crafted using time-honoured methods — sun-dried under the Guntur sun, stone-ground 
                for perfect texture, and hand-blended with zero artificial additives. We believe in keeping it pure, 
                keeping it real, and keeping the tradition alive.
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
            <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={storyImages[currentImg].src}
                  alt={storyImages[currentImg].alt}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              {/* Image dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {storyImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentImg ? "bg-[#C9A84C] w-6" : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#8B1A1A] text-white rounded-2xl p-5 shadow-xl max-w-[200px]">
              <p className="font-display text-3xl font-bold">14+</p>
              <p className="text-white/80 text-sm font-heading">Years of crafting authentic flavours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <ParentCompanySection />

    {/* What We Believe In */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">Our Values</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3">
            What We Stand For
          </h2>
          <p className="text-muted-foreground mt-3">
            Every spice we craft carries the promise of purity, tradition, and uncompromising quality.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#8B1A1A]/10 flex items-center justify-center mb-4 group-hover:bg-[#8B1A1A]/20 transition-colors">
                <v.icon className="w-6 h-6 text-[#8B1A1A]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Process Highlight */}
    <section className="py-16 md:py-24 bg-[#1A0A00]">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">Our Process</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3">
            From Farm to Your Kitchen
          </h2>
          <p className="text-white/50 mt-3">
            Traditional methods, modern hygiene standards — every step is done with care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: imgProcess, title: "Careful Sourcing", desc: "Hand-picked from trusted local farmers in Guntur and surrounding regions, ensuring only the finest raw materials." },
            { img: imgGrinding, title: "Traditional Processing", desc: "Sun-dried under natural heat, stone-ground for perfect texture, and hand-blended using time-honoured recipes." },
            { img: imgQuality, title: "Quality & Packaging", desc: "Every batch is tested for purity and freshness. Hygienically packed to lock in aroma and flavour." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <img src={p.img} alt={p.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline / Journey */}
    <section className="py-16 md:py-24 bg-[#FDF6EC]">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">Our Journey</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A0A00] mt-3">
            Growing with Trust
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-0">
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#8B1A1A] flex items-center justify-center text-white font-heading font-bold text-xs shrink-0 shadow-lg">
                  {t.year}
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[#8B1A1A]/20 mt-2" />
                )}
              </div>
              <div className="pt-2 pb-4">
                <h3 className="font-heading text-lg font-bold text-[#1A0A00]">{t.title}</h3>
                <p className="text-[#1A0A00]/60 text-sm mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="bg-[#8B1A1A] py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto space-y-5">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            From Our Family to Yours
          </h2>
          <p className="text-white/70 text-lg">
            Pure spice, pure tradition, pure quality. Experience the authentic taste of Guntur — 
            trusted by hundreds of families across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/products" className="inline-flex items-center gap-2 bg-white text-[#8B1A1A] font-heading font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors text-sm">
              Explore Products
            </a>
            <a href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-heading font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
    <WhatsAppButton />
  </div>
  );
};

export default About;
