import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SocialShell } from "@/components/social/SocialShell";
import { PostCard, type FeedPost } from "@/components/social/PostCard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/social/tag/$hashtag")({
  component: HashtagPage,
});

function HashtagPage() {
  const { hashtag } = Route.useParams();
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [following, setFollowing] = useState(false);

  async function load() {
    const { data: tagged } = await supabase.from("post_hashtags").select("post_id").eq("hashtag", hashtag.toLowerCase()).limit(100);
    const ids = (tagged || []).map((t) => t.post_id);
    if (ids.length === 0) { setPosts([]); return; }
    const { data } = await supabase
      .from("posts")
      .select("id, author_id, content, media_url, created_at, profiles!posts_author_id_fkey(username, display_name, avatar_url)")
      .in("id", ids)
      .order("created_at", { ascending: false });
    setPosts((data as never) || []);
  }

  useEffect(() => { void load(); }, [hashtag]);

  useEffect(() => {
    if (!user) return;
    supabase.from("hashtag_follows").select("hashtag").eq("user_id", user.id).eq("hashtag", hashtag.toLowerCase()).maybeSingle()
      .then(({ data }) => setFollowing(!!data));
  }, [user, hashtag]);

  async function toggleFollow() {
    if (!user) return;
    if (following) {
      await supabase.from("hashtag_follows").delete().eq("user_id", user.id).eq("hashtag", hashtag.toLowerCase());
      setFollowing(false);
    } else {
      const { error } = await supabase.from("hashtag_follows").insert({ user_id: user.id, hashtag: hashtag.toLowerCase() });
      if (error) return toast.error(error.message);
      setFollowing(true);
    }
  }

  return (
    <SocialShell>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div>
          <Link to="/social" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-rust">← Fil</Link>
          <h1 className="font-display text-4xl uppercase mt-2">#{hashtag.toLowerCase()}</h1>
          <p className="text-sm text-muted-foreground mt-1">{posts.length} post{posts.length !== 1 && "s"}</p>
        </div>
        <button onClick={toggleFollow} className={`px-5 py-2 font-bold uppercase tracking-widest text-xs transition ${following ? "border border-rust text-rust" : "bg-rust text-primary-foreground"}`}>
          {following ? "Suivi" : "Suivre"}
        </button>
      </div>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-muted-foreground">Aucun post sur ce hashtag pour le moment.</div>
        ) : posts.map((p) => <PostCard key={p.id} post={p} onDeleted={load} />)}
      </div>
    </SocialShell>
  );
}
