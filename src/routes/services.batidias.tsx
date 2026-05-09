import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { BatidiasQuoteForm } from "@/components/BatidiasQuoteForm";

export const Route = createFileRoute("/services/batidias")({
  component: Batidias,
  head: () => ({
    meta: [
      { title: "BATIDIAS — Devis travaux gratuit Île-de-France | RePère" },
      {
        name: "description",
        content:
          "BATIDIAS — Maîtrise d'œuvre & rénovation TCE en Île-de-France. Devis gratuit sous 48h. Appartements, maisons, ERP, copropriétés. Décennale MAAF 15 M€.",
      },
      { property: "og:title", content: "BATIDIAS — Rénovation TCE Île-de-France" },
      {
        property: "og:description",
        content: "Société de rénovation tous corps d'état. Particuliers, syndics, architectes. Devis gratuit sous 48h.",
      },
    ],
  }),
});

function Batidias() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="BATIDIAS"
      tagline="Rénovation TCE Île-de-France. Devis gratuit sous 48h."
      description="BATIDIAS, c'est la société de maîtrise d'œuvre & rénovation tous corps d'état du fondateur de RePère. Active depuis 2023. Rénovation complète d'appartements, maisons, ERP, restaurants, parties communes de copropriétés. Île-de-France hors Seine-et-Marne. Décennale MAAF jusqu'à 15 M€. Décrivez votre projet — devis gratuit sous 48h."
      stats={[
        { value: "48h", label: "Délai devis" },
        { value: "0€", label: "Coût du devis" },
        { value: "20+", label: "SDB réalisées" },
        { value: "15M€", label: "Décennale MAAF" },
      ]}
      cta={{ primary: "Demander mon devis", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Vous décrivez", text: "Formulaire ci-dessous : type de chantier, surface, localisation, budget, photos si possible." },
        { step: "02", title: "On vous rappelle", text: "Hugo ou un membre de l'équipe sous 24h ouvrées. Visite gratuite si chantier > 5 000€ HT." },
        { step: "03", title: "Devis détaillé", text: "Sous 48h après visite. Postes détaillés, fournitures, planning. Pas un estimatif vague — un devis ferme." },
      ]}
      features={[
        { title: "Tous corps d'état", text: "Plâtrerie, peinture, sols, électricité courants forts/faibles, plomberie, menuiserie int./ext., maçonnerie, gros œuvre, réseaux." },
        { title: "Rénovation complète", text: "Appartements, maisons, bureaux, commerces, ERP, restaurants. Démolition, redistribution, finitions clé en main." },
        { title: "Copropriétés & ERP", text: "Cages d'escalier, parties communes, loges de gardien, locaux techniques. Coordination syndic / architecte / BET." },
        { title: "Un seul interlocuteur", text: "Hugo Dias — conducteur de travaux diplômé (ex-Bouygues Construction). Du devis à la livraison." },
        { title: "Pas de sous-traitance opaque", text: "Que des ouvriers qualifiés et des pros expérimentés qui partagent les valeurs maison." },
        { title: "Visite des chantiers en cours", text: "Rien à cacher. Vous pouvez visiter nos chantiers actifs avant de signer." },
      ]}
      pricing={[
        { label: "Devis", value: "0€", note: "Toujours gratuit. Sans engagement." },
        { label: "Visite sur site", value: "0€", note: "Pour les chantiers > 5 000€ HT." },
        { label: "Acompte", value: "30%", note: "Standard. Versé à la signature, pas avant." },
      ]}
      trust={[
        "RCS Nanterre 980 385 017 00010 · Code NAF 4322A",
        "TVA intracommunautaire FR21980385017",
        "Assurance décennale & RC Pro MAAF jusqu'à 15 000 000 €",
        "Société immatriculée et active depuis 2023",
        "Partenaires syndics : Paris 4e, 5e, 11e, 12e, 14e, 15e + Seine-Saint-Denis",
        "Cabinets d'architecture (Paris 8e) & bureau d'études (Essonne)",
      ]}
      faq={[
        {
          q: "Vous intervenez où exactement ?",
          a: "Toute l'Île-de-France hors Seine-et-Marne (75, 92, 93, 94, 95, 78, 91). Particuliers, syndics, architectes, investisseurs.",
        },
        {
          q: "Quelle différence avec RenoRides ?",
          a: "RenoRides = artisans externes vérifiés pour urgences ponctuelles. BATIDIAS = société interne, chantiers planifiés, rénovations complètes et tous corps d'état.",
        },
        {
          q: "Vous gérez les ERP et restaurants ?",
          a: "Oui. Plusieurs restaurants déjà rénovés à Paris 15e et 16e en collaboration avec GS Conseil Architectures (Paris 8e). Contraintes de planning et d'exploitation gérées.",
        },
        {
          q: "Combien de temps pour recevoir le devis ?",
          a: "48h ouvrées après l'échange / visite. Hugo vous rappelle sous 24h pour qualifier le besoin.",
        },
        {
          q: "Je ne suis pas membre RePère, je peux quand même demander ?",
          a: "Oui — la demande de devis est ouverte à tout le monde en Île-de-France. Les membres RePère bénéficient d'une priorité de planning.",
        },
      ]}
      next={{ label: "BATIRENOV — Conducteur travaux", to: "/services/batirenov" }}
    >
      <BatidiasQuoteForm />
    </ServicePage>
  );
}
