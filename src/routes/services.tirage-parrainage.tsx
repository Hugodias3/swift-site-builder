import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/tirage-parrainage")({
  component: () => (
    <ServicePage
      category="Gains & Parrainage"
      title="Tirage Premium & Parrainage"
      tagline="35 000€ chaque mois. Plus tu fais grandir, plus tu gagnes."
      description="Tirage Premium mensuel : un Grand Prix de 35 000€ (SUV ou voyage). Réservé Engagé + Fondateur. Conforme ANJ. Parrainage 3 niveaux : 15€ / 5€ / 3% sur les commissions du réseau."
      stats={[
        { value: "35K€", label: "Grand Prix mensuel" },
        { value: "ANJ", label: "Conforme" },
        { value: "3", label: "Niveaux parrainage" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Tirage Premium mensuel", text: "Grand Prix 35 000€ chaque mois. SUV ou voyage. Tirage huissier conforme ANJ." },
        { title: "Gains hebdo", text: "Places de foot, maillots, spectacles, restaurants. Tirage chaque vendredi." },
        { title: "Parrainage niveau 1", text: "15€ par filleul qui prend Engagé ou Fondateur." },
        { title: "Parrainage niveau 2", text: "5€ par filleul du filleul (sub-parrainage)." },
        { title: "Parrainage niveau 3", text: "3% sur les commissions affiliations générées par ton réseau." },
      ]}
      trust={[
        "Tirages conformes ANJ (Autorité Nationale des Jeux)",
        "Huissier de justice présent à chaque tirage Premium",
        "Règlement publié sur app.repere.fr/jeux",
        "CAC RePère : 4,50€ via parrainage (vs 12-25€ moyenne marché)",
      ]}
      next={{ label: "Tous les services", to: "/services" }}
    />
  ),
  head: () => ({ meta: [{ title: "Tirage Premium & Parrainage — RePère" }] }),
});
