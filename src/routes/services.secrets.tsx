import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/secrets")({
  component: () => (
    <ServicePage
      category="Les Secrets"
      title="Les Secrets"
      tagline="Ce que t'oses dire à personne. Anonymement."
      description="Le confessionnal numérique. 500 caractères. 6 réactions uniquement. Aucun commentaire libre. Aucune réponse. Juste poser ce qui pèse — et savoir qu'on est lu."
      stats={[
        { value: "500", label: "Caractères max" },
        { value: "6", label: "Réactions" },
        { value: "0", label: "Commentaire libre" },
        { value: "Anon.", label: "100% anonyme" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu écris", text: "500 caractères max. Aucun nom, aucune photo, aucun lien." },
        { step: "02", title: "Tu publies", text: "Anonyme par défaut. Visible par les autres pères qui le scrollent." },
        { step: "03", title: "Tu reçois 6 réactions", text: "Soutien, courage, présence, force, lumière, prière. Pas de débat." },
      ]}
      features={[
        { title: "Anonymat strict", text: "Aucun ID partagé. Même nous on ne peut pas te relier à ton secret." },
        { title: "6 réactions, pas plus", text: "Pour empêcher les débats, les jugements, les conseils non sollicités." },
        { title: "Modération IA discrète", text: "Détection des signaux de détresse extrême → numéro d'aide affiché à l'auteur." },
        { title: "Freemium", text: "1 secret/mois gratuit. Add-on 3,99€ ou illimité chez Fondateur." },
      ]}
      trust={[
        "Aucun lien stocké entre compte et secret",
        "Modération IA pour détecter détresse (pas pour censurer)",
        "Numéros d'aide affichés systématiquement (3114, SOS Amitié)",
        "Suppression possible à tout moment par l'auteur",
      ]}
      faq={[
        { q: "C'est vraiment anonyme ?", a: "Oui. Architecture séparée : un secret n'est jamais relié à un user_id en base." },
        { q: "Et si quelqu'un publie un truc grave ?", a: "L'IA détecte et affiche immédiatement les numéros d'aide. Si menace pour autrui, modération humaine + signalement légal si nécessaire." },
        { q: "Pourquoi pas de commentaires ?", a: "Parce que c'est ce qui transforme un confessionnal en fil de jugement. La règle est non négociable." },
      ]}
      next={{ label: "Sport & Tournois", to: "/services/sports" }}
    />
  ),
  head: () => ({ meta: [{ title: "Les Secrets — Confessionnal anonyme | RePère" }] }),
});
