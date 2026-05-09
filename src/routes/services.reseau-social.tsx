import { createFileRoute, Link } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";

export const Route = createFileRoute("/services/reseau-social")({
  component: () => (
    <ServicePage
      category="Communauté & Social"
      title="Réseau Social"
      tagline="Le seul fil pensé pour des pères."
      description="Pas un réseau de plus. Un fil principal, des discussions, du partage — entre hommes qui vivent les mêmes choses au même moment. Algorithme transparent, zéro pub agressive, modération vraie."
      stats={[
        { value: "9M", label: "Pères en France" },
        { value: "0", label: "Pub intrusive" },
        { value: "100%", label: "Modération humaine" },
        { value: "FR", label: "Hébergement" },
      ]}
      cta={{ primary: "Entrer dans le réseau", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu rejoins", text: "Profil père vérifié. Ville, âge des enfants, centres d'intérêt." },
        { step: "02", title: "Tu suis ton fil", text: "Personnalisé selon ta vie de père. Pas un défilé sans fin." },
        { step: "03", title: "Tu participes", text: "Posts, commentaires, partages. Modération sous 2h." },
      ]}
      features={[
        { title: "Fil principal", text: "Algorithme transparent. Tu vois ce qui compte pour ta communauté locale et les sujets que tu suis." },
        { title: "Groupes thématiques", text: "Par ville, par âge des enfants, par activité. Rejoindre = sur invitation ou code." },
        { title: "Posts riches", text: "Photos, vidéos, sondages, événements. Outils pensés pour la vraie vie, pas le clickbait." },
        { title: "Messagerie privée", text: "Chiffrée. Pas de scan publicitaire. Aucun tiers." },
      ]}
      trust={[
        "Identité père vérifiée à l'inscription",
        "Modération humaine 7j/7",
        "Charte stricte : zéro misogynie, zéro racisme, zéro promo déguisée",
        "Hébergement données en France",
        "RGPD strict, données jamais revendues",
      ]}
      faq={[
        { q: "Pourquoi un réseau réservé aux pères ?", a: "Parce que c'est la seule façon d'avoir une vraie pertinence du contenu et une vraie sécurité de discussion. Les autres réseaux mélangent tout — ici, on parle entre nous." },
        { q: "Est-ce que ma femme peut voir mon profil ?", a: "Non. RePère est un espace strictement entre pères. Aucun login externe, aucun partage croisé." },
        { q: "Comment vous évitez la toxicité ?", a: "Identité vérifiée + modération humaine + bannissement immédiat sur signalement validé. Trois strikes = exclusion à vie." },
      ]}
      next={{ label: "Les Loups", to: "/services/les-loups" }}
    >
      <section className="py-16 border-b border-border bg-rust/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-3">Le réseau est en ligne</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">Entre directement dans le fil.</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crée ton compte ou connecte-toi en 30 secondes. Poste, réagis, suis tes hashtags (#couple #psg #soirée…), retrouve d'autres pères près de chez toi.
          </p>
          <Link to="/social" className="inline-block px-10 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition">
            Entrer dans le réseau →
          </Link>
        </div>
      </section>
    </ServicePage>
  ),
  head: () => ({ meta: [{ title: "Réseau Social — RePère" }, { name: "description", content: "Le seul fil social pensé pour les pères actifs." }] }),
});
