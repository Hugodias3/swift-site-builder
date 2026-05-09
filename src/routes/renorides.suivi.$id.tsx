import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ARTISANS } from "@/data/renorides-artisans";
import { NotifHost, notify } from "@/components/renorides/NotifToast";

export const Route = createFileRoute("/renorides/suivi/$id")({
  component: SuiviPage,
  head: () => ({
    meta: [
      { title: "Suivi en route — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

const USER: [number, number] = [48.8566, 2.3522];

function SuiviPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const artisan = ARTISANS.find((a) => a.id === id);

  const [Map, setMap] = useState<any>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 (1 = arrived)
  const [eta, setEta] = useState(8);
  const [confirm, setConfirm] = useState(false);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const RL = await import("react-leaflet");
      if (alive) setMap({ L, ...RL });
    })();
    return () => { alive = false; };
  }, []);

  const fired5 = useRef(false);
  const firedArrived = useRef(false);

  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => {
        const np = Math.min(1, p + 1 / 60); // arrives in ~60s for demo
        if (np >= 1 && !firedArrived.current) {
          firedArrived.current = true;
          setArrived(true);
          notify("arrived", `${artisan?.name ?? "Artisan"} est arrivé`, "Il vous attend devant la porte. Confirmez l'arrivée.");
        }
        return np;
      });
      setEta((e) => {
        const ne = Math.max(0, +(e - 8 / 60).toFixed(1));
        if (!fired5.current && e > 5 && ne <= 5) {
          fired5.current = true;
          notify("eta", `${artisan?.name ?? "Artisan"} arrive dans 5 min`, "Préparez-vous à l'accueillir devant chez vous.");
        }
        return ne;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [artisan?.name]);

  const start: [number, number] = artisan ? [artisan.lat, artisan.lng] : USER;
  const current: [number, number] = useMemo(
    () => [start[0] + (USER[0] - start[0]) * progress, start[1] + (USER[1] - start[1]) * progress],
    [progress, start[0], start[1]]
  );

  if (!artisan) return null;

  return (
    <main className="fixed inset-0 overflow-hidden font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <NotifHost />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        .leaflet-container { background: #07080A !important; }
        .leaflet-control-attribution { background: rgba(7,8,10,0.6) !important; color: rgba(237,240,245,0.4) !important; font-size: 9px !important; }
        @keyframes pulse-dot { 0%,100% { box-shadow: 0 0 0 0 rgba(56,217,138,0.6); } 50% { box-shadow: 0 0 0 8px rgba(56,217,138,0); } }
        @keyframes slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
      `}</style>

      <div className="absolute inset-0">
        {Map && (
          <Map.MapContainer
            center={[(start[0]+USER[0])/2,(start[1]+USER[1])/2]}
            zoom={14}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <Map.TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; OSM &copy; CARTO' />
            <Map.Polyline positions={[current, USER]} pathOptions={{ color: "#C8521A", weight: 4, opacity: 0.85, dashArray: "8 6" }} />
            <Map.Marker
              position={USER}
              icon={Map.L.divIcon({
                className: "",
                html: `<div style="width:22px;height:22px;border-radius:50%;background:#3B82F6;border:3px solid #07080A;box-shadow:0 0 0 2px rgba(59,130,246,0.4)"></div>`,
                iconSize: [22, 22], iconAnchor: [11, 11],
              })}
            />
            <Map.Marker
              position={current}
              icon={Map.L.divIcon({
                className: "",
                html: `<div style="display:flex;flex-direction:column;align-items:center;transition:all 1s linear">
                  <div style="width:42px;height:42px;border-radius:50%;background:#C8521A;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #0D0F12;box-shadow:0 4px 16px rgba(200,82,26,0.5)">${artisan.emoji}</div>
                  <div style="margin-top:4px;background:rgba(13,15,18,0.95);color:#EDF0F5;font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px;border:1px solid rgba(255,255,255,0.08)">${arrived ? "Arrivé" : `${Math.max(1, Math.ceil(eta))} min`}</div>
                </div>`,
                iconSize: [44, 60], iconAnchor: [22, 22],
              })}
            />
          </Map.MapContainer>
        )}
      </div>

      {/* TOP BANNER */}
      {(eta < 5 || arrived) && (
        <div
          className="absolute top-0 inset-x-0 z-[1000] px-4 py-3 text-center text-[13px] font-semibold"
          style={{
            background: arrived ? "rgba(56,217,138,0.95)" : "rgba(255,179,71,0.95)",
            color: arrived ? "#06210F" : "#3B2200",
            paddingTop: "max(env(safe-area-inset-top), 12px)",
            animation: "slide-down .35s ease-out",
          }}
        >
          {arrived ? "🔔 " + artisan.name + " est arrivé" : `${artisan.name} arrive dans ${Math.max(1, Math.ceil(eta))} minutes`}
        </div>
      )}

      {/* PANEL BAS */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1000] p-5"
        style={{
          background: "#0D0F12",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          paddingBottom: "max(env(safe-area-inset-bottom), 18px)",
          minHeight: 220,
          boxShadow: "0 -20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center font-display font-extrabold shrink-0"
            style={{ width: 44, height: 44, background: "linear-gradient(135deg,#C8521A,#8B3A12)", color: "#fff", fontSize: 14 }}>
            {artisan.name.split(" ").map(p=>p[0]).join("").slice(0,2)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display font-bold text-[16px] leading-tight">{artisan.name} {arrived ? "est arrivé" : "est en route"}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full" style={{ background: "#38D98A", animation: "pulse-dot 1.4s ease-in-out infinite" }} />
              <span className="text-[12px]" style={{ color: "rgba(237,240,245,0.7)" }}>
                {arrived ? "Sur place" : "En route vers vous"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <div className="font-display font-extrabold text-[32px]" style={{ color: "#C8521A" }}>
            {arrived ? "0 min" : `${Math.max(1, Math.ceil(eta))} min`}
          </div>
          <div className="text-[12px]" style={{ color: "rgba(237,240,245,0.55)" }}>Arrivée estimée 18h34</div>
        </div>

        {!arrived ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { i: "📞", l: "Chat", on: () => alert("Chat in-app (mock)") },
              { i: "🗺️", l: "Itinéraire", on: () => window.open(`https://www.google.com/maps/dir/?api=1&destination=${USER[0]},${USER[1]}`) },
              { i: "❌", l: "Annuler", on: () => setConfirm(true) },
            ].map((b) => (
              <button key={b.l} onClick={b.on} className="rounded-xl py-3 active:scale-95 transition"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-[18px]">{b.i}</div>
                <div className="text-[11px] mt-1 font-semibold" style={{ color: "rgba(237,240,245,0.85)" }}>{b.l}</div>
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => navigate({ to: "/renorides/paiement/$id", params: { id } })}
            className="mt-4 w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider active:scale-[0.99]"
            style={{ background: "#38D98A", color: "#06210F" }}
          >
            ✓ Confirmer l'arrivée
          </button>
        )}

        {confirm && (
          <div className="mt-3 p-3 rounded-lg text-[12px] flex items-center justify-between" style={{ background: "rgba(255,79,79,0.08)", border: "1px solid rgba(255,79,79,0.3)" }}>
            <span style={{ color: "#EDF0F5" }}>Annuler ? Des frais peuvent s'appliquer.</span>
            <div className="flex gap-3">
              <button onClick={() => navigate({ to: "/app/renorides" })} className="font-bold" style={{ color: "#FF4F4F" }}>Oui</button>
              <button onClick={() => setConfirm(false)} className="font-bold" style={{ color: "rgba(237,240,245,0.7)" }}>Non</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
