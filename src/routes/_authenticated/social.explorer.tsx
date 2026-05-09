import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialShell } from "@/components/social/SocialShell";

export const Route = createFileRoute("/_authenticated/social/explorer")({
  component: Explorer,
});

function Explorer() {
  const [tags, setTags] = useState<{ hashtag: string; n: number }[]>([]);
  const [users, setUsers] = useState<{ username: string; display_name: string; bio: string | null }[]>([]);

  useEffect(() => {
    supabase.from("post_hashtags").select("hashtag").limit(1000).then(({ data }) => {
      const c: Record<string, number> = {};
      (data || []).forEach((r) => { c[r.hashtag] = (c[r.hashtag] || 0) + 1; });
      setTags(Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([hashtag, n]) => ({ hashtag, n })));
    });
    supabase.from("profiles").select("username, display_name, bio").order("created_at", { ascending: false }).limit(20).then(({ data }) => setUsers(data || []));
  }, []);

  return (
    <SocialShell>
      <h1 className="font-display text-4xl uppercase mb-6">Explorer</h1>

      <section className="mb-10">
        <h2 className="text-xs uppercase tracking-widest text-rust mb-3">Hashtags du moment</h2>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? <p className="text-sm text-muted-foreground">Aucun hashtag pour le moment.</p> : tags.map((t) => (
            <Link key={t.hashtag} to="/social/tag/$hashtag" params={{ hashtag: t.hashtag }} className="px-3 py-1.5 bg-card border border-border hover:border-rust hover:text-rust transition text-sm">
              #{t.hashtag} <span className="text-xs text-muted-foreground">{t.n}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-rust mb-3">Nouveaux membres</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {users.map((u) => (
            <Link key={u.username} to="/social/u/$username" params={{ username: u.username }} className="flex items-center gap-3 border border-border bg-card/40 p-3 hover:border-rust">
              <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center text-rust font-display uppercase">{u.display_name[0]}</div>
              <div className="min-w-0">
                <div className="font-bold text-sm truncate">{u.display_name}</div>
                <div className="text-xs text-muted-foreground truncate">@{u.username}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SocialShell>
  );
}
