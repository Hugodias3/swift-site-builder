import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { NanniesMap } from "@/components/NanniesMap";

export const Route = createFileRoute("/services/garde-flash")({
  component: GardeFlash,
  head: () => ({
    meta: [
      { title: "Garde d'Urgence Flash — Nounous vérifiées | RePère" },
      {
        name: "description",
        content:
          "Carte temps réel de nounous vérifiées (PSC1, casier B3, DPAM). Demande in-app, suivi GPS, paiement sécurisé. Commission 12% membres.",
      },
      { property: "og:title", content: "Garde Flash — RePère" },
      { property: "og:description", content: "Quand la nounou annule à 7h. Une solution en moins de 2h." },
    ],
  }),
});

const FLOW = [
  { n: "01", t: "Tu ouvres l'app", d: "Bouton Garde Urgence dans la nav. Carte chargée en moins de 2 secondes." },
  { n: "02", t: "GPS + rayon 15km", d: "Nounous dispo affichées autour de toi. Refus GPS = fallback adresse manuelle." },
  { n: "03", t: "Pins colorés", d: "Vert = dispo maintenant. Orange = sous 30 min. Gris = indisponible." },
  { n: "04", t: "Fiche complète", d: "Photo, badges PSC1 / B3 / DPAM, note, tarif horaire, ETA, 5 derniers avis pères." },
  { n: "05", t: "Demande de garde", d: "Tranche horaire, âge des enfants, besoins spécifiques, photos. 30 secondes." },
  { n: "06", t: "Timer 10 minutes", d: "La nounou a 10 min pour répondre. Pas de réponse → alternatives auto." },
  { n: "07", t: "Garde confirmée", d: "Suivi GPS de la nounou en route. Position rafraîchie toutes les 30s." },
  { n: "08", t: "Pendant la garde", d: "Chat in-app sécurisé. Jamais de numéro échangé. Photos/vidéos possibles." },
  { n: "09", t: "Paiement 1 clic", d: "Carte sauvegardée / Apple Pay / Google Pay. Reçu PDF auto." },
  { n: "10", t: "Notation 5 critères", d: "Ponctualité, douceur, sécurité, communication, prix. Obligatoire sous 7j." },
];

const SCREENS = [
  { t: "1. Carte principale", d: "Mapbox fullscreen, recherche d'adresse, filtres âge/format, FAB rouge URGENCE, banner commission visible." },
  { t: "2. Fiche nounou (bottom sheet)", d: "Identité, vidéo de présentation, badges vérification, note ★, tarif, ETA animée, derniers avis." },
  { t: "3. Formulaire garde", d: "Tranche horaire, âge enfants, allergies, besoins, max 5 photos, timer 10 min visible." },
  { t: "4. Chat sécurisé", d: "Messagerie in-app (Stream Chat), statut nounou en haut, upload photo, zéro numéro de tel." },
  { t: "5. Suivi GPS live", d: "Position nounou toutes les 30s, ETA countdown, chat overlay, push « 5 min », « arrivée »." },
  { t: "6. Récap + paiement", d: "Durée, montant HT, commission visible, total TTC, paiement 1 clic, reçu PDF." },
  { t: "7. Note 5 critères", d: "Ponctualité 20% / Douceur 30% / Sécurité 20% / Communication 15% / Prix 15%. Bloquant 7j." },
  { t: "8. Modal non-membre", d: "Comparaison 12% vs 22%, calcul économie, CTA abo 7,90€ ou accès ponctuel 4,90€." },
  { t: "9. Dashboard nounou", d: "Toggle En service, demandes live, formulaire devis, gardes du mois, statut documents + alertes." },
];

const STATUSES = [
  { s: "pending_review", t: "En attente", d: "Invisible carte, validation manuelle équipe RePère + appel références." },
  { s: "verified", t: "Vérifiée", d: "Visible si en_service = true. PSC1 + B3 + DPAM validés." },
  { s: "incomplete", t: "Incomplet", d: "Documents manquants (PSC1 expiré, B3 absent…), relance auto." },
  { s: "rejected", t: "Refusée", d: "Email explicatif. Pas de carte. Casier non clean = refus définitif." },
  { s: "suspended", t: "Suspendue", d: "1+ signalement grave. Suspension immédiate, enquête interne." },
  { s: "inactive_docs", t: "Docs expirés", d: "Masquée auto à l'expiration. Alertes 90j/60j/30j." },
  { s: "trusted", t: "⭐ Confiance", d: "30+ gardes, note ≥ 4.7, sécurité ≥ 4.5. Critères enfants = stricts." },
];

const EDGES = [
  "Nounou ne répond pas en 10 min → alternatives suggérées automatiquement",
  "Nounou annule après confirmation → 3 alternatives + 2 annulations / 30j = suspension immédiate",
  "Montant final > devis +20% → alerte père, refus possible, litige ouvert",
  "GPS refusé → fallback Google Places autocomplete adresse manuelle",
  "Aucune nounou dans 15km → extension 30km ou notification quand dispo",
  "Non-membre → pins grisés + modal de conversion systématique",
  "Hors connexion → banner + retry auto, RenoRides nécessite la 4G/Wifi",
  "Garde de nuit (18h-6h) → majoration +50% reversée intégralement à la nounou",
];

const SECURITY = [
  "Jamais de numéro de téléphone visible entre père et nounou",
  "Jamais de paiement en dehors de l'app (espèces interdites)",
  "Jamais de nounou non-vérifiée visible sur la carte",
  "Casier B3 obligatoire, refus définitif si non clean",
  "PSC1 (Premiers Secours Civiques) à jour obligatoire",
  "Row Level Security Supabase actif sur toutes les tables sensibles",
  "Documents nounous stockés chiffrés, accès admin uniquement",
  "Signalement grave = suspension immédiate, sans préavis",
];

function GardeFlash() {
  return (
    <ServicePage
      category="Urgences & Maison"
      title="Garde d'Urgence Flash"
      tagline="Une solution en 2 heures. Pas en 2 jours."
      description="Carte temps réel des nounous dispo dans 15km autour de toi. Toutes vérifiées manuellement (PSC1, casier B3, DPAM, références appelées). Demande in-app, suivi GPS de la nounou en route, paiement sécurisé. Pas un numéro de téléphone. Pas une espèce. Commission 12% membre vs 22% non-membre — l'écart te paie ton abo en deux gardes."
      stats={[
        { value: "15km", label: "Rayon temps réel" },
        { value: "10min", label: "Réponse nounou" },
        { value: "12%", label: "Commission membre" },
        { value: "B3", label: "Casier vérifié" },
      ]}
      cta={{ primary: "Accès prioritaire", secondary: "Tous les services" }}
      howItWorks={[
        { step: "01", title: "Tu décris", text: "Tranche horaire, âge des enfants, besoins. 30 secondes via formulaire dédié." },
        { step: "02", title: "Tu choisis", text: "Carte temps réel, pins colorés, fiche complète avec vidéo, ETA et tarif annoncés." },
        { step: "03", title: "Tu valides", text: "Devis accepté in-app, suivi GPS jusqu'à l'arrivée, chat sécurisé, paiement 1 clic." },
      ]}
      features={[
        { title: "Carte temps réel 15km", text: "Mapbox fullscreen avec pins colorés selon dispo. Mise à jour live toutes les 30 secondes." },
        { title: "Réponse sous 10 min", text: "Timer visible. Pas de réponse = alternatives proposées automatiquement, sans relance." },
        { title: "Suivi GPS de la nounou", text: "Tu vois la nounou s'approcher. Push à 5 min, push à l'arrivée. Plus jamais d'attente aveugle." },
        { title: "Chat sécurisé sans numéro", text: "Stream Chat in-app. Aucun numéro de téléphone échangé. Photos et vidéos pendant la garde." },
        { title: "Paiement Stripe Connect", text: "Carte / Apple Pay / Google Pay. Split auto. Reçu PDF généré. Litige ? Paiement bloqué." },
        { title: "Notation pondérée 5 critères", text: "Ponctualité 20%, Douceur 30%, Sécurité 20%, Communication 15%, Prix 15%. Obligatoire sous 7 jours." },
      ]}
      trust={[
        "PSC1 (Premiers Secours Civiques) obligatoire et à jour",
        "Casier judiciaire B3 vérifié, refus définitif si non clean",
        "DPAM (Diplôme Petite Enfance) ou équivalent contrôlé",
        "3 références professionnelles appelées manuellement",
        "Pièce d'identité vérifiée et chiffrée en base",
        "Période d'essai 5 gardes avant validation complète",
        "Alertes auto 90j / 60j / 30j avant expiration des documents",
        "Désinscription immédiate au moindre signalement grave",
      ]}
      pricing={[
        { label: "Membre RePère", value: "12%", note: "Commission. Tarif nounou = celui annoncé. Économie 10 pts vs non-membre." },
        { label: "Non-membre", value: "22% + 4,90€", note: "Commission + accès ponctuel par garde." },
        { label: "Fondateur", value: "0%", note: "Commission offerte sur les gardes Flash < 4h." },
      ]}
      faq={[
        {
          q: "Comment je suis sûr que ma nounou est fiable ?",
          a: "Vérification manuelle complète : PSC1 à jour, casier B3 contrôlé (refus définitif si non clean), DPAM ou équivalent, 3 références appelées par notre équipe, période d'essai sur 5 gardes. Tu vois tout dans sa fiche : badges, vidéo de présentation, avis pères vérifiés.",
        },
        {
          q: "Vous couvrez la nuit ?",
          a: "Oui. Format Flash 24/7 dès 18h-6h dans les zones couvertes. Tarif majoré +50% pour la nuit, reversé intégralement à la nounou.",
        },
        {
          q: "Pourquoi jamais de numéro de téléphone ?",
          a: "Sécurité, traçabilité et protection des deux côtés. Tout passe par le chat in-app et Stripe. Le moindre échange hors-app entraîne une sanction.",
        },
        {
          q: "Et si ma nounou habituelle veut s'inscrire ?",
          a: "Encouragé. Code parrain dédié, processus accéléré si elle bosse déjà via Yoopies, Bsit ou équivalent.",
        },
        {
          q: "L'entraide entre pères, comment ça marche ?",
          a: "Tu actives ta dispo, tu poses ton rayon (1-10 km). Quand un autre père Fondateur dans ton secteur a un besoin, t'es notifié. Tu rends service, tu gagnes du karma RePère convertible en tarifs préférentiels.",
        },
      ]}
      next={{ label: "BATIDIAS — Devis travaux", to: "/services/batidias" }}
    >
      <NanniesMap />

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

      {/* STATUTS NOUNOU */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Cycle de vie nounou</div>
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
              <li className="border-l-2 border-rust pl-4">Membres : <span className="text-foreground font-semibold">12%</span> retenu, nounou reçoit 88% sous 24-48h.</li>
              <li className="border-l-2 border-rust pl-4">Non-membres : <span className="text-foreground font-semibold">22% + 4,90€</span> d'accès ponctuel.</li>
              <li className="border-l-2 border-rust pl-4">Fondateurs : <span className="text-foreground font-semibold">0%</span> sur gardes Flash &lt; 4h.</li>
              <li className="border-l-2 border-rust pl-4">Litige = paiement bloqué jusqu'à résolution.</li>
              <li className="border-l-2 border-rust pl-4">Commission affichée dans la fiche nounou ET le récap. Jamais cachée.</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Note pondérée</div>
            <h3 className="font-display text-3xl uppercase mb-6">Calcul de la note globale</h3>
            <div className="border border-rust/40 bg-card p-6 font-mono text-xs leading-relaxed text-muted-foreground mb-6">
              Note = (Ponctualité × 0.20)<br />
              &nbsp;&nbsp;&nbsp;+ (Douceur × 0.30)<br />
              &nbsp;&nbsp;&nbsp;+ (Sécurité × 0.20)<br />
              &nbsp;&nbsp;&nbsp;+ (Communication × 0.15)<br />
              &nbsp;&nbsp;&nbsp;+ (Prix × 0.15)
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              <span className="text-rust font-semibold">Badge ⭐ Nounou de confiance</span> : 30+ gardes, note ≥ 4.7, critère sécurité ≥ 4.5.
            </p>
            <p className="text-sm text-muted-foreground">
              Note bloquante : pas de notation sous 7 jours = la prochaine demande de garde est désactivée jusqu'à régularisation.
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
