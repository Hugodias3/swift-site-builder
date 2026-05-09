import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/classe-scolaire")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Classe Scolaire"
      tagline="Le groupe parents que t'oses pas rejoindre. En mieux."
      description="Groupes privés par classe, sur code d'accès. Coordonner les anniversaires, les sorties scolaires, les devoirs oubliés. Sans le drama des groupes WhatsApp à 47 personnes."
      stats={[
        { value: "Code", label: "Accès privé" },
        { value: "1", label: "Groupe = 1 classe" },
        { value: "0", label: "Drame inutile" },
        { value: "100%", label: "Pères uniquement" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu créés / rejoins", text: "Code école + classe. Tu rejoins ou tu créés le groupe pour ta classe." },
        { step: "02", title: "Tu coordonnes", text: "Sorties, anniversaires, covoiturage, devoirs. Outils dédiés pour chaque besoin." },
        { step: "03", title: "Tu restes informé", text: "Notifications calmes, pas le bordel des groupes WhatsApp 24/7." },
      ]}
      features={[
        { title: "Outils dédiés", text: "Calendrier partagé, sondages anniversaires, listes covoiturage, partage de devoirs." },
        { title: "Notifications maîtrisées", text: "Heures de silence par défaut. Tu choisis ce qui te notifie." },
        { title: "Modération automatique", text: "Détection des conflits, recadrage automatique des messages tendus." },
      ]}
      faq={[
        { q: "Comment je trouve mon groupe ?", a: "Code école unique fourni par l'établissement (ou par un autre parent déjà inscrit)." },
        { q: "C'est validé par l'école ?", a: "Pas obligatoirement. C'est un outil parents, pas une plateforme officielle. Mais on travaille avec des fédérations FCPE/PEEP pour étendre." },
      ]}
      next={{ label: "Espace Foi", to: "/services/espace-foi" }}
    />
  ),
  head: () => ({ meta: [{ title: "Classe Scolaire — RePère" }] }),
});
