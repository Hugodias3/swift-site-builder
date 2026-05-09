import { useEffect, useState } from "react";

export type NotifKind = "eta" | "arrived" | "paid";

type Notif = {
  id: number;
  kind: NotifKind;
  title: string;
  body: string;
};

const STYLES: Record<NotifKind, { bg: string; fg: string; icon: string; ring: string }> = {
  eta:     { bg: "#FFB347", fg: "#3B2200", icon: "⏱️", ring: "rgba(255,179,71,0.45)" },
  arrived: { bg: "#38D98A", fg: "#06210F", icon: "🔔", ring: "rgba(56,217,138,0.5)" },
  paid:    { bg: "#C8521A", fg: "#FFFFFF", icon: "✓",  ring: "rgba(200,82,26,0.5)" },
};

const PATTERNS: Record<NotifKind, number | number[]> = {
  eta: [120, 60, 120],
  arrived: [200, 80, 200, 80, 200],
  paid: [60, 40, 60, 40, 220],
};

function vibrate(p: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      (navigator as any).vibrate(p);
    }
  } catch {}
}

let pushFn: ((n: Omit<Notif, "id">) => void) | null = null;
let counter = 0;

export function notify(kind: NotifKind, title: string, body: string) {
  vibrate(PATTERNS[kind]);
  pushFn?.({ kind, title, body });
}

export function NotifHost() {
  const [items, setItems] = useState<Notif[]>([]);

  useEffect(() => {
    pushFn = (n) => {
      const id = ++counter;
      setItems((cur) => [...cur, { id, ...n }]);
      setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== id)), 4500);
    };
    return () => { pushFn = null; };
  }, []);

  return (
    <>
      <style>{`
        @keyframes notif-in { from { transform: translateY(-110%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes notif-ring { 0% { box-shadow: 0 0 0 0 var(--ring); } 100% { box-shadow: 0 0 0 16px transparent; } }
      `}</style>
      <div
        className="fixed inset-x-0 z-[3000] flex flex-col items-center gap-2 px-3 pointer-events-none"
        style={{ top: "max(env(safe-area-inset-top), 8px)" }}
      >
        {items.map((n) => {
          const s = STYLES[n.kind];
          return (
            <div
              key={n.id}
              className="w-full max-w-sm rounded-2xl px-4 py-3 flex items-center gap-3 pointer-events-auto"
              style={{
                background: s.bg,
                color: s.fg,
                animation: "notif-in .35s cubic-bezier(.2,.8,.2,1)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[17px]"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  // @ts-ignore custom prop
                  ["--ring" as any]: s.ring,
                  animation: "notif-ring 1.4s ease-out infinite",
                }}
              >
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-[13.5px] leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{n.title}</div>
                <div className="text-[12px] leading-snug opacity-90 mt-0.5">{n.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
