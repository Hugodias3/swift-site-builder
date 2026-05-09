import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { ArtisansMap } from "@/components/ArtisansMap";

export const Route = createFileRoute("/services/renorides")({
  component: RenoRides,
  head: () => ({
    meta: [
      { title: "RenoRides Urgence — Artisans vérifiés 24/7 | RePère" },
      {
        name: "description",
        content:
          "Artisans géolocalisés vérifiés (KBIS, RC Pro, certifications). Intervention rapide. Commission 12% membres.",
      },
      { property: "og:title", content: "RenoRides Urgence — RePère" },
      { property: "og:description", content: "Quand la chaudière lâche un dimanche soir. On est là." },
    ],
  }),
});

function RenoRides() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="RenoRides Urgence"
      tagline="L'artisan qu'il te faut. Quand il te le faut."
      description="Fuite à 22h. Serrure cassée. Chaudière en rade. Tu ouvres l'app, tu décris, tu vois les artisans dispo dans ton secteur — tous vérifiés (KBIS, RC Pro, certifications). Tarif annoncé avant intervention. Pas de mauvaise surprise."
      stats={[
        { value: "100%", label: "Artisans vérifiés" },
        { value: "< 2h", label: "Délai urgence" },
        { value: "-12%", label: "Commission membres" },
        { value: "4.5+", label: "Note minimum" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu décris", text: "Type de panne, urgence, photo si besoin. 30 secondes max." },
        { step: "02", title: "Tu choisis", text: "Artisans dispo géolocalisés. Tarif clair, note vérifiée, badge confiance." },
        { step: "03", title: "Tu valides", text: "Devis accepté in-app. Paiement sécurisé après intervention." },
      ]}
      features={[
        { title: "Géolocalisation temps réel", text: "Tu vois qui est dispo dans ton secteur, maintenant." },
        { title: "Devis annoncé avant", text: "Plus jamais de facture salée à la fin. Le prix, c'est le prix." },
        { title: "Badge Artisan de confiance", text: "Décerné après 50 interventions notées 4.5+ par d'autres pères." },
        { title: "Commission membre 12%", text: "Au lieu de 22% pour les non-membres. Tu rentabilises ton abo en 1 intervention." },
        { title: "Historique d'intervention", text: "Tout est tracé. Garantie, factures, garantie décennale en un clic." },
        { title: "Avis pères vérifiés", text: "Pas de faux avis. Seuls les membres ayant payé peuvent noter." },
      ]}
      trust={[
        "KBIS contrôlé manuellement",
        "Attestation RC Pro obligatoire",
        "Certifications métier vérifiées (RGE, Qualibat…)",
        "Casier judiciaire B3 demandé",
        "Période de probation 3 mois",
        "Désinscription automatique en dessous de 4.0/5",
      ]}
      pricing={[
        { label: "Membre RePère", value: "12%", note: "Commission sur intervention. Le tarif artisan reste celui annoncé." },
        { label: "Non-membre", value: "22%", note: "Accès limité aux artisans premium." },
        { label: "Badge Confiance", value: "Inclus", note: "Pour tous les membres Engagé et Fondateur." },
      ]}
      faq={[
        {
          q: "Comment vous vérifiez les artisans ?",
          a: "Contrôle manuel KBIS, RC Pro, certifications métier (RGE, Qualibat selon spécialité), demande de casier B3, et période de probation de 3 mois avec suivi de toutes les interventions.",
        },
        {
          q: "Et si l'intervention se passe mal ?",
          a: "Médiation RePère sous 48h. Remboursement intégral possible si défaut prouvé. L'artisan est suspendu le temps de l'enquête.",
        },
        {
          q: "Vous couvrez quelles villes ?",
          a: "Lancement Île-de-France, puis Lyon, Marseille, Bordeaux, Nantes, Toulouse, Lille, Strasbourg en An 2.",
        },
        {
          q: "C'est quoi la différence avec BATIDIAS ?",
          a: "RenoRides = urgence et petites interventions. BATIDIAS = chantiers planifiés (rénovation, agrandissement, salle de bain complète).",
        },
      ]}
      next={{ label: "Garde d'Urgence Flash", to: "/services/garde-flash" }}
    >
      <ArtisansMap />
    </ServicePage>
  );
}
