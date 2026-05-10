import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, User, Phone, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setShowPassword(false);
    setShowForgot(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email");
    if (!password) return toast.error("Please enter your password");
    setIsLoading(true);
    try {
      const { error, isAdmin } = await signIn(email, password);
      if (error) { toast.error(error); return; }
      resetForm();
      onClose();
      if (isAdmin) navigate("/admin");
      setTimeout(() => toast.success("Login successful!"), 300);
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Please enter your full name");
    if (!/^\d{10}$/.test(phone)) return toast.error("Phone number must be exactly 10 digits");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address");
    if (password.length < 7) return toast.error("Password must be at least 7 characters");
    setIsLoading(true);
    try {
      const { error } = await signUp(email, password, fullName, phone);
      if (error) { toast.error(error); return; }
      resetForm();
      onClose();
      setTimeout(() => toast.success("Registration successful! Please check your email to verify."), 300);
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter your email");
    setIsLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) { toast.error(error); return; }
      toast.success("Password reset link sent to your email!");
      setShowForgot(false);
    } catch { toast.error("Something went wrong. Please try again."); }
    finally { setIsLoading(false); }
  };

  const inputBase =
    "h-12 pl-11 pr-4 bg-white border border-[#E8DCC4] rounded-xl text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-[hsl(0,60%,35%)]/30 focus-visible:border-[hsl(0,60%,35%)] transition-all shadow-sm";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-[440px] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Glow ring */}
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#C9A84C] via-[hsl(0,60%,40%)] to-[#C9A84C] opacity-70 blur-sm" />

        <div className="relative bg-gradient-to-b from-[hsl(40,40%,97%)] to-[hsl(40,30%,93%)] rounded-[26px] shadow-2xl overflow-hidden border border-white/40">
          {/* Decorative corner blobs */}
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[hsl(0,60%,40%)]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-[#C9A84C]/20 blur-3xl pointer-events-none" />

          {/* Close */}
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-muted-foreground hover:text-foreground flex items-center justify-center shadow-sm transition-all hover:rotate-90 duration-300"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="relative px-8 pt-8 pb-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(0,60%,35%)] to-[hsl(0,60%,25%)] flex items-center justify-center shadow-lg shadow-[hsl(0,60%,35%)]/30">
                <Sparkles className="w-5 h-5 text-[#FFD874]" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-[hsl(0,60%,25%)] leading-none">Sri Megha</p>
                <p className="text-[10px] tracking-[0.25em] text-[#C9A84C] font-heading font-semibold uppercase mt-0.5">Enterprises</p>
              </div>
            </div>

            {showForgot ? (
              <>
                <h2 className="font-display text-2xl font-bold text-[hsl(0,60%,22%)]">Reset Password</h2>
                <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link.</p>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-[hsl(0,60%,22%)]">
                  {tab === "login" ? "Welcome Back 👋" : "Create Account"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {tab === "login" ? "Sign in to continue your spice journey." : "Join us for fresh, authentic flavours."}
                </p>
              </>
            )}
          </div>

          <div className="relative px-8 pb-8 pt-4">
            {showForgot ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} placeholder="you@example.com" required />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-[hsl(0,60%,32%)] to-[hsl(0,60%,25%)] hover:from-[hsl(0,60%,28%)] hover:to-[hsl(0,60%,22%)] text-white font-semibold rounded-xl shadow-lg shadow-[hsl(0,60%,30%)]/25 hover:shadow-xl transition-all">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <button type="button" onClick={() => setShowForgot(false)} className="text-sm text-[hsl(0,60%,30%)] hover:underline w-full text-center font-medium">
                  ← Back to Login
                </button>
              </form>
            ) : (
              <>
                {/* Segmented tabs */}
                <div className="relative grid grid-cols-2 p-1 bg-[#EFE4CC]/60 rounded-xl mb-6 border border-[#E8DCC4]">
                  <button
                    onClick={() => setTab("login")}
                    className={`relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors ${tab === "login" ? "text-white" : "text-[hsl(0,60%,25%)]/70 hover:text-[hsl(0,60%,25%)]"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setTab("register")}
                    className={`relative z-10 py-2.5 text-sm font-semibold rounded-lg transition-colors ${tab === "register" ? "text-white" : "text-[hsl(0,60%,25%)]/70 hover:text-[hsl(0,60%,25%)]"}`}
                  >
                    Register
                  </button>
                  <span
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-[hsl(0,60%,32%)] to-[hsl(0,60%,25%)] rounded-lg shadow-md shadow-[hsl(0,60%,30%)]/30 transition-all duration-300 ease-out ${tab === "login" ? "left-1" : "left-[calc(50%+0px)]"}`}
                  />
                </div>

                {tab === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputBase} pr-11`} placeholder="••••••••" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[hsl(0,60%,30%)] p-1">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="text-right -mt-1">
                      <button type="button" onClick={() => setShowForgot(true)} className="text-xs font-semibold text-[hsl(0,60%,30%)] hover:text-[hsl(0,60%,20%)] hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-[hsl(0,60%,32%)] to-[hsl(0,60%,25%)] hover:from-[hsl(0,60%,28%)] hover:to-[hsl(0,60%,22%)] text-white font-semibold rounded-xl shadow-lg shadow-[hsl(0,60%,30%)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground pt-1">
                      New here?{" "}
                      <button type="button" onClick={() => setTab("register")} className="text-[hsl(0,60%,30%)] font-semibold hover:underline">Create an account</button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputBase} placeholder="Your name" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="10-digit phone number"
                          className={inputBase}
                          required pattern="\d{10}" maxLength={10}
                        />
                      </div>
                      {phone && phone.length < 10 && (
                        <p className="text-xs text-destructive">{10 - phone.length} more digits needed</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputBase} placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(0,60%,30%)]">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A84C]" />
                        <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputBase} pr-11`} placeholder="At least 7 characters" required minLength={7} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[hsl(0,60%,30%)] p-1">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full h-12 mt-1 bg-gradient-to-r from-[hsl(0,60%,32%)] to-[hsl(0,60%,25%)] hover:from-[hsl(0,60%,28%)] hover:to-[hsl(0,60%,22%)] text-white font-semibold rounded-xl shadow-lg shadow-[hsl(0,60%,30%)]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[hsl(0,60%,30%)]" />
                      Secured & encrypted. We never share your data.
                    </p>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
