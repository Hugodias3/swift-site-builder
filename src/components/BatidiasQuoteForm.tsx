import { useState } from "react";
import emailjs from "@emailjs/browser";
import saintCloud from "@/assets/batidias-saint-cloud.jpg";
import paris8 from "@/assets/batidias-paris8.jpg";
import logo from "@/assets/batidias-logo.jpg";
import { EMAILJS_CONFIG, isEmailJsConfigured } from "@/lib/emailjs-config";

const projectTypes = [
  "Rénovation complète appartement",
  "Rénovation complète maison",
  "Salle de bain",
  "Cuisine",
  "Peinture / Revêtements",
  "Électricité (courants forts/faibles)",
  "Plomberie",
  "Menuiserie int. / ext.",
  "Maçonnerie / Gros œuvre",
  "ERP / Local commercial / Restaurant",
  "Cage d'escalier / Parties communes",
  "Autre — décrire ci-dessous",
];

const departements = [
  "75 — Paris",
  "92 — Hauts-de-Seine",
  "93 — Seine-Saint-Denis",
  "94 — Val-de-Marne",
  "95 — Val-d'Oise",
  "78 — Yvelines",
  "91 — Essonne",
  "Hors Île-de-France",
];

const budgets = [
  "< 10 000 €",
  "10 000 — 30 000 €",
  "30 000 — 60 000 €",
  "60 000 — 150 000 €",
  "> 150 000 €",
  "Je ne sais pas encore",
];

const timelines = [
  "Urgent (sous 1 mois)",
  "Sous 3 mois",
  "Sous 6 mois",
  "Plus tard / je me renseigne",
];

const clientTypes = [
  { v: "particulier", l: "Particulier" },
  { v: "syndic", l: "Syndic de copropriété" },
  { v: "architecte", l: "Architecte / Bureau d'études" },
  { v: "investisseur", l: "Investisseur / Pro immobilier" },
];

export function BatidiasQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (submitted) {
    return (
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Demande envoyée</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">
            Merci. <span className="text-rust">On revient vite.</span>
          </h2>
          <p className="text-muted-foreground">
            Hugo ou un membre de l'équipe BATIDIAS vous rappelle sous 24h ouvrées
            pour qualifier votre projet. Devis détaillé sous 48h après visite ou échange.
          </p>
          <div className="mt-8 text-sm text-muted-foreground">
            Urgent ? <a href="tel:+33658584564" className="text-rust">06 58 58 45 64</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Présentation entreprise */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="Logo BATIDIAS" className="w-16 h-16 object-contain bg-background border border-border" />
              <div className="text-xs uppercase tracking-[0.3em] text-rust">
                Maîtrise d'œuvre & Rénovation TCE
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-[0.95] mb-6">
              La société travaux <span className="text-rust">de RePère.</span>
            </h2>
            <p className="text-muted-foreground mb-4">
              Fondée en 2023 par <strong className="text-foreground">Hugo Dias</strong>, ancien
              ouvrier puis conducteur de travaux TCE (Bouygues Construction), issu d'une famille
              d'artisans du bâtiment.
            </p>
            <p className="text-muted-foreground mb-4">
              Rénovation complète d'appartements, maisons, ERP, restaurants, parties communes.
              Tous corps d'état. Île-de-France (hors Seine-et-Marne).
            </p>
            <p className="text-muted-foreground">
              Pas de sous-traitance opaque. Que des ouvriers qualifiés et des pros expérimentés.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-px bg-border border border-border">
              <div className="bg-background p-4">
                <div className="font-display text-3xl text-rust">20+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Salles de bain réalisées</div>
              </div>
              <div className="bg-background p-4">
                <div className="font-display text-3xl text-rust">3</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Restaurants rénovés</div>
              </div>
              <div className="bg-background p-4">
                <div className="font-display text-3xl text-rust">15M€</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Couverture décennale MAAF</div>
              </div>
              <div className="bg-background p-4">
                <div className="font-display text-3xl text-rust">2023</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Société active depuis</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <img src={saintCloud} alt="Appartement rénové Saint-Cloud" className="w-full aspect-[3/4] object-cover border border-border" />
            <img src={paris8} alt="Cage d'escalier rénovée Paris 8e" className="w-full aspect-[3/4] object-cover border border-border mt-8" />
          </div>
        </div>
      </section>

      {/* Réalisations clés */}
      <section className="py-24 border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Réalisations</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-12">Du concret.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            <article className="bg-background p-8">
              <img src={saintCloud} alt="Saint-Cloud" className="w-full aspect-video object-cover mb-6" />
              <h3 className="font-display text-2xl uppercase text-rust mb-2">Appartement — Saint-Cloud</h3>
              <p className="text-muted-foreground mb-4">
                Rénovation complète après dégât des eaux. Dépose totale (sols, peintures, cuisine).
                Espace lumineux destiné à la location meublée haut de gamme.
              </p>
              <div className="flex gap-6 text-sm">
                <div><span className="text-muted-foreground">Durée : </span><span className="text-foreground">2 mois</span></div>
                <div><span className="text-muted-foreground">Budget : </span><span className="text-foreground">55 000 € TTC</span></div>
              </div>
            </article>
            <article className="bg-background p-8">
              <img src={paris8} alt="Paris 8e" className="w-full aspect-video object-cover mb-6" />
              <h3 className="font-display text-2xl uppercase text-rust mb-2">Cage d'escalier — Paris 8e</h3>
              <p className="text-muted-foreground mb-4">
                Rénovation à neuf en copropriété, en coordination avec syndic et architecte.
                Travail de minutie, persévérance, finitions haut de gamme.
              </p>
              <div className="flex gap-6 text-sm">
                <div><span className="text-muted-foreground">Durée : </span><span className="text-foreground">6 mois</span></div>
                <div><span className="text-muted-foreground">Budget : </span><span className="text-foreground">250 000 € TTC</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Ils nous font confiance</div>
          <h2 className="font-display text-3xl md:text-4xl uppercase mb-10">Syndics, architectes, agences.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {[
              { name: "STI Syndic Copro", note: "Paris 13e, 14e, 15e — depuis le jour 1" },
              { name: "Le Dôme Immobilier", note: "Agence parisienne — loges & remises en état" },
              { name: "GS Conseil Architectures", note: "Paris 8e — ERP, restaurants Paris 15e/16e" },
              { name: "ActiSyndic", note: "Seine-Saint-Denis — entretien copropriétés" },
              { name: "ITEXA", note: "Bureau d'études — Essonne" },
              { name: "Association Jean Coxtet", note: "Montmartre, Garches — résidences sociales" },
            ].map((p) => (
              <div key={p.name} className="bg-background p-6">
                <div className="font-display text-lg uppercase">{p.name}</div>
                <div className="mt-2 text-sm text-muted-foreground">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE DEVIS */}
      <section id="devis" className="py-24 border-b border-border bg-card/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Demande de devis</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4">
            Devis gratuit. <span className="text-rust">Sous 48h.</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            Décrivez votre projet en Île-de-France. Hugo ou un membre de l'équipe vous rappelle
            sous 24h ouvrées pour qualifier le besoin.
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setErrorMsg(null);
              if (!isEmailJsConfigured()) {
                setErrorMsg("Configuration email manquante. Contactez-nous au 06 58 58 45 64.");
                return;
              }
              setSending(true);
              const fd = new FormData(e.currentTarget);
              const params: Record<string, string> = {
                client_type: String(fd.get("clientType") || ""),
                nom: String(fd.get("nom") || ""),
                telephone: String(fd.get("telephone") || ""),
                email: String(fd.get("email") || ""),
                societe: String(fd.get("societe") || ""),
                departement: String(fd.get("departement") || ""),
                ville: String(fd.get("ville") || ""),
                type_projet: String(fd.get("typeProjet") || ""),
                surface: String(fd.get("surface") || ""),
                budget: String(fd.get("budget") || ""),
                delai: String(fd.get("delai") || ""),
                description: String(fd.get("description") || ""),
                disponibilites: String(fd.get("description") || ""),
                to_email: EMAILJS_CONFIG.TEAM_EMAIL,
                reply_to: String(fd.get("email") || ""),
              };
              try {
                await emailjs.send(
                  EMAILJS_CONFIG.SERVICE_ID,
                  EMAILJS_CONFIG.TEMPLATE_TEAM_ID,
                  params,
                  { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
                );
                setSubmitted(true);
              } catch (err: any) {
                console.error("EmailJS error:", err);
                setErrorMsg(
                  `Erreur d'envoi : ${err?.text || err?.message || "réessayez ou appelez le 06 58 58 45 64."}`
                );
              } finally {
                setSending(false);
              }
            }}
            className="space-y-6"
          >
            {/* Type de client */}
            <fieldset>
              <legend className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Vous êtes</legend>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {clientTypes.map((c) => (
                  <label key={c.v} className="flex items-center gap-2 border border-border p-3 cursor-pointer hover:border-rust transition has-[:checked]:border-rust has-[:checked]:bg-rust/5">
                    <input type="radio" name="clientType" value={c.v} defaultChecked={c.v === "particulier"} className="accent-rust" />
                    <span className="text-sm">{c.l}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Identité */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Nom & Prénom *</label>
                <input name="nom" required type="text" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Téléphone *</label>
                <input name="telephone" required type="tel" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email *</label>
                <input name="email" required type="email" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Société (si pro)</label>
                <input name="societe" type="text" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
            </div>

            {/* Localisation */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Département *</label>
                <select name="departement" required className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none">
                  <option value="">Sélectionner…</option>
                  {departements.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Ville / Code postal *</label>
                <input name="ville" required type="text" placeholder="Ex : Paris 14e — 75014" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
            </div>

            {/* Type de projet */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Type de projet *</label>
              <select name="typeProjet" required className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none">
                <option value="">Sélectionner…</option>
                {projectTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Surface / Budget / Délai */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Surface (m²)</label>
                <input name="surface" type="number" min="1" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Budget estimé</label>
                <select name="budget" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none">
                  <option value="">—</option>
                  {budgets.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Délai souhaité</label>
                <select name="delai" className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none">
                  <option value="">—</option>
                  {timelines.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Décrivez votre projet *</label>
              <textarea
                name="description"
                required
                rows={5}
                placeholder="État actuel, ce que vous voulez, contraintes, étage, ascenseur, accès, copropriété…"
                className="w-full bg-background border border-border px-4 py-3 focus:border-rust outline-none resize-y"
              />
            </div>

            {/* RGPD */}
            <label className="flex gap-3 text-sm text-muted-foreground items-start">
              <input required type="checkbox" className="mt-1 accent-rust" />
              <span>J'accepte d'être recontacté par BATIDIAS dans le cadre de ma demande de devis. Données utilisées uniquement pour ce devis.</span>
            </label>

            {errorMsg && (
              <div className="border border-rust bg-rust/10 text-foreground p-4 text-sm">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full md:w-auto px-8 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Envoi en cours…" : "Envoyer ma demande de devis"}
            </button>


            <div className="text-xs text-muted-foreground pt-4 border-t border-border">
              BATIDIAS — RCS Nanterre 980 385 017 00010 · TVA FR21980385017 · Code NAF 4322A · Décennale & RC Pro MAAF (15 M€) · 06 58 58 45 64 · batidiasgestion@gmail.com
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
