import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

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

      {/* BARRE TICKER */}
      <div className="bg-rust text-white py-2 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{animation: "marquee 30s linear infinite"}}>
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
      </div>

      {/* HERO */}
      <section id="top" className="relative grain min-h-screen flex items-center pt-24 pb-16">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background: "radial-gradient(ellipse at 30% 20%, oklch(0.58 0.16 45 / 0.4), transparent 60%)"}} />
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
              <a href="#waitlist" className="px-8 py-4 bg-rust text-white font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-transform">
                Rejoindre le mouvement
              </a>
              <a href="#services" className="px-8 py-4 border border-foreground/30 font-bold uppercase tracking-widest hover:border-rust hover:text-rust transition">
                Découvrir les 34 services →
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["🚨 Urgences & Artisans","👶 Garde d'enfants flash","🤫 Confessionnal anonyme","⚽ Sport & Soirées","🥊 Espace Défense","🏗️ Devis travaux gratuit","🧴 Beauté & Capillaire","🎙️ Podcast hebdo","📚 Livres enfants","🚙 Auto & Moto"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-full text-sm text-muted-foreground hover:border-rust hover:text-rust transition cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {[{v:"9M",l:"Pères en France"},{v:"34",l:"Services"},{v:"0",l:"Concurrent direct"},{v:"750K",l:"Naissances/an"}].map((s) => (
              <div key={s.l} className="border border-border p-6 bg-card/50 backdrop-blur">
                <div className="font-display text-5xl text-rust">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground">On le devient ensemble ↓</div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section className="relative py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">02 — Simple</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-4">Comment ça<br /><span className="text-rust">marche ?</span></h2>
          <p className="text-muted-foreground max-w-xl mb-16">3 étapes. 30 secondes. Et tu rejoins la communauté des pères qui avancent ensemble.</p>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {n:"01",t:"Tu t'inscris",d:"30 secondes. Email + prénom. C'est tout. Accès immédiat à la communauté et aux services gratuits.",l:"Gratuit pour toujours →"},
              {n:"02",t:"Tu explores",d:"34 services à portée de main. Urgence plomberie, garde d'enfants, podcast, sport, secrets anonymes. Tout est là.",l:"34 services →"},
              {n:"03",t:"Tu deviens père",d:"Des milliers de pères qui apprennent, s'entraident, se défendent et grandissent ensemble. Tu n'es plus seul.",l:"Rejoindre →"},
            ].map((step) => (
              <div key={step.n} className="bg-background p-10 hover:bg-card transition">
                <div className="font-display text-6xl text-rust mb-6">{step.n}</div>
                <h3 className="font-display text-2xl uppercase mb-4">{step.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.d}</p>
                <div className="mt-6 text-xs uppercase tracking-widest text-rust">{step.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-32 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">03 — L'écosystème</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-16">34 services.<br /><span className="text-rust">Une seule app.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {services.map((s, i) => (
              <div key={s.cat} className="bg-background p-8 hover:bg-card transition-colors group">
                <div className="text-xs font-mono text-rust mb-4">0{i + 1}</div>
                <h3 className="font-display text-2xl uppercase mb-6 group-hover:text-rust transition">{s.cat}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {s.items.map((it) => (
                    <li key={it.name}><Link to={it.to} className="flex gap-2 hover:text-rust transition-colors"><span className="text-rust">→</span><span>{it.name}</span></Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-3 px-8 py-4 border border-rust text-rust font-bold uppercase tracking-widest hover:bg-rust hover:text-white transition">
              Voir les 34 services <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ABONNEMENTS */}
      <section id="abos" className="relative py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">04 — Abonnements</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-4">4 façons d'en être.</h2>
          <p className="text-muted-foreground max-w-2xl mb-16">Prix volontairement bas au lancement. Rejoins tôt, garde ton tarif Fondateur à vie.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => (
              <div key={t.name} className={`relative p-8 border ${t.featured ? "border-rust bg-gradient-to-b from-rust/10 to-transparent" : "border-border bg-card/40"}`}>
                {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-rust text-white text-xs font-bold uppercase tracking-widest">Recommandé</div>}
                <div className="font-display text-2xl uppercase">{t.name}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-rust">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {t.features.map((f) => (<li key={f} className="flex gap-2 text-muted-foreground"><span className="text-rust mt-1">▸</span><span>{f}</span></li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="relative py-32 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">05 — Ils en sont</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-16">Ce que disent<br /><span className="text-rust">les pères.</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {init:"T",name:"Thomas M.",loc:"Père de 2 enfants · Paris 11ème",text:"\"Fuite d'eau un dimanche soir à 21h. En 8 minutes j'avais un plombier vérifié en route. Ma femme n'en revenait pas.\"",featured:false},
              {init:"K",name:"Kévin D.",loc:"Père solo · Lyon",text:"\"Les Secrets c'est le truc le plus honnête que j'ai trouvé pour les pères. J'ai déposé un secret à 3h du matin. 400 réactions. Je me suis senti moins seul.\"",featured:true},
              {init:"S",name:"Sébastien L.",loc:"Père de 3 enfants · Bordeaux",text:"\"Le tournoi padel du mois avec 31 autres pères. On s'est retrouvés après pour manger. J'ai plus de contacts WhatsApp de pères que depuis des années.\"",featured:false},
            ].map((t) => (
              <div key={t.name} className={`border p-8 ${t.featured ? "border-rust bg-rust/5" : "border-border bg-background hover:border-rust transition"}`}>
                <div className="flex gap-1 text-rust mb-6">★★★★★</div>
                <p className="text-lg leading-relaxed mb-8">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rust/20 border border-rust/30 flex items-center justify-center text-rust font-bold">{t.init}</div>
                  <div><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-muted-foreground">{t.loc}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="relative py-32 border-t border-border bg-card/30 grain">
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">06 — Liste d'attente</div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] mb-6">Sois parmi les<br /><span className="text-rust">500 premiers.</span></h2>
          <p className="text-lg text-muted-foreground mb-10">Accès prioritaire au MVP. Tarif Fondateur garanti. Voix dans la construction de l'app.</p>
          {submitted ? (
            <div className="border border-rust p-10 bg-rust/10">
              <div className="font-display text-3xl text-rust mb-2">Bienvenue.</div>
              <p className="text-muted-foreground">On t'écrit dès que la prochaine étape s'ouvre. En attendant, parle de RePère autour de toi.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ton@email.com" className="flex-1 px-5 py-4 bg-background border border-border focus:border-rust focus:outline-none text-foreground placeholder:text-muted-foreground" />
              <button type="submit" className="px-8 py-4 bg-rust text-white font-bold uppercase tracking-widest hover:opacity-90 transition">Je rejoins</button>
            </form>
          )}
          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Aucun spam. Ton email reste entre nous.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">07 — Questions</div>
          <h2 className="font-display text-5xl md:text-6xl uppercase leading-[0.95] mb-16">Les vraies<br /><span className="text-rust">questions.</span></h2>
          <div className="space-y-0">
            {[
              {q:"C'est vraiment gratuit pour commencer ?",a:"Oui. Le plan Père Connecté est et restera toujours gratuit. Tu accèdes à la communauté, aux discussions et tu peux déposer 1 secret par mois. Sans carte bancaire."},
              {q:"C'est pour quel type de père ?",a:"Tous les pères actifs de 25 à 55 ans. Nouveau père, père solo, père en garde partagée, père d'ados. Si tu es père et que tu veux avancer — RePère est pour toi."},
              {q:"Les artisans sont vraiment vérifiés ?",a:"Oui. Chaque artisan fournit son KBIS, son assurance RC Pro et ses certifications métier. Notre équipe vérifie manuellement avant qu'il apparaisse sur la carte."},
              {q:"C'est disponible partout en France ?",a:"Les services digitaux sont disponibles partout. Les services géolocalisés démarrent en Île-de-France et s'étendent progressivement."},
              {q:"Je peux annuler quand je veux ?",a:"Oui. Sans engagement, sans frais, sans justification. Tu annules depuis l'app en 2 clics."},
              {q:"Quand l'app sort ?",a:"Le MVP sort pour les 500 premiers inscrits sur la liste d'attente. Inscris-toi maintenant pour être parmi les premiers et garder ton tarif Fondateur à vie."},
            ].map((item, i) => (
              <details key={i} className="group border-t border-border py-6 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg uppercase tracking-wide list-none">
                  {item.q}
                  <span className="text-rust text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}