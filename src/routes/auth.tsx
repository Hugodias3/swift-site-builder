import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Connexion — RePère" },
      { name: "description", content: "Connecte-toi au réseau RePère." },
    ],
  }),
});

const signupSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  password: z.string().min(8, "8 caractères minimum").max(72),
  username: z.string().trim().min(3).max(24).regex(/^[a-z0-9_]+$/i, "Lettres, chiffres, _ uniquement"),
  display_name: z.string().trim().min(2).max(60),
});
const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(72),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/social" });
    });
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const v = signupSchema.parse({ email, password, username, display_name: displayName });
        const { error } = await supabase.auth.signUp({
          email: v.email,
          password: v.password,
          options: {
            emailRedirectTo: `${window.location.origin}/social`,
            data: { username: v.username, display_name: v.display_name },
          },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifie tes mails pour confirmer.");
      } else {
        const v = loginSchema.parse({ email, password });
        const { error } = await supabase.auth.signInWithPassword({ email: v.email, password: v.password });
        if (error) throw error;
        navigate({ to: "/social" });
      }
    } catch (err) {
      const msg = err instanceof z.ZodError ? err.issues[0].message : err instanceof Error ? err.message : "Erreur";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function oauth(provider: "google" | "apple") {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: `${window.location.origin}/social`,
      });
      if (result.error) throw result.error;
      if (!result.redirected) navigate({ to: "/social" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur OAuth");
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground grain flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-rust mb-8">
          ← Retour à RePère
        </Link>
        <h1 className="font-display text-5xl uppercase leading-none">
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {mode === "login" ? "Accède au réseau RePère." : "Rejoins la communauté des pères."}
        </p>

        <div className="mt-8 grid gap-3">
          <button
            disabled={busy}
            onClick={() => oauth("google")}
            className="w-full py-3 border border-border bg-card hover:border-rust transition font-bold uppercase tracking-widest text-sm"
          >
            Continuer avec Google
          </button>
          <button
            disabled={busy}
            onClick={() => oauth("apple")}
            className="w-full py-3 border border-border bg-card hover:border-rust transition font-bold uppercase tracking-widest text-sm"
          >
            Continuer avec Apple
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleEmail} className="grid gap-3">
          {mode === "signup" && (
            <>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Pseudo (unique)"
                className="w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none"
                autoComplete="username"
                required
              />
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nom affiché"
                className="w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none"
                required
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none"
            autoComplete="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 bg-card border border-border focus:border-rust outline-none"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50"
          >
            {busy ? "..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm">
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-muted-foreground hover:text-rust transition"
          >
            {mode === "login" ? "Pas encore de compte ?" : "Déjà inscrit ?"}
          </button>
          {mode === "login" && (
            <Link to="/reset-password" className="text-muted-foreground hover:text-rust transition">
              Mot de passe oublié ?
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
