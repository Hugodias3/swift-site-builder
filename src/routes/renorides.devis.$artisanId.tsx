import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ARTISANS, INTERVENTION_TYPES } from "@/data/renorides-artisans";

export const Route = createFileRoute("/renorides/devis/$artisanId")({
  component: DevisPage,
  head: () => ({
    meta: [
      { title: "Demander un devis — RePère" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

function DevisPage() {
  const { artisanId } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const artisan = useMemo(() => ARTISANS.find((a) => a.id === artisanId), [artisanId]);

  const types = artisan ? INTERVENTION_TYPES[artisan.trade] || ["Autre"] : ["Autre"];

  const [type, setType] = useState<string>(types[0]);
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [address, setAddress] = useState("12 rue de la Roquette, 75011 Paris");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!artisan) {
    return (
      <main className="fixed inset-0 flex items-center justify-center" style={{ background: "#07080A", color: "#EDF0F5" }}>
        <div className="text-center">
          <p className="mb-4">Artisan introuvable</p>
          <Link to="/app/renorides" className="px-4 py-2 rounded-lg" style={{ background: "#C8521A", color: "#fff" }}>
            Retour à la carte
          </Link>
        </div>
      </main>
    );
  }

  const initials = artisan.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
  const trustBadge = artisan.badges.find((b) => b.tone === "amber");

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - photos.length);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls].slice(0, 5));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      navigate({ to: "/renorides/attente/$id", params: { id: artisanId } });
    }, 1100);
  };

  return (
    <main className="min-h-screen font-body" style={{ background: "#07080A", color: "#EDF0F5" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        textarea, input { font-family: 'DM Sans', sans-serif; }
        textarea:focus, input:focus { outline: none; border-color: rgba(200,82,26,0.4) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* HEADER */}
      <header
        className="sticky top-0 z-20 px-4 flex items-center gap-3"
        style={{
          background: "rgba(7,8,10,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          paddingTop: "max(env(safe-area-inset-top), 12px)",
          paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <button
          onClick={() => router.history.back()}
          aria-label="Retour"
          className="w-11 h-11 -ml-2 rounded-lg flex items-center justify-center active:scale-95 transition"
          style={{ color: "#EDF0F5" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <div className="font-display font-bold text-[18px] leading-tight">Demander un devis</div>
          <div className="text-[12.5px]" style={{ color: "rgba(237,240,245,0.55)" }}>
            {artisan.name} • {artisan.trade}
          </div>
        </div>
      </header>

      <form onSubmit={submit} className="px-4 pb-32 max-w-xl mx-auto">
        {/* RECAP CARD */}
        <div
          className="mt-4 p-3 rounded-xl flex items-center gap-3"
          style={{ background: "#0D0F12", border: "1px solid rgba(200,82,26,0.25)" }}
        >
          <div
            className="rounded-full flex items-center justify-center font-display font-extrabold shrink-0"
            style={{ width: 44, height: 44, background: "linear-gradient(135deg, #C8521A, #8B3A12)", color: "#fff", fontSize: 15 }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display font-bold text-[14px] leading-tight">{artisan.name}</div>
            {trustBadge && (
              <div className="inline-flex items-center mt-1 px-2 h-5 rounded-full text-[10px] font-semibold"
                style={{ background: "rgba(242,166,35,0.1)", color: "#FFB347", border: "1px solid rgba(242,166,35,0.2)" }}
              >
                {trustBadge.label}
              </div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(237,240,245,0.5)" }}>ETA</div>
            <div className="font-display font-bold text-[14px]" style={{ color: "#38D98A" }}>{artisan.eta}</div>
          </div>
        </div>

        {/* TYPE */}
        <Field label="Type d'intervention">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => {
              const active = type === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className="px-3.5 h-10 rounded-full text-[12.5px] font-semibold transition active:scale-95"
                  style={{
                    background: active ? "rgba(200,82,26,0.15)" : "#131618",
                    border: active ? "1px solid #C8521A" : "1px solid rgba(255,255,255,0.1)",
                    color: active ? "#C8521A" : "rgba(237,240,245,0.85)",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Field>

        {/* DESCRIPTION */}
        <Field label="Décris le problème">
          <div className="relative">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value.slice(0, 200))}
              rows={4}
              placeholder="Ex: La serrure de ma porte d'entrée est bloquée depuis ce matin, la clé tourne mais la porte ne s'ouvre pas..."
              className="w-full p-3 rounded-xl text-[14px] resize-none"
              style={{
                background: "#131618",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#EDF0F5",
              }}
            />
            <div className="text-right text-[11px] mt-1" style={{ color: "rgba(237,240,245,0.45)" }}>
              {desc.length}/200
            </div>
          </div>
        </Field>

        {/* PHOTOS */}
        <Field label="Photos (optionnel)">
          <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={onPick} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={photos.length >= 5}
            className="w-full py-5 rounded-xl flex flex-col items-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1.5px dashed rgba(255,255,255,0.12)",
              color: "rgba(237,240,245,0.7)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            <span className="text-[13px] font-medium">Ajouter des photos</span>
            <span className="text-[11px]" style={{ color: "rgba(237,240,245,0.45)" }}>{photos.length}/5</span>
          </button>
          {photos.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {photos.map((p, i) => (
                <div key={i} className="relative shrink-0">
                  <img src={p} alt="" className="w-16 h-16 rounded-lg object-cover" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
                  <button
                    type="button"
                    onClick={() => setPhotos((arr) => arr.filter((_, j) => j !== i))}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] flex items-center justify-center"
                    style={{ background: "#FF4F4F", color: "#fff" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        {/* ADRESSE */}
        <Field label="Adresse d'intervention">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Numéro, rue, ville"
            className="w-full px-3.5 h-12 rounded-xl text-[14px]"
            style={{
              background: "#131618",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#EDF0F5",
            }}
          />
        </Field>

        {/* INFO */}
        <div
          className="mt-5 p-3.5 rounded-xl flex items-start gap-2.5"
          style={{ background: "rgba(200,82,26,0.08)", border: "1px solid rgba(200,82,26,0.2)" }}
        >
          <span className="text-[16px] leading-none mt-0.5">🕐</span>
          <p className="text-[12.5px] leading-relaxed" style={{ color: "rgba(237,240,245,0.85)" }}>
            <span className="font-semibold" style={{ color: "#EDF0F5" }}>{artisan.name}</span> a 10 minutes pour vous répondre.
            Vous serez notifié dès réception du devis.
          </p>
        </div>
      </form>

      {/* SUBMIT BAR */}
      <div
        className="fixed inset-x-0 bottom-0 z-20 px-4 pt-3"
        style={{
          background: "linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.95) 30%, #07080A 100%)",
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <button
            onClick={submit}
            disabled={submitting || desc.trim().length < 10}
            className="w-full rounded-xl font-display font-bold text-[16px] flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-50"
            style={{ background: "#C8521A", color: "#FFFFFF", height: 54 }}
          >
            {submitting ? (
              <>
                <span className="inline-block w-5 h-5 rounded-full" style={{ border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                <span>Envoi…</span>
              </>
            ) : (
              <>Envoyer la demande →</>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <label className="block font-display font-bold text-[12px] uppercase tracking-wider mb-2.5" style={{ color: "rgba(237,240,245,0.7)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
