import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/batidias")({
  component: Batidias,
  head: () => ({
    meta: [
      { title: "BATIDIAS — Devis travaux gratuit sous 48h | RePère" },
      {
        name: "description",
        content:
          "Devis travaux gratuit sous 48h. Rénovation, salle de bain, cuisine, agrandissement. Société active.",
      },
      { property: "og:title", content: "BATIDIAS — RePère" },
      {
        property: "og:description",
        content: "Devis travaux gratuit sous 48h. La société qui ancre RePère dans le réel dès le jour 1.",
      },
    ],
  }),
});

function Batidias() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="BATIDIAS"
      tagline="Devis travaux gratuit. Sous 48h. Sans bullshit."
      description="BATIDIAS, c'est la société de travaux du fondateur de RePère. Active. Réelle. Avec un CA dès le jour 1. Tu décris ton chantier — rénovation, salle de bain, cuisine, agrandissement, extension — tu reçois un devis détaillé sous 48h. Pas un estimatif vague. Un devis ferme."
      stats={[
        { value: "48h", label: "Délai devis" },
        { value: "0€", label: "Coût du devis" },
        { value: "10 ans", label: "Garantie décennale" },
        { value: "100%", label: "Société active" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu décris", text: "Type de chantier, surface, photos, contraintes. Formulaire guidé." },
        { step: "02", title: "Visite ou appel", text: "Selon l'ampleur : appel téléphonique ou visite gratuite sur site." },
        { step: "03", title: "Devis détaillé", text: "Sous 48h ouvrées. Postes détaillés, fournitures incluses, planning prévisionnel." },
      ]}
      features={[
        { title: "Devis ferme et détaillé", text: "Pas d'estimatif vague. Chaque ligne est claire : main d'œuvre, fournitures, marges." },
        { title: "Garantie décennale", text: "Couverture obligatoire incluse. Tu es protégé 10 ans sur les gros œuvres." },
        { title: "Suivi de chantier", text: "Photos hebdo, visites planifiées, point étape. Tu sais où en est ton chantier." },
        { title: "Conducteur de travaux dédié", text: "Un seul interlocuteur du devis à la livraison. Plus jamais de 'c'est pas moi, c'est l'autre'." },
        { title: "Paiement échelonné", text: "Acompte, étapes intermédiaires, solde à réception. Aucun pré-paiement abusif." },
        { title: "Lien direct RePère", text: "Tu signales un problème via l'app, tu es prioritaire dans le SAV." },
      ]}
      pricing={[
        { label: "Devis", value: "0€", note: "Toujours gratuit. Sans engagement." },
        { label: "Visite sur site", value: "0€", note: "Pour les chantiers > 5 000€ HT." },
        { label: "Acompte", value: "30%", note: "Standard. Versé à la signature, pas avant." },
      ]}
      faq={[
        {
          q: "BATIDIAS intervient où ?",
          a: "Île-de-France et grand-couronne au lancement. Réseau de partenaires sélectionnés en province (mêmes standards de qualité).",
        },
        {
          q: "C'est quoi la différence avec RenoRides ?",
          a: "RenoRides = artisans externes vérifiés pour urgences et interventions ponctuelles. BATIDIAS = société interne, chantiers planifiés et de plus grande ampleur.",
        },
        {
          q: "Vous gérez l'urbanisme et les déclarations ?",
          a: "Oui. DP, PC, DAACT — on monte les dossiers. Inclus dans le devis pour les travaux qui en nécessitent.",
        },
        {
          q: "Si je ne suis pas membre RePère ?",
          a: "Tu peux quand même demander un devis. Mais les membres Engagé et Fondateur ont la priorité de planning et un accompagnement plus poussé.",
        },
      ]}
      next={{ label: "BATIRENOV — Conducteur travaux", to: "/services/batirenov" }}
    />
  );
}
