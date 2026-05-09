import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RePère — On le devient ensemble" },
      {
        name: "description",
        content:
          "La super-app communautaire des pères actifs. 34 services pour protéger sa famille, élever ses enfants, prendre soin de soi.",
      },
      { property: "og:title", content: "RePère — On le devient ensemble" },
      {
        property: "og:description",
        content:
          "La communauté que les pères n'avaient pas. Rejoins la liste d'attente.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
});

const services = [
  { cat: "Urgences & Maison", items: ["RenoRides Urgence", "Garde Flash", "BATIDIAS", "BATIRENOV"] },
  { cat: "Communauté", items: ["Réseau social", "Les Loups", "Classe Scolaire", "Espace Foi", "Entraide", "Finance"] },
  { cat: "Les Secrets", items: ["Confessionnal anonyme", "500 caractères", "6 réactions", "Modération IA"] },
  { cat: "Sport & Soirées", items: ["12 sports", "Tournoi mensuel", "Gaming Night", "Whisky & Cigares", "Poker"] },
  { cat: "Espace Défense", items: ["MMA · JJB · Boxe", "Stands de tir", "Cadre légal", "Juriste partenaire"] },
  { cat: "Beauté & Capillaire", items: ["Beauté IA Soin", "Barbiers partenaires", "Greffe & micropigmentation"] },
  { cat: "Contenu & Formation", items: ["Podcast hebdo", "Formation IA Qualiopi", "Aide aux devoirs IA", "Masterclass"] },
  { cat: "Auto & Moto", items: ["Le test du père", "LOA / LLD", "Tests vidéo SUV famille"] },
];

const tiers = [
  { name: "Père Connecté", price: "0€", period: "Toujours gratuit", features: ["Communauté", "Fil principal", "Lecture contenu"], featured: false },
  { name: "Père Actif", price: "7,90€", period: "/mois", features: ["Tout Connecté", "RenoRides -10%", "Sport & events", "Aide devoirs (limité)"], featured: false },
  { name: "Père Engagé", price: "14,90€", period: "/mois", features: ["Tout Actif", "Aide devoirs illimitée", "Grand Prix mensuel", "Secrets illimités", "Beauté IA"], featured: true },
  { name: "Père Fondateur", price: "29€", period: "/mois", features: ["Tout Engagé", "Box mensuelle 29€ incluse", "Barbier -20%", "Events VIP", "Badge à vie"], featured: false },
];

function Index() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-2xl tracking-wide">
            <span className="text-rust">RE</span>
            <span>PÈRE</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#abos" className="hover:text-foreground transition">Abonnements</a>
            <a href="#manifeste" className="hover:text-foreground transition">Manifeste</a>
            <a href="#waitlist" className="hover:text-foreground transition">Waitlist</a>
          </div>
          <a
            href="#waitlist"
            className="px-4 py-2 bg-rust text-primary-foreground text-sm font-bold uppercase tracking-wider hover:opacity-90 transition"
          >
            Rejoindre
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative grain min-h-screen flex items-center pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, oklch(0.58 0.16 45 / 0.4), transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.45 0.14 40 / 0.3), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-rust/40 text-rust text-xs uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 bg-rust rounded-full animate-pulse" />
              Pré-lancement · Liste d'attente ouverte
            </div>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] uppercase">
              T'as appris à<br />
              <span className="text-rust">conduire.</span><br />
              T'as appris<br />
              ton métier.
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Personne t'a appris à être <span className="text-foreground font-semibold">père</span>. Pourtant c'est le job le plus important que t'as jamais eu.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              La communauté que les pères n'avaient pas. Elle existe. Elle s'appelle <span className="text-rust font-bold">RePère</span>.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#waitlist"
                className="px-8 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-transform"
              >
                Rejoindre le mouvement
              </a>
              <a
                href="#manifeste"
                className="px-8 py-4 border border-foreground/30 font-bold uppercase tracking-widest hover:border-rust hover:text-rust transition"
              >
                Lire le manifeste
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {[
              { v: "9M", l: "Pères en France" },
              { v: "34", l: "Services" },
              { v: "0", l: "Concurrent direct" },
              { v: "750K", l: "Naissances/an" },
            ].map((s) => (
              <div key={s.l} className="border border-border p-6 bg-card/50 backdrop-blur">
                <div className="font-display text-5xl text-rust">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          On le devient ensemble ↓
        </div>
      </section>

      {/* MANIFESTE */}
      <section id="manifeste" className="relative py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">01 — Manifeste</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
            On n'apprend pas<br />à être père.<br />
            <span className="text-rust">On le devient ensemble.</span>
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-12 text-lg">
            <div>
              <div className="font-display text-3xl text-rust mb-3">Protéger</div>
              <p className="text-muted-foreground">Sa famille. Sa maison. Ce qui compte. Les bons réflexes, les bons artisans, les bonnes décisions.</p>
            </div>
            <div>
              <div className="font-display text-3xl text-rust mb-3">Élever</div>
              <p className="text-muted-foreground">Ses enfants. Avec présence. Avec méthode. Avec d'autres pères qui font le même chemin.</p>
            </div>
            <div>
              <div className="font-display text-3xl text-rust mb-3">Devenir</div>
              <p className="text-muted-foreground">Un homme meilleur. Sport, formation, entraide. Le père que t'aurais voulu avoir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-32 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">02 — L'écosystème</div>
              <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95]">
                34 services.<br />
                <span className="text-rust">Une seule app.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              La première super-app pensée exclusivement pour les pères actifs. Aucun concurrent direct. Tout l'écosystème dans un même lieu de confiance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s, i) => (
              <div
                key={s.cat}
                className="bg-background p-8 hover:bg-card transition-colors group"
              >
                <div className="text-xs font-mono text-rust mb-4">0{i + 1}</div>
                <h3 className="font-display text-2xl uppercase mb-6 group-hover:text-rust transition">
                  {s.cat}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-rust">→</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABONNEMENTS */}
      <section id="abos" className="relative py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">03 — Abonnements</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
            4 façons d'en être.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-16">
            Prix volontairement bas au lancement. Rejoins tôt, garde ton tarif Fondateur à vie.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative p-8 border ${
                  t.featured
                    ? "border-rust bg-gradient-to-b from-rust/10 to-transparent"
                    : "border-border bg-card/40"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-rust text-primary-foreground text-xs font-bold uppercase tracking-widest">
                    Recommandé
                  </div>
                )}
                <div className="font-display text-2xl uppercase">{t.name}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-rust">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2 text-muted-foreground">
                      <span className="text-rust mt-1">▸</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="relative py-32 border-t border-border bg-card/30 grain">
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">04 — Liste d'attente</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-6">
            Sois parmi les<br />
            <span className="text-rust">500 premiers.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Accès prioritaire au MVP. Tarif Fondateur garanti. Voix dans la construction de l'app.
          </p>

          {submitted ? (
            <div className="border border-rust p-10 bg-rust/10">
              <div className="font-display text-3xl text-rust mb-2">Bienvenue.</div>
              <p className="text-muted-foreground">
                On t'écrit dès que la prochaine étape s'ouvre. En attendant, parle de RePère autour de toi.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                className="flex-1 px-5 py-4 bg-background border border-border focus:border-rust focus:outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition"
              >
                Je rejoins
              </button>
            </form>
          )}

          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
            Aucun spam. Ton email reste entre nous.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl">
            <span className="text-rust">RE</span>PÈRE
          </div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            © 2026 RePère · On le devient ensemble
          </div>
        </div>
      </footer>
    </main>
  );
}
