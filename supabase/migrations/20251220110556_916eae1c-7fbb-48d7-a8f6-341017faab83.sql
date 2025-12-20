-- Create page_content_history table for versioning
CREATE TABLE public.page_content_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.pages(id) ON DELETE CASCADE,
  content_json JSONB NOT NULL,
  saved_by UUID,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  version_note TEXT
);

-- Enable RLS
ALTER TABLE public.page_content_history ENABLE ROW LEVEL SECURITY;

-- Create index for faster lookups
CREATE INDEX idx_page_content_history_page_id ON public.page_content_history(page_id);
CREATE INDEX idx_page_content_history_saved_at ON public.page_content_history(saved_at DESC);

-- RLS policies: Members can view history for their tenant's pages
CREATE POLICY "Members can view content history"
ON public.page_content_history
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.pages p
    WHERE p.id = page_content_history.page_id
    AND is_tenant_member(auth.uid(), p.tenant_id)
  )
);

-- Editors can create history entries
CREATE POLICY "Editors can create content history"
ON public.page_content_history
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.pages p
    WHERE p.id = page_content_history.page_id
    AND can_edit_tenant(auth.uid(), p.tenant_id)
  )
);

-- Admins can delete old history
CREATE POLICY "Admins can delete content history"
ON public.page_content_history
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.pages p
    WHERE p.id = page_content_history.page_id
    AND is_tenant_admin(auth.uid(), p.tenant_id)
  )
);