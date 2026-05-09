-- BATIDIAS — table des demandes de devis travaux
CREATE TABLE public.devis_batidias (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference text NOT NULL UNIQUE,
  prenom text NOT NULL,
  nom text NOT NULL,
  telephone text NOT NULL,
  email text NOT NULL,
  adresse text NOT NULL,
  type_logement text,
  statut_propriete text,
  types_travaux text[] NOT NULL DEFAULT '{}',
  description text NOT NULL,
  surface text,
  budget text,
  delai text,
  disponibilites jsonb NOT NULL DEFAULT '{}'::jsonb,
  message text,
  nb_photos integer NOT NULL DEFAULT 0,
  statut text NOT NULL DEFAULT 'nouveau',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_devis_batidias_created_at ON public.devis_batidias(created_at DESC);
CREATE INDEX idx_devis_batidias_statut ON public.devis_batidias(statut);

ALTER TABLE public.devis_batidias ENABLE ROW LEVEL SECURITY;

-- Tout le monde (anon inclus) peut envoyer une demande de devis depuis le site public
CREATE POLICY "anyone can submit a quote request"
ON public.devis_batidias
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Seuls les admins lisent les demandes
CREATE POLICY "admins read quote requests"
ON public.devis_batidias
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Seuls les admins modifient le statut
CREATE POLICY "admins update quote requests"
ON public.devis_batidias
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Seuls les admins suppriment
CREATE POLICY "admins delete quote requests"
ON public.devis_batidias
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger updated_at (réutilise la fonction touch_updated_at déjà présente)
CREATE TRIGGER trg_devis_batidias_updated_at
BEFORE UPDATE ON public.devis_batidias
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();