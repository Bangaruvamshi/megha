import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock, Send, MessageCircle, Truck, ShieldCheck, Star, Users, Package, Award, ChevronDown, Leaf, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const faqs = [
  { q: "How can I place a bulk order?", a: "You can reach us via WhatsApp or the contact form above. Share your requirements and we'll provide a custom quote within 24 hours." },
  { q: "Do you deliver across India?", a: "Yes! We deliver to all major cities and towns across India. Shipping typically takes 3-7 business days depending on your location." },
  { q: "Are your products FSSAI certified?", a: "Absolutely. All our spices and food products are FSSAI certified, ensuring the highest quality and safety standards." },
  { q: "Can I get a custom spice blend?", a: "Yes, we offer custom blending services for restaurants, caterers, and businesses. Contact us with your specific requirements." },
  { q: "What are your payment options?", a: "We accept UPI, bank transfers, and all major payment methods. For bulk orders, we also offer credit terms for verified businesses." },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Package, value: "500+", label: "Products Delivered Daily" },
  { icon: Star, value: "4.9/5", label: "Customer Rating" },
  { icon: Award, value: "15+", label: "Years of Trust" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    const text = `*New Enquiry*%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0ASubject: ${encodeURIComponent(formData.subject)}%0AMessage: ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/917702869101?text=${text}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-[#1A0A00] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#C9A84C] blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#8B1A1A] blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C9A84C] blur-[200px] opacity-5" />
        </div>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-[#C9A84C]/15 text-[#C9A84C] rounded-full text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#FDF6EC] mt-2">
              We'd Love to <span className="text-[#C9A84C]">Hear</span> From You
            </h1>
            <p className="text-[#FDF6EC]/60 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
              Whether it's a bulk order, a custom spice blend, or just to say hello — we're here for you.
            </p>
          </motion.div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
      </section>

      {/* Quick Info Strip */}
      <section className="bg-[#8B1A1A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { icon: Phone, label: "Call Us", value: "+91 7702869101" },
              { icon: Mail, label: "Email", value: "shop@srimegha.." },
              { icon: Clock, label: "Working Hours", value: "9 AM – 8 PM" },
              { icon: Truck, label: "Delivery", value: "All Over India" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-center gap-3 py-4 px-4 lg:px-6"
              >
                <item.icon className="w-5 h-5 text-[#C9A84C] shrink-0" />
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider font-heading">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-[#FDF6EC] border-b border-border/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-14 h-14 mx-auto bg-[#8B1A1A]/10 group-hover:bg-[#8B1A1A]/20 rounded-2xl flex items-center justify-center mb-3 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#8B1A1A]" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-[#8B1A1A]">{stat.value}</p>
                <p className="text-muted-foreground text-xs mt-1 font-heading">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Contact Cards + Form */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* Left: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Contact Information</h2>
              <p className="text-muted-foreground mt-2 text-sm">Reach us through any of these channels. We typically respond within a few hours.</p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              <a href="tel:7702869101" className="group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#8B1A1A]/10 group-hover:bg-[#8B1A1A]/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5 text-[#8B1A1A]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Phone</p>
                  <p className="text-muted-foreground text-sm">+91 7702869101</p>
                </div>
              </a>

              <a href="mailto:shop@srimeghaenterprises.com" className="group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 hover:border-[#C9A84C]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#8B1A1A]/10 group-hover:bg-[#8B1A1A]/20 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                  <Mail className="w-5 h-5 text-[#8B1A1A]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Email</p>
                  <p className="text-muted-foreground text-sm">shop@srimeghaenterprises.com</p>
                </div>
              </a>

              <div className="group flex items-start gap-4 p-4 bg-card rounded-2xl border border-border/50">
                <div className="w-12 h-12 bg-[#8B1A1A]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#8B1A1A]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Address</p>
                  <p className="text-muted-foreground text-sm">121-1-86, Beside Indian Oil Petrol Bunk, Peda Palakaluru Road, Guntur – 522009</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50">
                <div className="w-12 h-12 bg-[#8B1A1A]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#8B1A1A]" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Business Hours</p>
                  <p className="text-muted-foreground text-sm">Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-muted-foreground text-xs">Sunday: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917702869101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-6 py-3.5 rounded-xl text-base font-heading font-semibold hover:bg-[#20bd5a] transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Send Us a Message</h3>
              <p className="text-muted-foreground text-sm mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 bg-background"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^\d+\s-]/g, "").slice(0, 15) })}
                      className="h-11 bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Subject</label>
                    <Input
                      placeholder="e.g. Bulk Order Enquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Message *</label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[120px] bg-background resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full h-12 bg-[#8B1A1A] hover:bg-[#6B1414] text-white font-heading font-semibold rounded-xl text-base"
                >
                  {sending ? "Sending..." : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Contact Us - Trust Strip */}
      <section className="bg-[#FDF6EC] border-y border-border/30">
        <div className="container mx-auto px-4 py-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
            Why Choose <span className="text-[#8B1A1A]">Sri Megha</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "FSSAI Certified", desc: "All products are safety certified and quality tested" },
              { icon: Truck, title: "Pan India Delivery", desc: "We deliver across India with secure packaging" },
              { icon: Phone, title: "Dedicated Support", desc: "Get personal assistance for bulk and custom orders" },
              { icon: Clock, title: "Quick Response", desc: "We reply within a few hours on all working days" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-6 rounded-2xl bg-card border border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto bg-[#C9A84C]/10 rounded-xl flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-3">
              FAQ
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Quick answers to common queries</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 bg-card rounded-2xl border border-border/50 hover:border-[#C9A84C]/30 transition-all duration-300 text-left group"
                >
                  <span className="font-heading font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#C9A84C]' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 pt-2 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Decorative CTA Banner */}
      <section className="relative bg-[#1A0A00] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#C9A84C] blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#8B1A1A] blur-[180px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A84C 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-[#C9A84C]" />
              <Heart className="w-5 h-5 text-[#8B1A1A]" />
              <Leaf className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[#FDF6EC] mb-3">
              From Our Kitchen to <span className="text-[#C9A84C]">Yours</span>
            </h2>
            <p className="text-[#FDF6EC]/60 text-sm md:text-base mb-8 max-w-lg mx-auto">
              Every spice tells a story. Let us be a part of your culinary journey with the finest, hand-picked spices from Guntur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/917702869101"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A0A00] px-8 py-3.5 rounded-xl text-sm font-heading font-bold hover:bg-[#d4b45c] transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" /> Start a Conversation
              </a>
              <a
                href="tel:7702869101"
                className="inline-flex items-center gap-2 border border-[#C9A84C]/30 text-[#C9A84C] px-8 py-3.5 rounded-xl text-sm font-heading font-semibold hover:bg-[#C9A84C]/10 transition-all"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      </section>

      {/* Google Maps Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-[#8B1A1A]/10 text-[#8B1A1A] rounded-full text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-3">
              Our Location
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Find Us on Location
            </h2>
          </div>
          <div className="rounded-[20px] overflow-hidden bg-foreground/5 shadow-[0_8px_30px_-8px_hsl(var(--foreground)/0.15)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.22)] transition-shadow duration-300 border border-border/40">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Sri+Megha+Enterprises,Peda+Palakaluru,Guntur,Andhra+Pradesh&zoom=16"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Megha Enterprises Location"
              className="block"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <a
              href="https://maps.app.goo.gl/wEjAWFa8XdU2sTaaA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#8B1A1A] text-white px-6 py-3 rounded-xl text-sm font-heading font-semibold hover:bg-[#6B1414] transition-all"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
            <a
              href="tel:7702869101"
              className="inline-flex items-center gap-2 border border-[#8B1A1A]/30 text-[#8B1A1A] px-6 py-3 rounded-xl text-sm font-heading font-semibold hover:bg-[#8B1A1A]/5 transition-all"
            >
              <Phone className="w-4 h-4" /> Call for Directions
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
