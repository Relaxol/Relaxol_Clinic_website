# Eleration CMS — Backend & Admin Documentation

> **Last updated:** March 2026  
> **Project:** Relaxol Clinic Website + Eleration CMS  
> **Stack:** React + Vite + Tailwind CSS + Supabase (Auth, Database, Edge Functions, Storage)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Accessing the Admin Panel](#2-accessing-the-admin-panel)
3. [User Roles & Permissions](#3-user-roles--permissions)
4. [User Management (Invite-Only)](#4-user-management-invite-only)
5. [Dashboard](#5-dashboard)
6. [Page Management (CMS Pages)](#6-page-management-cms-pages)
7. [Blog Post Management](#7-blog-post-management)
8. [Media Library](#8-media-library)
9. [Taxonomy: Categories, Tags, Authors](#9-taxonomy-categories-tags-authors)
10. [SEO Controls](#10-seo-controls)
11. [Licensing & Feature Gating](#11-licensing--feature-gating)
12. [Settings](#12-settings)
13. [Content Protection & Safety](#13-content-protection--safety)
14. [Activity Log](#14-activity-log)
15. [Database Tables Reference](#15-database-tables-reference)
16. [Edge Functions Reference](#16-edge-functions-reference)
17. [Environment Variables](#17-environment-variables)
18. [Recommendations: Features to Add Before Handoff](#18-recommendations-features-to-add-before-handoff)

---

## 1. Architecture Overview

The project uses a **hybrid CMS architecture**:

| Page Type | Rendering | Editable Via CMS? |
|---|---|---|
| **Core pages** (`/`, `/ketamine`, `/spravato-Englewood`, `/faq`, `/contact`) | Hardcoded React components with original CSS layouts | ✅ Yes — content (text, images, URLs) is sourced from `pages.content_json` in the database |
| **Condition pages** (`/conditions/depression`, `/anxiety`, `/ptsd`, `/ocd`, `/pain-management`) | Hardcoded React components with content props | ✅ Yes — content sourced from `pages.content_json` with fallback defaults |
| **Vitamin Infusions** (`/vitamin-infusion-englewood`) | Hardcoded React component with content props | ✅ Yes — content sourced from `pages.content_json` |
| **Our Team** (`/our-team`) | Hardcoded React component with content props | ✅ Yes — content sourced from `pages.content_json` |
| **New CMS pages** (created via admin panel) | Dynamically rendered at `/p/:slug` | ✅ Yes — full section-based editing |
| **Blog posts** (`/blog`, `/blog/:slug`) | Dynamically rendered from `blog_posts` table | ✅ Yes — full blog editor |
| **Static pages** (`/privacy-policy`, `/terms-of-service`) | Hardcoded React components | ❌ Not CMS-editable |

**Key principle:** Core page designs (CSS, layout, spacing) are preserved exactly as built. Only the *content* (text strings, image URLs, FAQ items, etc.) is pulled from the database. If CMS content is missing or incomplete, hardcoded fallback defaults are used — the site never appears blank.

---

## 2. Accessing the Admin Panel

- **URL:** `/admin/login`
- **There is NO admin link in the public navigation.** This is intentional for security — admin access requires knowing the URL.
- After login, users are redirected to `/admin` (the dashboard).
- Admin routes are protected by `ProtectedRoute` component which enforces:
  1. Valid Supabase auth session
  2. Matching `tenant_members` record with assigned role

---

## 3. User Roles & Permissions

| Role | Create/Edit Content | Delete Content | Manage Users | Advanced SEO | Upload Media |
|---|---|---|---|---|---|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Editor** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Viewer** | ❌ (read-only) | ❌ | ❌ | ❌ | ❌ |

Roles are stored in the `tenant_members` table using the `app_role` enum (`admin`, `editor`, `viewer`).

---

## 4. User Management (Invite-Only)

**There is NO public signup.** Users can only be added via invite.

### How to invite a new user (Admin only):

1. Go to `/admin/users`
2. Click **"Invite User"**
3. Enter the email address and select a role (admin/editor/viewer)
4. Click **Send Invite** — this generates a token-based invite link
5. The invite link format: `/admin/accept-invite?token=<TOKEN>`
6. Invite links expire after **7 days**
7. The invited user clicks the link, creates a password, and is automatically added to the tenant

### Managing existing users:

- View all team members and their roles in the **Members** tab
- View pending/expired invites in the **Invites** tab
- Admins can delete invites or remove team members

---

## 5. Dashboard

**URL:** `/admin`

Displays:
- **Stat cards:** Blog Posts count, Pages count, Media Files count, Team Members count
- **Quick Actions:** Create New Post, Create New Page, Upload Media
- **Plan Details:** Current plan name, status, enabled features (Blog, Treatment Pages, Advanced SEO)

---

## 6. Page Management (CMS Pages)

**URL:** `/admin/pages`

### Template-Based Pages (Core Pages)

These core pages use predefined templates with structured content schemas:

| Template | Slug | Editable Sections (Admin Panels) |
|---|---|---|
| `home_v1` | `home` | Hero, About, Video (title, body, second paragraph, video URL), Treatments (items), Doctor, Conditions (items), Environment (title, description, items), Why Choose (title, subtitle, items with icon/title/description), Testimonials (items), Timeline (items), Coverage (title, subtitle, points, quick facts), FAQ (items), Contact |
| `ketamine_v1` | `ketamine` | Hero, Stats (items), Understanding Ketamine (title, description, cards with paragraphs), Services (items with title, description, image, link), Conditions (items with title, description, icon, accordion sub-items), Parallax, Eligibility, Cross-sell, FAQ (items) |
| `spravato_v1` | `spravato-Englewood` | Hero, Eligibility Form, TRD Section (title, paragraphs), Benefits (items with title, description, icon), What Is section, Timeline (items, mechanism text), FAQ (items), Contact |
| `contact_v1` | `contact` | Hero, Clinic Info (name, address, phone, email, hours), Form section |
| `faq_v1` | `faq` | Hero, FAQ Items (flat list of question/answer pairs), CTA (title, description, label, href, phone, email, address) |
| `condition_v1` | `conditions-depression`, `conditions-anxiety`, `conditions-ptsd`, `conditions-ocd`, `conditions-pain-management` | Hero (subtitle, headline, body, CTA, image), Content (title, paragraphs, subsections with title/body/bullets), CTA (label, href) |
| `vitamin_v1` | `vitamin-infusion-englewood` | Hero, About, Infusions (items), Benefits, Process, FAQ (items), CTA |
| `team_v1` | `our-team` | Hero, Team Members (items with name, title, bio, image) |

### How to edit a template page:

1. Go to `/admin/pages`
2. Click on the page you want to edit
3. The **Template Content** tab shows a form organized by section
4. Each section is collapsible — click to expand and edit fields
5. For sections with repeatable items (treatments, testimonials, FAQ, conditions, benefits, etc.):
   - Click **"Add Item"** to add new entries
   - Click the trash icon to remove entries (with confirmation dialog)
   - Items can be reordered
6. Click **"Save Draft"** to save without publishing
7. Click **"Publish"** to make changes live on the website
8. A **live preview** panel shows how changes will look in real-time as you type

### Detailed Panel Reference: Home Page (`home_v1`)

| Panel | Fields |
|---|---|
| **Hero** | Subtitle, Headline, Body, CTA Label, CTA Link, Image URL, Image Alt |
| **About** | Title, Body |
| **Video** | Title, Body, Second Paragraph, Video URL |
| **Treatments** | Items: title, description, imageUrl, href |
| **Doctor** | Name, Title, Bio, Image URL |
| **Conditions** | Items: title, description, imageUrl, href |
| **Environment** | Title, Description, Items: title, description, imageUrl |
| **Why Choose** | Title, Subtitle, Items: icon, title, description |
| **Testimonials** | Items: quote, author, role |
| **Timeline** | Items: step, title, description |
| **Coverage** | Title, Subtitle, Points (list), Quick Facts (list) |
| **FAQ** | Items: question, answer |
| **Contact** | Title, Body, Phone, Email, Address |

### Detailed Panel Reference: Ketamine Page (`ketamine_v1`)

| Panel | Fields |
|---|---|
| **Hero** | Subtitle, Headline, Body, CTA Label, CTA Link, Image URL, Image Alt |
| **Stats** | Items: value, label |
| **Understanding Ketamine** | Title, Description, Cards: title, paragraphs (array) |
| **Services** | Items: title, description, imageUrl, href |
| **Conditions** | Items: title, description, icon, accordionItems: trigger, content |
| **Parallax** | Title, Body |
| **Eligibility** | Title, Items (list) |
| **Cross-sell** | Title, Body, CTA Label, CTA Link |
| **FAQ** | Items: question, answer |

### Detailed Panel Reference: SPRAVATO Page (`spravato_v1`)

| Panel | Fields |
|---|---|
| **Hero** | Subtitle, Headline, Body, CTA Label, CTA Link, Image URL, Image Alt |
| **Eligibility Form** | Title, Body |
| **TRD Section** | Title, Paragraphs (array) |
| **Benefits** | Items: title, description, icon |
| **What Is Section** | Title, Body, Image URL |
| **Timeline** | Items: step, title, description; Mechanism Text |
| **FAQ** | Items: question, answer |
| **Contact** | Title, Body, Phone, Email |

### Detailed Panel Reference: FAQ Page (`faq_v1`)

| Panel | Fields |
|---|---|
| **Hero** | Subtitle, Headline, Body |
| **FAQ Items** | Flat list of items: question, answer |
| **CTA** | Title, Description, Label, Link, Phone, Email, Address |

### Section-based pages (Dynamic CMS pages)

New pages created via the admin use a section-based editor:

- **Section types available:** Hero, Text Block, Image Left, Image Right, FAQ, Call to Action, Statistics, Contact, Video, Treatments, Doctor, Conditions, Testimonials, Timeline
- Sections can be added, reordered (up/down), duplicated, or deleted
- Each section has a unique ID for deep-linking
- Published at `/p/:slug`

### Content Protection Features:

- **Auto-backup:** Previous `content_json` is saved to `page_content_history` before each save
- **Removal warning:** If you remove items from any section, a confirmation dialog shows which sections lost items
- **Empty items warning:** If sections have empty items arrays, a dialog warns before publish
- **Validation:** Image alt text required, FAQ items need both Q&A, CTA needs label + href
- **Version history:** Browse and restore previous versions via the history drawer

---

## 7. Blog Post Management

**URL:** `/admin/posts`

### Creating a blog post:

1. Go to `/admin/posts` → click **"New Post"**
2. Fill in:
   - **Title** (required) — slug auto-generates from title
   - **Slug** (required) — URL-friendly identifier
   - **Excerpt** — short description shown in blog listing
   - **Hero Image URL** — banner image for the post
   - **Hero Image Alt Text** — required if hero image is set
   - **Content** — write in plain text, paragraphs separated by blank lines
3. Assign **Category** and **Author** from dropdowns
4. Click **"Save Draft"** or **"Publish"**

### Blog post states:

| Status | Visible on public site? |
|---|---|
| `draft` | ❌ No |
| `published` (with `published_at` in the past) | ✅ Yes |

### SEO fields per post:

- SEO Title (max 60 chars)
- SEO Description (max 160 chars)
- Canonical URL (Advanced SEO — admin only)
- No Index toggle (Advanced SEO — admin only)
- OG Title, OG Description, OG Image URL (Advanced SEO — admin only)

### Viewing published posts:

- Blog listing: `/blog`
- Individual post: `/blog/:slug`
- "View Live" button appears in editor when post is published

---

## 8. Media Library

**URL:** `/admin/media`

### Features:

- **Upload images** by clicking "Upload" or dragging files
- **Search** media by filename
- **Click on any image** to view details and edit alt text
- **Copy URL** to clipboard for use in blog posts or pages
- **Delete media** (admin only)
- Alt text is enforced for accessibility
- Files stored in Supabase Storage `media` bucket with public access

### Media in page editors:

- Template page editors include **ImageUploadField** components that allow direct upload or browsing the media library inline
- Uploaded images automatically sync metadata (URL, dimensions, file size, MIME type) to the `media` table

---

## 9. Taxonomy: Categories, Tags, Authors

### Categories (`/admin/categories`)
- Create, edit, delete categories
- Each category has: name, slug, description
- Used to organize blog posts

### Tags (`/admin/tags`)
- Create, edit, delete tags
- Each tag has: name, slug
- Many-to-many relationship with blog posts via `blog_post_tags`

### Authors (`/admin/authors`)
- Create, edit, delete authors
- Each author has: name, bio, avatar URL
- Assigned to blog posts

---

## 10. SEO Implementation (Completed)

A comprehensive, production-grade SEO system has been implemented across the entire site. This section documents the full scope of work.

### 10a. Per-Page Meta Tags (react-helmet-async)

Every public page has unique, route-specific SEO tags injected via `react-helmet-async`:

| Page | Title | Description | Canonical |
|---|---|---|---|
| `/` | Relaxol Clinic \| Premier Ketamine & SPRAVATO® Treatment in New Jersey | Leading provider of innovative mental health treatments... | `https://relaxolclinic.com/` |
| `/ketamine` | Ketamine Therapy \| Relaxol Clinic | Ketamine infusion therapy for depression, anxiety, PTSD... | `https://relaxolclinic.com/ketamine` |
| `/spravato-Englewood` | SPRAVATO® Treatment \| Relaxol Clinic | FDA-approved SPRAVATO® (esketamine) nasal spray... | `https://relaxolclinic.com/spravato-Englewood` |
| `/faq` | Ketamine Therapy FAQ \| Relaxol Clinic | Frequently asked questions about ketamine therapy... | `https://relaxolclinic.com/faq` |
| `/contact` | Contact Us \| Relaxol Clinic | Contact Relaxol Clinic in Englewood Cliffs, NJ... | `https://relaxolclinic.com/contact` |
| `/blog` | Blog \| Relaxol Clinic | Mental health insights, treatment breakthroughs... | `https://relaxolclinic.com/blog` |
| `/blog/:slug` | *Dynamic from CMS* `seo_title` or `title` | *Dynamic from CMS* `seo_description` or `excerpt` | `https://relaxolclinic.com/blog/:slug` |
| `/our-team` | Our Team \| Relaxol Clinic | Meet Dr. Sangeet Khanna and the Relaxol Clinic team... | `https://relaxolclinic.com/our-team` |
| `/vitamin-infusion-englewood` | IV Vitamin Infusions \| Relaxol Clinic | Physician-supervised IV vitamin infusions... | `https://relaxolclinic.com/vitamin-infusion-englewood` |
| `/conditions/*` | *Dynamic* e.g. "Depression Treatment \| Relaxol Clinic" | *From CMS content or fallback* | Per-condition canonical |
| `/p/:slug` (Dynamic CMS pages) | *From `seo_title` or `title` field* | *From `seo_description` field* | `https://relaxolclinic.com/p/:slug` |

Each page also includes per-page **Open Graph** and **Twitter Card** tags (title, description, image, URL).

**Implementation:** `src/components/seo/PageSEO.tsx` — a reusable component that accepts `title`, `description`, `path`, `ogTitle`, `ogDescription`, `ogImage`, `type`, `publishedAt`, and `authorName` props.

### 10b. Open Graph Image

- **Branded OG image** generated at `public/images/og-relaxol-clinic.jpg` (1200×630) featuring the Relaxol Clinic logo on a warm gold gradient
- Replaces the default Lovable placeholder image
- Referenced in `index.html` as the fallback OG image
- Individual blog posts can override with their own `hero_image`

### 10c. Structured Data (JSON-LD)

Four structured data components provide rich search engine results:

| Component | Schema Type | Pages Using It |
|---|---|---|
| `JsonLdSchema` (type="clinic") | `MedicalClinic` | Home, Contact |
| `JsonLdSchema` (type="physician") | `Physician` | Our Team |
| `JsonLdSchema` (type="faq") | `FAQPage` | FAQ |
| `BlogPostJsonLd` | `BlogPosting` | Individual blog posts (`/blog/:slug`) |
| `BreadcrumbJsonLd` | `BreadcrumbList` | Blog posts, Condition pages |

**MedicalClinic schema includes:** Clinic name, address, phone, email, geo coordinates, opening hours, medical specialties, available services (SPRAVATO®, Ketamine, IV Vitamins).

**BlogPosting schema includes:** Headline, description, URL, image, published date, author (Person), publisher (Organization).

**BreadcrumbList schema** provides navigation path context, e.g.:
- Blog posts: Home → Blog → Post Title
- Condition pages: Home → Conditions → Condition Name

### 10d. Dynamic Sitemap (Edge Function)

A `sitemap` edge function at `supabase/functions/sitemap/index.ts` generates a complete XML sitemap:

**What it includes:**
- **16 static routes** with assigned priorities (homepage at 1.0, service pages at 0.9, conditions at 0.8, etc.)
- **All published blog posts** fetched from `blog_posts` table with `updated_at` as `lastmod`
- **All published dynamic CMS pages** from `pages` table (served at `/p/:slug`)
- Deduplication logic to skip CMS pages whose slugs overlap with static routes

**Configuration:**
- `verify_jwt = false` in `supabase/config.toml` (publicly accessible)
- `robots.txt` includes `Sitemap: https://relaxolclinic.com/sitemap.xml`
- Cache-Control header: `public, max-age=3600` (1-hour cache)

### 10e. robots.txt

Located at `public/robots.txt`:
- Explicitly allows Googlebot, Bingbot, Twitterbot, facebookexternalhit, and all other crawlers
- Includes `Sitemap:` directive pointing to the sitemap URL

### 10f. Canonical Tags

- **Removed** the hardcoded `<link rel="canonical" href="/" />` from `index.html` (which incorrectly set every page's canonical to the homepage)
- Each page now sets its own canonical URL via `react-helmet-async`, ensuring correct self-referencing canonicals

### 10g. CMS-Driven SEO Fields

Both `pages` and `blog_posts` tables include SEO columns that are editable via the admin panel:

| Field | Purpose | Available On |
|---|---|---|
| `seo_title` | Custom page title for search results | Pages, Blog Posts |
| `seo_description` | Meta description for search results | Pages, Blog Posts |
| `canonical_url` | Override canonical URL | Pages, Blog Posts |
| `noindex` | Exclude from search engine indexing | Pages, Blog Posts |
| `og_title` | Open Graph title for social sharing | Pages, Blog Posts |
| `og_description` | Open Graph description for social sharing | Pages, Blog Posts |
| `og_image_url` | Open Graph image for social sharing | Pages, Blog Posts |

These fields are injected into page `<head>` tags automatically when present.

### SEO Files Reference

| File | Purpose |
|---|---|
| `src/components/seo/PageSEO.tsx` | Per-page title, meta, OG, canonical, Twitter Card tags |
| `src/components/seo/JsonLdSchema.tsx` | MedicalClinic, Physician, FAQPage structured data |
| `src/components/seo/BlogPostJsonLd.tsx` | BlogPosting structured data for blog posts |
| `src/components/seo/BreadcrumbJsonLd.tsx` | BreadcrumbList navigation structured data |
| `supabase/functions/sitemap/index.ts` | Dynamic XML sitemap generator (edge function) |
| `public/robots.txt` | Crawler directives with sitemap reference |
| `public/images/og-relaxol-clinic.jpg` | Branded Open Graph share image (1200×630) |
| `index.html` | Fallback OG tags and viewport meta |

---

## 11. Licensing & Feature Gating

**URL:** `/admin/license`

The system uses a plan-based licensing model:

| Feature | Controlled By |
|---|---|
| Blog functionality | `plans.features.blog` |
| Treatment/landing pages | `plans.features.treatment_pages` |
| Advanced SEO controls | `plans.features.advanced_seo` |
| Max blog posts | `plans.features.max_posts` |
| Max team members | `plans.features.max_users` |

- License status (active/inactive) is checked on every admin action
- Inactive licenses block all editing operations
- License data is in the `licenses` table, linked to `plans` table

### Current plan data (from seed):
- **Plan:** "professional"
- **Features:** blog ✅, treatment_pages ✅, advanced_seo ✅, max_posts: 50, max_users: 5

---

## 12. Settings

**URL:** `/admin/settings`

Displays (read-only):
- Account email and user ID
- Workspace name and slug
- Current role
- Plan name and status
- Role permissions reference

---

## 13. Content Protection & Safety

Four layers of protection prevent accidental content loss:

1. **Auto-backup history:** Every save creates an entry in `page_content_history` with the previous content. Browse and restore via the history drawer in the editor.
2. **Item removal warning:** Dialog appears if you reduce the number of items in any section (treatments, conditions, testimonials, timeline, FAQ, benefits, etc.)
3. **Empty items warning:** Dialog appears before publish if any sections have zero items
4. **Confirmation dialogs:** Duplicate and Archive actions in the Pages List require confirmation

---

## 14. Activity Log

**URL:** `/admin/activity`

All content-related actions are logged to the `activity_log` table:
- **Tracked actions:** create, update, delete, publish, upload
- **Tracked entities:** pages, blog posts, media, users
- Each entry records: user email, action, entity type, entity title, timestamp, details
- Provides a full audit trail for accountability

---

## 15. Database Tables Reference

| Table | Purpose |
|---|---|
| `tenants` | Workspace/organization |
| `tenant_members` | User ↔ tenant ↔ role mapping |
| `user_roles` | Legacy role storage (secondary) |
| `plans` | Plan definitions with feature flags |
| `licenses` | Tenant ↔ plan link with status and expiry |
| `pages` | CMS pages with template, content_json, sections_json, SEO fields |
| `page_content_history` | Version history for page content |
| `blog_posts` | Blog articles with content, SEO, taxonomy |
| `blog_post_tags` | Many-to-many: posts ↔ tags |
| `categories` | Blog categories |
| `tags` | Blog tags |
| `authors` | Blog authors |
| `media` | Uploaded media references |
| `invites` | Invite tokens for user provisioning |
| `form_submissions` | Contact/lead form submissions |
| `activity_log` | Audit trail for all CMS actions |

All tables have **Row-Level Security (RLS)** policies. Key patterns:
- Members can **view** content in their tenant
- Editors can **create/update** content
- Admins can **delete** content and manage users
- Published blog posts and pages are **publicly readable** (no auth required)

---

## 16. Edge Functions Reference

| Function | Path | Purpose |
|---|---|---|
| `create-invite` | `/functions/v1/create-invite` | Creates invite token, stores in `invites` table |
| `accept-invite` | `/functions/v1/accept-invite` | Validates token, creates auth user, adds `tenant_members` row |
| `validate-invite` | `/functions/v1/validate-invite` | Checks if invite token is valid and not expired |
| `create-user` | `/functions/v1/create-user` | Directly creates a user with password (no email invite needed) |
| `sitemap` | `/functions/v1/sitemap` | Generates dynamic XML sitemap from published pages and blog posts |

All functions have `verify_jwt = false` (accessible without auth token).

---

## 17. Environment Variables

Required for deployment:

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project API URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

Edge functions also use these secrets (configured in Supabase dashboard):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`

---

## 18. Recommendations: Features to Add Before Handoff

### 🔴 High Priority

1. **Email Delivery for Invites**
   - Invite emails are not automatically sent. Currently, the admin must manually share the invite link. Consider integrating an email service (Resend, SendGrid) via an edge function to auto-send invite emails.

2. **Password Reset Flow**
   - There is no "Forgot Password" link on the admin login page. Supabase Auth supports this natively — just needs a UI button and redirect URL configuration.

### 🟡 Medium Priority

3. **Blog Rich Text Editor**
   - Blog content is currently plain text with paragraph splitting. A rich text editor (e.g., TipTap, Lexical) would allow formatting: bold, italic, headings, links, embedded images.

4. **Scheduled Publishing**
   - Posts/pages can have a `published_at` date, but there's no calendar/date picker UI to schedule future publication. Adding a date picker would enable scheduling.

5. **Bulk Actions on Posts/Pages**
   - No multi-select or bulk operations (delete, unpublish, change category). Useful when managing many posts.

### 🟢 Nice to Have

6. **Analytics Dashboard**
   - Add page view tracking or integrate with Google Analytics. Show traffic stats on the admin dashboard.

7. **~~SEO Sitemap Generation~~** ✅ **COMPLETED** — Dynamic sitemap edge function deployed, per-page meta tags, JSON-LD structured data, branded OG image, and canonical tags all implemented.

8. **Blog Comment System**
   - If patient engagement is desired, a moderated comment system could be added to blog posts.

9. **Multi-Tenant White-Label**
   - The architecture already supports multi-tenancy. If the CMS will be used for other clinics, add tenant switching and customizable branding.

---

## Quick Reference: Admin URL Map

| URL | Feature |
|---|---|
| `/admin/login` | Login page |
| `/admin` | Dashboard |
| `/admin/pages` | Page list |
| `/admin/pages/:id` | Page editor |
| `/admin/pages/new` | Create new page |
| `/admin/posts` | Blog post list |
| `/admin/posts/:id` | Blog post editor |
| `/admin/posts/new` | Create new post |
| `/admin/categories` | Category management |
| `/admin/tags` | Tag management |
| `/admin/authors` | Author management |
| `/admin/media` | Media library |
| `/admin/users` | User & invite management |
| `/admin/activity` | Activity log |
| `/admin/settings` | Account & workspace settings |
| `/admin/license` | Plan & feature details |
| `/admin/accept-invite?token=...` | Accept an invite |
