import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.string().trim().min(1, "Vide").max(5000, "Trop long");

export function PostComposer({ onPosted }: { onPosted?: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!user) return;
    const parsed = schema.safeParse(content);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.from("posts").insert({ author_id: user.id, content: parsed.data });
    setBusy(false);
    if (error) return toast.error(error.message);
    setContent("");
    toast.success("Posté");
    onPosted?.();
  }

  const tags = Array.from(new Set((content.match(/#[a-zA-ZÀ-ÿ0-9_]{2,40}/g) || []).map((t) => t.toLowerCase())));

  return (
    <div className="border border-border bg-card/40 p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf, père ? Utilise #couple #psg #soirée…"
        rows={3}
        maxLength={5000}
        className="w-full bg-transparent outline-none resize-none text-base placeholder:text-muted-foreground"
      />
      <div className="flex items-center justify-between mt-2 gap-3">
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 bg-rust/10 text-rust rounded-sm">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-muted-foreground">{content.length}/5000</span>
          <button
            onClick={submit}
            disabled={busy || !content.trim()}
            className="px-5 py-2 bg-rust text-primary-foreground font-bold uppercase tracking-widest text-xs disabled:opacity-50 hover:opacity-90 transition"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
}
