import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/formation-ia")({
  component: () => (
    <ServicePage
      category="Contenu & Formation"
      title="Formation IA"
      tagline="CPF finançable. Qualiopi. Pour pères actifs."
      description="ChatGPT, Claude, Midjourney, automatisation. Formations courtes, applicables, finançables CPF. Qualiopi obtenue. 197-297€ par module — financé à 100% via ton CPF."
      stats={[
        { value: "Qualiopi", label: "Certifié" },
        { value: "CPF", label: "Finançable" },
        { value: "197€", label: "À partir de" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Modules courts", text: "8-12h par formation. Adapté aux journées de père actif." },
        { title: "Cas concrets", text: "Pas de théorie : automatiser ton boulot, créer du contenu, gagner du temps perso." },
        { title: "Certificat reconnu", text: "Qualiopi → utilisable sur ton CV, valorisé en entretien." },
      ]}
      pricing={[
        { label: "Module standard", value: "197€", note: "100% CPF finançable." },
        { label: "Module avancé", value: "297€", note: "100% CPF finançable." },
        { label: "Pack 3 modules", value: "497€", note: "Économie 100€." },
      ]}
      next={{ label: "Aide aux Devoirs IA", to: "/services/aide-devoirs" }}
    />
  ),
  head: () => ({ meta: [{ title: "Formation IA Qualiopi — RePère" }] }),
});
