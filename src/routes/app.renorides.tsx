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

import { ARTISANS, type Artisan, type Status } from "@/data/renorides-artisans";
import { BottomNav } from "@/components/renorides/BottomNav";
import { NonMemberModal } from "@/components/renorides/NonMemberModal";

const IS_MEMBER = false; // demo: non-membre par défaut

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
  const lastMarkerClickAt = useRef<number>(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [showAccess, setShowAccess] = useState(false);
  const [accessGranted, setAccessGranted] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("renorides_access") === "1";
  });
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
    <>
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
                  eventHandlers={{
                    click: (e: any) => {
                      e.originalEvent?.stopPropagation?.();
                      lastMarkerClickAt.current = Date.now();
                      if (a.status === "off") return;
                      if (!IS_MEMBER && !accessGranted) { setShowAccess(true); return; }
                      if (selectedId && selectedId !== a.id) {
                        setSelectedId(null);
                        setExpanded(false);
                        setTimeout(() => setSelectedId(a.id), 180);
                      } else {
                        setSelectedId(a.id);
                      }
                    },
                  }}
                  icon={Map.L.divIcon({
                    className: "",
                    html: `<div style="position:relative;opacity:${dim};display:flex;flex-direction:column;align-items:center">
                      <div style="width:40px;height:40px;border-radius:50%;background:${c};display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid ${selectedId === a.id ? "#C8521A" : "#0D0F12"};box-shadow:0 4px 12px rgba(0,0,0,0.6);transition:all .2s">${a.emoji}</div>
                      <div style="margin-top:4px;background:rgba(13,15,18,0.95);color:#EDF0F5;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px;white-space:nowrap;border:1px solid rgba(255,255,255,0.08)">${a.eta}</div>
                    </div>`,
                    iconSize: [44, 60],
                    iconAnchor: [22, 22],
                  })}
                />
              );
            })}
            <MapClickCloser onClick={() => {
              if (Date.now() - lastMarkerClickAt.current < 350) return;
              setSelectedId(null); setExpanded(false);
            }} useMapEvents={Map.useMapEvents} />
            <MapGestureLock locked={!!selectedId} useMap={Map.useMap} />

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
        className="absolute top-0 inset-x-0 z-[1000] px-4"
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
        className="absolute z-[1000] inset-x-0 px-4 py-3"
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
        className="absolute z-[1010] right-4 rounded-full flex flex-col items-center justify-center font-display font-extrabold active:scale-95 transition"
        style={{
          bottom: "calc(max(env(safe-area-inset-bottom), 12px) + 152px)",
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

      {/* BANNER BAS (au-dessus de la nav) */}
      <footer
        className="absolute z-[1000] inset-x-0 px-4"
        style={{
          bottom: "calc(max(env(safe-area-inset-bottom), 6px) + 60px)",
          background: "rgba(13,15,18,0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.055)",
          paddingTop: 10,
          paddingBottom: 10,
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
          className="absolute inset-0 z-[1300]"
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

      {/* BACKDROP + BOTTOM SHEET */}
      {selected && (
        <>
          <div
            onClick={() => { setSelectedId(null); setExpanded(false); setDragOffset(0); }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1150,
              background: "rgba(7,8,10,0.55)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              animation: "backdrop-in 0.25s ease-out",
            }}
          />
          <style>{`@keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
          <BottomSheet
            artisan={selected}
            expanded={expanded}
            dragOffset={dragOffset}
            onClose={() => { setSelectedId(null); setExpanded(false); setDragOffset(0); }}
            onDragStart={(y) => { dragRef.current = { startY: y, startExpanded: expanded }; }}
            onDragMove={(y) => {
              if (!dragRef.current) return;
              const dy = y - dragRef.current.startY;
              // Block upward drag past expand; allow downward freely
              setDragOffset(dragRef.current.startExpanded ? Math.max(0, dy) : dy);
            }}
            onDragEnd={() => {
              const o = dragOffset;
              const startExp = dragRef.current?.startExpanded ?? false;
              dragRef.current = null;
              setDragOffset(0);
              if (startExp) {
                if (o > 240) { setSelectedId(null); setExpanded(false); }
                else if (o > 100) setExpanded(false);
              } else {
                if (o < -80) setExpanded(true);
                else if (o > 100) { setSelectedId(null); setExpanded(false); }
              }
            }}
          />
        </>
      )}
    </main>
    {!selected && <BottomNav />}
    <NonMemberModal
      open={showAccess}
      onClose={() => setShowAccess(false)}
      onGrant={() => {
        setAccessGranted(true);
        try { sessionStorage.setItem("renorides_access", "1"); } catch {}
      }}
    />
    </>
  );
}

function MapClickCloser({ onClick, useMapEvents }: { onClick: () => void; useMapEvents: any }) {
  useMapEvents({ click: onClick });
  return null;
}

function BottomSheet({
  artisan, expanded, dragOffset, onClose, onDragStart, onDragMove, onDragEnd,
}: {
  artisan: Artisan;
  expanded: boolean;
  dragOffset: number;
  onClose: () => void;
  onDragStart: (y: number) => void;
  onDragMove: (y: number) => void;
  onDragEnd: () => void;
}) {
  const heightVh = expanded ? 85 : 50;
  const initials = artisan.name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  const toneStyle = (t: "green" | "blue" | "amber") => {
    if (t === "green") return { bg: "rgba(56,217,138,0.1)", color: "#38D98A", border: "rgba(56,217,138,0.2)" };
    if (t === "blue") return { bg: "rgba(74,159,212,0.1)", color: "#4A9FD4", border: "rgba(74,159,212,0.2)" };
    return { bg: "rgba(242,166,35,0.1)", color: "#FFB347", border: "rgba(242,166,35,0.2)" };
  };

  return (
    <div
      className="pointer-events-auto flex flex-col"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1200,
        height: `${heightVh}vh`,
        transform: `translateY(${dragOffset}px)`,
        background: "#0D0F12",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
        transition: dragOffset === 0 ? "transform 0.32s cubic-bezier(0.32,0.72,0,1), height 0.32s cubic-bezier(0.32,0.72,0,1)" : "none",
        animation: "sheet-up 0.32s cubic-bezier(0.32,0.72,0,1)",
        willChange: "transform",
      }}
    >
      <style>{`@keyframes sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

        <div
          className="pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture(e.pointerId); onDragStart(e.clientY); }}
          onPointerMove={(e) => { if (e.buttons) onDragMove(e.clientY); }}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
        >
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(237,240,245,0.25)" }} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}>
          <div className="flex items-center gap-3">
            <div
              className="rounded-full flex items-center justify-center font-display font-extrabold shrink-0"
              style={{ width: 52, height: 52, background: "linear-gradient(135deg, #C8521A, #8B3A12)", color: "#FFF", fontSize: 18 }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold text-[18px] leading-tight" style={{ color: "#EDF0F5" }}>{artisan.name}</div>
              <div className="text-[13px]" style={{ color: "rgba(237,240,245,0.55)" }}>
                {artisan.trade} • {artisan.area}
              </div>
              <div className="text-[13px] font-medium mt-0.5" style={{ color: "#FFB347" }}>
                ⭐ {artisan.rating.toFixed(1)} <span style={{ color: "rgba(237,240,245,0.55)" }}>({artisan.jobs} interventions)</span>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(237,240,245,0.7)" }}
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {artisan.badges.map((b) => {
              const s = toneStyle(b.tone);
              return (
                <div
                  key={b.label}
                  className="shrink-0 px-3 h-8 rounded-full flex items-center text-[11px] font-semibold whitespace-nowrap"
                  style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                >
                  {b.label}
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { v: <>{artisan.rate}</>, l: "Tarif", color: "#EDF0F5" },
              { v: <><span style={{ color: "#38D98A" }}>●</span> Dispo</>, l: "Statut", color: "#38D98A" },
              { v: <>🚗 {artisan.eta}</>, l: "ETA", color: "#EDF0F5" },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-xl py-3 px-2 text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)" }}
              >
                <div className="font-display font-bold text-[14px]" style={{ color: b.color }}>{b.v}</div>
                <div className="text-[10px] uppercase tracking-wider mt-1" style={{ color: "rgba(237,240,245,0.5)" }}>{b.l}</div>
              </div>
            ))}
          </div>

          <div className="my-5 h-px" style={{ background: "rgba(255,255,255,0.055)" }} />

          <div className="font-display font-bold text-[13px] uppercase tracking-wider mb-3" style={{ color: "rgba(237,240,245,0.7)" }}>
            Derniers avis
          </div>
          <div className="flex flex-col gap-3">
            {artisan.reviews.slice(0, 2).map((r, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.055)" }}
              >
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold"
                  style={{ background: "rgba(200,82,26,0.18)", color: "#C8521A" }}
                >
                  {r.initials.replace(/\./g, "")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="font-semibold" style={{ color: "#EDF0F5" }}>{r.initials}</span>
                    <span style={{ color: "#FFB347" }}>{"★".repeat(r.rating)}</span>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "rgba(237,240,245,0.75)" }}>{r.text}</div>
                  <div className="text-[10.5px] mt-1" style={{ color: "rgba(237,240,245,0.4)" }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              to="/renorides/devis/$artisanId"
              params={{ artisanId: artisan.id }}
              className="w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider active:scale-[0.99] transition flex items-center justify-center"
              style={{ background: "#C8521A", color: "#FFFFFF" }}
            >
              Demander un devis
            </Link>
            <button
              className="w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider active:scale-[0.99] transition"
              style={{ background: "transparent", border: "1px solid #C8521A", color: "#C8521A" }}
            >
              Contacter directement
            </button>
            <Link
              to="/renorides/artisan/$id"
              params={{ id: artisan.id }}
              className="w-full text-center text-[12px] font-semibold underline pt-1"
              style={{ color: "rgba(237,240,245,0.55)" }}
            >
              Voir le profil complet
            </Link>
          </div>
        </div>
    </div>
  );
}
