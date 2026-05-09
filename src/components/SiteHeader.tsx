import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wide">
          <span className="text-rust">RE</span>
          <span>PÈRE</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-muted-foreground">
          <Link to="/services" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>
            Services
          </Link>
          <Link to="/" hash="abos" className="hover:text-foreground transition">Abonnements</Link>
          <Link to="/" hash="manifeste" className="hover:text-foreground transition">Manifeste</Link>
          <Link to="/" hash="waitlist" className="hover:text-foreground transition">Waitlist</Link>
        </div>
        <Link
          to="/"
          hash="waitlist"
          className="px-4 py-2 bg-rust text-primary-foreground text-sm font-bold uppercase tracking-wider hover:opacity-90 transition"
        >
          Rejoindre
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-display text-xl">
          <span className="text-rust">RE</span>PÈRE
        </Link>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          © 2026 RePère · On le devient ensemble
        </div>
      </div>
    </footer>
  );
}
