import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CheckCircle2,
  Clock,
  ClipboardList,
  Star,
  Upload,
  X,
  MapPin,
  Loader2,
  Copy,
  ArrowRight,
  Hammer,
  ShowerHead,
  ChefHat,
  AppWindow,
  Paintbrush,
  Zap,
  Wrench,
  Layers,
  Home as HomeIcon,
  HelpCircle,
  FileText,
  Send,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EMAILJS_CONFIG, isEmailJsConfigured } from "@/lib/emailjs-config";

export const Route = createFileRoute("/batidias")({
  component: BatidiasPage,
  head: () => ({
    meta: [
      { title: "BATIDIAS — Devis travaux gratuit sous 48h | RePère" },
      {
        name: "description",
        content:
          "BATIDIAS — Service travaux RePère. Devis professionnel gratuit sous 48h. Rénovation, salle de bain, cuisine, fenêtres, peinture, électricité.",
      },
      { property: "og:title", content: "BATIDIAS — Devis travaux gratuit sous 48h" },
      {
        property: "og:description",
        content:
          "Décrivez votre projet en 2 minutes. Notre équipe se déplace, évalue et vous remet un devis professionnel détaillé. Sans engagement.",
      },
    ],
  }),
});

/* ─────────────────── Design tokens (inline, fidèles à la spec) ─────────────────── */
const C = {
  bg: "#07080A",
  card: "#0D0F12",
  field: "#131618",
  rust: "#C8521A",
  text: "#EDF0F5",
  textMuted: "rgba(237,240,245,0.6)",
  textDim: "rgba(237,240,245,0.55)",
  border: "rgba(255,255,255,0.055)",
  borderField: "rgba(255,255,255,0.1)",
  rustSoft: "rgba(200,82,26,0.1)",
  rustBorder: "rgba(200,82,26,0.2)",
};

const FONT_TITLE = '"Syne", system-ui, sans-serif';
const FONT_BODY = '"DM Sans", system-ui, sans-serif';

/* ─────────────────── Données ─────────────────── */
const SERVICES = [
  { icon: HomeIcon, title: "Rénovation complète", desc: "De la cuisine à la salle de bain, on s'occupe de tout." },
  { icon: ShowerHead, title: "Salle de bain", desc: "Rénovation complète ou partielle, tous styles." },
  { icon: ChefHat, title: "Cuisine", desc: "Pose, installation, plomberie et électricité incluses." },
  { icon: AppWindow, title: "Fenêtres & Portes", desc: "Double vitrage, isolation, toutes marques." },
  { icon: Paintbrush, title: "Peinture & Revêtements", desc: "Peinture, carrelage, parquet, papier peint." },
  { icon: Zap, title: "Electricité & Plomberie", desc: "Mise aux normes, installation, dépannage." },
];

const TYPES_TRAVAUX = [
  { id: "renovation", label: "Rénovation", icon: "🏠" },
  { id: "sdb", label: "Salle de bain", icon: "🚿" },
  { id: "cuisine", label: "Cuisine", icon: "🍳" },
  { id: "fenetres", label: "Fenêtres", icon: "🪟" },
  { id: "peinture", label: "Peinture", icon: "🎨" },
  { id: "electricite", label: "Electricité", icon: "⚡" },
  { id: "plomberie", label: "Plomberie", icon: "🔧" },
  { id: "maconnerie", label: "Maçonnerie", icon: "🧱" },
  { id: "extension", label: "Extension", icon: "🏗️" },
  { id: "autre", label: "Autre", icon: "❓" },
];

const SURFACES = ["< 10m²", "10-25m²", "25-50m²", "50-100m²", "> 100m²", "Je ne sais pas"];
const BUDGETS = ["< 2 000€", "2 000-5 000€", "5 000-15 000€", "15 000-30 000€", "+ 30 000€", "Non défini"];
const DELAIS = ["Dès que possible", "1-3 mois", "3-6 mois", "+ 6 mois", "Pas défini"];
const LOGEMENTS = [
  { id: "maison", label: "🏠 Maison" },
  { id: "appartement", label: "🏢 Appartement" },
  { id: "local", label: "🏪 Local commercial" },
];
const STATUTS = [
  { id: "proprietaire", label: "🔑 Propriétaire" },
  { id: "locataire", label: "📋 Locataire" },
  { id: "achat", label: "En cours d'achat" },
];
const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const CRENEAUX = ["Matin 8-12h", "Après-midi 14-18h", "Soir 18-20h"];

const TEMOIGNAGES = [
  {
    text: "Devis reçu en 36h chrono. La visite a été très professionnelle, l'équipe a tout expliqué clairement. Les travaux ont été réalisés exactement comme convenu, sans surprise.",
    author: "Thomas M.",
    role: "Rénovation salle de bain, Paris 11ème",
  },
  {
    text: "J'avais peur d'avoir de mauvaises surprises sur le prix. Le devis était précis au centime. Très satisfait de la transparence et de la qualité du travail.",
    author: "Kévin D.",
    role: "Rénovation cuisine, Paris 15ème",
  },
  {
    text: "Réactifs, professionnels, propres. Mon appartement a été entièrement rénové en 3 semaines. Je les recommande sans hésiter à tous les pères de RePère.",
    author: "Sébastien L.",
    role: "Rénovation complète, Boulogne",
  },
];

/* ─────────────────── Composant principal ─────────────────── */
function BatidiasPage() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState<null | { reference: string; prenom: string; email: string }>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Charger Google Fonts (Syne + DM Sans) une seule fois
  useEffect(() => {
    const id = "batidias-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: FONT_BODY, minHeight: "100vh" }}>
      <Navbar scrolled={scrolled} />
      {submitted ? (
        <Confirmation data={submitted} onReset={() => setSubmitted(null)} />
      ) : (
        <>
          <Hero />
          <Stats />
          <ServicesSection />
          <Process />
          <FormSection onSuccess={setSubmitted} />
          <Testimonials />
        </>
      )}
      <Footer />
    </div>
  );
}

/* ─────────────────── NAVBAR ─────────────────── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  const items = [
    { label: "Services", to: "/services" },
    { label: "RenoRides", to: "/services/renorides" },
    { label: "Garde", to: "/services/garde-flash" },
    { label: "BATIDIAS", to: "/batidias", active: true },
    { label: "Communauté", to: "/services/reseau-social" },
  ];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: scrolled ? "rgba(7,8,10,0.97)" : "rgba(7,8,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: "100%",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: FONT_TITLE,
            fontWeight: 800,
            fontSize: 22,
            color: C.text,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: C.rust }}>Re</span>
          <span>Père</span>
        </Link>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {items.map((it) => (
            <Link
              key={it.label}
              to={it.to as any}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 14,
                fontWeight: 500,
                color: it.active ? C.rust : C.text,
                textDecoration: "none",
                padding: "6px 0",
                borderBottom: it.active ? `2px solid ${C.rust}` : "2px solid transparent",
                transition: "color 0.15s",
              }}
            >
              {it.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            to="/auth"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 600,
              color: C.text,
              textDecoration: "none",
              padding: "8px 16px",
              border: `1px solid ${C.borderField}`,
              borderRadius: 6,
            }}
          >
            Se connecter
          </Link>
          <Link
            to="/auth"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
              textDecoration: "none",
              padding: "8px 16px",
              background: C.rust,
              borderRadius: 6,
            }}
          >
            Rejoindre
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─────────────────── HERO ─────────────────── */
function Hero() {
  const [activeItem, setActiveItem] = useState(0);
  const heroItems = [
    "Rénovation salle de bain — 15m²",
    "Remplacement fenêtres — 4 ouvertures",
    "Peinture intérieure — 80m²",
    "Mise aux normes électriques",
  ];
  useEffect(() => {
    const t = setInterval(() => setActiveItem((i) => (i + 1) % heroItems.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ paddingTop: 64 + 80, paddingBottom: 80 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Colonne gauche */}
        <div>
          <div
            style={{
              color: C.rust,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            🏗️ BATIDIAS — Service travaux RePère
          </div>
          <h1
            style={{
              fontFamily: FONT_TITLE,
              fontWeight: 800,
              fontSize: 56,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              margin: 0,
              marginBottom: 24,
            }}
          >
            Votre devis travaux
            <br />
            <span style={{ color: C.rust }}>gratuit</span> sous 48h.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: C.textMuted, margin: 0, marginBottom: 28 }}>
            Décrivez votre projet en 2 minutes.
            <br />
            Notre équipe se déplace, évalue et vous remet
            <br />
            un devis professionnel détaillé. Sans engagement.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            {[
              { icon: "✅", text: "100% Gratuit" },
              { icon: "⏱", text: "Sous 48h" },
              { icon: "📋", text: "Sans engagement" },
            ].map((b) => (
              <span
                key={b.text}
                style={{
                  background: C.rustSoft,
                  border: `1px solid ${C.rustBorder}`,
                  borderRadius: 20,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: C.text,
                }}
              >
                {b.icon} {b.text}
              </span>
            ))}
          </div>

          <a
            href="#formulaire"
            style={{
              display: "inline-block",
              background: C.rust,
              color: C.text,
              fontFamily: FONT_TITLE,
              fontWeight: 700,
              fontSize: 18,
              padding: "18px 40px",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow: "0 0 40px rgba(200,82,26,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(200,82,26,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(200,82,26,0.3)";
            }}
          >
            Demander mon devis gratuit →
          </a>
          <div style={{ marginTop: 20, fontSize: 13, color: C.textDim }}>
            ⭐ 4.8/5 satisfaction client • Plus de 500 chantiers réalisés
          </div>
        </div>

        {/* Colonne droite — card visuelle */}
        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: 32,
            border: `1px solid ${C.rustBorder}`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 16, marginBottom: 24 }}>
            📋 Demande de devis
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {heroItems.map((item, i) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 15,
                  color: i === activeItem ? C.text : C.textDim,
                  transition: "color 0.4s",
                  fontWeight: i === activeItem ? 600 : 400,
                }}
              >
                <CheckCircle2 size={18} style={{ color: i === activeItem ? C.rust : "rgba(237,240,245,0.3)", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: C.border, margin: "24px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Devis remis sous 48h ⏱</div>
            <span
              style={{
                background: "rgba(34,197,94,0.15)",
                color: "#4ade80",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 12,
              }}
            >
              En cours d'évaluation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── STATS ─────────────────── */
function Stats() {
  const stats = [
    { value: "500+", label: "Chantiers réalisés" },
    { value: "48h", label: "Délai de réponse" },
    { value: "4.8/5", label: "Satisfaction client" },
    { value: "100%", label: "Devis gratuits" },
  ];
  return (
    <section
      style={{
        background: C.card,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
              padding: "0 16px",
            }}
          >
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 36, color: C.rust, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 14, color: C.textDim, marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────── SERVICES ─────────────────── */
function ServicesSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader label="CE QU'ON FAIT" title="Tous types de travaux." subtitle="De la petite réparation à la rénovation complète." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56 }}>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 32,
                  transition: "transform 0.2s, border-color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(200,82,26,0.3)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={48} style={{ color: C.rust, marginBottom: 20 }} strokeWidth={1.5} />
                <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: C.textDim, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PROCESS ─────────────────── */
function Process() {
  const steps = [
    { n: "01", icon: "📝", title: "Vous décrivez", text: "2 minutes dans le formulaire. Photos bienvenues. On comprend tout de suite." },
    { n: "02", icon: "🏠", title: "On se déplace", text: "Notre équipe vient chez vous gratuitement. On évalue, on mesure, on pose les bonnes questions." },
    { n: "03", icon: "📋", title: "Vous recevez le devis", text: "Devis PDF détaillé sous 48h. Clair, chiffré, sans surprise. Vous décidez." },
  ];
  return (
    <section style={{ padding: "100px 0", background: "rgba(13,15,18,0.5)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader label="LE PROCESSUS" title="Simple. Rapide. Gratuit." />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            gap: 32,
            alignItems: "center",
            marginTop: 64,
          }}
        >
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: C.rust,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_TITLE,
                    fontWeight: 800,
                    fontSize: 22,
                    marginBottom: 24,
                    boxShadow: "0 0 30px rgba(200,82,26,0.3)",
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, maxWidth: 280, margin: "0 auto" }}>
                  {s.text}
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight key={`arrow-${i}`} size={32} style={{ color: C.rust, opacity: 0.6 }} />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FORM SECTION ─────────────────── */
function FormSection({ onSuccess }: { onSuccess: (d: { reference: string; prenom: string; email: string }) => void }) {
  return (
    <section id="formulaire" style={{ padding: "100px 0", scrollMarginTop: 80 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "40% 60%",
          gap: 56,
          alignItems: "start",
        }}
      >
        {/* Colonne gauche */}
        <div style={{ position: "sticky", top: 96 }}>
          <div
            style={{
              color: C.rust,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Demande de devis
          </div>
          <h2
            style={{
              fontFamily: FONT_TITLE,
              fontWeight: 800,
              fontSize: 44,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: 20,
            }}
          >
            Parlez-nous de votre projet.
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.7, margin: 0, marginBottom: 32 }}>
            Notre équipe étudie chaque demande personnellement. Pas de formulaire générique, pas de réponse automatique. Un vrai devis, par de vraies personnes.
          </p>

          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Ce que vous obtenez :</div>
            {[
              "Visite gratuite à domicile",
              "Devis PDF professionnel et détaillé",
              "Pas de surprise cachée",
              "Aucune obligation de signer",
            ].map((t) => (
              <div key={t} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 14, color: C.textMuted }}>
                <span style={{ color: C.rust }}>→</span>
                {t}
              </div>
            ))}
          </div>

          <div
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} style={{ color: C.rust, fill: C.rust }} />
              ))}
            </div>
            <p style={{ fontSize: 14, color: C.text, lineHeight: 1.6, margin: 0, marginBottom: 12, fontStyle: "italic" }}>
              "Devis reçu en 36h, visite très professionnelle. L'équipe a tout expliqué clairement. Je recommande."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.rust}, #8a3812)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                T
              </div>
              <div style={{ fontSize: 13, color: C.textMuted }}>Thomas M., Paris 11ème</div>
            </div>
          </div>
        </div>

        {/* Colonne droite — formulaire */}
        <QuoteForm onSuccess={onSuccess} />
      </div>
    </section>
  );
}

/* ─────────────────── QUOTE FORM ─────────────────── */
type Photo = { id: string; name: string; preview: string; size: number };

function QuoteForm({ onSuccess }: { onSuccess: (d: { reference: string; prenom: string; email: string }) => void }) {
  const [types, setTypes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [surface, setSurface] = useState("");
  const [budget, setBudget] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [delai, setDelai] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [logement, setLogement] = useState("");
  const [statut, setStatut] = useState("");
  const [dispos, setDispos] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const telValid = useMemo(() => tel.replace(/\D/g, "").length >= 9, [tel]);

  const isValid =
    types.length > 0 &&
    description.trim().length > 0 &&
    prenom.trim() &&
    nom.trim() &&
    telValid &&
    emailValid &&
    adresse.trim() &&
    rgpd;

  const toggleType = (id: string) =>
    setTypes((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  const toggleDispo = (key: string) => setDispos((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = [];
    Array.from(files).forEach((f) => {
      if (photos.length + next.length >= 10) return;
      if (f.size > 5 * 1024 * 1024) return;
      if (!f.type.startsWith("image/")) return;
      next.push({
        id: `${f.name}-${f.size}-${Math.random()}`,
        name: f.name,
        size: f.size,
        preview: URL.createObjectURL(f),
      });
    });
    setPhotos((prev) => [...prev, ...next]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  const useGeoloc = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setAdresse(`📍 ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
      () => {},
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    const reference = `BATI-${Date.now().toString().slice(-6)}`;
    const typesLabels = types.map((id) => TYPES_TRAVAUX.find((t) => t.id === id)?.label || id);

    try {
      // 1) Sauvegarde Supabase
      const { error: dbErr } = await (supabase as any).from("devis_batidias").insert({
        reference,
        prenom: prenom.trim(),
        nom: nom.trim(),
        telephone: tel.trim(),
        email: email.trim(),
        adresse: adresse.trim(),
        type_logement: logement || null,
        statut_propriete: statut || null,
        types_travaux: typesLabels,
        description: description.trim(),
        surface: surface || null,
        budget: budget || null,
        delai: delai || null,
        disponibilites: dispos,
        message: message.trim() || null,
        nb_photos: photos.length,
        statut: "nouveau",
      });
      if (dbErr) throw dbErr;

      // 2) Envoi email (si EmailJS configuré)
      if (isEmailJsConfigured()) {
        const payload = {
          to_email: EMAILJS_CONFIG.TEAM_EMAIL,
          subject: `🏗️ Nouveau devis RePère — ${prenom} ${nom} — ${typesLabels.join(", ")}`,
          prenom,
          nom,
          telephone: tel,
          email,
          adresse,
          type_logement: logement,
          statut_propriete: statut,
          types_travaux: typesLabels.join(", "),
          description,
          surface,
          budget,
          delai,
          disponibilites: JSON.stringify(dispos),
          message,
          nb_photos: photos.length,
          reference,
          date_envoi: new Date().toLocaleString("fr-FR"),
        };
        try {
          await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_TEAM_ID, payload, EMAILJS_CONFIG.PUBLIC_KEY);
          if (EMAILJS_CONFIG.TEMPLATE_CLIENT_ID && !EMAILJS_CONFIG.TEMPLATE_CLIENT_ID.startsWith("REPLACE_")) {
            await emailjs.send(
              EMAILJS_CONFIG.SERVICE_ID,
              EMAILJS_CONFIG.TEMPLATE_CLIENT_ID,
              { to_email: email, prenom, reference, types_travaux: typesLabels.join(", "), adresse },
              EMAILJS_CONFIG.PUBLIC_KEY,
            );
          }
        } catch (mailErr) {
          console.warn("EmailJS error:", mailErr);
        }
      }

      onSuccess({ reference, prenom, email });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        "Une erreur s'est produite lors de l'envoi. Contactez-nous directement : batidiasgestion@hotmail.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: C.card,
        borderRadius: 16,
        padding: 40,
        border: `1px solid rgba(255,255,255,0.08)`,
      }}
    >
      {/* SECTION A — Projet */}
      <SectionLabel>Votre projet</SectionLabel>

      <Field label="Type de travaux *">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TYPES_TRAVAUX.map((t) => {
            const active = types.includes(t.id);
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => toggleType(t.id)}
                style={{
                  background: active ? "rgba(200,82,26,0.15)" : "#1a1d21",
                  border: `1px solid ${active ? C.rust : "rgba(255,255,255,0.1)"}`,
                  color: active ? C.rust : C.text,
                  padding: "10px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                  transition: "all 0.15s",
                }}
              >
                {t.icon} {t.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Décrivez votre projet *">
        <textarea
          rows={6}
          maxLength={1000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Je souhaite rénover ma salle de bain de 8m². Remplacer la douche par une douche à l'italienne, refaire le carrelage au sol et aux murs, remplacer le lavabo et la robinetterie..."
          style={inputStyle({ asTextarea: true })}
          onFocus={(e) => (e.target.style.borderColor = "rgba(200,82,26,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = C.borderField)}
        />
        <div style={{ textAlign: "right", fontSize: 11, color: C.textDim, marginTop: 4 }}>{description.length}/1000</div>
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Surface approximative">
          <select value={surface} onChange={(e) => setSurface(e.target.value)} style={inputStyle()}>
            <option value="">— Sélectionner —</option>
            {SURFACES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget indicatif">
          <select value={budget} onChange={(e) => setBudget(e.target.value)} style={inputStyle()}>
            <option value="">— Sélectionner —</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Photos du chantier (recommandé)" sublabel="Aide notre équipe à mieux évaluer votre projet">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: `2px dashed rgba(255,255,255,0.1)`,
            borderRadius: 12,
            padding: 28,
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,82,26,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
        >
          <Upload size={28} style={{ color: C.rust, marginBottom: 8 }} />
          <div style={{ fontSize: 14, fontWeight: 500 }}>
            📸 Glissez vos photos ici ou cliquez pour parcourir
          </div>
          <div style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>
            JPG, PNG — Max 10 photos — 5Mo max par photo
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
        {photos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginTop: 14 }}>
            {photos.map((p) => (
              <div key={p.id} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden" }}>
                <img src={p.preview} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => removePhoto(p.id)}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    background: "rgba(0,0,0,0.8)",
                    border: "none",
                    color: "#fff",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Field>

      <Field label="Délai souhaité">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {DELAIS.map((d) => {
            const active = delai === d;
            return (
              <button
                type="button"
                key={d}
                onClick={() => setDelai(d)}
                style={{
                  background: active ? "rgba(200,82,26,0.15)" : "#1a1d21",
                  border: `1px solid ${active ? C.rust : "rgba(255,255,255,0.1)"}`,
                  color: active ? C.rust : C.text,
                  padding: "10px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: FONT_BODY,
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </Field>

      <Separator />

      {/* SECTION B — Coordonnées */}
      <SectionLabel>Vos coordonnées</SectionLabel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Prénom *">
          <input value={prenom} onChange={(e) => setPrenom(e.target.value)} style={inputStyle()} />
        </Field>
        <Field label="Nom *">
          <input value={nom} onChange={(e) => setNom(e.target.value)} style={inputStyle()} />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Téléphone *">
          <input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="06 12 34 56 78"
            style={inputStyle({ valid: tel ? telValid : null })}
          />
        </Field>
        <Field label="Email *">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            style={inputStyle({ valid: email ? emailValid : null })}
          />
        </Field>
      </div>

      <Field label="Adresse du chantier *">
        <div style={{ position: "relative" }}>
          <input
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            placeholder="12 rue de la Paix, 75011 Paris"
            style={{ ...inputStyle(), paddingRight: 130 }}
          />
          <button
            type="button"
            onClick={useGeoloc}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: C.rust,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <MapPin size={14} /> Ma position
          </button>
        </div>
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Type de logement">
          <ChipsRadio options={LOGEMENTS} value={logement} onChange={setLogement} />
        </Field>
        <Field label="Statut">
          <ChipsRadio options={STATUTS} value={statut} onChange={setStatut} />
        </Field>
      </div>

      <Separator />

      {/* SECTION C — Disponibilités */}
      <SectionLabel>Disponibilités pour notre visite gratuite</SectionLabel>
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 16, marginTop: -8 }}>
        Cochez vos créneaux disponibles cette semaine et la suivante
      </div>
      <div
        style={{
          background: C.field,
          border: `1px solid ${C.borderField}`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(3, 1fr)",
            background: "rgba(255,255,255,0.03)",
            borderBottom: `1px solid rgba(255,255,255,0.05)`,
          }}
        >
          <div style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: C.textDim }}></div>
          {CRENEAUX.map((c) => (
            <div key={c} style={{ padding: "12px 14px", fontSize: 12, fontWeight: 600, color: C.textDim, textAlign: "center" }}>
              {c}
            </div>
          ))}
        </div>
        {JOURS.map((jour) => (
          <div
            key={jour}
            style={{
              display: "grid",
              gridTemplateColumns: "120px repeat(3, 1fr)",
              borderBottom: `1px solid rgba(255,255,255,0.05)`,
            }}
          >
            <div style={{ padding: "14px", fontSize: 14, fontWeight: 500 }}>{jour}</div>
            {CRENEAUX.map((c) => {
              const disabled = jour === "Samedi" && c === "Soir 18-20h";
              const key = `${jour}__${c}`;
              const checked = !!dispos[key];
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 10 }}>
                  {disabled ? (
                    <span style={{ color: C.textDim, fontSize: 12 }}>—</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleDispo(key)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 5,
                        background: checked ? C.rust : "transparent",
                        border: `1.5px solid ${checked ? C.rust : "rgba(255,255,255,0.2)"}`,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                      }}
                    >
                      {checked && <CheckCircle2 size={14} style={{ color: "#fff" }} />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Field label="Message complémentaire (optionnel)">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Code de la porte, accès particulier, questions..."
            style={inputStyle({ asTextarea: true })}
          />
        </Field>
      </div>

      <Separator />

      {/* SECTION D — Envoi */}
      <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          style={{ marginTop: 3, accentColor: C.rust, cursor: "pointer", width: 16, height: 16 }}
        />
        <span style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
          J'accepte que mes données soient utilisées par BATIDIAS pour traiter ma demande de devis. Pas de spam, jamais.
        </span>
      </label>

      <div
        style={{
          background: "rgba(200,82,26,0.06)",
          border: `1px solid rgba(200,82,26,0.15)`,
          borderRadius: 10,
          padding: 16,
          marginBottom: 24,
          fontSize: 13,
          color: C.textMuted,
          lineHeight: 1.7,
        }}
      >
        ✅ Devis 100% gratuit et sans engagement
        <br />
        🔒 Vos données restent confidentielles
        <br />
        📞 Vous serez contacté sous 48h ouvrables
      </div>

      {errorMsg && (
        <div
          style={{
            background: "rgba(220,38,38,0.1)",
            border: `1px solid rgba(220,38,38,0.3)`,
            color: "#fca5a5",
            padding: 14,
            borderRadius: 8,
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || submitting}
        style={{
          width: "100%",
          background: !isValid || submitting ? "#3a2418" : C.rust,
          color: !isValid || submitting ? "rgba(237,240,245,0.4)" : C.text,
          fontFamily: FONT_TITLE,
          fontWeight: 700,
          fontSize: 18,
          padding: "20px 48px",
          borderRadius: 8,
          border: "none",
          cursor: !isValid || submitting ? "not-allowed" : "pointer",
          boxShadow: !isValid || submitting ? "none" : "0 0 30px rgba(200,82,26,0.25)",
          transition: "transform 0.2s, box-shadow 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
        onMouseEnter={(e) => {
          if (isValid && !submitting) e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        {submitting ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Envoi en cours...
          </>
        ) : (
          <>
            <Send size={20} /> Envoyer ma demande de devis
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────── CONFIRMATION ─────────────────── */
function Confirmation({ data, onReset }: { data: { reference: string; prenom: string; email: string }; onReset: () => void }) {
  const [copied, setCopied] = useState(false);
  const copyRef = () => {
    navigator.clipboard.writeText(data.reference).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <section style={{ padding: "120px 0 80px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            animation: "batipulse 2s ease-in-out infinite",
          }}
        >
          <CheckCircle2 size={56} style={{ color: "#4ade80" }} />
        </div>

        <h1
          style={{
            fontFamily: FONT_TITLE,
            fontWeight: 800,
            fontSize: 40,
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: 12,
          }}
        >
          Demande envoyée !
        </h1>
        <p style={{ fontSize: 18, color: C.textMuted, marginBottom: 32 }}>
          Merci <strong style={{ color: C.text }}>{data.prenom}</strong> ! Notre équipe a bien reçu votre projet.
        </p>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: C.textDim, marginBottom: 10 }}>Votre référence</div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: C.field,
              border: `1px solid ${C.borderField}`,
              padding: "12px 24px",
              borderRadius: 8,
              fontFamily: "Courier, monospace",
              fontSize: 18,
              fontWeight: 600,
              color: C.rust,
            }}
          >
            {data.reference}
            <button
              type="button"
              onClick={copyRef}
              style={{
                background: "transparent",
                border: `1px solid ${C.borderField}`,
                color: C.text,
                padding: "4px 10px",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: FONT_BODY,
              }}
            >
              <Copy size={12} /> {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        </div>

        <div
          style={{
            background: C.card,
            borderRadius: 16,
            padding: 32,
            textAlign: "left",
            marginBottom: 32,
            border: `1px solid ${C.border}`,
          }}
        >
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 18, marginBottom: 24 }}>La suite</div>
          {[
            { icon: "✅", label: "Demande reçue", time: "maintenant", color: "#4ade80", bg: "rgba(34,197,94,0.15)" },
            { icon: "⏳", label: "Étude de votre projet", time: "sous 24h", color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
            { icon: "📅", label: "Visite à domicile", time: "selon vos disponibilités", color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
            { icon: "📋", label: "Devis remis", time: "sous 48h après visite", color: "#9ca3af", bg: "rgba(156,163,175,0.15)" },
          ].map((step, i, arr) => (
            <div key={step.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 20 : 0, position: "relative" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: step.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {step.icon}
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 17,
                    top: 36,
                    bottom: 0,
                    width: 2,
                    background: C.border,
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{step.label}</div>
                <div style={{ fontSize: 13, color: step.color, marginTop: 2 }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: C.textDim, marginBottom: 32 }}>
          Vous recevrez aussi un email de confirmation à <strong style={{ color: C.text }}>{data.email}</strong>
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{
              background: C.rust,
              color: C.text,
              padding: "14px 28px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
              fontFamily: FONT_TITLE,
            }}
          >
            Retour à l'accueil RePère
          </Link>
          <button
            type="button"
            onClick={onReset}
            style={{
              background: "transparent",
              color: C.text,
              padding: "14px 28px",
              borderRadius: 8,
              border: `1px solid ${C.borderField}`,
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: FONT_BODY,
            }}
          >
            Faire une nouvelle demande
          </button>
        </div>
      </div>
      <style>{`@keyframes batipulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(74,222,128,0.4); } 50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(74,222,128,0); } }`}</style>
    </section>
  );
}

/* ─────────────────── TÉMOIGNAGES ─────────────────── */
function Testimonials() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeader label="ILS NOUS FONT CONFIANCE" title="Ce que disent nos clients." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56 }}>
          {TEMOIGNAGES.map((t, i) => (
            <div
              key={i}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: 28,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: 8,
                  fontSize: 140,
                  fontFamily: FONT_TITLE,
                  fontWeight: 800,
                  color: C.rust,
                  opacity: 0.08,
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                "
              </div>
              <div style={{ display: "flex", gap: 4, marginBottom: 16, position: "relative" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} style={{ color: C.rust, fill: C.rust }} />
                ))}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, margin: 0, marginBottom: 20, position: "relative" }}>
                "{t.text}"
              </p>
              <div style={{ fontSize: 13, color: C.textDim, position: "relative" }}>
                — <strong style={{ color: C.text }}>{t.author}</strong>, {t.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FOOTER ─────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: C.card,
        borderTop: `1px solid ${C.border}`,
        padding: "60px 0 30px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>
              <span style={{ color: C.rust }}>Re</span>Père
            </div>
            <p style={{ fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 16 }}>
              On le devient ensemble.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["IG", "FB", "X", "YT"].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: C.textMuted,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <FooterCol title="Services" items={["RenoRides", "Garde", "BATIDIAS", "Communauté"]} />
          <FooterCol title="BATIDIAS" items={["Nos services", "Comment ça marche", "Témoignages", "Contact"]} />
          <FooterCol title="Légal" items={["CGU", "Confidentialité", "Mentions légales"]} />
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, fontSize: 12, color: C.textDim, textAlign: "center" }}>
          © 2026 RePère — BATIDIAS • Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 14, marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => (
          <a
            key={it}
            href="#"
            style={{ fontSize: 13, color: C.textMuted, textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.rust)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}
          >
            {it}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── HELPERS ─────────────────── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          color: C.rust,
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <h2
        style={{
          fontFamily: FONT_TITLE,
          fontWeight: 800,
          fontSize: 44,
          letterSpacing: "-0.03em",
          margin: 0,
          marginBottom: subtitle ? 12 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 17, color: C.textMuted, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: FONT_TITLE,
        fontWeight: 700,
        fontSize: 14,
        color: C.rust,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 20,
        marginTop: 8,
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, sublabel, children }: { label: string; sublabel?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: sublabel ? 4 : 8 }}>{label}</label>
      {sublabel && <div style={{ fontSize: 12, color: C.textDim, marginBottom: 10 }}>{sublabel}</div>}
      {children}
    </div>
  );
}

function Separator() {
  return <div style={{ height: 1, background: C.border, margin: "32px 0" }} />;
}

function ChipsRadio({ options, value, onChange }: { options: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            type="button"
            key={o.id}
            onClick={() => onChange(active ? "" : o.id)}
            style={{
              background: active ? "rgba(200,82,26,0.15)" : "#1a1d21",
              border: `1px solid ${active ? C.rust : "rgba(255,255,255,0.1)"}`,
              color: active ? C.rust : C.text,
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: FONT_BODY,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function inputStyle({ asTextarea, valid }: { asTextarea?: boolean; valid?: boolean | null } = {}): React.CSSProperties {
  const borderColor = valid === true ? "rgba(74,222,128,0.5)" : valid === false ? "rgba(220,38,38,0.5)" : C.borderField;
  return {
    width: "100%",
    background: C.field,
    border: `1px solid ${borderColor}`,
    borderRadius: 8,
    padding: "12px 14px",
    color: C.text,
    fontSize: 14,
    fontFamily: FONT_BODY,
    outline: "none",
    transition: "border-color 0.15s",
    resize: asTextarea ? "vertical" : undefined,
    minHeight: asTextarea ? 120 : undefined,
  };
}
