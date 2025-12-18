
-- Create a function to add a user as admin to a tenant by email
CREATE OR REPLACE FUNCTION public.add_admin_by_email(
  _email text,
  _tenant_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id uuid;
BEGIN
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', _email;
  END IF;
  
  INSERT INTO public.tenant_members (user_id, tenant_id, role)
  VALUES (_user_id, _tenant_id, 'admin')
  ON CONFLICT (user_id, tenant_id) DO UPDATE SET role = 'admin';
END;
$$;

-- Add unique constraint if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'tenant_members_user_tenant_unique'
  ) THEN
    ALTER TABLE public.tenant_members ADD CONSTRAINT tenant_members_user_tenant_unique UNIQUE (user_id, tenant_id);
  END IF;
END $$;
