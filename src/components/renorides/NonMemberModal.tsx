import { Link } from "@tanstack/react-router";

export function NonMemberModal({ open, onClose, onGrant }: { open: boolean; onClose: () => void; onGrant?: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(7,8,10,0.78)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", fontFamily: "'DM Sans', sans-serif" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[400px] p-7 rounded-[20px]"
        style={{ background: "#0D0F12", border: "1px solid rgba(255,255,255,0.06)", animation: "modal-pop .25s cubic-bezier(.32,.72,0,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes modal-pop { from { opacity:0; transform: scale(.94) translateY(8px) } to { opacity:1; transform: none } }`}</style>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(237,240,245,0.7)" }}
        >
          ✕
        </button>

        <div className="text-center">
          <div className="text-3xl mb-3">🔐</div>
          <h2 className="font-bold text-[20px]" style={{ fontFamily: "'Syne', sans-serif", color: "#EDF0F5" }}>Accès RenoRides</h2>
          <p className="text-[13px] mt-1" style={{ color: "rgba(237,240,245,0.55)" }}>Choisissez votre accès</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div
            className="p-4 rounded-2xl flex flex-col"
            style={{ background: "rgba(200,82,26,0.08)", border: "1px solid #C8521A" }}
          >
            <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "#C8521A" }}>Recommandé</div>
            <div className="font-bold text-[14px] mt-1" style={{ fontFamily: "'Syne', sans-serif", color: "#EDF0F5" }}>Père Actif</div>
            <div className="font-extrabold text-[18px] mt-1" style={{ fontFamily: "'Syne', sans-serif", color: "#EDF0F5" }}>7,90€<span className="text-[11px] font-normal" style={{ color: "rgba(237,240,245,0.55)" }}>/mois</span></div>
            <div className="mt-2 text-[11px]"><span style={{ color: "#38D98A" }} className="font-bold">12%</span> <span style={{ color: "rgba(237,240,245,0.55)" }}>commission</span></div>
            <div className="text-[10px] mt-1" style={{ color: "#38D98A" }}>−12€ sur 120€</div>
            <Link
              to="/auth"
              onClick={onClose}
              className="mt-4 h-10 rounded-lg flex items-center justify-center text-[12px] font-bold uppercase tracking-wider"
              style={{ background: "#C8521A", color: "#FFF", fontFamily: "'Syne', sans-serif" }}
            >
              S'abonner
            </Link>
          </div>

          <div
            className="p-4 rounded-2xl flex flex-col"
            style={{ background: "#131618", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "rgba(237,240,245,0.5)" }}>Ponctuel</div>
            <div className="font-bold text-[14px] mt-1" style={{ fontFamily: "'Syne', sans-serif", color: "#EDF0F5" }}>Accès unique</div>
            <div className="font-extrabold text-[18px] mt-1" style={{ fontFamily: "'Syne', sans-serif", color: "#EDF0F5" }}>4,90€</div>
            <div className="mt-2 text-[11px]"><span style={{ color: "#FFB347" }} className="font-bold">22%</span> <span style={{ color: "rgba(237,240,245,0.55)" }}>commission</span></div>
            <div className="text-[10px] mt-1" style={{ color: "#FFB347" }}>+26,40€ sur 120€</div>
            <button
              onClick={onClose}
              className="mt-4 h-10 rounded-lg flex items-center justify-center text-[12px] font-bold uppercase tracking-wider"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(237,240,245,0.85)", fontFamily: "'Syne', sans-serif" }}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
