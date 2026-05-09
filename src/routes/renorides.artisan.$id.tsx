import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ARTISANS } from "@/data/renorides-artisans";

export const Route = createFileRoute("/renorides/artisan/$id")({
  component: ArtisanProfile,
  head: () => ({
    meta: [
      { title: "Profil artisan — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function ArtisanProfile() {
  const { id } = Route.useParams();
  const router = useRouter();
  const artisan = ARTISANS.find((a) => a.id === id);
  if (!artisan) return null;
  const initials = artisan.name.split(" ").map(p=>p[0]).join("").slice(0,2);

  return (
    <main className="min-h-screen font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap'); .font-display{font-family:'Syne',sans-serif} .font-body{font-family:'DM Sans',sans-serif}`}</style>

      <header className="sticky top-0 z-20 px-4 flex items-center gap-3"
        style={{ background: "rgba(7,8,10,0.97)", backdropFilter: "blur(20px)", paddingTop: "max(env(safe-area-inset-top), 12px)", paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <button onClick={() => router.history.back()} aria-label="Retour" className="w-11 h-11 -ml-2 rounded-lg flex items-center justify-center active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EDF0F5" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="font-display font-bold text-[16px]">Profil artisan</div>
      </header>

      <div className="px-5 pb-32 max-w-xl mx-auto">
        <div className="flex flex-col items-center pt-6 text-center">
          <div className="rounded-full flex items-center justify-center font-display font-extrabold"
            style={{ width: 88, height: 88, background: "linear-gradient(135deg,#C8521A,#8B3A12)", color: "#FFF", fontSize: 28 }}>{initials}</div>
          <h1 className="font-display font-bold text-[22px] mt-3">{artisan.name}</h1>
          <p className="text-[13px]" style={{ color: "rgba(237,240,245,0.6)" }}>{artisan.trade} • {artisan.area}</p>
          <div className="mt-2 text-[14px] font-medium" style={{ color: "#FFB347" }}>
            ⭐ {artisan.rating.toFixed(1)} <span style={{ color: "rgba(237,240,245,0.55)" }}>({artisan.jobs} interventions)</span>
          </div>
        </div>

        {/* BADGES */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {artisan.badges.map((b) => {
            const tone = b.tone === "green" ? { bg: "rgba(56,217,138,0.1)", color: "#38D98A", border: "rgba(56,217,138,0.2)" }
              : b.tone === "blue" ? { bg: "rgba(74,159,212,0.1)", color: "#4A9FD4", border: "rgba(74,159,212,0.2)" }
              : { bg: "rgba(242,166,35,0.1)", color: "#FFB347", border: "rgba(242,166,35,0.2)" };
            return (
              <div key={b.label} title={b.label} className="px-3 h-8 rounded-full flex items-center text-[11px] font-semibold"
                style={{ background: tone.bg, color: tone.color, border: `1px solid ${tone.border}` }}>{b.label}</div>
            );
          })}
        </div>

        {/* HISTORIQUE */}
        <Section title="Historique">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: "Ce mois", v: "12" },
              { k: "Trim.", v: "34" },
              { k: "Total", v: String(artisan.jobs) },
            ].map((s) => (
              <div key={s.k} className="rounded-xl py-3 text-center"
                style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.055)" }}>
                <div className="font-display font-extrabold text-[20px]" style={{ color: "#C8521A" }}>{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: "rgba(237,240,245,0.5)" }}>{s.k}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* GALERIE */}
        <Section title="Galerie de travaux">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-2xl"
                style={{ background: `linear-gradient(135deg, rgba(200,82,26,${0.08+i*0.03}), rgba(13,15,18,1))`, border: "1px solid rgba(255,255,255,0.05)" }}>
                {artisan.emoji}
              </div>
            ))}
          </div>
        </Section>

        {/* AVIS */}
        <Section title={`Avis (${artisan.jobs})`}>
          <div className="flex flex-col gap-3">
            {artisan.reviews.concat(artisan.reviews).map((r, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl"
                style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.055)" }}>
                <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-[12px] font-bold"
                  style={{ background: "rgba(200,82,26,0.18)", color: "#C8521A" }}>{r.initials.replace(/\./g,"")}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="font-semibold">{r.initials}</span>
                    <span style={{ color: "#FFB347" }}>{"★".repeat(r.rating)}</span>
                  </div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "rgba(237,240,245,0.78)" }}>{r.text}</div>
                  <div className="text-[10.5px] mt-1" style={{ color: "rgba(237,240,245,0.4)" }}>{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 px-4 pt-3"
        style={{ background: "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.95) 30%, #07080A 100%)", paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}>
        <div className="max-w-xl mx-auto">
          <Link to="/renorides/devis/$artisanId" params={{ artisanId: id }}
            className="w-full h-14 rounded-xl flex items-center justify-center font-display font-bold text-[15px] uppercase tracking-wider"
            style={{ background: "#C8521A", color: "#FFF" }}>
            Demander un devis
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <div className="font-display font-bold text-[12px] uppercase tracking-wider mb-3" style={{ color: "rgba(237,240,245,0.7)" }}>{title}</div>
      {children}
    </div>
  );
}
