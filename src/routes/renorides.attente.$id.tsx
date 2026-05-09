import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ARTISANS } from "@/data/renorides-artisans";

export const Route = createFileRoute("/renorides/attente/$id")({
  component: AttentePage,
  head: () => ({
    meta: [
      { title: "Demande envoyée — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

const TOTAL = 600;

function AttentePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const artisan = ARTISANS.find((a) => a.id === id);
  const [secs, setSecs] = useState(TOTAL);
  const [received, setReceived] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const demand = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem(`renorides:demand:${id}`) || "null"); } catch { return null; }
  }, [id]);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    const r = setTimeout(() => setReceived(true), 5000);
    return () => { clearInterval(t); clearTimeout(r); };
  }, []);

  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  const pct = secs / TOTAL;
  const ringColor = pct > 0.5 ? "#38D98A" : pct > 0.25 ? "#FFB347" : "#FF4F4F";
  const dash = 2 * Math.PI * 70;
  const offset = dash * (1 - pct);

  if (!artisan) return null;

  return (
    <main className="min-h-screen flex flex-col font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes pulse-ring { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(2.1); opacity: 0; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-out { to { opacity: 0; transform: scale(0.92); } }
      `}</style>

      <header
        className="sticky top-0 z-20 px-4 flex items-center gap-3"
        style={{
          background: "rgba(7,8,10,0.97)", backdropFilter: "blur(20px)",
          paddingTop: "max(env(safe-area-inset-top), 12px)", paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <button onClick={() => router.history.back()} aria-label="Retour" className="w-11 h-11 -ml-2 rounded-lg flex items-center justify-center active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EDF0F5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="font-display font-bold text-[18px]">Demande envoyée</div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {!received ? (
          <div className="flex flex-col items-center" style={{ animation: "fade-out 0s" }}>
            <div className="relative" style={{ width: 180, height: 180 }}>
              <div className="absolute rounded-full" style={{ inset: 30, background: "rgba(200,82,26,0.18)", animation: "pulse-ring 2s ease-out infinite" }} />
              <div className="absolute rounded-full" style={{ inset: 30, background: "rgba(200,82,26,0.18)", animation: "pulse-ring 2s ease-out 1s infinite" }} />
              <svg className="absolute inset-0 -rotate-90" width="180" height="180">
                <circle cx="90" cy="90" r="70" stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                <circle cx="90" cy="90" r="70" stroke={ringColor} strokeWidth="6" fill="none" strokeLinecap="round"
                  strokeDasharray={dash} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s" }} />
              </svg>
              <div className="absolute inset-[30px] rounded-full flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg,#C8521A,#8B3A12)", boxShadow: "0 8px 32px rgba(200,82,26,0.35)" }}>
                🔒
              </div>
            </div>

            <h1 className="font-display font-bold text-[22px] mt-7 text-center">En attente de {artisan.name}</h1>
            <p className="text-[13.5px] mt-1 text-center" style={{ color: "rgba(237,240,245,0.55)" }}>
              Il a 10 minutes pour répondre à votre demande
            </p>

            <div className="mt-6 font-display font-extrabold text-[44px] tabular-nums" style={{ color: ringColor }}>
              {secs > 0 ? `${m}:${s}` : "00:00"}
            </div>

            {secs === 0 && (
              <Link to="/app/renorides" className="mt-3 text-[13px] underline" style={{ color: "#FF4F4F" }}>
                L'artisan n'a pas répondu — voir les alternatives
              </Link>
            )}
          </div>
        ) : (
          <div
            className="w-full max-w-md p-5 rounded-2xl"
            style={{ background: "#0D0F12", border: "1px solid rgba(200,82,26,0.3)", animation: "slide-up .45s cubic-bezier(.32,.72,0,1)" }}
          >
            <div className="font-display font-bold text-[16px]">💰 Devis reçu de {artisan.name}</div>
            <div className="mt-3 font-display font-extrabold text-[28px]" style={{ color: "#C8521A" }}>75 − 120€</div>
            <div className="text-[12.5px] mt-1" style={{ color: "rgba(237,240,245,0.6)" }}>
              Arrivée estimée : <span style={{ color: "#38D98A" }} className="font-semibold">18h30 (dans 12 min)</span>
            </div>
            <p className="text-[12.5px] mt-3" style={{ color: "rgba(237,240,245,0.7)" }}>
              Déplacement + main d'œuvre. Pièces si nécessaire en supplément.
            </p>
            <div className="mt-3 px-3 py-2 rounded-lg text-[11.5px] font-semibold inline-flex items-center gap-1.5"
              style={{ background: "rgba(56,217,138,0.1)", color: "#38D98A", border: "1px solid rgba(56,217,138,0.2)" }}>
              ✓ Commission RePère (12% membre) : incluse
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={() => navigate({ to: "/renorides/suivi/$id", params: { id } })}
                className="w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider active:scale-[0.99]"
                style={{ background: "#C8521A", color: "#FFF" }}
              >
                Accepter le devis
              </button>
              <button
                onClick={() => navigate({ to: "/app/renorides" })}
                className="w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider"
                style={{ background: "transparent", border: "1px solid #FF4F4F", color: "#FF4F4F" }}
              >
                Refuser
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RECAP */}
      <div className="px-4">
        <div className="p-4 rounded-xl text-[12.5px]" style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="grid grid-cols-[80px_1fr] gap-y-1.5">
            <div style={{ color: "rgba(237,240,245,0.5)" }}>Type</div><div className="font-semibold">{demand?.type || "Intervention"}</div>
            <div style={{ color: "rgba(237,240,245,0.5)" }}>Adresse</div><div>{demand?.address || "—"}</div>
            <div style={{ color: "rgba(237,240,245,0.5)" }}>Artisan</div><div>{artisan.name} • {artisan.trade}</div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 text-center" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="text-[13px] font-semibold" style={{ color: "#FF4F4F" }}>
            Annuler la demande
          </button>
        ) : (
          <div className="flex justify-center gap-3 text-[13px]">
            <span style={{ color: "rgba(237,240,245,0.7)" }}>Confirmer ?</span>
            <Link to="/app/renorides" className="font-bold" style={{ color: "#FF4F4F" }}>Oui, annuler</Link>
            <button onClick={() => setConfirm(false)} className="font-bold" style={{ color: "rgba(237,240,245,0.7)" }}>Non</button>
          </div>
        )}
      </div>
    </main>
  );
}
