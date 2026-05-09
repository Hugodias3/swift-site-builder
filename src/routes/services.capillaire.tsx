import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/capillaire")({
  component: () => (
    <ServicePage
      category="Beauté & Capillaire"
      title="Capillaire"
      tagline="Prothèse. Micropigmentation. Greffe."
      description="Le sujet dont les hommes parlent peu. Cliniques partenaires sélectionnées (Turquie, France, Espagne). Devis personnalisé, accompagnement de A à Z, retour d'expérience d'autres pères."
      stats={[
        { value: "200-2K€", label: "Commission" },
        { value: "3", label: "Pays partenaires" },
        { value: "100%", label: "Cliniques vérifiées" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Bilan personnalisé", text: "Photos + questionnaire → recommandation prothèse, microp ou greffe." },
        { title: "Cliniques vérifiées", text: "Audit médical, certifications, suivi qualité sur 100+ patients." },
        { title: "Communauté retours", text: "Groupe privé entre pères ayant fait l'expérience. Avant / après / SAV." },
      ]}
      trust={[
        "Toutes cliniques médicalement certifiées",
        "Commission 200-2 000€ affichée publiquement",
        "Aucune publicité mensongère sur les résultats",
      ]}
      next={{ label: "Podcast", to: "/services/podcast" }}
    />
  ),
  head: () => ({ meta: [{ title: "Capillaire — RePère" }] }),
});
