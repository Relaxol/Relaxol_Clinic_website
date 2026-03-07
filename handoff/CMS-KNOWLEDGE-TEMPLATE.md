# Eleration CMS — Reusable Architecture Guide

## Overview

This document describes a hybrid CMS architecture for React/Vite/Tailwind sites backed by Supabase. It enables content editing via an admin panel while preserving pixel-perfect hardcoded layouts. Use this as instructions when building CMS-powered sites for new clients.

---

## 1. Architecture: Hybrid CMS

**Core Principle:** Hardcoded React components for layout fidelity + database-driven content via `content_json`.

- **Core pages** (/, /about, /services, etc.) use hardcoded React layouts that accept content props from Supabase.
- **New pages** created via the admin panel render dynamically at `/p/:slug` using a generic section renderer.
- Content is stored in a `pages` table with a `content_json` JSONB column and a `template` identifier (e.g., `home_v1`, `services_v1`).

**Why hybrid?** Full dynamic rendering loses design fidelity for complex, bespoke layouts. The hybrid approach preserves original CSS/animations while making all text, images, and lists editable.

---

## 2. Database Schema

### Pages Table
```sql
CREATE TABLE pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  slug text NOT NULL,
  title text NOT NULL,
  template text, -- e.g. 'home_v1', 'services_v1'
  content_json jsonb DEFAULT '{}',
  sections_json jsonb DEFAULT '[]', -- for dynamic pages only
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  seo_title text,
  seo_description text,
  og_title text,
  og_description text,
  og_image_url text,
  canonical_url text,
  noindex boolean DEFAULT false,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Supporting Tables
- `page_content_history` — automatic version snapshots before each save
- `media` — uploaded files with metadata (url, dimensions, alt_text)
- `blog_posts` — database-driven blog with categories, tags, authors
- `form_submissions` — contact/lead form data
- `activity_log` — audit trail for all CMS actions
- `tenant_members` — multi-tenant role-based access (admin/editor/viewer)

---

## 3. Template Schema Pattern

Define TypeScript interfaces for each page template in `src/lib/templates/schemas.ts`:

```typescript
// Example: Home page schema
export interface HomeHeroContent {
  subtitle?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface HomeV1Content {
  hero?: HomeHeroContent;
  about?: { title?: string; body?: string; };
  treatments?: { items?: Array<{ title: string; description: string; imageUrl?: string; href?: string; }>; };
  testimonials?: { items?: Array<{ quote: string; author: string; }>; };
  faq?: { items?: Array<{ question: string; answer: string; }>; };
  // ... other sections
}

// Union type for all templates
export type TemplateType = 'home_v1' | 'services_v1' | 'about_v1' | 'contact_v1' | 'faq_v1';
export type TemplateContent = HomeV1Content | ServicesV1Content | /* ... */;
```

**Rules:**
- Every field is optional (`?`) so partial CMS data never crashes the site
- Use flat structures where possible; nest only for repeating items (arrays)
- Keep section names matching the React component names (hero, about, treatments, etc.)

---

## 4. Content Hook: `usePageContent`

```typescript
// src/hooks/usePageContent.ts
export function usePageContent(slug: string) {
  // Fetches from 'pages' table where slug matches and status='published'
  // Returns { content, loading, error, pageData }
  // content is the parsed content_json cast to the template's TypeScript type
}
```

---

## 5. Wiring Pattern (Hardcoded Components)

**The fallback pattern ensures the site never appears blank:**

```tsx
// In a page component:
const { content, loading } = usePageContent('home');
const c = content as HomeV1Content | null;

// In JSX — always provide hardcoded fallback:
<h1>{c?.hero?.headline || \"Original Hardcoded Headline\"}</h1>
<p>{c?.hero?.body || \"Original hardcoded paragraph text...\"}</p>

// For arrays with fallback:
{(c?.treatments?.items?.length ? c.treatments.items : defaultTreatments).map(item => (
  <Card key={item.title}>{item.title}</Card>
))}
```

**Critical rules:**
- NEVER remove hardcoded default content — it's the safety net
- Use `||` for strings, `.length` checks for arrays
- Pass CMS content as optional props to section components
- Section components define their own defaults internally

```tsx
// Section component pattern:
interface HeroSectionProps {
  content?: HomeHeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const headline = content?.headline || \"Default Headline\";
  // ...
}
```

---

## 6. Admin Editor: TemplateFormEditor

The admin page editor detects the page's `template` value and renders a `TemplateFormEditor` with grouped collapsible panels for each section.

### Panel Structure
```tsx
<Collapsible title=\"Hero Section\">
  <Input label=\"Subtitle\" value={draft.hero?.subtitle} onChange={...} />
  <Input label=\"Headline\" value={draft.hero?.headline} onChange={...} />
  <Textarea label=\"Body\" value={draft.hero?.body} onChange={...} />
  <Input label=\"CTA Label\" value={draft.hero?.ctaLabel} onChange={...} />
  <Input label=\"CTA Link\" value={draft.hero?.ctaHref} onChange={...} />
  <ImageUploadField label=\"Hero Image\" value={draft.hero?.imageUrl} onChange={...} />
</Collapsible>
```

### ItemRepeater for Lists
```tsx
<ItemRepeater
  items={draft.faq?.items || []}
  onUpdate={(items) => updateDraft({ faq: { ...draft.faq, items } })}
  renderItem={(item, index) => (
    <>
      <Input label=\"Question\" value={item.question} onChange={...} />
      <Textarea label=\"Answer\" value={item.answer} onChange={...} />
    </>
  )}
  defaultItem={{ question: '', answer: '' }}
  confirmDelete={true}
/>
```

### Live Preview
The editor includes a split-pane with `TemplatePreviewRenderer` that renders the actual site components using the current draft state — changes appear character-by-character as the editor types.

---

## 7. Dynamic Pages (Section-Based)

For pages created via the admin "New Page" flow (no template), use a generic section renderer:

```tsx
// Supported section types:
// hero, text, imageLeft, imageRight, faq, cta, stats, contact, video,
// treatments, doctor, conditions, testimonials, timeline

<SectionRenderer section={sectionData} />
```

Each section type maps to a `Dynamic*` component (DynamicHero, DynamicText, etc.) stored in `src/components/sections/dynamic/`.

---

## 8. SEO Architecture

### Per-Page Meta Tags (react-helmet-async)

Install `react-helmet-async` and wrap `<App />` in `<HelmetProvider>` in `main.tsx`.

Create a reusable `PageSEO` component that every page uses:

```tsx
// src/components/seo/PageSEO.tsx
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://example.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

interface PageSEOProps {
  title: string;
  description: string;
  path?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  authorName?: string;
}

export function PageSEO({ title, description, path = "/", ...props }: PageSEOProps) {
  const fullTitle = `${title} | Site Name`;
  const canonical = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={props.ogTitle || fullTitle} />
      <meta property="og:description" content={props.ogDescription || description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={props.ogImage || DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      {props.type === "article" && props.publishedAt && (
        <meta property="article:published_time" content={props.publishedAt} />
      )}
    </Helmet>
  );
}
```

**Usage in every page:**
```tsx
<PageSEO
  title="Ketamine Therapy"
  description="Fast-acting ketamine treatment for depression and anxiety."
  path="/ketamine"
/>
```

For CMS-driven pages (DynamicPage), pull `seo_title`, `seo_description`, and `og_*` fields from the database and pass them as props.

### JSON-LD Structured Data

Three structured data components handle different schema types:

| Component | Schema Type | Used On |
|-----------|-------------|---------|
| `JsonLdSchema` | MedicalClinic, Physician, FAQPage | Home, Contact, FAQ, Team pages |
| `BlogPostJsonLd` | BlogPosting | Individual blog posts |
| `BreadcrumbJsonLd` | BreadcrumbList | Blog posts, condition pages |

```tsx
// src/components/seo/BlogPostJsonLd.tsx
export function BlogPostJsonLd({ title, description, url, imageUrl, publishedAt, authorName }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    image: imageUrl,
    datePublished: publishedAt,
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Clinic Name" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// src/components/seo/BreadcrumbJsonLd.tsx
export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://example.com${item.href}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

**Blog post page example:**
```tsx
<PageSEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} type="article" />
<BlogPostJsonLd title={post.title} url={`https://example.com/blog/${post.slug}`} authorName={post.author?.name} />
<BreadcrumbJsonLd items={[
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: post.title, href: `/blog/${post.slug}` },
]} />
```

### Dynamic Sitemap (Edge Function)

Create a `sitemap` edge function that generates XML from published pages and blog posts:

```typescript
// supabase/functions/sitemap/index.ts
Deno.serve(async () => {
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  // Fetch published blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .lte("published_at", new Date().toISOString());

  // Fetch published dynamic pages
  const { data: pages } = await supabase
    .from("pages")
    .select("slug, updated_at")
    .eq("status", "published");

  // Build XML with static routes + dynamic entries
  let xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="...">`;
  // Add static routes with priorities
  STATIC_ROUTES.forEach(route => { xml += `<url><loc>${SITE_URL}${route.path}</loc>...</url>`; });
  // Add blog posts
  posts?.forEach(post => { xml += `<url><loc>${SITE_URL}/blog/${post.slug}</loc>...</url>`; });
  // Add dynamic CMS pages
  pages?.forEach(page => { xml += `<url><loc>${SITE_URL}/p/${page.slug}</loc>...</url>`; });
  xml += `</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
});
```

**Config:** Set `verify_jwt = false` in `supabase/config.toml` for the sitemap function.

**robots.txt:** Include `Sitemap: https://example.com/sitemap.xml` directive.

**Hosting rewrite:** Add a rewrite rule to proxy `/sitemap.xml` to the edge function URL (e.g., in `vercel.json`).

### SEO Checklist
- [ ] `react-helmet-async` installed and `<HelmetProvider>` wrapping app
- [ ] `<PageSEO>` on every public page with unique title/description/canonical
- [ ] CMS pages inject `seo_*` and `og_*` fields from database
- [ ] `JsonLdSchema` on homepage, contact, FAQ, team pages
- [ ] `BlogPostJsonLd` + `BreadcrumbJsonLd` on blog post pages
- [ ] `BreadcrumbJsonLd` on condition/service subpages
- [ ] Branded OG image at `/images/og-default.jpg` (1200×630)
- [ ] `robots.txt` with `Sitemap:` directive
- [ ] Sitemap edge function deployed and accessible
- [ ] No hardcoded canonical in `index.html` (Helmet handles it per-page)

---

## 9. Content Protection

1. **Version history** — snapshots saved to `page_content_history` before every save
2. **Confirmation dialogs** — on item deletion in repeaters
3. **Validation** — blocks publish if required fields are empty
4. **Reset to default** — available on repeater sections

---

## 10. Multi-Tenant & Auth

- `tenant_members` table with `app_role` enum (admin/editor/viewer)
- Security-definer functions: `is_tenant_admin()`, `can_edit_tenant()`, `is_tenant_member()`
- RLS policies on all tables using these functions
- Public pages readable by anyone (status='published' AND published_at <= now())
- Invite system via edge functions (create-invite, validate-invite, accept-invite)

---

## 11. Setup Checklist for New Client

1. [ ] Create Supabase tables (pages, media, tenants, tenant_members, etc.)
2. [ ] Set up RLS policies using security-definer helper functions
3. [ ] Define template schemas in `src/lib/templates/schemas.ts`
4. [ ] Build hardcoded page components with optional content props
5. [ ] Wire each component using `usePageContent(slug)` + fallback pattern
6. [ ] Build `TemplateFormEditor` panels matching the schema
7. [ ] Add `TemplatePreviewRenderer` for live preview
8. [ ] Seed initial page rows (slug, template, content_json, status='published')
9. [ ] Set up media storage bucket (public)
10. [ ] Configure auth and invite system
11. [ ] Add SEO: PageSEO on all pages, JsonLd schemas, sitemap edge function
12. [ ] Test: edit in admin → save → verify public page updates

---

## 12. Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/templates/schemas.ts` | TypeScript interfaces for all template content |
| `src/hooks/usePageContent.ts` | Hook to fetch published page content |
| `src/components/admin/TemplateFormEditor.tsx` | Admin editor panels |
| `src/components/admin/TemplatePreviewRenderer.tsx` | Live preview in editor |
| `src/components/admin/ImageUploadField.tsx` | Image upload with media library |
| `src/components/sections/dynamic/index.tsx` | Section type → component mapper |
| `src/components/seo/PageSEO.tsx` | Per-page title, meta, OG, canonical tags |
| `src/components/seo/JsonLdSchema.tsx` | Clinic/Physician/FAQ structured data |
| `src/components/seo/BlogPostJsonLd.tsx` | BlogPosting structured data |
| `src/components/seo/BreadcrumbJsonLd.tsx` | Breadcrumb structured data |
| `supabase/functions/sitemap/index.ts` | Dynamic XML sitemap generator |
| `src/lib/activityLog.ts` | Audit trail helper |
| `src/contexts/AuthContext.tsx` | Authentication state management |
