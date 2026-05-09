import { useEffect, useState } from "react";

export type Nanny = {
  id: string;
  name: string;
  type: string;
  services: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  etaMin: number;
  available: boolean;
  verified: string[];
  ageRange: string;
  languages: string[];
  experience: number;
  lat: number;
  lng: number;
  avatar: string;
};

export const MOCK_NANNIES: Nanny[] = [
  {
    id: "n1",
    name: "Amélie L.",
    type: "Nounou diplômée",
    services: ["Garde Flash", "Sortie école", "Bain & repas", "Devoirs"],
    rating: 4.9,
    reviews: 213,
    hourlyRate: 14,
    etaMin: 22,
    available: true,
    verified: ["PSC1", "Casier B3", "DPAM", "Identité"],
    ageRange: "0-10 ans",
    languages: ["FR", "EN"],
    experience: 8,
    lat: 48.8606,
    lng: 2.3376,
    avatar: "AL",
  },
  {
    id: "n2",
    name: "Sophie M.",
    type: "Auxiliaire puériculture",
    services: ["Bébé < 1 an", "Nuit", "Garde Flash", "Médical léger"],
    rating: 5.0,
    reviews: 156,
    hourlyRate: 18,
    etaMin: 35,
    available: true,
    verified: ["PSC1", "Casier B3", "DEAP", "Identité"],
    ageRange: "0-3 ans",
    languages: ["FR"],
    experience: 12,
    lat: 48.8738,
    lng: 2.295,
    avatar: "SM",
  },
  {
    id: "n3",
    name: "Karine D.",
    type: "Nounou expérimentée",
    services: ["Sortie école", "Mercredi", "Devoirs CP-CM2", "Activités"],
    rating: 4.8,
    reviews: 98,
    hourlyRate: 13,
    etaMin: 18,
    available: true,
    verified: ["PSC1", "Casier B3", "CAP AEPE"],
    ageRange: "3-12 ans",
    languages: ["FR", "ES"],
    experience: 6,
    lat: 48.8534,
    lng: 2.3488,
    avatar: "KD",
  },
  {
    id: "n4",
    name: "Léa T.",
    type: "Étudiante puéricultrice",
    services: ["Garde Flash", "Sortie école", "Baby-sitting soir"],
    rating: 4.7,
    reviews: 64,
    hourlyRate: 11,
    etaMin: 15,
    available: true,
    verified: ["PSC1", "Casier B3", "Identité"],
    ageRange: "3-10 ans",
    languages: ["FR", "EN"],
    experience: 3,
    lat: 48.8417,
    lng: 2.3225,
    avatar: "LT",
  },
  {
    id: "n5",
    name: "Fatima B.",
    type: "Nounou diplômée",
    services: ["Bébé", "Garde longue", "Bilingue", "Cuisine maison"],
    rating: 4.9,
    reviews: 187,
    hourlyRate: 15,
    etaMin: 28,
    available: false,
    verified: ["PSC1", "Casier B3", "CAP AEPE", "DPAM"],
    ageRange: "0-6 ans",
    languages: ["FR", "AR"],
    experience: 10,
    lat: 48.882,
    lng: 2.343,
    avatar: "FB",
  },
  {
    id: "n6",
    name: "Marine P.",
    type: "Nounou Flash dispo nuit",
    services: ["Nuit", "Weekend", "Garde Flash 24/7", "Urgence"],
    rating: 4.8,
    reviews: 142,
    hourlyRate: 17,
    etaMin: 30,
    available: true,
    verified: ["PSC1", "Casier B3", "DPAM"],
    ageRange: "1-8 ans",
    languages: ["FR"],
    experience: 7,
    lat: 48.8675,
    lng: 2.3624,
    avatar: "MP",
  },
  {
    id: "n7",
    name: "Julie R.",
    type: "Père entraide membre",
    services: ["Entraide gratuite", "Sortie école", "Mercredi"],
    rating: 5.0,
    reviews: 24,
    hourlyRate: 0,
    etaMin: 12,
    available: true,
    verified: ["Membre Fondateur", "PSC1", "Identité"],
    ageRange: "3-12 ans",
    languages: ["FR"],
    experience: 0,
    lat: 48.8483,
    lng: 2.3094,
    avatar: "JR",
  },
];

const FILTERS = ["Toutes", "Garde Flash", "Bébé < 3 ans", "Sortie école", "Nuit", "Entraide"];

export function NanniesMap() {
  const [mounted, setMounted] = useState(false);
  const [Map, setMap] = useState<any>(null);
  const [filter, setFilter] = useState("Toutes");
  const [selected, setSelected] = useState<Nanny | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const RL = await import("react-leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (alive) {
        setMap({ L, ...RL });
        setMounted(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const nannies = MOCK_NANNIES.filter((n) => {
    if (filter === "Toutes") return true;
    if (filter === "Garde Flash") return n.services.some((s) => s.includes("Flash"));
    if (filter === "Bébé < 3 ans") return n.ageRange.startsWith("0-");
    if (filter === "Sortie école") return n.services.some((s) => s.includes("école"));
    if (filter === "Nuit") return n.services.some((s) => s.includes("Nuit"));
    if (filter === "Entraide") return n.hourlyRate === 0;
    return true;
  });

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-rust uppercase tracking-[0.3em] text-xs mb-3">Carte temps réel</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Les nounous dispo autour de toi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comme un Uber, mais pour faire garder tes gosses dans 2h. Toutes vérifiées (PSC1, Casier B3, DPAM). Tu choisis.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-sm uppercase tracking-wider border transition ${
                filter === t
                  ? "bg-rust text-background border-rust"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[520px] rounded-lg overflow-hidden border border-border relative bg-card">
            {mounted && Map ? (
              <Map.MapContainer
                center={[48.8606, 2.3376]}
                zoom={13}
                scrollWheelZoom
                style={{ height: "100%", width: "100%" }}
              >
                <Map.TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {nannies.map((a) => {
                  const icon = Map.L.divIcon({
                    className: "",
                    html: `<div style="position:relative;width:44px;height:44px"><div style="position:absolute;inset:0;border-radius:50%;background:${
                      a.available ? "#C8521A" : "#555"
                    };display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;border:3px solid #EDF0F5;box-shadow:0 4px 12px rgba(0,0,0,0.4)">${a.avatar}</div>${
                      a.available
                        ? `<span style="position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:#22c55e;border:2px solid #EDF0F5"></span>`
                        : ""
                    }</div>`,
                    iconSize: [44, 44],
                    iconAnchor: [22, 22],
                  });
                  return (
                    <Map.Marker
                      key={a.id}
                      position={[a.lat, a.lng]}
                      icon={icon}
                      eventHandlers={{ click: () => setSelected(a) }}
                    >
                      <Map.Popup>
                        <strong>{a.name}</strong> — {a.type}
                        <br />
                        {a.hourlyRate === 0 ? "Entraide" : `${a.hourlyRate}€/h`} · ⭐ {a.rating} ({a.reviews})
                      </Map.Popup>
                    </Map.Marker>
                  );
                })}
              </Map.MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Chargement de la carte…
              </div>
            )}
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2">
            {nannies.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className={`w-full text-left p-4 border transition ${
                  selected?.id === a.id
                    ? "border-rust bg-rust/5"
                    : "border-border hover:border-foreground bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      a.available ? "bg-rust text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {a.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{a.name}</span>
                      {a.available ? (
                        <span className="text-[10px] uppercase tracking-wider text-green-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Dispo
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Occupée</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.type} · {a.ageRange}</div>
                    <div className="text-xs mt-1 flex items-center gap-3 flex-wrap">
                      <span>⭐ {a.rating} <span className="text-muted-foreground">({a.reviews})</span></span>
                      <span className="text-rust font-semibold">
                        {a.hourlyRate === 0 ? "Gratuit" : `${a.hourlyRate}€/h`}
                      </span>
                      <span className="text-muted-foreground">~{a.etaMin}min</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div className="mt-8 border border-rust/40 bg-card p-6 rounded-lg">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-rust text-background flex items-center justify-center font-bold text-lg">
                  {selected.avatar}
                </div>
                <div>
                  <div className="font-display text-2xl">{selected.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {selected.type} · {selected.experience > 0 ? `${selected.experience} ans d'exp` : "Entraide membre"} · arrivée ~{selected.etaMin}min
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">×</button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="uppercase text-xs tracking-widest text-muted-foreground mb-2">Prestations</div>
                <ul className="space-y-1">
                  {selected.services.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  Âges : <span className="text-foreground">{selected.ageRange}</span> · Langues : <span className="text-foreground">{selected.languages.join(", ")}</span>
                </div>
              </div>
              <div>
                <div className="uppercase text-xs tracking-widest text-muted-foreground mb-2">Vérifications</div>
                <div className="flex flex-wrap gap-2">
                  {selected.verified.map((v) => (
                    <span key={v} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-rust/40 text-rust">
                      ✓ {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="uppercase text-xs tracking-widest text-muted-foreground mb-2">Tarification</div>
                <div className="space-y-1">
                  <div>Taux horaire : <span className="font-semibold">{selected.hourlyRate === 0 ? "Gratuit (entraide)" : `${selected.hourlyRate}€`}</span></div>
                  <div>Majoration Flash : <span className="font-semibold">+30%</span></div>
                  <div>Majoration nuit : <span className="font-semibold">+50%</span></div>
                  <div>Commission : <span className="text-rust">10%</span> (membre)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="flex-1 bg-rust text-background py-3 uppercase tracking-widest text-sm font-semibold hover:bg-rust/90 transition">
                Réserver une garde Flash
              </button>
              <button className="flex-1 border border-border py-3 uppercase tracking-widest text-sm hover:border-foreground transition">
                Planifier (récurrent)
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
