import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  head: () => ({ meta: [{ title: "Réinitialiser le mot de passe — RePère" }] }),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"request" | "set">("request");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
      setMode("set");
    }
  }, []);

  async function requestReset(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Email envoyé. Vérifie ta boîte.");
  }

  async function setNew(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.length < 8) return toast.error("8 caractères minimum");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setBusy(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Mot de passe mis à jour");
      navigate({ to: "/social" });
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground grain flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/auth" className="text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-rust">
          ← Connexion
        </Link>
        <h1 className="mt-6 font-display text-4xl uppercase">
          {mode === "request" ? "Mot de passe oublié" : "Nouveau mot de passe"}
        </h1>
        <form onSubmit={mode === "request" ? requestReset : setNew} className="mt-8 grid gap-3">
          {mode === "request" ? (
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
          ) : (
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Nouveau mot de passe" required className="px-4 py-3 bg-card border border-border focus:border-rust outline-none" />
          )}
          <button disabled={busy} className="py-3 bg-rust text-primary-foreground font-bold uppercase tracking-widest disabled:opacity-50">
            {busy ? "..." : mode === "request" ? "Envoyer le lien" : "Mettre à jour"}
          </button>
        </form>
      </div>
    </main>
  );
}
