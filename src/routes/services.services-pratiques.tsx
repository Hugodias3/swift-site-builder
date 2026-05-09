import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/services-pratiques")({
  component: () => (
    <ServicePage
      category="Affiliation & Services Pratiques"
      title="Affiliation & Services Pratiques"
      tagline="Mutuelle. Patrimoine. Crédit. Avocat."
      description="Tous les sujets pratiques de la vie de père. Mise en relation avec des partenaires sélectionnés et agréés. Affiliation transparente, jamais de pression commerciale."
      stats={[
        { value: "30-2K€", label: "Comm. par contrat" },
        { value: "100%", label: "Partenaires agréés" },
        { value: "0", label: "Spam commercial" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Mutuelle famille", text: "Comparateur indépendant. Affiliation 30-250€/contrat signé." },
        { title: "Bilan patrimonial CGP", text: "CGP agréés ORIAS. Affiliation 300-2 000€/dossier." },
        { title: "Crédit immo", text: "Courtiers partenaires. Affiliation 80-1 500€/dossier financé." },
        { title: "Avocat famille", text: "Réseau d'avocats spécialisés droit de la famille. Affiliation 80-200€/RDV." },
        { title: "Bilan santé homme", text: "Cliniques partenaires. Check-up complet 30-80€/dossier." },
        { title: "Location outillage", text: "Plateforme partenaire. Commission 12%." },
      ]}
      trust={[
        "Tous les partenaires sont régulés (ORIAS, ACPR, Barreau)",
        "Toutes les commissions sont publiques",
        "Aucun partenaire payé pour être 'mis en avant'",
      ]}
      next={{ label: "Tirage & Parrainage", to: "/services/tirage-parrainage" }}
    />
  ),
  head: () => ({ meta: [{ title: "Affiliation & Services Pratiques — RePère" }] }),
});
