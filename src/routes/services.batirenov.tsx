import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/batirenov")({
  component: BatiRenov,
  head: () => ({
    meta: [
      { title: "BATIRENOV — Conducteur de travaux & DIY | RePère" },
      {
        name: "description",
        content:
          "Conducteur de travaux à la demande. Accompagnement DIY pour les pères qui veulent faire eux-mêmes.",
      },
      { property: "og:title", content: "BATIRENOV — RePère" },
      {
        property: "og:description",
        content: "Tu fais toi-même. On te briefe, on te débloque, on valide.",
      },
    ],
  }),
});

function BatiRenov() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="BATIRENOV"
      tagline="Tu fais. On t'accompagne. Tu maîtrises."
      description="T'as les mains. T'as l'outillage. Mais t'as pas envie de te planter sur la pose du carrelage ou le tableau électrique. BATIRENOV, c'est un conducteur de travaux à la demande qui te briefe avant, te débloque pendant, valide après. Même équipe que BATIDIAS — pour les pères qui veulent faire eux-mêmes."
      stats={[
        { value: "30 min", label: "Brief de départ" },
        { value: "7j/7", label: "Hotline débloquage" },
        { value: "100%", label: "Pros qualifiés" },
        { value: "DIY", label: "Tu gardes la main" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Brief en visio", text: "30 min avec un conducteur de travaux. Plan d'attaque, étapes, pièges classiques." },
        { step: "02", title: "Tu fais", text: "À ton rythme. Avec les bons gestes et la bonne séquence." },
        { step: "03", title: "Hotline + validation", text: "Bloqué ? Vidéo-appel sous 2h. Fini ? Visite de validation pour la conformité." },
      ]}
      features={[
        { title: "Brief de chantier complet", text: "Liste matériel optimisée, ordre des opérations, points de vigilance, budget réaliste." },
        { title: "Hotline débloquage", text: "Tu galères sur un raccord, une coupe, un branchement. Vidéo-appel sous 2h." },
        { title: "Validation post-travaux", text: "Visite physique d'un pro pour valider la conformité (utile pour assurance)." },
        { title: "Plans et schémas", text: "On te fournit les plans techniques propres. Plus de croquis approximatifs." },
        { title: "Liste de courses optimisée", text: "Quincaillerie, dimensions exactes, alternatives moins chères. Économie 15-30% sur le matériel." },
        { title: "Communauté DIY pères", text: "Groupe dédié. Photos, retours d'expérience, conseils entre membres." },
      ]}
      pricing={[
        { label: "Brief 30 min", value: "49€", note: "Inclus chez Fondateur (2/an)." },
        { label: "Hotline débloquage", value: "29€/appel", note: "Inclus illimité chez Fondateur." },
        { label: "Validation finale", value: "89€", note: "Tarif fixe. Visite + rapport." },
      ]}
      faq={[
        {
          q: "Quel niveau il faut pour utiliser BATIRENOV ?",
          a: "Aucun. Le brief s'adapte. Si t'as jamais tenu une visseuse, on commence par les bases. Si t'es bricoleur confirmé, on va direct sur les points techniques.",
        },
        {
          q: "Vous couvrez quels types de travaux ?",
          a: "Plomberie courante, électricité (hors tableau principal sans habilitation), placo, peinture, carrelage, parquet, montage cuisine, salle de bain, dressing, terrasse bois.",
        },
        {
          q: "Et l'électricité ? C'est dangereux non ?",
          a: "On accompagne les travaux qu'un particulier a le droit de faire. Pour le tableau principal et les locaux humides, on te redirige systématiquement vers BATIDIAS ou RenoRides.",
        },
        {
          q: "Si je casse quelque chose ?",
          a: "Tu restes responsable de ton chantier (c'est du DIY). Mais notre brief minimise les risques, et la hotline te sort des situations les plus tendues.",
        },
      ]}
      next={{ label: "Tous les services", to: "/services" }}
    />
  );
}
