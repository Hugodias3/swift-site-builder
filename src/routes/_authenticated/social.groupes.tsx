import { createFileRoute } from "@tanstack/react-router";
import { SocialShell } from "@/components/social/SocialShell";

export const Route = createFileRoute("/_authenticated/social/groupes")({
  component: () => (
    <SocialShell>
      <h1 className="font-display text-4xl uppercase mb-6">Groupes</h1>
      <div className="border border-border bg-card/40 p-8 text-center">
        <p className="text-muted-foreground">Les groupes thématiques arrivent dans le prochain lot. Stay tuned.</p>
      </div>
    </SocialShell>
  ),
});
