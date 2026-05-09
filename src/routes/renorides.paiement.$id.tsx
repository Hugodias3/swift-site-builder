import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ARTISANS } from "@/data/renorides-artisans";
import { NotifHost, notify } from "@/components/renorides/NotifToast";

export const Route = createFileRoute("/renorides/paiement/$id")({
  component: PaiementPage,
  head: () => ({
    meta: [
      { title: "Paiement — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function PaiementPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const artisan = ARTISANS.find((a) => a.id === id);
  const [method, setMethod] = useState<"card" | "apple" | "new">("card");
  const [step, setStep] = useState<"form" | "loading" | "done">("form");

  if (!artisan) return null;

  const pay = () => {
    setStep("loading");
    setTimeout(() => setStep("done"), 2000);
  };

  return (
    <main className="min-h-screen font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.15); } 100% { transform: scale(1); } }
      `}</style>

      {step === "done" ? (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
            style={{ background: "#38D98A", color: "#06210F", animation: "pop .5s cubic-bezier(.32,.72,0,1)" }}>✓</div>
          <h1 className="font-display font-bold text-[22px]">Paiement confirmé !</h1>
          <p className="text-[13.5px] mt-1" style={{ color: "rgba(237,240,245,0.6)" }}>Facture envoyée par email</p>
          <div className="mt-8 w-full max-w-sm flex flex-col gap-2">
            <button onClick={() => navigate({ to: "/renorides/note/$id", params: { id } })}
              className="w-full h-12 rounded-xl font-display font-bold text-[14px] uppercase tracking-wider"
              style={{ background: "#C8521A", color: "#FFF" }}>
              Laisser un avis
            </button>
            <Link to="/app/renorides" className="w-full h-12 rounded-xl flex items-center justify-center font-display font-bold text-[14px] uppercase tracking-wider"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(237,240,245,0.85)" }}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      ) : (
        <>
          <header className="px-5 pt-10 text-center" style={{ paddingTop: "max(env(safe-area-inset-top), 32px)" }}>
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl"
              style={{ background: "rgba(56,217,138,0.15)", color: "#38D98A", border: "1px solid rgba(56,217,138,0.3)" }}>✅</div>
            <h1 className="font-display font-bold text-[20px] mt-4">Intervention terminée</h1>
            <p className="text-[13px] mt-1" style={{ color: "rgba(237,240,245,0.6)" }}>{artisan.name} a terminé son intervention</p>
          </header>

          <div className="px-4 pb-32 max-w-xl mx-auto">
            {/* RECAP */}
            <div className="mt-6 p-5 rounded-2xl text-[13px]" style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-semibold">{artisan.trade} • Porte claquée</div>
              <div className="mt-1" style={{ color: "rgba(237,240,245,0.55)" }}>Durée : 45 minutes</div>
              <div className="text-[12px]" style={{ color: "rgba(237,240,245,0.55)" }}>Arrivé à 18h35 — Terminé à 19h20</div>
              <div className="my-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <Row label="Main d'œuvre" value="85€" />
              <Row label="Déplacement" value="20€" />
              <div className="my-3 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              <Row label="Sous-total HT" value="105€" muted />
              <Row label="Commission RePère (12%)" value="Incluse ✓" muted accent />
              <div className="mt-3 flex justify-between items-baseline">
                <span className="font-display font-bold text-[14px]">Total TTC</span>
                <span className="font-display font-extrabold text-[20px]" style={{ color: "#C8521A" }}>105€</span>
              </div>
            </div>

            {/* METHODES */}
            <div className="mt-6">
              <div className="font-display font-bold text-[12px] uppercase tracking-wider mb-3" style={{ color: "rgba(237,240,245,0.7)" }}>Choisir le paiement</div>
              <div className="flex flex-col gap-2">
                <PayOpt selected={method === "card"} onClick={() => setMethod("card")}>
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-1 rounded text-[10px] font-extrabold" style={{ background: "#1434CB", color: "#FFF", letterSpacing: 1 }}>VISA</div>
                    <div className="text-[13.5px] tracking-wider">•••• •••• •••• 4242</div>
                  </div>
                </PayOpt>
                <PayOpt selected={method === "apple"} onClick={() => setMethod("apple")}>
                  <div className="flex items-center gap-3">
                    <div className="text-[18px]"></div>
                    <div className="text-[13.5px] font-semibold">Apple Pay</div>
                  </div>
                </PayOpt>
                <PayOpt selected={method === "new"} onClick={() => setMethod("new")} dashed>
                  <div className="text-[13px] font-semibold" style={{ color: "rgba(237,240,245,0.7)" }}>+ Ajouter une carte</div>
                </PayOpt>
              </div>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-20 px-4 pt-3"
            style={{
              background: "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.95) 30%, #07080A 100%)",
              paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
            }}>
            <div className="max-w-xl mx-auto">
              <button onClick={pay} disabled={step === "loading"}
                className="w-full rounded-xl font-display font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
                style={{ background: "#C8521A", color: "#FFF", height: 56 }}>
                {step === "loading" ? (
                  <><span className="inline-block w-5 h-5 rounded-full"
                    style={{ border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                    <span>Paiement…</span></>
                ) : <>Payer 105€ →</>}
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function Row({ label, value, muted, accent }: { label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between items-baseline py-1">
      <span style={{ color: muted ? "rgba(237,240,245,0.6)" : "#EDF0F5" }}>{label}</span>
      <span className="font-semibold" style={{ color: accent ? "#38D98A" : "#EDF0F5" }}>{value}</span>
    </div>
  );
}

function PayOpt({ selected, onClick, children, dashed }: { selected: boolean; onClick: () => void; children: React.ReactNode; dashed?: boolean }) {
  return (
    <button onClick={onClick} className="w-full text-left p-4 rounded-xl active:scale-[0.99] transition"
      style={{
        background: selected ? "rgba(200,82,26,0.1)" : "#131618",
        border: selected ? "1px solid #C8521A" : `${dashed ? "1.5px dashed" : "1px solid"} rgba(255,255,255,0.1)`,
      }}>
      {children}
    </button>
  );
}
