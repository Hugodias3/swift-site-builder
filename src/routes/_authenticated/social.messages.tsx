import { createFileRoute } from "@tanstack/react-router";
import { SocialShell } from "@/components/social/SocialShell";

export const Route = createFileRoute("/_authenticated/social/messages")({
  component: () => (
    <SocialShell>
      <h1 className="font-display text-4xl uppercase mb-6">Messages</h1>
      <div className="border border-border bg-card/40 p-8 text-center">
        <p className="text-muted-foreground">La messagerie privée temps réel arrive dans le prochain lot.</p>
      </div>
    </SocialShell>
  ),
});
