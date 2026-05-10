import { Menu, X, LogIn, LogOut, User, ShoppingCart, Mail, Phone, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";
import AuthModal from "@/components/AuthModal";
import CartDrawer from "@/components/CartDrawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { totalItems } = useCart();

  const { data: profile } = useQuery({
    queryKey: ["navbar-profile", user?.id],
    enabled: !!user?.id && showProfile,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/" && location.pathname === "/") return true;
      return location.pathname === href;
    },
    [location.pathname]
  );

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    toast("Logging out...", { duration: 1500 });
    await signOut();
    navigate("/");
    setTimeout(() => toast.success("Logged out successfully!"), 800);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/80 backdrop-blur-xl shadow-[0_1px_3px_0_hsl(var(--foreground)/0.04),0_4px_16px_-2px_hsl(var(--foreground)/0.06)] border-b border-border/60"
            : "bg-card border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[60px] sm:h-[68px]">
            {/* Brand Text Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <div className="leading-tight">
                <span className="font-display text-xl sm:text-2xl font-bold text-primary tracking-tight block">
                  Sri Megha
                </span>
                <div className="flex items-baseline gap-1.5 -mt-0.5">
                  <span className="font-heading text-[9px] sm:text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">
                    Enterprises
                  </span>
                  <span className="italic font-serif text-[9px] sm:text-[10px] text-muted-foreground whitespace-nowrap">
                    A unit of Ayyappa Trading Co
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    
                    className={`relative px-3 py-2 text-[13px] font-medium transition-colors rounded-lg ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin">
                  <Button size="sm" variant="default" className="rounded-xl font-heading font-semibold text-[13px] h-9">
                    Inventory
                  </Button>
                </Link>
              )}

              {/* Cart - only when logged in */}
              {user && <CartDrawer />}

              {user ? (
                <div className="flex items-center gap-1.5">
                  {/* User icon + name */}
                  <button
                    type="button"
                    onClick={() => setShowProfile(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-secondary/40 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer"
                    aria-label="View account details"
                  >
                    <User className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-heading font-semibold text-foreground max-w-[100px] truncate">
                      {userName}
                    </span>
                  </button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-xl font-heading font-semibold text-[13px] h-9"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-1.5" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full font-heading font-semibold text-[13px] h-9 px-5 border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-secondary"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="w-4 h-4 mr-1.5" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-1">
              {/* Cart - only when logged in (mobile) */}
              {user && <CartDrawer />}

              {user ? (
                <Button size="sm" variant="ghost" className="rounded-xl text-xs px-2 h-8" onClick={handleLogout}>
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button size="sm" variant="ghost" className="rounded-xl text-xs px-2 h-8" onClick={() => setShowAuthModal(true)}>
                  <User className="w-3.5 h-3.5" />
                </Button>
              )}
              <button
                className="p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-border/60 bg-card"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  {/* User info in mobile menu */}
                  {user && (
                    <div className="flex items-center gap-2 px-4 py-3 mb-1 rounded-xl bg-secondary/5 border border-secondary/20">
                      <User className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-sm font-heading font-semibold text-foreground truncate">{userName}</span>
                    </div>
                  )}
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span
                          className={`flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                            active
                              ? "text-primary bg-primary/5 font-semibold"
                              : "text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <span className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium text-primary bg-primary/5 font-semibold">
                        Inventory Dashboard
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Promo strip — hidden at top, slides down after scrolling */}
      <div
        className={`sticky top-[60px] sm:top-[68px] z-40 bg-primary text-primary-foreground text-[11px] sm:text-xs overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled
            ? "max-h-10 py-1.5 opacity-100"
            : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="animate-marquee whitespace-nowrap inline-flex gap-10">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              <span className="inline-flex items-center gap-2"><img src="https://img.icons8.com/fluency/32/chili-pepper.png" alt="" width={18} height={18} className="inline-block shrink-0" /> Wholesale dealer for chilly powder, turmeric & masala powders</span>
              <span className="inline-flex items-center gap-2"><img src="https://img.icons8.com/fluency/32/restaurant-building.png" alt="" width={18} height={18} className="inline-block shrink-0" /> Bulk supply to hotels, restaurants & colleges</span>
              <span className="inline-flex items-center gap-2"><img src="https://img.icons8.com/fluency/32/ok.png" alt="" width={18} height={18} className="inline-block shrink-0" /> 100% Natural — No artificial preservatives</span>
              <span className="inline-flex items-center gap-2"><img src="https://img.icons8.com/fluency/32/phone.png" alt="" width={18} height={18} className="inline-block shrink-0" /> Call: +91 7702869101</span>
            </span>
          ))}
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Account Details</DialogTitle>
            <DialogDescription>Your profile information</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-2">
            <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
              <User className="w-8 h-8 text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-base truncate">
                {profile?.full_name || user?.user_metadata?.full_name || userName}
              </p>
              {isAdmin ? (
                <Badge className="mt-1 bg-primary text-primary-foreground hover:bg-primary"><Shield className="w-3 h-3 mr-1" />Admin</Badge>
              ) : (
                <Badge variant="secondary" className="mt-1">Customer</Badge>
              )}
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
              <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Email</p>
                <p className="font-medium truncate">{user?.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
              <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Phone</p>
                <p className="font-medium">{profile?.phone || user?.user_metadata?.phone || "—"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Joined</p>
                <p className="font-medium">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setShowProfile(false)}>Close</Button>
            <Button variant="destructive" onClick={() => { setShowProfile(false); handleLogout(); }}>
              <LogOut className="w-4 h-4 mr-1.5" />Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
