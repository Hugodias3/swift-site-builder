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
          "Carte temps réel d'artisans vérifiés (KBIS, RC Pro, certifications). Devis in-app, paiement sécurisé, suivi GPS, jamais de numéro exposé. Commission 12% membres.",
      },
      { property: "og:title", content: "RenoRides Urgence — RePère" },
      { property: "og:description", content: "Quand la chaudière lâche un dimanche soir. On est là." },
    ],
  }),
});

const FLOW = [
  { n: "01", t: "Tu ouvres l'app", d: "Bouton Urgence dans la nav. Carte chargée en moins de 2 secondes." },
  { n: "02", t: "GPS + rayon 15km", d: "Artisans dispo affichés autour de toi. Refus GPS = fallback adresse manuelle." },
  { n: "03", t: "Pins colorés", d: "Vert = dispo maintenant. Orange = sous 30 min. Gris = indisponible." },
  { n: "04", t: "Fiche complète", d: "Photo, badges KBIS / RC Pro / Certif, note, tarif horaire, ETA, 5 derniers avis." },
  { n: "05", t: "Demande de devis", d: "Type d'intervention + description + jusqu'à 5 photos. Envoi en 30 secondes." },
  { n: "06", t: "Timer 10 minutes", d: "L'artisan a 10 min pour répondre. Pas de réponse → alternatives auto." },
  { n: "07", t: "Devis accepté", d: "Suivi GPS temps réel de l'artisan. Position rafraîchie toutes les 30s." },
  { n: "08", t: "Intervention", d: "Chat in-app sécurisé. Jamais de numéro échangé. Photo possible." },
  { n: "09", t: "Paiement 1 clic", d: "Carte sauvegardée / Apple Pay / Google Pay. Facture PDF auto." },
  { n: "10", t: "Notation 5 critères", d: "Rapidité, qualité, propreté, communication, prix. Obligatoire sous 7j." },
];

const SCREENS = [
  { t: "1. Carte principale", d: "Mapbox fullscreen, recherche d'adresse, filtres métier, FAB rouge URGENCE, banner commission visible." },
  { t: "2. Fiche artisan (bottom sheet)", d: "Identité, badges vérification, note ★, tarif, ETA animée, derniers avis, 2 CTA." },
  { t: "3. Formulaire devis", d: "Type d'intervention, description 200c, upload max 5 photos, timer 10 min visible." },
  { t: "4. Chat sécurisé", d: "Messagerie in-app (Stream Chat), statut artisan en haut, upload photo, zéro numéro de tel." },
  { t: "5. Suivi GPS live", d: "Position artisan toutes les 30s, ETA countdown, chat overlay, push « 5 min », « arrivé »." },
  { t: "6. Récap + paiement", d: "Durée, montant HT, commission visible, total TTC, paiement 1 clic, facture PDF." },
  { t: "7. Note 5 critères", d: "Rapidité 20% / Qualité 30% / Propreté 15% / Communication 20% / Prix 15%. Bloquant 7j." },
  { t: "8. Modal non-membre", d: "Comparaison 12% vs 22%, calcul économie, CTA abo 7,90€ ou accès ponctuel 4,90€." },
  { t: "9. Dashboard artisan", d: "Toggle En service, demandes live, formulaire devis, CA mensuel, statut documents + alertes." },
];

const STATUSES = [
  { s: "pending_review", t: "En attente", d: "Invisible carte, validation manuelle équipe RePère.", c: "amber" },
  { s: "verified", t: "Vérifié", d: "Visible si en_service = true.", c: "green" },
  { s: "incomplete", t: "Incomplet", d: "Documents manquants, relance auto envoyée.", c: "amber" },
  { s: "rejected", t: "Refusé", d: "Email explicatif. Pas de carte.", c: "red" },
  { s: "suspended", t: "Suspendu", d: "3+ plaintes valides ou fraude détectée.", c: "red" },
  { s: "inactive_docs", t: "Docs expirés", d: "Masqué auto à l'expiration. Alertes 90j/60j/30j.", c: "amber" },
  { s: "trusted", t: "⭐ Confiance", d: "50+ interventions, note ≥ 4.5, qualité ≥ 4.2.", c: "green" },
];

const EDGES = [
  "Artisan ne répond pas en 10 min → alternatives suggérées automatiquement",
  "Artisan annule après confirmation → 3 alternatives + 3 annulations / 30j = suspension",
  "Montant final > devis +20% → alerte père, refus possible, litige ouvert",
  "GPS refusé → fallback Google Places autocomplete adresse manuelle",
  "Aucun artisan dans 15km → extension 30km ou notification quand dispo",
  "Non-membre → pins grisés + modal de conversion systématique",
  "Hors connexion → banner + retry auto, RenoRides nécessite la 4G/Wifi",
];

const SECURITY = [
  "Jamais de numéro de téléphone visible entre père et artisan",
  "Jamais de paiement en dehors de l'app (espèces interdites)",
  "Jamais d'artisan non-vérifié visible sur la carte",
  "Row Level Security Supabase actif sur toutes les tables sensibles",
  "Documents artisans stockés chiffrés, accès admin uniquement",
  "HTTPS obligatoire, rate limiting 60 req/min par IP",
];

function RenoRides() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="RenoRides Urgence"
      tagline="L'artisan qu'il te faut. Quand il te le faut."
      description="Carte temps réel des artisans dispo dans 15km autour de toi. Tous vérifiés manuellement (KBIS, RC Pro, Qualibat, Qualifelec, RGE). Devis in-app, suivi GPS, paiement sécurisé. Pas un numéro de téléphone. Pas une espèce. Commission 12% membre vs 22% non-membre — l'écart te paie ton abo en une intervention."
      stats={[
        { value: "15km", label: "Rayon temps réel" },
        { value: "10min", label: "Réponse artisan" },
        { value: "12%", label: "Commission membre" },
        { value: "4.5+", label: "Note minimum" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu décris", text: "Type de panne, urgence, photos. 30 secondes max via formulaire dédié." },
        { step: "02", title: "Tu choisis", text: "Carte temps réel, pins colorés, fiche complète, ETA et tarif annoncés." },
        { step: "03", title: "Tu valides", text: "Devis accepté in-app, suivi GPS, chat sécurisé, paiement 1 clic après." },
      ]}
      features={[
        { title: "Carte temps réel 15km", text: "Mapbox fullscreen avec pins colorés selon dispo. Mise à jour live toutes les 30 secondes." },
        { title: "Devis in-app sous 10 min", text: "Timer visible. Pas de réponse = alternatives proposées automatiquement." },
        { title: "Suivi GPS de l'artisan", text: "Tu vois la voiture s'approcher. Push à 5 min, push à l'arrivée. Plus jamais d'attente aveugle." },
        { title: "Chat sécurisé sans numéro", text: "Stream Chat in-app. Aucun numéro de téléphone échangé. Jamais. Photo possible." },
        { title: "Paiement Stripe Connect", text: "Carte / Apple Pay / Google Pay. Split auto. Facture PDF générée. Litige ? Paiement bloqué." },
        { title: "Notation pondérée 5 critères", text: "Rapidité 20%, Qualité 30%, Propreté 15%, Communication 20%, Prix 15%. Obligatoire sous 7 jours." },
      ]}
      trust={[
        "KBIS de moins de 3 mois contrôlé manuellement",
        "Attestation RC Pro en cours de validité",
        "Quali Elec + RGE pour les électriciens",
        "Qualibat + certification gaz pour les plombiers",
        "Carte BTP pour la maçonnerie",
        "Casier judiciaire B3 demandé",
        "Alertes auto 90j / 60j / 30j avant expiration",
        "Statut inactive_docs auto à l'expiration",
      ]}
      pricing={[
        { label: "Membre RePère", value: "12%", note: "Commission. Tarif artisan = celui annoncé. Économie 10 pts vs non-membre." },
        { label: "Non-membre", value: "22% + 4,90€", note: "Commission + accès ponctuel par intervention." },
        { label: "Fondateur", value: "0%", note: "Commission offerte sur les interventions de base < 80€ HT." },
      ]}
      faq={[
        {
          q: "Comment vous vérifiez les artisans ?",
          a: "Contrôle manuel KBIS, RC Pro, certifications métier (Qualibat, Qualifelec, RGE selon spécialité), demande de casier B3, période de probation 3 mois et suivi de toutes les interventions. À la moindre baisse sous 4.0/5, désinscription auto.",
        },
        {
          q: "Que se passe-t-il si l'intervention dérape ?",
          a: "Médiation RePère sous 48h. Paiement bloqué jusqu'à résolution. Remboursement intégral possible si défaut prouvé. L'artisan est suspendu le temps de l'enquête.",
        },
        {
          q: "Pourquoi jamais de numéro de téléphone ?",
          a: "Sécurité, traçabilité, et pour empêcher les paiements au noir. Tout passe par le chat in-app et Stripe Connect. Le moindre échange hors-app entraîne une sanction.",
        },
        {
          q: "Vous couvrez quelles villes ?",
          a: "Lancement Île-de-France, puis Lyon, Marseille, Bordeaux, Nantes, Toulouse, Lille, Strasbourg en An 2.",
        },
        {
          q: "Quelle différence avec BATIDIAS ?",
          a: "RenoRides = urgence et petites interventions géolocalisées. BATIDIAS = chantiers planifiés (rénovation complète, agrandissement, salle de bain).",
        },
      ]}
      next={{ label: "Garde d'Urgence Flash", to: "/services/garde-flash" }}
    >
      <ArtisansMap />

      {/* FLUX DÉTAILLÉ */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Happy path</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-16">
            10 étapes. <span className="text-rust">Zéro friction.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-border">
            {FLOW.map((f) => (
              <div key={f.n} className="bg-background p-6">
                <div className="font-display text-3xl text-rust/40">{f.n}</div>
                <h3 className="font-display uppercase text-base mt-2">{f.t}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉCRANS */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Architecture produit</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-16">
            9 écrans. <span className="text-rust">Pensés pour l'urgence.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {SCREENS.map((s) => (
              <div key={s.t} className="border border-border bg-card/40 p-6">
                <h3 className="font-display text-lg uppercase text-rust mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATUTS ARTISAN */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Cycle de vie artisan</div>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-12">
            7 statuts. <span className="text-rust">Surveillés en continu.</span>
          </h2>
          <div className="space-y-2">
            {STATUSES.map((s) => (
              <div key={s.s} className="grid grid-cols-12 gap-4 items-center border border-border bg-background p-4">
                <div className="col-span-12 md:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {s.s}
                </div>
                <div className="col-span-12 md:col-span-3 font-display uppercase text-lg text-rust">{s.t}</div>
                <div className="col-span-12 md:col-span-6 text-sm text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMISSION + NOTATION */}
      <section className="py-24 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Stripe Connect</div>
            <h3 className="font-display text-3xl uppercase mb-6">Logique de commission</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="border-l-2 border-rust pl-4">Le client paie le total à RePère, Stripe split automatiquement.</li>
              <li className="border-l-2 border-rust pl-4">Membres : <span className="text-foreground font-semibold">12%</span> retenu, artisan reçoit 88% sous 24-48h.</li>
              <li className="border-l-2 border-rust pl-4">Non-membres : <span className="text-foreground font-semibold">22% + 4,90€</span> d'accès ponctuel.</li>
              <li className="border-l-2 border-rust pl-4">Fondateurs : <span className="text-foreground font-semibold">0%</span> sur interventions de base &lt; 80€ HT.</li>
              <li className="border-l-2 border-rust pl-4">Litige = paiement bloqué jusqu'à résolution.</li>
              <li className="border-l-2 border-rust pl-4">Commission affichée dans la fiche artisan ET le récap. Jamais cachée.</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Note pondérée</div>
            <h3 className="font-display text-3xl uppercase mb-6">Calcul de la note globale</h3>
            <div className="border border-rust/40 bg-card p-6 font-mono text-xs leading-relaxed text-muted-foreground mb-6">
              Note = (Rapidité × 0.20)<br />
              &nbsp;&nbsp;&nbsp;+ (Qualité × 0.30)<br />
              &nbsp;&nbsp;&nbsp;+ (Propreté × 0.15)<br />
              &nbsp;&nbsp;&nbsp;+ (Communication × 0.20)<br />
              &nbsp;&nbsp;&nbsp;+ (Prix × 0.15)
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              <span className="text-rust font-semibold">Badge ⭐ Artisan de confiance</span> : 50+ interventions, note ≥ 4.5, critère qualité ≥ 4.2.
            </p>
            <p className="text-sm text-muted-foreground">
              Note bloquante : pas de notation sous 7 jours = la prochaine demande d'intervention est désactivée jusqu'à régularisation.
            </p>
          </div>
        </div>
      </section>

      {/* EDGE CASES + SÉCURITÉ */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Edge cases</div>
            <h3 className="font-display text-3xl uppercase mb-6">Tout est prévu</h3>
            <ul className="space-y-3">
              {EDGES.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-rust font-bold shrink-0">→</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Règles absolues</div>
            <h3 className="font-display text-3xl uppercase mb-6">Sécurité non négociable</h3>
            <ul className="space-y-3">
              {SECURITY.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-muted-foreground border-l-2 border-rust pl-4">
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
