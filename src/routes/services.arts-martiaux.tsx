import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/arts-martiaux")({
  component: () => (
    <ServicePage
      category="Espace Défense"
      title="MMA · JJB · Boxe"
      tagline="Apprendre à se défendre. Apprendre à se contenir."
      description="Clubs certifiés partenaires partout en France. Cours d'essai gratuit, tarifs préférentiels membres, suivi de progression. Pas du spectacle. De la vraie pratique encadrée."
      stats={[
        { value: "-15%", label: "Tarif membre" },
        { value: "100%", label: "Clubs certifiés" },
        { value: "8-12%", label: "Affiliation" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Clubs partenaires vérifiés", text: "Affiliation FFKMDA, FFBOXE, FFJJB. Diplôme d'État pour les coachs." },
        { title: "Cours d'essai gratuit", text: "Premier cours offert. Tu testes 2 clubs avant de t'engager." },
        { title: "Suivi progression", text: "Niveau, technique, sparring. Bilan trimestriel avec ton coach." },
      ]}
      trust={[
        "Affiliation aux fédérations officielles",
        "Coachs Diplômés d'État",
        "Assurance pratique incluse via le club",
        "Charte anti-violence en dehors du tatami",
      ]}
      next={{ label: "Stands de tir", to: "/services/stand-tir" }}
    />
  ),
  head: () => ({ meta: [{ title: "MMA, JJB, Boxe — Espace Défense | RePère" }] }),
});
