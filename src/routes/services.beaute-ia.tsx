import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/beaute-ia")({
  component: () => (
    <ServicePage
      category="Beauté & Capillaire"
      title="Beauté IA Soin"
      tagline="Photo. Analyse. Routine."
      description="Photo de ta peau ou ton cheveu → l'IA analyse type, problèmes, besoins → routine personnalisée 3 produits → produits affiliés Horace, Bulldog, Typology. Simple. Efficace. Sans bullshit."
      stats={[
        { value: "30s", label: "Analyse" },
        { value: "3", label: "Produits routine" },
        { value: "8-15%", label: "Affiliation" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Photo", text: "2 selfies en lumière naturelle. 30 secondes." },
        { step: "02", title: "Analyse IA", text: "Type de peau, brillance, ridules, taches, besoins capillaires." },
        { step: "03", title: "Routine 3 produits", text: "Nettoyant, soin, protection. Marques affiliées (Horace, Bulldog, Typology)." },
      ]}
      features={[
        { title: "100% honnête", text: "Si t'as besoin de rien, on te le dit. Pas de surventes." },
        { title: "Suivi mensuel", text: "Re-analyse toutes les 4 semaines pour ajuster la routine." },
        { title: "Marques transparentes", text: "Affiliation 8-15% affichée sur chaque produit recommandé." },
      ]}
      next={{ label: "Barbiers partenaires", to: "/services/barbiers" }}
    />
  ),
  head: () => ({ meta: [{ title: "Beauté IA Soin — RePère" }] }),
});
