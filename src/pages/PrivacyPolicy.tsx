import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-[#FDF6EC]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#8B1A1A] mb-8">Privacy &amp; Policy</h1>
      <div className="prose prose-sm max-w-none text-foreground/80 space-y-6">
        <p>At Sri Megha Enterprises, we value your privacy. This policy explains how we collect, use, and protect your personal information.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name, email, phone number during registration or checkout</li>
          <li>Shipping and billing address</li>
          <li>Order history and preferences</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To process and deliver your orders</li>
          <li>To communicate about your orders and account</li>
          <li>To improve our products and services</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Data Protection</h2>
        <p>We implement industry-standard security measures to protect your data. We do not sell or share your personal information with third parties for marketing purposes.</p>
        <h2 className="text-xl font-semibold text-[#8B1A1A]">Contact</h2>
        <p>For privacy-related queries, reach us at <a href="mailto:shop@srimeghaenterprises.com" className="text-[#C9A84C] hover:underline">shop@srimeghaenterprises.com</a>.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;