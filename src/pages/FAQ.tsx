import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What products does Mega Enterprises offer?",
    a: "We offer a wide range of premium spices (chilli powder, biryani masala, garam masala, sambar powder), authentic Andhra pickles (avakaya, gongura, chicken pickle), and combo packs at special prices.",
  },
  {
    q: "Are your spices 100% natural?",
    a: "Yes! All our spices are stone-ground using traditional methods with zero chemicals, additives, or artificial colours. We source directly from Guntur farms.",
  },
  {
    q: "How can I place an order?",
    a: "You can order directly through WhatsApp by clicking the 'Order on WhatsApp' button on any product or combo page. Just message us and we'll guide you through the process.",
  },
  {
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes, we offer special wholesale pricing for bulk orders. Contact us on WhatsApp or call us at 7893663689 for custom quotes.",
  },
  {
    q: "What is the delivery time?",
    a: "We typically deliver within 3-5 business days across India. For local orders in Guntur, same-day or next-day delivery is available.",
  },
  {
    q: "Is free delivery available?",
    a: "Yes! We offer free delivery on all orders above ₹500. For orders below ₹500, a nominal delivery charge applies.",
  },
  {
    q: "Do you export internationally?",
    a: "Yes, we are export-ready and meet international quality standards. Contact us for international shipping details and pricing.",
  },
  {
    q: "What is your return/refund policy?",
    a: "If you receive a damaged or incorrect product, we offer a full replacement or refund. Please contact us within 48 hours of delivery with photos of the issue.",
  },
  {
    q: "How should I store the spices and pickles?",
    a: "Store spices in a cool, dry place away from direct sunlight. Pickles should be kept refrigerated after opening and always use a dry spoon.",
  },
  {
    q: "Are combo packs customizable?",
    a: "Yes! While we have pre-made combo packs, you can request a custom combo via WhatsApp. We'll create a personalized pack with your preferred products.",
  },
];

const FAQ = () => (
  <div className="min-h-screen">
    <Navbar />
    <section id="faq" className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-secondary font-heading font-semibold text-sm uppercase tracking-[0.15em]">
            Got Questions?
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg">
            Everything you need to know about our products and services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card rounded-xl border border-border/50 px-5 shadow-soft"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-sm md:text-base text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default FAQ;
