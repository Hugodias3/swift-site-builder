import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/podcast")({
  component: () => (
    <ServicePage
      category="Contenu & Formation"
      title="Podcast hebdo"
      tagline="Chaque jeudi. Format Guillaume Play."
      description="Un épisode par semaine. Invités : pères inspirants, experts, athlètes, chefs d'entreprise, psychologues, juristes. Avant-première membres payants 24h avant le grand public."
      stats={[
        { value: "1/sem", label: "Épisode" },
        { value: "24h", label: "Avant-première" },
        { value: "Jeudi", label: "Sortie" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Format long", text: "60-90 min. On creuse vraiment. Pas du fast-content." },
        { title: "Invités triés", text: "Pères qui ont quelque chose à transmettre. Pas du buzz." },
        { title: "Avant-première", text: "Engagé et Fondateur reçoivent l'épisode 24h avant tout le monde." },
        { title: "Live Q&A", text: "1x/mois, échange direct avec l'invité. Réservé Fondateur." },
      ]}
      next={{ label: "Formation IA", to: "/services/formation-ia" }}
    />
  ),
  head: () => ({ meta: [{ title: "Podcast RePère — Hebdo" }] }),
});
