import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => (
  <div className="min-h-screen flex flex-col bg-[#FDF6EC]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#8B1A1A] mb-8">Refund Policy</h1>
      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
        <p>We want you to be completely satisfied with your purchase. Please read our refund policy below.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Eligibility</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Refund requests must be made within 7 days of delivery</li>
          <li>Products must be unused and in original packaging</li>
          <li>Perishable goods like pickles and spices are non-refundable once opened</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Damaged or Wrong Items</h2>
        <p>If you receive a damaged or incorrect item, contact us within 48 hours with photos. We will arrange a replacement or full refund.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Refund Process</h2>
        <p>Approved refunds will be processed within 5–7 business days to the original payment method.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Contact</h2>
        <p>Email us at <a href="mailto:shop@srimeghaenterprises.com" className="text-[#C9A84C] hover:underline">shop@srimeghaenterprises.com</a> for refund requests.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default RefundPolicy;