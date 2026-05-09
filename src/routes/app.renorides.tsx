import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/app/renorides")({
  component: RenoRidesApp,
  head: () => ({
    meta: [
      { title: "RenoRides — App | RePère" },
      { name: "description", content: "Carte temps réel des artisans vérifiés autour de toi." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

type Status = "now" | "soon" | "off";
type Review = { initials: string; rating: number; text: string; date: string };
type Artisan = {
  id: string;
  name: string;
  trade: string;
  area: string;
  emoji: string;
  status: Status;
  eta: string;
  rate: string;
  rating: number;
  jobs: number;
  badges: { label: string; tone: "green" | "blue" | "amber" }[];
  reviews: Review[];
  lat: number;
  lng: number;
};

const ARTISANS: Artisan[] = [
  {
    id: "1", name: "Karim B.", trade: "Plombier", area: "Paris 10ème", emoji: "🔧",
    status: "now", eta: "8 min", rate: "70€/h", rating: 4.8, jobs: 98,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
      { label: "✓ Certifié", tone: "blue" },
    ],
    reviews: [
      { initials: "S.B.", rating: 5, text: "Très réactif, fuite réparée en 30min.", date: "Il y a 1j" },
      { initials: "M.A.", rating: 5, text: "Travail soigné, prix correct.", date: "Il y a 4j" },
    ],
    lat: 48.8606, lng: 2.3376,
  },
  {
    id: "2", name: "Karim D.", trade: "Serrurier", area: "Paris 11ème", emoji: "🔒",
    status: "now", eta: "5 min", rate: "65€/h", rating: 4.9, jobs: 142,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
      { label: "✓ Certifié", tone: "blue" },
      { label: "⭐ Artisan de confiance", tone: "amber" },
    ],
    reviews: [
      { initials: "T.M.", rating: 5, text: "Impeccable, rapide et propre.", date: "Il y a 2j" },
      { initials: "R.L.", rating: 5, text: "Parfait pour l'urgence du dimanche.", date: "Il y a 5j" },
    ],
    lat: 48.8534, lng: 2.3488,
  },
  {
    id: "3", name: "Thomas R.", trade: "Electricien", area: "Paris 17ème", emoji: "⚡",
    status: "soon", eta: "22 min", rate: "75€/h", rating: 4.7, jobs: 76,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
    ],
    reviews: [
      { initials: "J.P.", rating: 5, text: "Diagnostic clair, intervention nickel.", date: "Il y a 3j" },
      { initials: "C.D.", rating: 4, text: "Bon travail, un peu de retard.", date: "Il y a 8j" },
    ],
    lat: 48.8738, lng: 2.295,
  },
  {
    id: "4", name: "Julien P.", trade: "Multi-services", area: "Paris 5ème", emoji: "🏠",
    status: "now", eta: "12 min", rate: "55€/h", rating: 4.6, jobs: 54,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
    ],
    reviews: [
      { initials: "A.K.", rating: 5, text: "Polyvalent et arrangeant.", date: "Il y a 6j" },
      { initials: "L.M.", rating: 4, text: "Bon rapport qualité/prix.", date: "Il y a 10j" },
    ],
    lat: 48.8417, lng: 2.3225,
  },
  {
    id: "5", name: "Sébastien M.", trade: "Plombier", area: "Paris 19ème", emoji: "🔧",
    status: "off", eta: "Indispo", rate: "70€/h", rating: 4.5, jobs: 31,
    badges: [{ label: "✓ KBIS valide", tone: "green" }],
    reviews: [
      { initials: "N.O.", rating: 4, text: "Correct.", date: "Il y a 12j" },
      { initials: "P.G.", rating: 5, text: "Très pro.", date: "Il y a 20j" },
    ],
    lat: 48.8675, lng: 2.3624,
  },
];

const FILTERS = [
  { key: "all", label: "Tous", emoji: "" },
  { key: "Plombier", label: "Plomberie", emoji: "🔧" },
  { key: "Electricien", label: "Electricité", emoji: "⚡" },
  { key: "Serrurier", label: "Serrurerie", emoji: "🔒" },
  { key: "Multi-services", label: "Multi", emoji: "🏠" },
];

function statusColor(s: Status) {
  if (s === "now") return "#38D98A";
  if (s === "soon") return "#FFB347";
  return "#6B7280";
}

function RenoRidesApp() {
  const [Map, setMap] = useState<any>(null);
  const [filter, setFilter] = useState("all");
  const [urgent, setUrgent] = useState(false);
  const [menu, setMenu] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dragRef = useRef<{ startY: number; startExpanded: boolean } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const selected = ARTISANS.find((a) => a.id === selectedId) || null;

  useEffect(() => {
    let alive = true;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const RL = await import("react-leaflet");
      if (alive) setMap({ L, ...RL });
    })();
    return () => {
      alive = false;
    };
  }, []);

  const visible = ARTISANS.filter((a) => {
    if (filter !== "all" && a.trade !== filter) return false;
    if (urgent && a.status !== "now") return false;
    return true;
  });

  return (
    <main
      className="fixed inset-0 overflow-hidden font-body"
      style={{ background: "#07080A", color: "#EDF0F5" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes pulse-red { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,79,79,0.7), 0 8px 24px rgba(255,79,79,0.4); } 50% { box-shadow: 0 0 0 14px rgba(255,79,79,0), 0 8px 24px rgba(255,79,79,0.4); } }
        .leaflet-container { background: #07080A !important; }
        .leaflet-control-attribution { background: rgba(7,8,10,0.6) !important; color: rgba(237,240,245,0.4) !important; font-size: 9px !important; }
        .leaflet-control-attribution a { color: rgba(237,240,245,0.6) !important; }
      `}</style>

      {/* MAP */}
      <div className="absolute inset-0">
        {Map && (
          <Map.MapContainer
            center={[48.8566, 2.3522]}
            zoom={urgent ? 14 : 13}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <Map.TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* User pin */}
            <Map.Marker
              position={[48.8566, 2.3522]}
              icon={Map.L.divIcon({
                className: "",
                html: `<div style="position:relative;width:24px;height:24px">
                  <div style="position:absolute;inset:0;border-radius:50%;background:#3B82F6;border:3px solid #07080A;box-shadow:0 0 0 2px rgba(59,130,246,0.4)"></div>
                  <div style="position:absolute;inset:-4px;border-radius:50%;background:#3B82F6;animation:pulse-ring 2s ease-out infinite"></div>
                </div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            />
            {/* 15km circle */}
            <Map.Circle
              center={[48.8566, 2.3522]}
              radius={urgent ? 5000 : 15000}
              pathOptions={{ color: "#3B82F6", weight: 1, fillColor: "#3B82F6", fillOpacity: 0.05 }}
            />

            {/* Artisan pins */}
            {visible.map((a) => {
              const c = statusColor(a.status);
              const dim = a.status === "off" ? 0.5 : 1;
              return (
                <Map.Marker
                  key={a.id}
                  position={[a.lat, a.lng]}
                  icon={Map.L.divIcon({
                    className: "",
                    html: `<div style="position:relative;opacity:${dim};display:flex;flex-direction:column;align-items:center">
                      <div style="width:40px;height:40px;border-radius:50%;background:${c};display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #0D0F12;box-shadow:0 4px 12px rgba(0,0,0,0.6)">${a.emoji}</div>
                      <div style="margin-top:4px;background:rgba(13,15,18,0.95);color:#EDF0F5;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px;white-space:nowrap;border:1px solid rgba(255,255,255,0.08)">${a.eta}</div>
                    </div>`,
                    iconSize: [44, 60],
                    iconAnchor: [22, 22],
                  })}
                />
              );
            })}
          </Map.MapContainer>
        )}
        {!Map && (
          <div className="h-full flex items-center justify-center text-sm" style={{ color: "rgba(237,240,245,0.4)" }}>
            Chargement de la carte…
          </div>
        )}
      </div>

      {/* NAVBAR */}
      <header
        className="absolute top-0 inset-x-0 z-20 px-4"
        style={{
          background: "rgba(7,8,10,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          paddingTop: "max(env(safe-area-inset-top), 12px)",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link to="/services/renorides" className="font-display text-2xl font-extrabold tracking-tight">
            <span style={{ color: "#C8521A" }}>Re</span>
            <span style={{ color: "#EDF0F5" }}>Père</span>
          </Link>
          <button
            onClick={() => setMenu(!menu)}
            className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg active:scale-95 transition"
            aria-label="Menu"
          >
            <span className="block w-5 h-0.5 rounded-full" style={{ background: "#EDF0F5" }} />
            <span className="block w-5 h-0.5 rounded-full" style={{ background: "#EDF0F5" }} />
            <span className="block w-5 h-0.5 rounded-full" style={{ background: "#EDF0F5" }} />
          </button>
        </div>
      </header>

      {/* FILTERS */}
      <div
        className="absolute z-10 inset-x-0 px-4 py-3"
        style={{
          top: "calc(max(env(safe-area-inset-top), 12px) + 56px)",
          background: "rgba(13,15,18,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="shrink-0 px-4 h-10 rounded-full text-xs font-semibold uppercase tracking-wider transition active:scale-95 flex items-center gap-1.5"
                style={{
                  background: active ? "#C8521A" : "transparent",
                  color: active ? "#FFFFFF" : "rgba(237,240,245,0.75)",
                  border: active ? "1px solid #C8521A" : "1px solid rgba(255,255,255,0.1)",
                  minHeight: 44,
                }}
              >
                {f.emoji && <span className="text-sm">{f.emoji}</span>}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB URGENCE */}
      <button
        onClick={() => setUrgent(!urgent)}
        className="absolute z-20 right-4 rounded-full flex flex-col items-center justify-center font-display font-extrabold active:scale-95 transition"
        style={{
          bottom: "calc(max(env(safe-area-inset-bottom), 12px) + 80px)",
          width: 72,
          height: 72,
          background: urgent ? "#C8521A" : "#FF4F4F",
          color: "#FFFFFF",
          animation: urgent ? "none" : "pulse-red 2s ease-in-out infinite",
          boxShadow: urgent ? "0 8px 24px rgba(200,82,26,0.5)" : undefined,
        }}
        aria-label="Mode urgence"
      >
        <span className="text-2xl leading-none">🚨</span>
        <span className="text-[9px] tracking-widest mt-1">URGENCE</span>
      </button>

      {/* BANNER BAS */}
      <footer
        className="absolute z-10 inset-x-0 bottom-0 px-4"
        style={{
          background: "rgba(13,15,18,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.055)",
          paddingTop: 12,
          paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(56,217,138,0.12)", color: "#38D98A" }}
          >
            ✓
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display font-bold text-sm" style={{ color: "#38D98A" }}>
              Commission membre 12% incluse
            </div>
            <div className="text-[11px] truncate" style={{ color: "rgba(237,240,245,0.55)" }}>
              Non-membre ? Accès ponctuel 4,90€
            </div>
          </div>
          <Link
            to="/services/renorides"
            className="shrink-0 px-3 h-9 rounded-lg flex items-center text-[11px] font-semibold uppercase tracking-wider"
            style={{ background: "rgba(200,82,26,0.15)", color: "#C8521A", border: "1px solid rgba(200,82,26,0.3)" }}
          >
            Infos
          </Link>
        </div>
      </footer>

      {/* MENU OVERLAY */}
      {menu && (
        <div
          className="absolute inset-0 z-30"
          style={{ background: "rgba(7,8,10,0.85)", backdropFilter: "blur(12px)" }}
          onClick={() => setMenu(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-72 p-6 flex flex-col gap-2"
            style={{
              background: "#0D0F12",
              borderLeft: "1px solid rgba(255,255,255,0.055)",
              paddingTop: "max(env(safe-area-inset-top), 24px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-display text-2xl font-extrabold mb-6">
              <span style={{ color: "#C8521A" }}>Re</span>
              <span>Père</span>
            </div>
            {[
              { to: "/services/renorides", label: "À propos RenoRides" },
              { to: "/services", label: "Tous les services" },
              { to: "/auth", label: "Connexion" },
              { to: "/", label: "Accueil RePère" },
            ].map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setMenu(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition"
                style={{ color: "#EDF0F5", background: "rgba(255,255,255,0.03)" }}
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
