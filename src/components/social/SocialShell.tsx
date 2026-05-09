import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { ReactNode } from "react";

export function SocialShell({ children, right }: { children: ReactNode; right?: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<{ username: string; display_name: string; avatar_url: string | null } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("username, display_name, avatar_url").eq("id", user.id).maybeSingle()
      .then(({ data }) => data && setProfile(data));
  }, [user]);

  async function logout() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  const navItems = [
    { to: "/social" as const, label: "Fil" },
    { to: "/social/explorer" as const, label: "Explorer" },
    { to: "/social/groupes" as const, label: "Groupes" },
    { to: "/social/messages" as const, label: "Messages" },
    { to: "/social/me" as const, label: "Mon profil" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link to="/social" className="font-display text-xl uppercase tracking-tight">
            RePère<span className="text-rust">.</span>
          </Link>
          <div className="flex items-center gap-3">
            {profile && (
              <Link to="/social/me" className="text-sm text-muted-foreground hover:text-rust">@{profile.username}</Link>
            )}
            <button onClick={logout} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-rust">
              Sortir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_280px] gap-6 py-6 pb-24 md:pb-6">
        {/* LEFT NAV (desktop) */}
        <nav className="hidden md:block sticky top-20 self-start">
          <ul className="space-y-1">
            {navItems.map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  className="block px-3 py-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-rust hover:bg-card transition"
                  activeProps={{ className: "block px-3 py-2 text-sm uppercase tracking-widest text-rust bg-card border-l-2 border-rust" }}
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="min-w-0">{children}</section>

        {right && <aside className="hidden lg:block sticky top-20 self-start">{right}</aside>}
      </div>

      {/* BOTTOM NAV (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border">
        <ul className="grid grid-cols-5">
          {navItems.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                className="flex items-center justify-center py-3 text-[10px] uppercase tracking-widest text-muted-foreground"
                activeProps={{ className: "flex items-center justify-center py-3 text-[10px] uppercase tracking-widest text-rust" }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
