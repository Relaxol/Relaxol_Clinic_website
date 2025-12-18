-- Create app_role enum for role management
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Plans table (licensing plans)
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tenants table (multi-tenant support)
CREATE TABLE public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Licenses table (tenant licenses)
CREATE TABLE public.licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id)
);

-- User roles table (CRITICAL: separate from profiles to prevent privilege escalation)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Tenant members table
CREATE TABLE public.tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, user_id)
);

-- Authors table
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Media table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  size INTEGER,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  excerpt TEXT,
  content_json JSONB DEFAULT '[]'::jsonb,
  hero_image TEXT,
  hero_image_alt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT false,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Blog post tags (many-to-many)
CREATE TABLE public.blog_post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(post_id, tag_id)
);

-- Pages table (CMS pages)
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'page' CHECK (type IN ('page', 'treatment')),
  hero_headline TEXT,
  hero_subheadline TEXT,
  sections_json JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT false,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, slug)
);

-- Enable RLS on all tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has role in a tenant
CREATE OR REPLACE FUNCTION public.has_tenant_role(_user_id UUID, _tenant_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tenant_members
    WHERE user_id = _user_id
      AND tenant_id = _tenant_id
      AND role = _role
  )
$$;

-- Function to check if user is member of tenant (any role)
CREATE OR REPLACE FUNCTION public.is_tenant_member(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tenant_members
    WHERE user_id = _user_id
      AND tenant_id = _tenant_id
  )
$$;

-- Function to check if user can edit (admin or editor role)
CREATE OR REPLACE FUNCTION public.can_edit_tenant(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tenant_members
    WHERE user_id = _user_id
      AND tenant_id = _tenant_id
      AND role IN ('admin', 'editor')
  )
$$;

-- Function to check if user is tenant admin
CREATE OR REPLACE FUNCTION public.is_tenant_admin(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.tenant_members
    WHERE user_id = _user_id
      AND tenant_id = _tenant_id
      AND role = 'admin'
  )
$$;

-- Plans policies (read-only for all authenticated)
CREATE POLICY "Plans are readable by authenticated users"
ON public.plans FOR SELECT TO authenticated
USING (true);

-- Tenants policies
CREATE POLICY "Users can view tenants they are members of"
ON public.tenants FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), id));

-- Licenses policies
CREATE POLICY "Users can view licenses for their tenants"
ON public.licenses FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Tenant members policies
CREATE POLICY "Members can view other members in their tenant"
ON public.tenant_members FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Admins can insert tenant members"
ON public.tenant_members FOR INSERT TO authenticated
WITH CHECK (public.is_tenant_admin(auth.uid(), tenant_id));

CREATE POLICY "Admins can update tenant members"
ON public.tenant_members FOR UPDATE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete tenant members"
ON public.tenant_members FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Authors policies
CREATE POLICY "Members can view authors"
ON public.authors FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create authors"
ON public.authors FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update authors"
ON public.authors FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete authors"
ON public.authors FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Categories policies
CREATE POLICY "Members can view categories"
ON public.categories FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create categories"
ON public.categories FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update categories"
ON public.categories FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete categories"
ON public.categories FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Tags policies
CREATE POLICY "Members can view tags"
ON public.tags FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create tags"
ON public.tags FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update tags"
ON public.tags FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete tags"
ON public.tags FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Media policies
CREATE POLICY "Members can view media"
ON public.media FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can upload media"
ON public.media FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update media"
ON public.media FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete media"
ON public.media FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Blog posts policies
CREATE POLICY "Members can view blog posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create blog posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update blog posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Blog post tags policies
CREATE POLICY "Members can view blog post tags"
ON public.blog_post_tags FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.blog_posts bp
    WHERE bp.id = post_id
    AND public.is_tenant_member(auth.uid(), bp.tenant_id)
  )
);

CREATE POLICY "Editors can manage blog post tags"
ON public.blog_post_tags FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.blog_posts bp
    WHERE bp.id = post_id
    AND public.can_edit_tenant(auth.uid(), bp.tenant_id)
  )
);

CREATE POLICY "Editors can delete blog post tags"
ON public.blog_post_tags FOR DELETE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.blog_posts bp
    WHERE bp.id = post_id
    AND public.can_edit_tenant(auth.uid(), bp.tenant_id)
  )
);

-- Pages policies
CREATE POLICY "Members can view pages"
ON public.pages FOR SELECT TO authenticated
USING (public.is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Editors can create pages"
ON public.pages FOR INSERT TO authenticated
WITH CHECK (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Editors can update pages"
ON public.pages FOR UPDATE TO authenticated
USING (public.can_edit_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins can delete pages"
ON public.pages FOR DELETE TO authenticated
USING (public.is_tenant_admin(auth.uid(), tenant_id));

-- Public read access for published content
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT TO anon
USING (status = 'published' AND published_at <= now());

CREATE POLICY "Anyone can view published pages"
ON public.pages FOR SELECT TO anon
USING (status = 'published' AND published_at <= now());

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_plans_updated_at BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_licenses_updated_at BEFORE UPDATE ON public.licenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tenant_members_updated_at BEFORE UPDATE ON public.tenant_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.plans (name, features) VALUES
('starter', '{"blog": true, "treatment_pages": false, "advanced_seo": false, "max_posts": 10, "max_users": 2}'::jsonb),
('growth', '{"blog": true, "treatment_pages": true, "advanced_seo": true, "max_posts": 100, "max_users": 10}'::jsonb),
('lifetime', '{"blog": true, "treatment_pages": true, "advanced_seo": true, "max_posts": null, "max_users": null}'::jsonb);