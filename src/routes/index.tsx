import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
{/* BARRE URGENCE */}
<div className="bg-rust text-primary-foreground py-2 overflow-hidden">
  <div className="flex gap-12 whitespace-nowrap animate-marquee">
    {[
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
      "🤫 4 287 secrets déposés cette semaine",
      "⚽ Tournoi padel complet en 48h · 32 pères inscrits",
      "🏗️ Devis BATIDIAS reçu en 36h · Rénovation cuisine",
      "💪 Des milliers de pères nous ont rejoints · Rejoins-les",
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
      "🤫 4 287 secrets déposés cette semaine",
      "⚽ Tournoi padel complet en 48h · 32 pères inscrits",
    ].map((text, i) => (
      <span key={i} className="text-sm font-medium">{text}</span>
    ))}
  </div>
</div>
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
  { cat: "Urgences & Maison", items: [
    { name: "RenoRides Urgence", to: "/services/renorides" },
    { name: "Garde Flash", to: "/services/garde-flash" },
    { name: "BATIDIAS", to: "/services/batidias" },
    { name: "BATIRENOV", to: "/services/batirenov" },
  ]},
  { cat: "Communauté", items: [
    { name: "Réseau social", to: "/services/reseau-social" },
    { name: "Les Loups", to: "/services/les-loups" },
    { name: "Classe Scolaire", to: "/services/classe-scolaire" },
    { name: "Espace Foi", to: "/services/espace-foi" },
    { name: "Entraide", to: "/services/entraide-urgence" },
    { name: "Finance", to: "/services/finance" },
  ]},
  { cat: "Les Secrets", items: [
    { name: "Confessionnal anonyme", to: "/services/secrets" },
    { name: "500 caractères", to: "/services/secrets" },
    { name: "6 réactions", to: "/services/secrets" },
    { name: "Modération IA", to: "/services/secrets" },
  ]},
  { cat: "Sport & Soirées", items: [
    { name: "12 sports", to: "/services/sports" },
    { name: "Tournoi mensuel", to: "/services/tournoi-mensuel" },
    { name: "Gaming Night", to: "/services/soirees" },
    { name: "Whisky & Cigares", to: "/services/soirees" },
    { name: "Poker", to: "/services/soirees" },
  ]},
  { cat: "Espace Défense", items: [
    { name: "MMA · JJB · Boxe", to: "/services/arts-martiaux" },
    { name: "Stands de tir", to: "/services/stand-tir" },
    { name: "Cadre légal", to: "/services/cadre-legal" },
    { name: "Juriste partenaire", to: "/services/cadre-legal" },
  ]},
  { cat: "Beauté & Capillaire", items: [
    { name: "Beauté IA Soin", to: "/services/beaute-ia" },
    { name: "Barbiers partenaires", to: "/services/barbiers" },
    { name: "Greffe & micropigmentation", to: "/services/capillaire" },
  ]},
  { cat: "Contenu & Formation", items: [
    { name: "Podcast hebdo", to: "/services/podcast" },
    { name: "Formation IA Qualiopi", to: "/services/formation-ia" },
    { name: "Aide aux devoirs IA", to: "/services/aide-devoirs" },
    { name: "Masterclass", to: "/services/masterclass" },
  ]},
  { cat: "Auto & Moto", items: [
    { name: "Le test du père", to: "/services/auto-moto" },
    { name: "LOA / LLD", to: "/services/auto-moto" },
    { name: "Tests vidéo SUV famille", to: "/services/auto-moto" },
  ]},
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
      <SiteHeader />
      <div className="bg-rust text-primary-foreground py-2 overflow-hidden">
  <div className="flex gap-12 whitespace-nowrap animate-marquee">
    {[
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
      "🤫 4 287 secrets déposés cette semaine",
      "⚽ Tournoi padel complet en 48h · 32 pères inscrits",
      "🏗️ Devis BATIDIAS reçu en 36h · Rénovation cuisine",
      "💪 Des milliers de pères nous ont rejoints · Rejoins-les",
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
    ].map((text, i) => (
      <span key={i} className="text-sm font-medium">{text}</span>
    ))}
  </div>
</div>@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
{/* BARRE URGENCE */}
<div className="bg-rust text-primary-foreground py-2 overflow-hidden">
  <div className="flex gap-12 whitespace-nowrap animate-marquee">
    {[
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
      "🤫 4 287 secrets déposés cette semaine",
      "⚽ Tournoi padel complet en 48h · 32 pères inscrits",
      "🏗️ Devis BATIDIAS reçu en 36h · Rénovation cuisine",
      "💪 Des milliers de pères nous ont rejoints · Rejoins-les",
      "🚨 Michel P. a trouvé un plombier en 6 min · Paris 10ème",
      "👶 Sophie M. disponible maintenant · Garde flash acceptée",
      "🤫 4 287 secrets déposés cette semaine",
      "⚽ Tournoi padel complet en 48h · 32 pères inscrits",
    ].map((text, i) => (
      <span key={i} className="text-sm font-medium">{text}</span>
    ))}
  </div>
</div>
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
                href="#services"
  className="px-8 py-4 border border-foreground/30 font-bold uppercase tracking-widest hover:border-rust hover:text-rust transition"
>
  Découvrir les 34 services →
</a><div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
<div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🚨 Urgences & Artisans</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">👶 Garde d'enfants flash</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🤫 Confessionnal anonyme</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">⚽ Sport & Soirées entre pères</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🥊 Espace Défense</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🏗️ Devis travaux gratuit</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🧴 Beauté & Capillaire</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🎙️ Podcast hebdo</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">📚 Livres enfants</span>
  <span className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full hover:border-rust hover:text-rust transition cursor-pointer">🚙 Auto & Moto</span>
</div>
</div>
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
{/* COMMENT ÇA MARCHE */}
<section className="relative py-32 border-t border-border">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">02 — Simple</div>
    <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-4">
      Comment ça<br />
      <span className="text-rust">marche ?</span>
    </h2>
    <p className="text-muted-foreground max-w-xl mb-16">
      3 étapes. 30 secondes. Et tu rejoins la communauté des pères qui avancent ensemble.
    </p>

    <div className="grid md:grid-cols-3 gap-px bg-border">
      <div className="bg-background p-10 group hover:bg-card transition">
        <div className="font-display text-6xl text-rust mb-6">01</div>
        <h3 className="font-display text-2xl uppercase mb-4">Tu t'inscris</h3>
        <p className="text-muted-foreground leading-relaxed">
          30 secondes. Email + prénom. C'est tout. Accès immédiat à la communauté et aux services gratuits.
        </p>
        <div className="mt-6 text-xs uppercase tracking-widest text-rust">Gratuit pour toujours →</div>
      </div>
      <div className="bg-background p-10 group hover:bg-card transition">
        <div className="font-display text-6xl text-rust mb-6">02</div>
        <h3 className="font-display text-2xl uppercase mb-4">Tu explores</h3>
        <p className="text-muted-foreground leading-relaxed">
          34 services à portée de main. Urgence plomberie, garde d'enfants, podcast, sport, secrets anonymes. Tout est là.
        </p>
        <div className="mt-6 text-xs uppercase tracking-widest text-rust">34 services →</div>
      </div>
      <div className="bg-background p-10 group hover:bg-card transition">
        <div className="font-display text-6xl text-rust mb-6">03</div>
        <h3 className="font-display text-2xl uppercase mb-4">Tu deviens père</h3>
        <p className="text-muted-foreground leading-relaxed">
          Des milliers de pères qui apprennent, s'entraident, se défendent et grandissent ensemble. Tu n'es plus seul.
        </p>
        <div className="mt-6 text-xs uppercase tracking-widest text-rust">Rejoindre →</div>
      </div>
    </div>
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
                    <li key={it.name}>
                      <Link to={it.to} className="flex gap-2 hover:text-rust transition-colors">
                        <span className="text-rust">→</span>
                        <span>{it.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 border border-rust text-rust font-bold uppercase tracking-widest hover:bg-rust hover:text-primary-foreground transition"
            >
              Voir les 34 services <span className="text-xl">→</span>
            </Link>
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
{/* TÉMOIGNAGES */}
<section className="relative py-32 border-t border-border bg-card/30">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">05 — Ils en sont</div>
    <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-16">
      Ce que disent<br />
      <span className="text-rust">les pères.</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="border border-border p-8 bg-background hover:border-rust transition">
        <div className="flex gap-1 text-rust mb-6">★★★★★</div>
        <p className="text-lg leading-relaxed mb-8">
          "Fuite d'eau un dimanche soir à 21h. En 8 minutes j'avais un plombier vérifié en route. Ma femme n'en revenait pas."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rust/20 border border-rust/30 flex items-center justify-center text-rust font-bold">T</div>
          <div>
            <div className="font-bold text-sm">Thomas M.</div>
            <div className="text-xs text-muted-foreground">Père de 2 enfants · Paris 11ème</div>
          </div>
        </div>
      </div>

      <div className="border border-rust bg-rust/5 p-8">
        <div className="flex gap-1 text-rust mb-6">★★★★★</div>
        <p className="text-lg leading-relaxed mb-8">
          "Les Secrets c'est le truc le plus honnête que j'ai trouvé pour les pères. J'ai déposé un secret à 3h du matin. 400 réactions. Je me suis senti moins seul."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rust/20 border border-rust/30 flex items-center justify-center text-rust font-bold">K</div>
          <div>
            <div className="font-bold text-sm">Kévin D.</div>
            <div className="text-xs text-muted-foreground">Père solo · Lyon</div>
          </div>
        </div>
      </div>

      <div className="border border-border p-8 bg-background hover:border-rust transition">
        <div className="flex gap-1 text-rust mb-6">★★★★★</div>
        <p className="text-lg leading-relaxed mb-8">
          "Le tournoi padel du mois avec 31 autres pères. On s'est retrouvés après pour manger. J'ai plus de contacts WhatsApp de pères que depuis des années."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rust/20 border border-rust/30 flex items-center justify-center text-rust font-bold">S</div>
          <div>
            <div className="font-bold text-sm">Sébastien L.</div>
            <div className="text-xs text-muted-foreground">Père de 3 enfants · Bordeaux</div>
          </div>
        </div>
      </div>
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
{/* FAQ */}
<section className="relative py-32 border-t border-border">
  <div className="max-w-3xl mx-auto px-6">
    <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">06 — Questions</div>
    <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] mb-16">
      Les vraies<br />
      <span className="text-rust">questions.</span>
    </h2>

    <div className="space-y-0">
      {[
        {
          q: "C'est vraiment gratuit pour commencer ?",
          a: "Oui. Le plan Père Connecté est et restera toujours gratuit. Tu accèdes à la communauté, aux discussions et tu peux déposer 1 secret par mois. Sans carte bancaire."
        },
        {
          q: "C'est pour quel type de père ?",
          a: "Tous les pères actifs de 25 à 55 ans. Nouveau père, père solo, père en garde partagée, père d'ados. Si tu es père et que tu veux avancer — RePère est pour toi."
        },
        {
          q: "Les artisans sont vraiment vérifiés ?",
          a: "Oui. Chaque artisan fournit son KBIS, son assurance RC Pro et ses certifications métier. Notre équipe vérifie manuellement avant qu'il apparaisse sur la carte."
        },
        {
          q: "C'est disponible partout en France ?",
          a: "Les services digitaux (communauté, podcast, secrets, formation) sont disponibles partout. Les services géolocalisés (artisans, garde, events) démarrent en Île-de-France et s'étendent progressivement."
        },
        {
          q: "Je peux annuler quand je veux ?",
          a: "Oui. Sans engagement, sans frais, sans justification. Tu annules depuis l'app en 2 clics."
        },
        {
          q: "Quand l'app sort ?",
          a: "Le MVP sort pour les 500 premiers inscrits sur la liste d'attente. Inscris-toi maintenant pour être parmi les premiers et garder ton tarif Fondateur à vie."
        },
      ].map((item, i) => (
        <details key={i} className="group border-t border-border py-6 cursor-pointer">
          <summary className="flex items-center justify-between font-bold text-lg uppercase tracking-wide list-none">
            {item.q}
            <span className="text-rust text-2xl group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  </div>
</section>
      <SiteFooter />
    </main>
  );
}
