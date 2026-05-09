import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ARTISANS } from "@/data/renorides-artisans";

export const Route = createFileRoute("/renorides/note/$id")({
  component: NotePage,
  head: () => ({
    meta: [
      { title: "Notation — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

const CRITERIA = [
  { key: "speed", icon: "⚡", label: "Rapidité", weight: 0.2 },
  { key: "quality", icon: "🔧", label: "Qualité du travail", weight: 0.3 },
  { key: "clean", icon: "🧹", label: "Propreté", weight: 0.15 },
  { key: "comm", icon: "💬", label: "Communication", weight: 0.2 },
  { key: "price", icon: "💰", label: "Rapport qualité/prix", weight: 0.15 },
];

function NotePage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const artisan = ARTISANS.find((a) => a.id === id);
  const [global, setGlobal] = useState(0);
  const [hover, setHover] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  if (!artisan) return null;

  const send = () => setSent(true);

  if (sent) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap'); .font-display{font-family:'Syne',sans-serif} .font-body{font-family:'DM Sans',sans-serif} @keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}} @keyframes confetti{0%{transform:translateY(-20px) rotate(0);opacity:1}100%{transform:translateY(120vh) rotate(360deg);opacity:0}} .confetti{position:absolute;width:8px;height:14px;animation:confetti 2.6s linear forwards}`}</style>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({length: 22}).map((_, i) => (
            <span key={i} className="confetti" style={{ left: `${Math.random()*100}%`, top: `-${Math.random()*30}%`, background: ["#C8521A","#FFB347","#38D98A","#4A9FD4"][i%4], animationDelay: `${Math.random()*0.6}s` }} />
          ))}
        </div>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "#C8521A", color: "#FFF", animation: "pop .5s cubic-bezier(.32,.72,0,1)" }}>✓</div>
        <h1 className="font-display font-bold text-[22px] mt-5">Merci pour votre avis !</h1>
        <p className="text-[13.5px] mt-1" style={{ color: "rgba(237,240,245,0.6)" }}>Vous aidez la communauté RePère</p>
        <Link to="/app/renorides" className="mt-8 px-6 h-12 rounded-xl flex items-center font-display font-bold text-[13px] uppercase tracking-wider"
          style={{ background: "#C8521A", color: "#FFF" }}>
          Retour à la carte
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap'); .font-display{font-family:'Syne',sans-serif} .font-body{font-family:'DM Sans',sans-serif}`}</style>

      <header className="sticky top-0 z-20 px-4 flex items-center gap-3"
        style={{ background: "rgba(7,8,10,0.97)", backdropFilter: "blur(20px)", paddingTop: "max(env(safe-area-inset-top), 12px)", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <button onClick={() => router.history.back()} aria-label="Retour" className="w-11 h-11 -ml-2 rounded-lg flex items-center justify-center active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EDF0F5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="min-w-0">
          <div className="font-display font-bold text-[18px] leading-tight">Comment s'est passée l'intervention ?</div>
          <div className="text-[12px]" style={{ color: "rgba(237,240,245,0.55)" }}>{artisan.name} • {artisan.trade} • Aujourd'hui</div>
        </div>
      </header>

      <div className="px-5 pb-32 max-w-xl mx-auto">
        <div className="flex flex-col items-center mt-6">
          <div className="rounded-full flex items-center justify-center font-display font-extrabold"
            style={{ width: 80, height: 80, background: "linear-gradient(135deg,#C8521A,#8B3A12)", color: "#FFF", fontSize: 26 }}>
            {artisan.name.split(" ").map(p=>p[0]).join("").slice(0,2)}
          </div>
          <div className="mt-3 font-display font-bold text-[16px]">{artisan.name}</div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {[1,2,3,4,5].map((n) => {
            const filled = (hover || global) >= n;
            return (
              <button key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setGlobal(n)}
                className="active:scale-90 transition" style={{ fontSize: 40, color: filled ? "#FFB347" : "rgba(255,255,255,0.2)", lineHeight: 1 }}>
                ★
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-4">
          {CRITERIA.map((c) => (
            <div key={c.key} className="flex items-center justify-between gap-3">
              <div className="text-[13px] flex items-center gap-2 min-w-0">
                <span>{c.icon}</span>
                <span className="font-semibold truncate">{c.label}</span>
              </div>
              <div className="flex gap-1 shrink-0">
                {[1,2,3,4,5].map((n) => {
                  const filled = (scores[c.key] || 0) >= n;
                  return (
                    <button key={n} onClick={() => setScores((s) => ({ ...s, [c.key]: n }))}
                      className="active:scale-90 transition" style={{ fontSize: 18, color: filled ? "#FFB347" : "rgba(255,255,255,0.2)", lineHeight: 1 }}>★</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 400))}
            rows={4}
            placeholder="Partagez votre expérience (optionnel)..."
            className="w-full p-3 rounded-xl text-[14px] resize-none"
            style={{ background: "#131618", border: "1px solid rgba(255,255,255,0.1)", color: "#EDF0F5" }}
          />
          <div className="text-right text-[11px] mt-1" style={{ color: "rgba(237,240,245,0.45)" }}>{comment.length}/400</div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 px-4 pt-3"
        style={{ background: "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.95) 30%, #07080A 100%)", paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        <div className="max-w-xl mx-auto">
          <button onClick={send} disabled={global === 0}
            className="w-full h-14 rounded-xl font-display font-bold text-[15px] uppercase tracking-wider active:scale-[0.99] disabled:opacity-50"
            style={{ background: "#C8521A", color: "#FFF" }}>
            Envoyer mon avis
          </button>
        </div>
      </div>
    </main>
  );
}
