import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/finance")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Finance & Investissement"
      tagline="Éducatif. Pas une boutique de produits."
      description="Bourse, immobilier, crypto, assurance vie, transmission. Contenu éducatif structuré. Quand tu veux passer à l'action, on te met en relation avec des CGP agréés ORIAS — jamais nous-mêmes."
      stats={[
        { value: "ORIAS", label: "CGP agréés" },
        { value: "0", label: "Conseil direct RePère" },
        { value: "100%", label: "Contenu éducatif" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Parcours éducatifs", text: "Investir 100€/mois, comprendre l'assurance vie, transmettre à ses enfants. Chapitres courts." },
        { title: "Calculateurs", text: "Capacité d'épargne, simulateurs PER, projection patrimoine famille." },
        { title: "Mise en relation CGP", text: "Bilan patrimonial avec un CGP agréé ORIAS. Affiliation transparente : 300-2 000€/dossier." },
        { title: "Communauté finance", text: "Espace dédié pour échanger entre pères. Modération stricte (pas de pump & dump)." },
      ]}
      trust={[
        "RePère ne donne JAMAIS de conseil personnalisé",
        "Tous les partenaires sont agréés ORIAS",
        "Affiliations transparentes affichées sur chaque page",
        "Aucune crypto sponsorisée, aucun token RePère",
      ]}
      faq={[
        { q: "Vous gérez mon argent ?", a: "Jamais. RePère est un média éducatif + un connecteur vers des CGP indépendants." },
        { q: "Vous touchez quoi sur les bilans ?", a: "300 à 2 000€ par dossier signé. C'est public, c'est notre modèle." },
      ]}
      next={{ label: "Les Secrets", to: "/services/secrets" }}
    />
  ),
  head: () => ({ meta: [{ title: "Finance & Investissement — RePère" }] }),
});
