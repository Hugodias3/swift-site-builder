import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/sports")({
  component: () => (
    <ServicePage
      category="Sport, Soirées & Activités"
      title="12 Sports"
      tagline="Bouge. Avec d'autres pères. Près de chez toi."
      description="Padel, Foot 5, CrossFit, Golf, Tennis, Running, Boxe, Escalade, Natation, Ping-pong, Surf/Ski, Billard. Réservation in-app, partenaires locaux, prix membres préférentiels."
      stats={[
        { value: "12", label: "Sports actifs" },
        { value: "-15%", label: "Tarif membre" },
        { value: "10", label: "Villes An 2" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      features={[
        { title: "Réservation directe", text: "Padel, foot 5, golf, tennis : créneau réservé en 3 clics, paiement sécurisé." },
        { title: "Matchmaking", text: "Tu cherches 3 pères pour un padel demain soir ? L'app trouve dans ton secteur et niveau." },
        { title: "Niveau ajustable", text: "Auto-évaluation + ajustement après chaque match pour des parties équilibrées." },
        { title: "Tarif membre préférentiel", text: "-15% chez tous les partenaires sur présentation du QR Code RePère." },
      ]}
      faq={[
        { q: "Vous couvrez quelles villes ?", a: "Lancement Île-de-France, Lyon, Marseille. 10 villes à 18 mois." },
        { q: "Et si je suis débutant ?", a: "Filtres niveau. Sessions 'Découverte' encadrées par des pros partenaires." },
      ]}
      next={{ label: "Tournoi Mensuel", to: "/services/tournoi-mensuel" }}
    />
  ),
  head: () => ({ meta: [{ title: "Sport — 12 sports | RePère" }] }),
});
