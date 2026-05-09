import { useEffect, useState } from "react";

export type Artisan = {
  id: string;
  name: string;
  trade: string;
  services: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  etaMin: number;
  available: boolean;
  verified: string[];
  lat: number;
  lng: number;
  avatar: string;
};

export const MOCK_ARTISANS: Artisan[] = [
  {
    id: "a1",
    name: "Karim B.",
    trade: "Plombier",
    services: ["Fuite urgente", "Débouchage", "Chauffe-eau", "Sanitaire"],
    rating: 4.9,
    reviews: 187,
    hourlyRate: 65,
    etaMin: 18,
    available: true,
    verified: ["KBIS", "RC Pro", "Qualibat"],
    lat: 48.8606,
    lng: 2.3376,
    avatar: "KB",
  },
  {
    id: "a2",
    name: "Thomas R.",
    trade: "Électricien",
    services: ["Panne courant", "Tableau", "Mise aux normes", "Domotique"],
    rating: 4.8,
    reviews: 142,
    hourlyRate: 70,
    etaMin: 25,
    available: true,
    verified: ["KBIS", "RC Pro", "Qualifelec"],
    lat: 48.8738,
    lng: 2.295,
    avatar: "TR",
  },
  {
    id: "a3",
    name: "Mehdi S.",
    trade: "Serrurier",
    services: ["Ouverture porte", "Changement serrure", "Blindage"],
    rating: 4.7,
    reviews: 96,
    hourlyRate: 90,
    etaMin: 12,
    available: true,
    verified: ["KBIS", "RC Pro", "Casier B3"],
    lat: 48.8534,
    lng: 2.3488,
    avatar: "MS",
  },
  {
    id: "a4",
    name: "Julien P.",
    trade: "Chauffagiste",
    services: ["Chaudière", "PAC", "Entretien", "Dépannage"],
    rating: 4.9,
    reviews: 218,
    hourlyRate: 75,
    etaMin: 35,
    available: true,
    verified: ["KBIS", "RC Pro", "RGE", "QualiPAC"],
    lat: 48.8417,
    lng: 2.3225,
    avatar: "JP",
  },
  {
    id: "a5",
    name: "Antoine D.",
    trade: "Vitrier",
    services: ["Bris de glace", "Double vitrage", "Miroiterie"],
    rating: 4.6,
    reviews: 71,
    hourlyRate: 60,
    etaMin: 40,
    available: false,
    verified: ["KBIS", "RC Pro"],
    lat: 48.882,
    lng: 2.343,
    avatar: "AD",
  },
  {
    id: "a6",
    name: "Sébastien M.",
    trade: "Plombier",
    services: ["Fuite", "Robinetterie", "WC", "Évacuation"],
    rating: 4.8,
    reviews: 154,
    hourlyRate: 62,
    etaMin: 28,
    available: true,
    verified: ["KBIS", "RC Pro", "Qualibat"],
    lat: 48.8675,
    lng: 2.3624,
    avatar: "SM",
  },
  {
    id: "a7",
    name: "Yannick L.",
    trade: "Électricien",
    services: ["Urgence panne", "Interphone", "Éclairage"],
    rating: 4.7,
    reviews: 88,
    hourlyRate: 68,
    etaMin: 22,
    available: true,
    verified: ["KBIS", "RC Pro", "Qualifelec"],
    lat: 48.8483,
    lng: 2.3094,
    avatar: "YL",
  },
];

const TRADES = ["Tous", "Plombier", "Électricien", "Serrurier", "Chauffagiste", "Vitrier"];

export function ArtisansMap() {
  const [mounted, setMounted] = useState(false);
  const [Map, setMap] = useState<any>(null);
  const [filter, setFilter] = useState("Tous");
  const [selected, setSelected] = useState<Artisan | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const RL = await import("react-leaflet");
      // Fix default icon
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

  const artisans = MOCK_ARTISANS.filter((a) => filter === "Tous" || a.trade === filter);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-rust uppercase tracking-[0.3em] text-xs mb-3">Carte temps réel</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Les artisans dispo autour de toi</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comme un Uber, mais pour réparer ta fuite à 22h. Tous vérifiés. Tarif annoncé. Tu choisis.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {TRADES.map((t) => (
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
                {artisans.map((a) => {
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
                        <strong>{a.name}</strong> — {a.trade}
                        <br />
                        {a.hourlyRate}€/h · ⭐ {a.rating} ({a.reviews})
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
            {artisans.map((a) => (
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
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Occupé</span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{a.trade}</div>
                    <div className="text-xs mt-1 flex items-center gap-3">
                      <span>⭐ {a.rating} <span className="text-muted-foreground">({a.reviews})</span></span>
                      <span className="text-rust font-semibold">{a.hourlyRate}€/h</span>
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
                  <div className="text-sm text-muted-foreground">{selected.trade} · {selected.hourlyRate}€/h · arrivée ~{selected.etaMin}min</div>
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
                  <div>Taux horaire : <span className="font-semibold">{selected.hourlyRate}€</span></div>
                  <div>Déplacement : <span className="font-semibold">offert membres</span></div>
                  <div>Commission : <span className="text-rust">12%</span> (membre)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="flex-1 bg-rust text-background py-3 uppercase tracking-widest text-sm font-semibold hover:bg-rust/90 transition">
                Demander une intervention
              </button>
              <button className="flex-1 border border-border py-3 uppercase tracking-widest text-sm hover:border-foreground transition">
                Demander un devis
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
