
CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid,
  user_email text,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  entity_title text,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view activity log"
  ON public.activity_log FOR SELECT
  USING (is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create activity log entries"
  ON public.activity_log FOR INSERT
  WITH CHECK (can_edit_tenant(auth.uid(), tenant_id));

CREATE INDEX idx_activity_log_tenant_created ON public.activity_log(tenant_id, created_at DESC);
CREATE INDEX idx_activity_log_entity ON public.activity_log(entity_type, entity_id);
