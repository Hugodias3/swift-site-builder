import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/stand-tir")({
  component: () => (
    <ServicePage
      category="Espace Défense"
      title="Stands de tir agréés"
      tagline="Pratiquer. Légalement. Proprement."
      description="Réservation in-app dans des stands de tir agréés FFTir. -15% pour les membres. Initiation, perfectionnement, location armes catégorie C en stand."
      stats={[
        { value: "FFTir", label: "Stands agréés" },
        { value: "-15%", label: "Tarif membre" },
        { value: "Cat. C", label: "En stand" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Réservation directe", text: "Créneaux dispo en temps réel, paiement in-app." },
        { title: "Initiation encadrée", text: "Première séance avec moniteur diplômé. Sécurité avant tout." },
        { title: "Cadre légal expliqué", text: "Tout ce que tu peux et ne peux pas faire — par notre juriste partenaire." },
      ]}
      trust={[
        "Stands affiliés Fédération Française de Tir",
        "Moniteurs diplômés DEJEPS",
        "Assurance incluse",
        "Vérification ID + casier B3 pour les pratiques régulières",
      ]}
      next={{ label: "Cadre légal", to: "/services/cadre-legal" }}
    />
  ),
  head: () => ({ meta: [{ title: "Stands de tir — RePère" }] }),
});
