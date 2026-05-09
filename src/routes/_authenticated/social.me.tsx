import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { SocialShell } from "@/components/social/SocialShell";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/social/me")({
  component: MeProfile,
});

const schema = z.object({
  display_name: z.string().trim().min(2).max(60),
  bio: z.string().trim().max(280).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  profession: z.string().trim().max(80).optional().or(z.literal("")),
});

function MeProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ display_name: "", bio: "", city: "", profession: "", username: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) setForm({
        display_name: data.display_name || "",
        bio: data.bio || "",
        city: data.city || "",
        profession: data.profession || "",
        username: data.username || "",
      });
    });
  }, [user]);

  async function save() {
    if (!user) return;
    const v = schema.safeParse(form);
    if (!v.success) return toast.error(v.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.from("profiles").update({
      display_name: v.data.display_name,
      bio: v.data.bio || null,
      city: v.data.city || null,
      profession: v.data.profession || null,
    }).eq("id", user.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Profil mis à jour");
  }

  return (
    <SocialShell>
      <h1 className="font-display text-4xl uppercase mb-6">Mon profil</h1>
      <div className="grid gap-3 max-w-xl">
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Pseudo</span>
          <input value={form.username} disabled className="mt-1 w-full px-4 py-3 bg-muted border border-border opacity-60" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Nom affiché</span>
          <input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} className="mt-1 w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Bio</span>
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} maxLength={280} rows={3} className="mt-1 w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Ville</span>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1 w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Profession</span>
          <input value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} className="mt-1 w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
        </label>
        <button onClick={save} disabled={busy} className="mt-3 px-6 py-3 bg-rust text-primary-foreground font-bold uppercase tracking-widest disabled:opacity-50">
          {busy ? "..." : "Sauvegarder"}
        </button>
      </div>
    </SocialShell>
  );
}
