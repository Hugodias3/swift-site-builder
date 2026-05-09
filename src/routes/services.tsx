import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/services")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title: "Services — RePère" },
      {
        name: "description",
        content:
          "34 services pour les pères actifs. Urgences, communauté, sport, défense, formation, beauté, auto.",
      },
      { property: "og:title", content: "Services — RePère" },
      {
        property: "og:description",
        content: "L'écosystème complet pour protéger sa famille, élever ses enfants, prendre soin de soi.",
      },
    ],
  }),
});

const categories = [
  {
    slug: "urgences-maison",
    title: "Urgences & Maison",
    desc: "Quand la chaudière lâche un dimanche soir. Quand la nounou annule à 7h. Les bons réflexes, les bons artisans, les bons réseaux.",
    services: [
      { name: "RenoRides Urgence", to: "/services/renorides", desc: "Artisans géolocalisés vérifiés (KBIS, RC Pro)." },
      { name: "Garde d'Urgence Flash", to: "/services/garde-flash", desc: "Nounous vérifiées. Disponibles en 2h." },
      { name: "BATIDIAS", to: "/services/batidias", desc: "Devis travaux gratuit sous 48h." },
      { name: "BATIRENOV", to: "/services/batirenov", desc: "Conducteur de travaux + accompagnement DIY." },
    ],
    available: true,
  },
  {
    slug: "communaute",
    title: "Communauté & Social",
    desc: "Un fil. Des groupes. Des hommes vrais. Pas un réseau de plus — le seul fait pour des pères.",
    services: [
      { name: "Réseau social général", desc: "Fil principal, discussions, partage." },
      { name: "Les Loups", desc: "Rencontres, célibat, dating post-divorce." },
      { name: "Classe Scolaire", desc: "Groupes privés par classe." },
      { name: "Espace Foi", desc: "Multi-confessionnel, optionnel." },
      { name: "Entraide Urgence", desc: "Besoin d'aide maintenant." },
      { name: "Finance & Investissement", desc: "Éducatif, CGP agréés ORIAS." },
    ],
  },
  {
    slug: "secrets",
    title: "Les Secrets",
    desc: "Le confessionnal numérique. Anonyme. 500 caractères. 6 réactions. Aucun commentaire.",
    services: [{ name: "Confessionnal anonyme", desc: "Modération IA pour détecter les signaux de détresse." }],
  },
  {
    slug: "sport-soirees",
    title: "Sport, Soirées & Activités",
    desc: "12 sports. 6 formats de soirées. Un tournoi mensuel. Des hommes qui se voient en vrai.",
    services: [
      { name: "12 sports", desc: "Padel, foot 5, golf, tennis, boxe, escalade…" },
      { name: "Tournoi Mensuel RePère", desc: "32 pères max/ville. Trophée + soirée." },
      { name: "Gaming, Whisky, Stand-up, Poker…", desc: "6 formats récurrents." },
    ],
  },
  {
    slug: "defense",
    title: "Espace Défense",
    desc: "MMA, JJB, Boxe, tir agréé. Le cadre légal, expliqué par un juriste. Protéger les siens — proprement.",
    services: [
      { name: "Clubs MMA · JJB · Boxe", desc: "Partenaires certifiés. Affiliation 8-12%." },
      { name: "Stands de tir agréés", desc: "Réservation in-app, -15% membres." },
      { name: "Cadre légal expliqué", desc: "Juriste partenaire." },
    ],
  },
  {
    slug: "beaute",
    title: "Beauté & Capillaire",
    desc: "L'IA analyse ta peau, ton cheveu. Routine personnalisée. Barbiers partenaires partout en France.",
    services: [
      { name: "Beauté IA Soin", desc: "Photo → analyse → routine." },
      { name: "Barbiers partenaires", desc: "Géolocalisés. -20% Fondateur." },
      { name: "Capillaire", desc: "Greffe, micropigmentation, prothèse." },
    ],
  },
  {
    slug: "contenu-formation",
    title: "Contenu & Formation",
    desc: "Podcast hebdo. Formation IA Qualiopi finançable CPF. Aide aux devoirs de tes gosses.",
    services: [
      { name: "Podcast hebdo", desc: "Chaque jeudi. Format Guillaume Play." },
      { name: "Formation IA Qualiopi", desc: "CPF finançable. 197-297€." },
      { name: "Aide aux Devoirs IA", desc: "Méthode, pas réponse. CE2 → Terminale." },
      { name: "Masterclass Pères Leaders", desc: "8 sessions. Accès vie entière." },
    ],
  },
  {
    slug: "auto-moto",
    title: "Auto & Moto",
    desc: "Le test du père. Est-ce que la poussette rentre ? L'angle que personne ne fait.",
    services: [
      { name: "Le test du père", desc: "Tests vidéo SUV famille, moto, électrique." },
      { name: "LOA / LLD partenaires", desc: "Commission 250-500€/contrat." },
    ],
  },
];

function ServicesIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative grain pt-32 pb-20 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, oklch(0.58 0.16 45 / 0.4), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-6">L'écosystème complet</div>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.9]">
            34 services.<br />
            <span className="text-rust">Une seule app.</span>
          </h1>
          <p className="mt-8 text-xl text-muted-foreground max-w-3xl">
            Tout ce qu'un père actif peut avoir besoin, dans un seul lieu de confiance. Aucun concurrent direct.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {categories.map((c, i) => (
            <div key={c.slug} className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="text-xs font-mono text-rust mb-4">0{i + 1}</div>
                <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.95]">{c.title}</h2>
                <p className="mt-6 text-muted-foreground">{c.desc}</p>
                {c.available && (
                  <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 border border-rust/40 text-rust text-xs uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-rust rounded-full animate-pulse" />
                    Pages détaillées disponibles
                  </div>
                )}
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
                {c.services.map((s) => {
                  const inner = (
                    <div className="bg-background p-6 h-full hover:bg-card transition group">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-xl uppercase group-hover:text-rust transition">
                            {s.name}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                        </div>
                        {"to" in s && s.to && (
                          <span className="text-rust text-xl shrink-0">→</span>
                        )}
                      </div>
                      {!("to" in s && s.to) && (
                        <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                          Bientôt disponible
                        </div>
                      )}
                    </div>
                  );
                  return "to" in s && s.to ? (
                    <Link key={s.name} to={s.to} className="block">
                      {inner}
                    </Link>
                  ) : (
                    <div key={s.name}>{inner}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
