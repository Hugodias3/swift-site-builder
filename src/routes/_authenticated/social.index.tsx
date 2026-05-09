import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialShell } from "@/components/social/SocialShell";
import { PostComposer } from "@/components/social/PostComposer";
import { PostCard, type FeedPost } from "@/components/social/PostCard";

export const Route = createFileRoute("/_authenticated/social/")({
  component: Feed,
});

function Feed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [trending, setTrending] = useState<{ hashtag: string; n: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, author_id, content, media_url, created_at, profiles!posts_author_id_fkey(username, display_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(50);
    setPosts((data as never) || []);
    setLoading(false);
  }, []);

  const loadTrending = useCallback(async () => {
    const { data } = await supabase.from("post_hashtags").select("hashtag").limit(500);
    const counts: Record<string, number> = {};
    (data || []).forEach((r) => { counts[r.hashtag] = (counts[r.hashtag] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([hashtag, n]) => ({ hashtag, n }));
    setTrending(sorted);
  }, []);

  useEffect(() => { void load(); void loadTrending(); }, [load, loadTrending]);

  useEffect(() => {
    const channel = supabase.channel("feed-posts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "posts" }, () => void load())
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [load]);

  return (
    <SocialShell
      right={
        <div className="space-y-6">
          <div className="border border-border bg-card/40 p-4">
            <div className="text-xs uppercase tracking-widest text-rust mb-3">Tendances</div>
            {trending.length === 0 ? (
              <p className="text-sm text-muted-foreground">Pas encore de tendance. Sois le premier.</p>
            ) : (
              <ul className="space-y-2">
                {trending.map((t) => (
                  <li key={t.hashtag}>
                    <Link to="/social/tag/$hashtag" params={{ hashtag: t.hashtag }} className="flex justify-between items-center hover:text-rust">
                      <span className="font-display">#{t.hashtag}</span>
                      <span className="text-xs text-muted-foreground">{t.n} post{t.n > 1 && "s"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <PostComposer onPosted={load} />
        {loading ? (
          <div className="text-sm text-muted-foreground">Chargement…</div>
        ) : posts.length === 0 ? (
          <div className="border border-border bg-card/40 p-8 text-center text-muted-foreground">
            Pas encore de posts. Sois le premier.
          </div>
        ) : (
          posts.map((p) => <PostCard key={p.id} post={p} onDeleted={load} />)
        )}
      </div>
    </SocialShell>
  );
}
