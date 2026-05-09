import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/les-loups")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Les Loups"
      tagline="Rencontres. Célibat. Dating post-divorce."
      description="1 mariage sur 2 finit en divorce. Des millions de pères solos, recomposés, en garde partagée. Les Loups, c'est l'espace dating qui comprend ta réalité — gosses, planning, week-ends alternés inclus. Sans jugement."
      stats={[
        { value: "50%", label: "Divorces en France" },
        { value: "100%", label: "Profils vérifiés" },
        { value: "Solo", label: "Garde partagée OK" },
        { value: "0", label: "Swipe abrutissant" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Profil père", text: "Tu indiques ta situation : solo, garde alternée, mode de vie. Pas de filtre déguisé." },
        { step: "02", title: "Matching pertinent", text: "Algorithme basé sur la compatibilité de vie, pas seulement l'apparence." },
        { step: "03", title: "Rencontres réelles", text: "Events Loups en présentiel : afterworks, dîners pères solos, week-ends." },
      ]}
      features={[
        { title: "Profils vérifiés", text: "Selfie obligatoire + ID. Zéro fake, zéro bot." },
        { title: "Filtres sérieux", text: "Localisation, garde, projet de vie. Pas que la photo." },
        { title: "Events présentiels", text: "Afterworks Loups, dîners pères solos, sorties parents-enfants." },
        { title: "Confidentialité", text: "Mode discret, photos floutables, contrôle total sur ta visibilité." },
      ]}
      trust={[
        "Identité contrôlée (ID + selfie)",
        "Modération signalements sous 1h",
        "Bannissement immédiat sur comportement abusif",
        "Pas de revente de données à des tiers",
      ]}
      faq={[
        { q: "C'est réservé aux pères solos ?", a: "Non. Pères célibataires, divorcés, séparés, recomposés. La condition : être un père vérifié." },
        { q: "Et les femmes ?", a: "Les rencontres se font avec des femmes inscrites sur la plateforme partenaire (cross-matching opt-in). Pas d'inscription féminine directe sur RePère." },
        { q: "Combien ça coûte ?", a: "Inclus pour Père Engagé et Fondateur. Accès limité pour Père Actif." },
      ]}
      next={{ label: "Classe Scolaire", to: "/services/classe-scolaire" }}
    />
  ),
  head: () => ({ meta: [{ title: "Les Loups — Dating post-divorce | RePère" }] }),
});
