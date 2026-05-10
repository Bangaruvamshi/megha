import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingPolicy = () => (
  <div className="min-h-screen flex flex-col bg-[#FDF6EC]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#8B1A1A] mb-8">Shipping Policy</h1>
      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
        <p>We ship across India. Here are the details of our shipping process.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Processing Time</h2>
        <p>Orders are processed within 1–2 business days after payment confirmation.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Delivery Time</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Within Andhra Pradesh &amp; Telangana: 3–5 business days</li>
          <li>Rest of India: 5–8 business days</li>
          <li>Remote areas may take additional 2–3 days</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Shipping Charges</h2>
        <p>Shipping charges are calculated at checkout based on order weight and delivery location. Orders above ₹999 may qualify for free shipping.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Tracking</h2>
        <p>A tracking ID will be shared via SMS/email once your order is dispatched.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Contact</h2>
        <p>For shipping queries, reach us at <a href="mailto:shop@srimeghaenterprises.com" className="text-[#C9A84C] hover:underline">shop@srimeghaenterprises.com</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPolicy;