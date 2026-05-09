import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/barbiers")({
  component: () => (
    <ServicePage
      category="Beauté & Capillaire"
      title="Barbiers & Coiffeurs"
      tagline="Géolocalisés. Vérifiés. -20% Fondateur."
      description="Réservation in-app dans des barbiers et coiffeurs partenaires partout en France. -20% pour les Père Fondateur, -10% pour les autres tiers payants."
      stats={[
        { value: "-20%", label: "Fondateur" },
        { value: "-10%", label: "Engagé" },
        { value: "100%", label: "Vérifiés" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Géolocalisation", text: "Tous les partenaires autour de toi, dispo en temps réel." },
        { title: "Réservation directe", text: "Choix barbier, créneau, prestation. Paiement in-app possible." },
        { title: "Avis pères vérifiés", text: "Seuls ceux qui ont payé peuvent noter. Pas de faux avis." },
      ]}
      next={{ label: "Capillaire", to: "/services/capillaire" }}
    />
  ),
  head: () => ({ meta: [{ title: "Barbiers partenaires — RePère" }] }),
});
