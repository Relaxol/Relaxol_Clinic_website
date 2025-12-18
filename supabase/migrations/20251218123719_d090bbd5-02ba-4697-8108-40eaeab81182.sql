-- Create invites table for invite-only user provisioning
CREATE TABLE IF NOT EXISTS public.invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  token text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  accepted_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, email)
);

-- Enable RLS
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can create invites for their tenant
CREATE POLICY "Admins can create invites"
ON public.invites
FOR INSERT
WITH CHECK (is_tenant_admin(auth.uid(), tenant_id));

-- Policy: Admins can view invites for their tenant
CREATE POLICY "Admins can view invites"
ON public.invites
FOR SELECT
USING (is_tenant_admin(auth.uid(), tenant_id));

-- Policy: Admins can update invites (mark as accepted)
CREATE POLICY "Admins can update invites"
ON public.invites
FOR UPDATE
USING (is_tenant_admin(auth.uid(), tenant_id));

-- Policy: Admins can delete invites
CREATE POLICY "Admins can delete invites"
ON public.invites
FOR DELETE
USING (is_tenant_admin(auth.uid(), tenant_id));

-- Policy: Anyone can read invite by token (for acceptance flow)
CREATE POLICY "Anyone can read invite by token"
ON public.invites
FOR SELECT
USING (true);

-- Create index for token lookups
CREATE INDEX idx_invites_token ON public.invites(token);
CREATE INDEX idx_invites_tenant_email ON public.invites(tenant_id, email);