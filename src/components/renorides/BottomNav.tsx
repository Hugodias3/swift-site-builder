import { Link, useLocation } from "@tanstack/react-router";

const TABS: { to: any; label: string; icon: string; match: (p: string) => boolean }[] = [
  { to: "/", label: "Accueil", icon: "🏠", match: (p) => p === "/" },
  { to: "/app/renorides", label: "RenoRides", icon: "🚨", match: (p) => p.startsWith("/app/renorides") || p.startsWith("/renorides") },
  { to: "/services/garde-flash", label: "Garde", icon: "👶", match: (p) => p.startsWith("/services/garde") || p.startsWith("/app/garde") },
  { to: "/social", label: "Communauté", icon: "💬", match: (p) => p.startsWith("/social") },
  { to: "/auth", label: "Profil", icon: "👤", match: (p) => p.startsWith("/auth") || p.startsWith("/profile") },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[1100] flex"
      style={{
        background: "#0D0F12",
        borderTop: "1px solid rgba(255,255,255,0.055)",
        paddingBottom: "max(env(safe-area-inset-bottom), 6px)",
        paddingTop: 8,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {TABS.map((t) => {
        const active = t.match(pathname);
        const color = active ? "#C8521A" : "rgba(237,240,245,0.4)";
        return (
          <Link
            key={t.label}
            to={t.to}
            className="flex-1 flex flex-col items-center gap-0.5 py-1 active:scale-95 transition"
          >
            <span className="text-[18px] leading-none" style={{ filter: active ? "none" : "grayscale(0.4)" }}>{t.icon}</span>
            <span className="text-[10px] font-semibold" style={{ color }}>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
