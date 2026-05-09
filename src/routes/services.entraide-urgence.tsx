import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/entraide-urgence")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Entraide Urgence"
      tagline="Besoin d'aide. Maintenant."
      description="Tu déménages dans 3h, ton beau-père est aux urgences, ton frigo lâche un dimanche. Tu poses ton SOS dans la communauté. Les pères proches géographiquement reçoivent une notif. Karma RePère en retour."
      stats={[
        { value: "< 1h", label: "Réponse moyenne" },
        { value: "5 km", label: "Rayon par défaut" },
        { value: "Karma", label: "Système gamifié" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu poses ton SOS", text: "Type de besoin, urgence, localisation. 30 secondes." },
        { step: "02", title: "Notif aux proches", text: "Les pères du rayon reçoivent une notif silencieuse mais visible." },
        { step: "03", title: "Quelqu'un répond", text: "Tu choisis. Tu reçois l'aide. Tu remercies (et tu rends quand ce sera ton tour)." },
      ]}
      features={[
        { title: "Karma RePère", text: "Tu aides → tu gagnes des points. Convertibles en avantages (barbier, events…)." },
        { title: "Catégories", text: "Déménagement, garde express, panne, urgence familiale, soutien moral." },
        { title: "Anonymat possible", text: "Tu peux poster un SOS pseudo-anonyme. Seul ton premier nom + initial s'affiche." },
      ]}
      trust={[
        "Identité père vérifiée pour répondre",
        "Notation après chaque intervention",
        "Bannissement à 2 signalements valides",
      ]}
      faq={[
        { q: "Et si personne ne répond ?", a: "Le rayon s'élargit automatiquement. À 30 km, on bascule sur du paid (RenoRides, Garde Flash) avec ta validation." },
        { q: "C'est gratuit ?", a: "Oui pour les Engagé et Fondateur. Karma à utiliser sur d'autres services." },
      ]}
      next={{ label: "Finance & Investissement", to: "/services/finance" }}
    />
  ),
  head: () => ({ meta: [{ title: "Entraide Urgence — RePère" }] }),
});
