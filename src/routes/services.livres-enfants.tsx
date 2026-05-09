import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/livres-enfants")({
  component: () => (
    <ServicePage
      category="Livres Enfants"
      title="Livres Enfants RePère"
      tagline="Le métier du papa devient un super-pouvoir."
      description="Collection de livres illustrés où le métier du père est central. Concept : urgence à l'école, le papa intervient, toute la classe applaudit. 12 métiers prévus. 14,90€ — ou offerts dans la box Fondateur."
      stats={[
        { value: "12", label: "Métiers" },
        { value: "14,90€", label: "Le livre" },
        { value: "+2€", label: "Prénom personnalisé" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "12 métiers prévus", text: "Plombier (dispo), Électricien, Pompier, Boulanger, Chauffeur de bus, Maçon, Cuisinier, Agriculteur, Infirmier, Gendarme, Mécanicien, Livreur." },
        { title: "Personnalisation", text: "Prénom de l'enfant intégré dans l'histoire. +2€." },
        { title: "Inclus box Fondateur", text: "1 livre offert par mois dans la box mensuelle 29€ incluse." },
        { title: "Illustrations originales", text: "Réalisées par illustrateurs pères. Pas de stock photo générique." },
      ]}
      next={{ label: "Affiliation & Services pratiques", to: "/services/services-pratiques" }}
    />
  ),
  head: () => ({ meta: [{ title: "Livres Enfants RePère" }] }),
});
