import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/aide-devoirs")({
  component: () => (
    <ServicePage
      category="Contenu & Formation"
      title="Aide aux Devoirs IA"
      tagline="La méthode. Pas la réponse."
      description="Du CE2 à la Terminale. Ton enfant pose sa question, l'IA explique la méthode, accompagne pas à pas, vérifie la compréhension. Jamais de réponse toute faite. 9,99€/mois."
      stats={[
        { value: "9,99€", label: "/mois" },
        { value: "CE2", label: "→ Terminale" },
        { value: "0", label: "Réponse copiée-collée" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Méthode socratique", text: "L'IA pose des questions, ne donne pas de réponse. L'enfant comprend, ne triche pas." },
        { title: "Toutes matières", text: "Maths, français, langues, sciences, histoire-géo. Programme officiel Éducation Nationale." },
        { title: "Suivi parental", text: "Tu vois ce sur quoi ton enfant bosse, où il bloque, où il progresse." },
        { title: "Inclus chez Engagé", text: "Illimité dans l'abonnement Père Engagé et Fondateur." },
      ]}
      trust={[
        "Pas de tracking comportemental enfant",
        "Données scolaires non revendues",
        "Conformité protection des mineurs",
      ]}
      next={{ label: "Masterclass", to: "/services/masterclass" }}
    />
  ),
  head: () => ({ meta: [{ title: "Aide aux Devoirs IA — RePère" }] }),
});
