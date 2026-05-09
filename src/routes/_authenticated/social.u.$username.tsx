import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialShell } from "@/components/social/SocialShell";
import { PostCard, type FeedPost } from "@/components/social/PostCard";

export const Route = createFileRoute("/_authenticated/social/u/$username")({
  component: ProfilePage,
});

type Profile = { id: string; username: string; display_name: string; avatar_url: string | null; bio: string | null; city: string | null; profession: string | null };

function ProfilePage() {
  const { username } = Route.useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);

  async function load() {
    const { data: p } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
    setProfile(p);
    if (p) {
      const { data } = await supabase
        .from("posts")
        .select("id, author_id, content, media_url, created_at, profiles!posts_author_id_fkey(username, display_name, avatar_url)")
        .eq("author_id", p.id)
        .order("created_at", { ascending: false })
        .limit(50);
      setPosts((data as never) || []);
    }
  }
  useEffect(() => { void load(); }, [username]);

  return (
    <SocialShell>
      <Link to="/social" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-rust">← Fil</Link>
      {!profile ? (
        <div className="mt-6 text-muted-foreground">Profil introuvable.</div>
      ) : (
        <>
          <div className="mt-4 border-b border-border pb-6 flex gap-4 items-start">
            <div className="w-20 h-20 rounded-full bg-rust/20 flex items-center justify-center text-rust font-display text-3xl uppercase">
              {profile.display_name[0]}
            </div>
            <div>
              <h1 className="font-display text-3xl uppercase">{profile.display_name}</h1>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
              {profile.bio && <p className="mt-2">{profile.bio}</p>}
              <p className="text-xs text-muted-foreground mt-2">
                {[profile.city, profile.profession].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {posts.length === 0 ? <div className="text-muted-foreground">Aucun post.</div> : posts.map((p) => <PostCard key={p.id} post={p} onDeleted={load} />)}
          </div>
        </>
      )}
    </SocialShell>
  );
}
