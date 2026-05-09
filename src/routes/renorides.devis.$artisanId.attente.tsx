import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ARTISANS } from "@/data/renorides-artisans";

export const Route = createFileRoute("/renorides/devis/$artisanId/attente")({
  component: AttentePage,
  head: () => ({
    meta: [
      { title: "En attente de réponse — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function AttentePage() {
  const { artisanId } = Route.useParams();
  const artisan = ARTISANS.find((a) => a.id === artisanId);
  const [secs, setSecs] = useState(600);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <main className="min-h-screen flex flex-col font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.7; } 100% { transform: scale(2.2); opacity: 0; } }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center"
        style={{ paddingTop: "max(env(safe-area-inset-top), 24px)" }}
      >
        <div className="relative mb-8" style={{ width: 110, height: 110 }}>
          <div className="absolute inset-0 rounded-full" style={{ background: "rgba(200,82,26,0.15)", animation: "pulse-ring 2s ease-out infinite" }} />
          <div className="absolute inset-0 rounded-full" style={{ background: "rgba(200,82,26,0.15)", animation: "pulse-ring 2s ease-out 1s infinite" }} />
          <div className="absolute inset-0 rounded-full flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, #C8521A, #8B3A12)", boxShadow: "0 8px 32px rgba(200,82,26,0.4)" }}
          >
            ⏳
          </div>
        </div>

        <h1 className="font-display font-extrabold text-[24px] leading-tight mb-2">
          En attente de réponse
        </h1>
        <p className="text-[14px] max-w-sm" style={{ color: "rgba(237,240,245,0.6)" }}>
          {artisan?.name || "L'artisan"} a reçu votre demande. Vous serez notifié dès réception du devis.
        </p>

        <div className="mt-8 px-5 py-3 rounded-xl"
          style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "rgba(237,240,245,0.5)" }}>
            Temps restant
          </div>
          <div className="font-display font-extrabold text-[32px] tabular-nums" style={{ color: "#C8521A" }}>
            {m}:{s}
          </div>
        </div>
      </div>

      <div className="px-4" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 20px)" }}>
        <Link
          to="/app/renorides"
          className="block w-full text-center rounded-xl font-display font-bold text-[14px] uppercase tracking-wider"
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(237,240,245,0.85)", padding: "16px" }}
        >
          Retour à la carte
        </Link>
      </div>
    </main>
  );
}
