import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => (
  <div className="min-h-screen flex flex-col bg-[#FDF6EC]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#8B1A1A] mb-8">Terms &amp; Conditions</h1>
      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
        <p>By using our website and purchasing our products, you agree to the following terms.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Orders &amp; Payments</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>All orders are subject to availability and confirmation</li>
          <li>Prices are listed in INR and may change without notice</li>
          <li>Payment must be completed before dispatch</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Product Information</h2>
        <p>We strive to provide accurate descriptions and images. Minor variations in colour or packaging may occur due to the natural nature of our products.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Limitation of Liability</h2>
        <p>Sri Megha Enterprises is not liable for any indirect or consequential damages arising from the use of our products or services.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Contact</h2>
        <p>For questions, contact us at <a href="mailto:shop@srimeghaenterprises.com" className="text-[#C9A84C] hover:underline">shop@srimeghaenterprises.com</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsConditions;