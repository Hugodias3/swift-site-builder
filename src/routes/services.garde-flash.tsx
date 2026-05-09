import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/garde-flash")({
  component: GardeFlash,
  head: () => ({
    meta: [
      { title: "Garde d'Urgence Flash — Nounous vérifiées | RePère" },
      {
        name: "description",
        content:
          "Nounous vérifiées (DPAM, Casier B3, PSC1). 3 formats : Flash 2h, planifiée, entraide membres.",
      },
      { property: "og:title", content: "Garde Flash — RePère" },
      {
        property: "og:description",
        content: "Quand la nounou annule à 7h. Une solution en moins de 2h.",
      },
    ],
  }),
});

function GardeFlash() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="Garde d'Urgence Flash"
      tagline="Une solution en 2 heures. Pas en 2 jours."
      description="Réunion imprévue. Train annulé. Nounou malade. Tu ouvres l'app, tu décris la tranche horaire, tu choisis parmi les nounous vérifiées dispo dans ton secteur. PSC1 obligatoire, casier B3 contrôlé, DPAM validée. Le minimum quand il s'agit de tes gosses."
      stats={[
        { value: "< 2h", label: "Délai Flash" },
        { value: "100%", label: "PSC1 obligatoire" },
        { value: "B3", label: "Casier vérifié" },
        { value: "3", label: "Formats au choix" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu déclares le besoin", text: "Tranche horaire, âge des enfants, besoins spécifiques. 1 minute." },
        { step: "02", title: "L'app cherche", text: "Notification aux nounous dispo dans un rayon de 5 km. Réponse moyenne en 12 minutes." },
        { step: "03", title: "Tu valides", text: "Profil complet, vidéo de présentation, avis pères vérifiés. Tu choisis. Tu paies in-app." },
      ]}
      features={[
        { title: "Format Flash (2h max)", text: "Pour les vraies urgences. Notification large + tarif majoré pour la nounou qui dépanne." },
        { title: "Format Planifié", text: "Pour les besoins récurrents (mercredi après-midi, sortie d'école). Tarif standard." },
        { title: "Entraide membres", text: "Des pères proches qui dépannent d'autres pères. Gratuit. Karma RePère en retour." },
        { title: "Profil complet vérifié", text: "Vidéo de présentation, expériences, langues parlées, allergies, premiers secours." },
        { title: "Suivi temps réel", text: "Géolocalisation pendant la garde, notifications de prise en charge et de fin." },
        { title: "Annulation possible", text: "Sans frais jusqu'à 2h avant. La nounou est notifiée immédiatement." },
      ]}
      trust={[
        "PSC1 (Premiers Secours Civiques) obligatoire",
        "Casier judiciaire B3 vérifié à l'inscription",
        "Pièce d'identité contrôlée manuellement",
        "DPAM validée (Diplôme Petite Enfance)",
        "3 références professionnelles minimum",
        "Période d'essai 5 gardes avant validation complète",
        "Désinscription immédiate au moindre signalement",
      ]}
      pricing={[
        { label: "Garde Flash", value: "+30%", note: "Majoration urgence. Reversée à la nounou." },
        { label: "Garde Planifiée", value: "Tarif marché", note: "Aucune commission cachée." },
        { label: "Entraide membres", value: "Gratuit", note: "Pour les Engagé et Fondateur." },
      ]}
      faq={[
        {
          q: "Comment je suis sûr que ma nounou est fiable ?",
          a: "Tous nos critères de vérification sont publiés. Tu peux télécharger l'attestation PSC1, voir les références, lire les avis d'autres pères qui ont fait garder leurs enfants par cette même personne.",
        },
        {
          q: "Vous couvrez la nuit ?",
          a: "Oui. Format Flash 24/7 dès 18h-6h dans les zones couvertes. Tarif majoré +50% pour la nuit.",
        },
        {
          q: "Et si ma nounou habituelle veut s'inscrire ?",
          a: "C'est même encouragé. Code parrain dédié, processus accéléré si elle bosse déjà via une plateforme reconnue (Yoopies, Bsit…).",
        },
        {
          q: "L'entraide entre pères, comment ça marche ?",
          a: "Tu actives ta dispo, tu poses ton rayon (1-10 km). Quand un autre père Fondateur dans ton secteur a un besoin, t'es notifié. Tu rends service, tu gagnes du karma RePère convertible en tarifs préférentiels.",
        },
      ]}
      next={{ label: "BATIDIAS — Devis travaux", to: "/services/batidias" }}
    />
  );
}
