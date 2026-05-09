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
      { name: "RenoRides Urgence", to: "/services/renorides", desc: "Artisans géolocalisés vérifiés." },
      { name: "Garde d'Urgence Flash", to: "/services/garde-flash", desc: "Nounous vérifiées, dispo en 2h." },
      { name: "BATIDIAS", to: "/services/batidias", desc: "Devis travaux gratuit sous 48h." },
      { name: "BATIRENOV", to: "/services/batirenov", desc: "Conducteur de travaux + DIY." },
    ],
  },
  {
    slug: "communaute",
    title: "Communauté & Social",
    desc: "Un fil. Des groupes. Des hommes vrais. Pas un réseau de plus — le seul fait pour des pères.",
    services: [
      { name: "Réseau Social", to: "/services/reseau-social", desc: "Le fil pensé pour des pères." },
      { name: "Les Loups", to: "/services/les-loups", desc: "Dating post-divorce." },
      { name: "Classe Scolaire", to: "/services/classe-scolaire", desc: "Groupes privés par classe." },
      { name: "Espace Foi", to: "/services/espace-foi", desc: "Multi-confessionnel, optionnel." },
      { name: "Entraide Urgence", to: "/services/entraide-urgence", desc: "Besoin d'aide maintenant." },
      { name: "Finance & Investissement", to: "/services/finance", desc: "Éducatif, CGP agréés ORIAS." },
    ],
  },
  {
    slug: "secrets",
    title: "Les Secrets",
    desc: "Le confessionnal numérique. Anonyme. 500 caractères. 6 réactions. Aucun commentaire.",
    services: [
      { name: "Confessionnal anonyme", to: "/services/secrets", desc: "500 caractères, 6 réactions, aucun débat." },
    ],
  },
  {
    slug: "sport-soirees",
    title: "Sport, Soirées & Activités",
    desc: "12 sports. 6 formats de soirées. Un tournoi mensuel. Des hommes qui se voient en vrai.",
    services: [
      { name: "12 sports", to: "/services/sports", desc: "Padel, foot 5, golf, tennis, boxe…" },
      { name: "Tournoi Mensuel RePère", to: "/services/tournoi-mensuel", desc: "32 pères max/ville, trophée + soirée." },
      { name: "Soirées RePère", to: "/services/soirees", desc: "Gaming, Whisky, Stand-up, Poker…" },
    ],
  },
  {
    slug: "defense",
    title: "Espace Défense",
    desc: "MMA, JJB, Boxe, tir agréé. Le cadre légal, expliqué par un juriste. Protéger les siens — proprement.",
    services: [
      { name: "MMA · JJB · Boxe", to: "/services/arts-martiaux", desc: "Clubs certifiés. -15% membres." },
      { name: "Stands de tir", to: "/services/stand-tir", desc: "Agréés FFTir. Réservation in-app." },
      { name: "Cadre légal", to: "/services/cadre-legal", desc: "Ce qu'on a le droit ou non." },
    ],
  },
  {
    slug: "beaute",
    title: "Beauté & Capillaire",
    desc: "L'IA analyse ta peau, ton cheveu. Routine personnalisée. Barbiers partenaires partout en France.",
    services: [
      { name: "Beauté IA Soin", to: "/services/beaute-ia", desc: "Photo → analyse → routine." },
      { name: "Barbiers partenaires", to: "/services/barbiers", desc: "Géolocalisés. -20% Fondateur." },
      { name: "Capillaire", to: "/services/capillaire", desc: "Greffe, micropigmentation, prothèse." },
    ],
  },
  {
    slug: "contenu-formation",
    title: "Contenu & Formation",
    desc: "Podcast hebdo. Formation IA Qualiopi finançable CPF. Aide aux devoirs de tes gosses. Masterclass.",
    services: [
      { name: "Podcast hebdo", to: "/services/podcast", desc: "Chaque jeudi." },
      { name: "Formation IA Qualiopi", to: "/services/formation-ia", desc: "CPF finançable. 197-297€." },
      { name: "Aide aux Devoirs IA", to: "/services/aide-devoirs", desc: "Méthode, pas réponse." },
      { name: "Masterclass Pères Leaders", to: "/services/masterclass", desc: "8 sessions, accès vie entière." },
    ],
  },
  {
    slug: "auto-moto",
    title: "Auto & Moto",
    desc: "Le test du père. Est-ce que la poussette rentre ? L'angle que personne ne fait.",
    services: [
      { name: "Auto & Moto", to: "/services/auto-moto", desc: "Tests vidéo + LOA / LLD." },
    ],
  },
  {
    slug: "livres",
    title: "Livres Enfants",
    desc: "Des livres illustrés où le métier du papa est le super-pouvoir. 12 métiers prévus.",
    services: [
      { name: "Livres Enfants RePère", to: "/services/livres-enfants", desc: "14,90€ — ou inclus box Fondateur." },
    ],
  },
  {
    slug: "affiliation",
    title: "Affiliation & Services Pratiques",
    desc: "Mutuelle, patrimoine, crédit, avocat, bilan santé. Mise en relation avec des partenaires agréés.",
    services: [
      { name: "Services Pratiques", to: "/services/services-pratiques", desc: "Mutuelle, CGP, crédit, avocat…" },
    ],
  },
  {
    slug: "gains",
    title: "Gains, Tirage & Parrainage",
    desc: "Grand Prix mensuel 35 000€. Gains hebdo. Parrainage 3 niveaux.",
    services: [
      { name: "Tirage & Parrainage", to: "/services/tirage-parrainage", desc: "35K€/mois + 15€/5€/3% parrainage." },
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
              </div>
              <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
                {c.services.map((s) => (
                  <Link
                    key={s.name}
                    to={s.to}
                    className="block bg-background p-6 h-full hover:bg-card transition group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl uppercase group-hover:text-rust transition">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                      </div>
                      <span className="text-rust text-xl shrink-0">→</span>
                    </div>
                  </Link>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
