import { useState, useEffect, useRef } from "react";

const WelcomePopup = () => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("welcomePopupShown") === "true") return;
    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("welcomePopupShown", "true");
      requestAnimationFrame(() => setAnimating(true));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setAnimating(false);
    setTimeout(() => setVisible(false), 400);
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(e.target as Node)) close();
  };

  const handleDiscover = () => {
    close();
    setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleOverlay}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: animating ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: "92%", maxWidth: 420, borderRadius: 18,
          border: "1px solid rgba(214,158,46,0.35)",
          overflow: "hidden",
          transform: animating ? "translateY(0)" : "translateY(20px)",
          opacity: animating ? 1 : 0,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      >
        {/* HEADER */}
        <div style={{ background: "#1C0A02", padding: "1.4rem 1.5rem 1rem", textAlign: "center", position: "relative" }}>
          <button onClick={close} style={{
            position: "absolute", top: 11, right: 12, width: 26, height: 26,
            borderRadius: "50%", background: "rgba(214,158,46,0.15)",
            border: "1px solid rgba(214,158,46,0.3)", color: "#D69E2E",
            fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>

          <div style={{ fontSize: 8.5, letterSpacing: 4, color: "#D69E2E", textTransform: "uppercase", marginBottom: 8 }}>
            Est. in Guntur · Since 2010
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg viewBox="0 0 64 64" width={16} height={16}>
              <path d="M8 56 C8 56 20 20 56 8 C56 8 44 44 8 56Z" fill="#D69E2E"/>
              <path d="M8 56 L56 8" stroke="#8B1A1A" strokeWidth="2.5"/>
            </svg>
            <span style={{ fontSize: 26, fontWeight: 700, color: "#8B1A1A", fontFamily: "Georgia, serif", letterSpacing: 1 }}>
              Sri Megha
            </span>
            <svg viewBox="0 0 64 64" width={16} height={16} style={{ transform: "scaleX(-1)" }}>
              <path d="M8 56 C8 56 20 20 56 8 C56 8 44 44 8 56Z" fill="#D69E2E"/>
              <path d="M8 56 L56 8" stroke="#8B1A1A" strokeWidth="2.5"/>
            </svg>
          </div>

          <div style={{ fontSize: 8.5, letterSpacing: 7, color: "rgba(214,158,46,0.65)", textTransform: "uppercase", marginBottom: 10 }}>
            ENTERPRISES
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ height: 1, width: 45, background: "linear-gradient(to right, transparent, #D69E2E)" }} />
            <svg viewBox="0 0 64 64" width={13} height={13}>
              <ellipse cx="32" cy="42" rx="9" ry="18" fill="#E74C3C"/>
              <path d="M32 24 Q38 14 46 8 Q41 18 36 23" fill="#27AE60"/>
            </svg>
            <div style={{ height: 1, width: 45, background: "linear-gradient(to left, transparent, #D69E2E)" }} />
          </div>

          <p style={{
            fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 12,
            color: "rgba(255,255,255,0.72)", lineHeight: 1.55, margin: 0,
          }}>
            Guntur's finest spices — pure, natural, farm-to-kitchen since 2010.
          </p>
        </div>

        {/* GOLD DIVIDER */}
        <div style={{ height: 3, background: "linear-gradient(to right, #1C0A02, #D69E2E, #8B1A1A, #D69E2E, #1C0A02)" }} />

        {/* PROMO BAR */}
        <div style={{ background: "#8B1A1A", padding: "7px 1rem", textAlign: "center", fontSize: 11, color: "#fff", fontWeight: 500 }}>
          Wholesale · Bulk Supply · 100% Natural — <span style={{ color: "#FAD36A" }}>No Artificial Preservatives</span>
        </div>

        {/* BODY */}
        <div style={{ background: "#FDF8F0", padding: "1rem 1.25rem" }}>
          {/* Trust Badges */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: "0.85rem" }}>
            {[
              {
                icon: (
                  <svg width={24} height={24} viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="#E8F5E9"/>
                    <path d="M18 46 C18 46 22 18 46 18 C46 18 42 46 18 46Z" fill="#2E7D32"/>
                    <path d="M18 46 L46 18" stroke="#1B5E20" strokeWidth="2.5"/>
                  </svg>
                ),
                label: "Farm Fresh", labelColor: "#2E7D32", sub: "Zero additives",
              },
              {
                icon: (
                  <svg width={24} height={24} viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="#FFF3E0"/>
                    <rect x="16" y="26" width="32" height="24" rx="2" fill="#BF360C"/>
                    <rect x="22" y="18" width="20" height="12" rx="2" fill="#E64A19"/>
                    <rect x="27" y="36" width="10" height="14" fill="#FFF3E0" rx="1"/>
                    <rect x="18" y="30" width="6" height="5" fill="#FFF3E0" rx="1"/>
                    <rect x="40" y="30" width="6" height="5" fill="#FFF3E0" rx="1"/>
                  </svg>
                ),
                label: "Bulk Supply", labelColor: "#8B1A1A", sub: "Hotels & colleges",
              },
              {
                icon: (
                  <svg width={24} height={24} viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="#FFF8E1"/>
                    <circle cx="32" cy="28" r="13" fill="#F9A825"/>
                    <circle cx="32" cy="28" r="9" fill="#FFD54F"/>
                    <polygon points="32,21 33.5,26 39,26 34.5,29.5 36,34.5 32,31 28,34.5 29.5,29.5 25,26 30.5,26" fill="#E65100"/>
                    <rect x="27" y="40" width="10" height="5" rx="1" fill="#D69E2E"/>
                  </svg>
                ),
                label: "Award Quality", labelColor: "#8B1A1A", sub: "Since 2010",
              },
            ].map((b, i) => (
              <div key={i} style={{
                background: "#fff", border: "0.5px solid #E2C97E", borderRadius: 10,
                padding: "10px 6px", textAlign: "center",
              }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>{b.icon}</div>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: b.labelColor }}>{b.label}</div>
                <div style={{ fontSize: 8.5, color: "#6B4423" }}>{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Specialities */}
          <div style={{ marginBottom: "0.9rem" }}>
            <div style={{ fontSize: 8.5, letterSpacing: 3, color: "#9E7B4A", textTransform: "uppercase", marginBottom: 6 }}>
              Our Specialities
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 5 }}>
              {["Teja Chillies", "Mango Pickle", "Turmeric Powder"].map(t => (
                <span key={t} style={{ background: "#8B1A1A", color: "#FDF8F0", fontSize: 9.5, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {["Chilli Powder", "Gongura Pickle"].map(t => (
                <span key={t} style={{ background: "#D69E2E", color: "#3B1F00", fontSize: 9.5, padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={() => window.open("https://wa.me/917702869101?text=Hello%20Sri%20Megha%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20your%20products.", "_blank")}
            style={{
              width: "100%", background: "#D69E2E", color: "#1C0A02", border: "none", borderRadius: 10,
              padding: 11, fontSize: 12.5, fontWeight: 700, cursor: "pointer", marginBottom: 7,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}
          >
            <svg viewBox="0 0 24 24" fill="#1C0A02" width={15} height={15}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enquire on WhatsApp — +91 72077 28689
          </button>

          {/* Discover Button */}
          <button onClick={handleDiscover} style={{
            width: "100%", background: "transparent", color: "#8B1A1A",
            border: "1px solid #8B1A1A", borderRadius: 10, padding: 10,
            fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>
            Discover Our Collection →
          </button>
        </div>

        {/* FOOTER BAR */}
        <div style={{
          background: "#1C0A02", padding: "11px 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 0,
        }}>
          <button onClick={() => window.open("https://www.instagram.com/srimegha.spices/", "_blank")} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "0 18px",
            background: "none", border: "none", cursor: "pointer",
          }}>
            <svg viewBox="0 0 24 24" fill="#D69E2E" width={15} height={15}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span style={{ fontSize: 11, color: "#D69E2E", fontWeight: 500 }}>Instagram</span>
          </button>

          <div style={{ width: 1, height: 16, background: "rgba(214,158,46,0.25)" }} />

          <button onClick={() => window.open("https://youtube.com/@srimeghaenterprises?si=bw6eUhgwzSTY9swF", "_blank")} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "0 18px",
            background: "none", border: "none", cursor: "pointer",
          }}>
            <svg viewBox="0 0 24 24" fill="#D69E2E" width={15} height={15}>
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span style={{ fontSize: 11, color: "#D69E2E", fontWeight: 500 }}>YouTube</span>
          </button>

          <div style={{ width: 1, height: 16, background: "rgba(214,158,46,0.25)" }} />

          <button onClick={() => { window.location.href = "mailto:shop@srimeghaenterprises.com"; }} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "0 18px",
            background: "none", border: "none", cursor: "pointer",
          }}>
            <svg viewBox="0 0 24 24" fill="#D69E2E" width={15} height={15}>
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span style={{ fontSize: 11, color: "#D69E2E", fontWeight: 500 }}>Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
