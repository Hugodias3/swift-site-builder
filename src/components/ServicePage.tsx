import { Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "./SiteHeader";
import type { ReactNode } from "react";

export interface ServicePageProps {
  category: string;
  categorySlug?: string;
  title: string;
  tagline: string;
  description: string;
  stats?: { value: string; label: string }[];
  howItWorks?: { step: string; title: string; text: string }[];
  features?: { title: string; text: string }[];
  pricing?: { label: string; value: string; note?: string }[];
  trust?: string[];
  faq?: { q: string; a: string }[];
  cta?: { primary: string; secondary?: string };
  next?: { label: string; to: string };
  children?: ReactNode;
}

export function ServicePage(p: ServicePageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative grain pt-32 pb-20 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, oklch(0.58 0.16 45 / 0.5), transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            <Link to="/services" className="hover:text-rust transition">Services</Link>
            <span>/</span>
            <span className="text-rust">{p.category}</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.9]">
            {p.title}
          </h1>
          <p className="mt-6 font-display text-2xl md:text-3xl text-rust uppercase">{p.tagline}</p>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {p.description}
          </p>

          {p.cta && (
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/"
                hash="waitlist"
                className="px-8 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-transform"
              >
                {p.cta.primary}
              </Link>
              {p.cta.secondary && (
                <Link
                  to="/services"
                  className="px-8 py-4 border border-foreground/30 font-bold uppercase tracking-widest hover:border-rust hover:text-rust transition"
                >
                  {p.cta.secondary}
                </Link>
              )}
            </div>
          )}

          {p.stats && p.stats.length > 0 && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border max-w-4xl">
              {p.stats.map((s) => (
                <div key={s.label} className="bg-background p-6">
                  <div className="font-display text-4xl text-rust">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {p.children}

      {/* HOW IT WORKS */}
      {p.howItWorks && p.howItWorks.length > 0 && (
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Comment ça marche</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-16">
              Simple. <span className="text-rust">Direct.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {p.howItWorks.map((s) => (
                <div key={s.step} className="bg-background p-8">
                  <div className="font-display text-6xl text-rust/30">{s.step}</div>
                  <h3 className="font-display text-2xl uppercase mt-4">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      {p.features && p.features.length > 0 && (
        <section className="py-24 border-b border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Ce qui est inclus</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-16">
              Tout ce qu'il faut.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {p.features.map((f) => (
                <div key={f.title} className="border border-border p-8 bg-background">
                  <h3 className="font-display text-2xl uppercase text-rust mb-3">{f.title}</h3>
                  <p className="text-muted-foreground">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST / VERIFICATION */}
      {p.trust && p.trust.length > 0 && (
        <section className="py-24 border-b border-border">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Vérification & confiance</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-12">
              Zéro compromis.
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {p.trust.map((t) => (
                <div key={t} className="flex gap-3 items-start border-l-2 border-rust pl-4 py-2">
                  <span className="text-rust font-bold">✓</span>
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      {p.pricing && p.pricing.length > 0 && (
        <section className="py-24 border-b border-border bg-card/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">Tarifs</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-12">
              Clair. <span className="text-rust">Sans surprise.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {p.pricing.map((pr) => (
                <div key={pr.label} className="bg-background p-8">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {pr.label}
                  </div>
                  <div className="font-display text-4xl text-rust">{pr.value}</div>
                  {pr.note && <div className="mt-3 text-sm text-muted-foreground">{pr.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {p.faq && p.faq.length > 0 && (
        <section className="py-24 border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-rust mb-4">FAQ</div>
            <h2 className="font-display text-4xl md:text-6xl uppercase mb-12">Questions.</h2>
            <div className="space-y-4">
              {p.faq.map((f) => (
                <details key={f.q} className="group border border-border bg-card/40 p-6">
                  <summary className="cursor-pointer font-display text-lg uppercase flex justify-between items-center">
                    {f.q}
                    <span className="text-rust group-open:rotate-45 transition-transform text-2xl">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 border-b border-border bg-rust/5 grain relative">
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95]">
            Prêt à en être ?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Rejoins la liste d'attente. Tarif Fondateur à vie pour les 500 premiers.
          </p>
          <Link
            to="/"
            hash="waitlist"
            className="mt-10 inline-block px-8 py-4 bg-rust text-primary-foreground font-bold uppercase tracking-widest hover:opacity-90 transition"
          >
            Rejoindre le mouvement
          </Link>
        </div>
      </section>

      {/* NEXT SERVICE */}
      {p.next && (
        <section className="py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link to="/services" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-rust transition">
              ← Tous les services
            </Link>
            <Link
              to={p.next.to}
              className="group flex items-center gap-3 text-right"
            >
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Service suivant</div>
                <div className="font-display text-xl uppercase group-hover:text-rust transition">{p.next.label}</div>
              </div>
              <span className="text-rust text-2xl">→</span>
            </Link>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
