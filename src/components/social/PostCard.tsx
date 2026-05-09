import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export type FeedPost = {
  id: string;
  author_id: string;
  content: string;
  media_url: string | null;
  created_at: string;
  profiles: { username: string; display_name: string; avatar_url: string | null } | null;
};

const REACTIONS = [
  { type: "like", emoji: "👍" },
  { type: "love", emoji: "❤️" },
  { type: "haha", emoji: "😂" },
  { type: "wow", emoji: "😮" },
  { type: "sad", emoji: "😢" },
  { type: "angry", emoji: "😠" },
] as const;
type ReactionType = (typeof REACTIONS)[number]["type"];

function renderContent(text: string) {
  const parts = text.split(/(#[a-zA-ZÀ-ÿ0-9_]{2,40})/g);
  return parts.map((p, i) => {
    if (p.startsWith("#")) {
      const tag = p.slice(1).toLowerCase();
      return (
        <Link key={i} to="/social/tag/$hashtag" params={{ hashtag: tag }} className="text-rust hover:underline">
          {p}
        </Link>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}j`;
}

export function PostCard({ post, onDeleted }: { post: FeedPost; onDeleted?: () => void }) {
  const { user } = useAuth();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [myReaction, setMyReaction] = useState<ReactionType | null>(null);
  const [commentCount, setCommentCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; content: string; created_at: string; author_id: string; profiles: { username: string; display_name: string } | null }>>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    void loadReactions();
    void loadCommentCount();
  }, [post.id]);

  async function loadReactions() {
    const { data } = await supabase.from("reactions").select("type, user_id").eq("post_id", post.id);
    const c: Record<string, number> = {};
    let mine: ReactionType | null = null;
    (data || []).forEach((r) => {
      c[r.type] = (c[r.type] || 0) + 1;
      if (user && r.user_id === user.id) mine = r.type as ReactionType;
    });
    setCounts(c);
    setMyReaction(mine);
  }

  async function loadCommentCount() {
    const { count } = await supabase.from("comments").select("id", { count: "exact", head: true }).eq("post_id", post.id);
    setCommentCount(count || 0);
  }

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, author_id, profiles!comments_author_id_fkey(username, display_name)")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true })
      .limit(50);
    setComments((data as never) || []);
  }

  async function react(type: ReactionType) {
    if (!user) return;
    if (myReaction === type) {
      await supabase.from("reactions").delete().eq("post_id", post.id).eq("user_id", user.id);
    } else {
      await supabase.from("reactions").upsert({ post_id: post.id, user_id: user.id, type }, { onConflict: "post_id,user_id" });
    }
    void loadReactions();
  }

  async function addComment() {
    if (!user || !newComment.trim()) return;
    const { error } = await supabase.from("comments").insert({ post_id: post.id, author_id: user.id, content: newComment.trim() });
    if (error) return toast.error(error.message);
    setNewComment("");
    void loadComments();
    void loadCommentCount();
  }

  async function deletePost() {
    if (!confirm("Supprimer ce post ?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) return toast.error(error.message);
    onDeleted?.();
  }

  const totalReactions = Object.values(counts).reduce((a, b) => a + b, 0);
  const isOwner = user?.id === post.author_id;

  return (
    <article className="border border-border bg-card/40">
      <header className="flex items-center justify-between p-4 pb-2">
        <Link to="/social/u/$username" params={{ username: post.profiles?.username || "" }} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center text-rust font-display uppercase">
            {post.profiles?.display_name?.[0] || "?"}
          </div>
          <div>
            <div className="font-bold group-hover:text-rust transition text-sm">{post.profiles?.display_name}</div>
            <div className="text-xs text-muted-foreground">@{post.profiles?.username} · {timeAgo(post.created_at)}</div>
          </div>
        </Link>
        {isOwner && (
          <button onClick={deletePost} className="text-xs text-muted-foreground hover:text-destructive uppercase tracking-widest">
            Suppr.
          </button>
        )}
      </header>
      <div className="px-4 pb-3 whitespace-pre-wrap break-words">{renderContent(post.content)}</div>

      <div className="px-4 py-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span>{totalReactions} réaction{totalReactions !== 1 && "s"}</span>
        <button onClick={() => { setShowComments(!showComments); if (!showComments) void loadComments(); }} className="hover:text-rust">
          {commentCount} commentaire{commentCount !== 1 && "s"}
        </button>
      </div>

      <div className="px-4 py-2 border-t border-border flex gap-1">
        {REACTIONS.map((r) => (
          <button
            key={r.type}
            onClick={() => react(r.type)}
            className={`flex-1 py-1.5 text-lg hover:bg-rust/10 transition rounded ${myReaction === r.type ? "bg-rust/20" : ""}`}
            title={r.type}
          >
            {r.emoji}
            {counts[r.type] ? <span className="ml-1 text-xs">{counts[r.type]}</span> : null}
          </button>
        ))}
      </div>

      {showComments && (
        <div className="border-t border-border p-4 bg-background/50 space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="text-sm">
              <Link to="/social/u/$username" params={{ username: c.profiles?.username || "" }} className="font-bold hover:text-rust">
                {c.profiles?.display_name}
              </Link>{" "}
              <span className="text-muted-foreground text-xs">· {timeAgo(c.created_at)}</span>
              <div className="mt-1 whitespace-pre-wrap">{c.content}</div>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addComment()}
              placeholder="Ton commentaire…"
              maxLength={2000}
              className="flex-1 px-3 py-2 bg-card border border-border focus:border-rust outline-none text-sm"
            />
            <button onClick={addComment} className="px-3 py-2 bg-rust text-primary-foreground text-xs uppercase tracking-widest font-bold">Envoyer</button>
          </div>
        </div>
      )}
    </article>
  );
}
