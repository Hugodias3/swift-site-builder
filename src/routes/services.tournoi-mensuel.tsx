import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/tournoi-mensuel")({
  component: () => (
    <ServicePage
      category="Sport, Soirées & Activités"
      title="Tournoi Mensuel RePère"
      tagline="Un format. Une ville. 32 pères. Un trophée."
      description="Chaque mois, un sport différent. Tournoi entre 32 pères max par ville. Phase de poule, finale, soirée remise des prix. Un vrai rituel communautaire."
      stats={[
        { value: "1/mois", label: "Fréquence" },
        { value: "32", label: "Pères / ville" },
        { value: "12", label: "Sports en rotation" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Inscription", text: "Le 1er du mois. Premier arrivé, premier servi. Réservé membres Engagé+." },
        { step: "02", title: "Tournoi", text: "1 dimanche/mois. Phase de poule, élimination directe, finale." },
        { step: "03", title: "Soirée", text: "Remise du trophée + dîner partenaire. Inclus dans l'inscription." },
      ]}
      features={[
        { title: "Trophée RePère", text: "Coupe officielle. Le vainqueur la garde 1 mois, son nom gravé à vie sur le tableau." },
        { title: "Marge 25-40%", text: "Sur chaque billet vendu. RePère loue le lieu, vend les places, fait la marge." },
        { title: "Format différent chaque mois", text: "Padel, foot 5, golf, tennis, ping-pong… La rotation maintient la nouveauté." },
      ]}
      faq={[
        { q: "Combien ça coûte ?", a: "35-65€ selon le sport et la ville (location lieu + soirée incluse)." },
        { q: "Et les non-membres ?", a: "Accès uniquement si places restantes 48h avant. Tarif majoré +20%." },
      ]}
      next={{ label: "Soirées RePère", to: "/services/soirees" }}
    />
  ),
  head: () => ({ meta: [{ title: "Tournoi Mensuel — RePère" }] }),
});
