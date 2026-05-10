import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    name: "Lakshmi Devi",
    location: "Hyderabad",
    rating: 5,
    text: "The best chilli powder I've ever tasted! Reminds me of my grandmother's cooking. True Guntur flavor that you can't find anywhere else.",
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore",
    rating: 5,
    text: "Ordered the Avakaya pickle and Spl Karam — both are absolutely authentic. Fresh, aromatic, and packed with love. Will order again!",
  },
  {
    name: "Priya Sharma",
    location: "Chennai",
    rating: 5,
    text: "Fresh, aromatic spices with no additives. My family loves the Biryani Masala and Sambar Powder. Excellent quality and fast delivery!",
  },
  {
    name: "Suresh Reddy",
    location: "Guntur",
    rating: 5,
    text: "We've been ordering bulk chillies for our restaurant for over a year. Consistent quality, great prices, and reliable supply every time.",
  },
  {
    name: "Anitha Rao",
    location: "Visakhapatnam",
    rating: 4,
    text: "The turmeric powder is incredibly fresh and aromatic. You can tell it's pure from the colour and smell. Very happy with my purchase!",
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="bg-[#2D1500] py-10 md:py-14 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#C9A84C] font-heading font-semibold text-sm uppercase tracking-[0.2em]">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#FDF6EC] mt-3">
            Loved by Our Customers
          </h2>
          <div className="w-20 h-[2px] bg-[#C9A84C] mx-auto mt-4" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {reviews.map((r) => (
                <div key={r.name} className="w-full shrink-0 px-4">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-[#C9A84C]/40 mx-auto mb-6" />
                    <p className="text-[#FDF6EC] text-lg md:text-xl leading-relaxed mb-6 font-display italic">
                      "{r.text}"
                    </p>
                    <div className="flex gap-1 justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${j < r.rating ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-[#C9A84C]/20 text-[#C9A84C]/20"}`}
                        />
                      ))}
                    </div>
                    <p className="font-heading font-bold text-[#FDF6EC] text-base">{r.name}</p>
                    <p className="text-[#FDF6EC]/40 text-sm">{r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-[#C9A84C] w-8"
                    : "bg-[#FDF6EC]/20 hover:bg-[#FDF6EC]/40"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
