import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/cadre-legal")({
  component: () => (
    <ServicePage
      category="Espace Défense"
      title="Cadre légal"
      tagline="Ce qu'on a le droit. Ce qu'on n'a pas."
      description="Légitime défense, possession d'armes catégorie D, défense du domicile, protection de la famille. Tout est expliqué clairement par notre juriste partenaire. Cadre 100% légal."
      stats={[
        { value: "100%", label: "Cadre légal" },
        { value: "1", label: "Juriste dédié" },
        { value: "MAJ", label: "À chaque évolution" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Guides détaillés", text: "Légitime défense, défense du domicile, intervention en faveur d'autrui." },
        { title: "Armes catégorie D", text: "Ce qui est libre de vente, ce qui demande une déclaration, comment les transporter." },
        { title: "Tests vidéo", text: "Sprays, matraques télescopiques, alarmes — comparatifs encadrés par juriste." },
        { title: "Consultation directe", text: "Question juridique ? Notre juriste partenaire répond sous 72h (membres Fondateur)." },
      ]}
      trust={[
        "Juriste avocat inscrit au Barreau",
        "MAJ à chaque évolution réglementaire",
        "Aucune incitation à des pratiques illégales",
      ]}
      next={{ label: "Beauté IA", to: "/services/beaute-ia" }}
    />
  ),
  head: () => ({ meta: [{ title: "Cadre légal défense — RePère" }] }),
});
