import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/espace-foi")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Espace Foi"
      tagline="Multi-confessionnel. Optionnel. Respectueux."
      description="Pour les pères qui veulent transmettre une foi à leurs enfants — quelle qu'elle soit. Espaces dédiés par confession, modération stricte, zéro prosélytisme externe."
      stats={[
        { value: "Multi", label: "Confessions" },
        { value: "Opt-in", label: "100% optionnel" },
        { value: "0", label: "Prosélytisme" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Espaces séparés", text: "Catholique, protestant, juif, musulman, bouddhiste, agnostique. Chacun son groupe." },
        { title: "Ressources transmission", text: "Comment parler de la foi aux enfants à 5, 10, 15 ans. Témoignages de pères." },
        { title: "Modération stricte", text: "Zéro débat inter-religieux. Zéro extrémisme. Zéro recrutement." },
      ]}
      trust={[
        "Modération inter-confessionnelle (1 modérateur par espace)",
        "Charte stricte anti-prosélytisme externe",
        "Bannissement immédiat sur extrémisme",
      ]}
      faq={[
        { q: "Et si je ne crois en rien ?", a: "L'Espace Foi est totalement optionnel. Tu peux le désactiver dans tes préférences et ne jamais le voir." },
        { q: "Vous mélangez les confessions ?", a: "Non. Espaces séparés. Chaque père reste dans le sien." },
      ]}
      next={{ label: "Entraide Urgence", to: "/services/entraide-urgence" }}
    />
  ),
  head: () => ({ meta: [{ title: "Espace Foi — RePère" }] }),
});
