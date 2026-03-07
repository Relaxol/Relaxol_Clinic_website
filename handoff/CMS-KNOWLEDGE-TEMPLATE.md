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

- `JsonLdSchema` component injects structured data (MedicalClinic, Physician, FAQPage)
- Each page has `seo_title`, `seo_description`, `og_*` fields in the database
- `DynamicPage` sets `document.title` from CMS data
- `robots.txt` allows all crawlers
- Blog posts include per-post SEO fields

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
11. [ ] Add SEO: JsonLdSchema, meta tags, sitemap
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
| `src/components/seo/JsonLdSchema.tsx` | Structured data injection |
| `src/lib/activityLog.ts` | Audit trail helper |
| `src/contexts/AuthContext.tsx` | Authentication state management |
