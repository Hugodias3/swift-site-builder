import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/masterclass")({
  component: () => (
    <ServicePage
      category="Contenu & Formation"
      title="Masterclass Pères Leaders"
      tagline="8 sessions. Accès vie entière."
      description="Construire son autorité. Gérer ses émotions. Transmettre. Réussir sa vie pro sans rater ses enfants. 8 masterclasses denses avec des pères qui ont fait. Pas qui parlent."
      stats={[
        { value: "8", label: "Sessions" },
        { value: "Vie", label: "Accès à vie" },
        { value: "397€", label: "One-shot" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "8 thèmes piliers", text: "Autorité, émotions, transmission, équilibre pro/perso, finances, sport, spirituel, sexualité." },
        { title: "Intervenants pères", text: "Que des hommes qui ont fait, pas que parlé. Coachs, entrepreneurs, militaires, médecins." },
        { title: "Workbook inclus", text: "Exercices à faire entre chaque session. Application réelle obligatoire." },
        { title: "Communauté Masterclass", text: "Groupe privé entre participants. Échanges entre pairs." },
      ]}
      pricing={[
        { label: "One-shot", value: "397€", note: "Accès vie entière." },
        { label: "Inclus Fondateur", value: "0€", note: "Compris dans l'abo." },
      ]}
      next={{ label: "Auto & Moto", to: "/services/auto-moto" }}
    />
  ),
  head: () => ({ meta: [{ title: "Masterclass Pères Leaders — RePère" }] }),
});
