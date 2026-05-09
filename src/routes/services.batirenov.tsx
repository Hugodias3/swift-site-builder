import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/batirenov")({
  component: BatiRenov,
  head: () => ({
    meta: [
      { title: "BATIRENOV — Accompagnement travaux & conducteur à la demande | RePère" },
      {
        name: "description",
        content:
          "Devis trop chers ? Vous voulez faire vos travaux vous-même ou sécuriser un chantier en cours ? BATIRENOV vous accompagne : plans, conseils achat, suivi vidéo, conducteur de travaux à la demande. 3 offres claires.",
      },
      { property: "og:title", content: "BATIRENOV — Accompagnement travaux | RePère" },
      {
        property: "og:description",
        content: "Suivi vidéo, accompagnement complet, ou reprise de chantier en cours. 3 offres pour particuliers en Île-de-France.",
      },
    ],
  }),
});

function BatiRenov() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="BATIRENOV"
      tagline="Vos travaux. Notre expertise. Sans payer le prix fort."
      description="Les devis sont trop chers ? Vous pensez pouvoir réaliser vos travaux vous-même ? Vous avez déjà commencé un chantier avec une autre société et vous voulez le sécuriser ? BATIRENOV vous accompagne. On fait les plans, on vérifie que tout est aux normes, on vous conseille à l'achat du matériel, et on peut mettre à disposition un conducteur de travaux pour le suivi. 3 offres claires, vous choisissez le niveau d'accompagnement."
      stats={[
        { value: "3", label: "Offres claires" },
        { value: "48h", label: "Mise en relation" },
        { value: "100%", label: "Conformité visée" },
        { value: "IDF", label: "Île-de-France" },
      ]}
      cta={{ primary: "Demander un accompagnement", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Vous nous décrivez", text: "Type de travaux, surface, où vous en êtes (projet / en cours), photos si possible." },
        { step: "02", title: "On choisit l'offre", text: "Suivi vidéo, accompagnement complet, ou reprise de chantier. On vous oriente vers la bonne formule." },
        { step: "03", title: "On vous accompagne", text: "Plans, conseils matériel, vérification conformité, déplacements selon l'offre choisie." },
      ]}
      features={[
        { title: "Plans & schémas techniques", text: "Plans propres, dimensions, implantations électriques et plomberie. Plus de croquis approximatifs." },
        { title: "Vérification conformité", text: "On contrôle que vos travaux respectent les normes (DTU, NF C 15-100, etc.). Utile pour assurance & revente." },
        { title: "Conseil achat matériel", text: "Liste de courses optimisée, alternatives moins chères, bons fournisseurs. Économies réelles sur le matériel." },
        { title: "Conducteur de travaux à la demande", text: "Un pro expérimenté vient sur site pour vérifier devis, qualité d'exécution, planning." },
        { title: "Hotline vidéo", text: "Bloqué sur une étape ? Visio avec un conducteur de travaux pour vous débloquer." },
        { title: "Reprise de chantier", text: "Vous avez commencé avec une autre société et ça part en vrille ? On reprend le suivi pour sécuriser." },
      ]}
      pricing={[
        {
          label: "Offre 1 — Suivi simple",
          value: "À partir de 149€",
          note: "Suivi vidéo (messages, appels, visios) + 1 déplacement sur site. Idéal si vous êtes autonome et voulez juste être validé.",
        },
        {
          label: "Offre 2 — Accompagnement complet",
          value: "À partir de 590€",
          note: "Suivi du début à la fin + 3 déplacements d'un artisan/conducteur (démarrage, mi-chantier, réception). Plans inclus.",
        },
        {
          label: "Offre 3 — Reprise de chantier",
          value: "Sur devis",
          note: "Conducteur de travaux mis à disposition pour suivre un chantier déjà entamé par une autre société. Audit, vérification devis, suivi qualité.",
        },
      ]}
      trust={[
        "Conducteurs de travaux diplômés (ex-Bouygues, Eiffage, majors du BTP)",
        "Vérification conformité DTU & normes en vigueur",
        "Audit indépendant — on ne pousse aucun artisan",
        "Île-de-France hors Seine-et-Marne (75, 92, 93, 94, 95, 78, 91)",
        "Adossé à BATIDIAS — décennale MAAF jusqu'à 15 M€",
        "Rapport écrit après chaque déplacement",
      ]}
      faq={[
        {
          q: "Quelle différence entre les 3 offres ?",
          a: "Offre 1 : vous êtes autonome, on valide à distance + 1 visite. Offre 2 : on vous tient la main du début à la fin avec 3 visites physiques. Offre 3 : votre chantier est déjà commencé ailleurs et vous voulez un œil indépendant.",
        },
        {
          q: "Vous faites les travaux à ma place ?",
          a: "Non — c'est BATIDIAS pour ça. BATIRENOV, c'est de l'accompagnement et du suivi. Vous (ou votre artisan actuel) faites, nous on cadre, conseille, vérifie.",
        },
        {
          q: "Vous couvrez quels types de travaux ?",
          a: "Plomberie, électricité (dans le cadre légal pour particuliers), placo, peinture, carrelage, parquet, montage cuisine, salle de bain complète, dressing, terrasse. Pour le gros œuvre / structure, on bascule sur BATIDIAS.",
        },
        {
          q: "Et si l'autre société refuse qu'on intervienne sur leur chantier ?",
          a: "C'est votre chantier — vous avez le droit de faire auditer. On intervient en tant que maître d'œuvre indépendant côté client. Aucun conflit légal.",
        },
        {
          q: "Combien de temps pour démarrer ?",
          a: "Mise en relation sous 48h ouvrées. Premier rendez-vous (visio ou physique selon l'offre) sous 5 jours.",
        },
      ]}
      next={{ label: "Tous les services", to: "/services" }}
    />
  );
}
