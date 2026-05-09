import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/auto-moto")({
  component: () => (
    <ServicePage
      category="Auto & Moto"
      title="Auto & Moto"
      tagline="Le test du père. L'angle que personne ne fait."
      description="Est-ce que la poussette rentre dans le coffre ? Le siège auto s'installe facilement ? L'angle 'famille' que personne ne fait. Tests vidéo SUV famille, moto père, électrique vs thermique. LOA / LLD partenaires."
      stats={[
        { value: "250-500€", label: "Comm. LOA" },
        { value: "100%", label: "Tests pères" },
        { value: "0", label: "Sponsoring caché" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Le test du père", text: "Tests vidéo réalisés par des pères. Critères : coffre, sièges, sécurité, conso, rapport qualité-prix." },
        { title: "Comparatifs honnêtes", text: "SUV famille 7 places, monospaces, hybrides. Pas de complaisance constructeur." },
        { title: "LOA / LLD partenaires", text: "Tarifs négociés. Commission 250-500€/contrat (transparent)." },
        { title: "Moto père", text: "Sécurité, équipement enfant en passager, gros cubes utilisables au quotidien." },
      ]}
      next={{ label: "Livres Enfants", to: "/services/livres-enfants" }}
    />
  ),
  head: () => ({ meta: [{ title: "Auto & Moto — Le test du père | RePère" }] }),
});
