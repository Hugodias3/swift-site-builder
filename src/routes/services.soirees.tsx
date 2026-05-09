import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/soirees")({
  component: () => (
    <ServicePage
      category="Sport, Soirées & Activités"
      title="Soirées RePère"
      tagline="6 formats. Récurrents. Entre pères."
      description="Gaming Night, Whisky & Cigares, Stand-up Privé, Bowling, Cuisine, Poker. Une soirée différente chaque semaine. Petits comités. Vraies discussions."
      stats={[
        { value: "6", label: "Formats" },
        { value: "1/sem", label: "Récurrence" },
        { value: "12-24", label: "Pères / soirée" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Gaming Night", text: "Sessions Mario Kart, FIFA, Smash. Avec écrans géants. Bières & burgers." },
        { title: "Whisky & Cigares", text: "Tasting animé. Cave partenaire. 2h dégustation + discussion." },
        { title: "Stand-up Privé", text: "Comédiens montants en showcase intime. 8 sketchs, 2 heures, ambiance club." },
        { title: "Bowling, Cuisine, Poker", text: "Trois autres formats récurrents. Toujours en petit comité." },
      ]}
      pricing={[
        { label: "Soirée standard", value: "35€", note: "Tarif membre. Soirée + 2 conso." },
        { label: "Soirée premium (Whisky, Stand-up)", value: "65€", note: "Inclut tasting / show." },
        { label: "Marge RePère", value: "25-40%", note: "Sur chaque billet. Modèle assumé." },
      ]}
      next={{ label: "Espace Défense", to: "/services/arts-martiaux" }}
    />
  ),
  head: () => ({ meta: [{ title: "Soirées RePère — 6 formats" }] }),
});
