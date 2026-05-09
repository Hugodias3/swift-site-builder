export type Status = "now" | "soon" | "off";
export type Review = { initials: string; rating: number; text: string; date: string };
export type Artisan = {
  id: string;
  name: string;
  trade: string;
  area: string;
  emoji: string;
  status: Status;
  eta: string;
  rate: string;
  rating: number;
  jobs: number;
  badges: { label: string; tone: "green" | "blue" | "amber" }[];
  reviews: Review[];
  lat: number;
  lng: number;
};

export const ARTISANS: Artisan[] = [
  {
    id: "1", name: "Karim B.", trade: "Plombier", area: "Paris 10ème", emoji: "🔧",
    status: "now", eta: "8 min", rate: "70€/h", rating: 4.8, jobs: 98,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
      { label: "✓ Certifié", tone: "blue" },
    ],
    reviews: [
      { initials: "S.B.", rating: 5, text: "Très réactif, fuite réparée en 30min.", date: "Il y a 1j" },
      { initials: "M.A.", rating: 5, text: "Travail soigné, prix correct.", date: "Il y a 4j" },
    ],
    lat: 48.8606, lng: 2.3376,
  },
  {
    id: "2", name: "Karim D.", trade: "Serrurier", area: "Paris 11ème", emoji: "🔒",
    status: "now", eta: "5 min", rate: "65€/h", rating: 4.9, jobs: 142,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
      { label: "✓ Certifié", tone: "blue" },
      { label: "⭐ Artisan de confiance", tone: "amber" },
    ],
    reviews: [
      { initials: "T.M.", rating: 5, text: "Impeccable, rapide et propre.", date: "Il y a 2j" },
      { initials: "R.L.", rating: 5, text: "Parfait pour l'urgence du dimanche.", date: "Il y a 5j" },
    ],
    lat: 48.8534, lng: 2.3488,
  },
  {
    id: "3", name: "Thomas R.", trade: "Electricien", area: "Paris 17ème", emoji: "⚡",
    status: "soon", eta: "22 min", rate: "75€/h", rating: 4.7, jobs: 76,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
    ],
    reviews: [
      { initials: "J.P.", rating: 5, text: "Diagnostic clair, intervention nickel.", date: "Il y a 3j" },
      { initials: "C.D.", rating: 4, text: "Bon travail, un peu de retard.", date: "Il y a 8j" },
    ],
    lat: 48.8738, lng: 2.295,
  },
  {
    id: "4", name: "Julien P.", trade: "Multi-services", area: "Paris 5ème", emoji: "🏠",
    status: "now", eta: "12 min", rate: "55€/h", rating: 4.6, jobs: 54,
    badges: [
      { label: "✓ KBIS valide", tone: "green" },
      { label: "✓ RC Pro 2026", tone: "green" },
    ],
    reviews: [
      { initials: "A.K.", rating: 5, text: "Polyvalent et arrangeant.", date: "Il y a 6j" },
      { initials: "L.M.", rating: 4, text: "Bon rapport qualité/prix.", date: "Il y a 10j" },
    ],
    lat: 48.8417, lng: 2.3225,
  },
  {
    id: "5", name: "Sébastien M.", trade: "Plombier", area: "Paris 19ème", emoji: "🔧",
    status: "off", eta: "Indispo", rate: "70€/h", rating: 4.5, jobs: 31,
    badges: [{ label: "✓ KBIS valide", tone: "green" }],
    reviews: [
      { initials: "N.O.", rating: 4, text: "Correct.", date: "Il y a 12j" },
      { initials: "P.G.", rating: 5, text: "Très pro.", date: "Il y a 20j" },
    ],
    lat: 48.8675, lng: 2.3624,
  },
];

export const INTERVENTION_TYPES: Record<string, string[]> = {
  Serrurier: ["Serrure bloquée", "Porte claquée", "Serrure cassée", "Coffre-fort", "Autre"],
  Plombier: ["Fuite d'eau", "WC bouché", "Chauffe-eau", "Robinetterie", "Autre"],
  Electricien: ["Coupure", "Court-circuit", "Tableau électrique", "Prise/interrupteur", "Autre"],
  "Multi-services": ["Petit bricolage", "Montage meuble", "Fixation murale", "Dépannage", "Autre"],
};
