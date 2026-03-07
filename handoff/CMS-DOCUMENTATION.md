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
14. [Database Tables Reference](#14-database-tables-reference)
15. [Edge Functions Reference](#15-edge-functions-reference)
16. [Environment Variables](#16-environment-variables)
17. [Recommendations: Features to Add Before Handoff](#17-recommendations-features-to-add-before-handoff)

---

## 1. Architecture Overview

The project uses a **hybrid CMS architecture**:

| Page Type | Rendering | Editable Via CMS? |
|---|---|---|
| **Core pages** (`/`, `/ketamine`, `/spravato-Englewood`, `/faq`, `/contact`) | Hardcoded React components with original CSS layouts | ✅ Yes — content (text, images, URLs) is sourced from `pages.content_json` in the database |
| **New CMS pages** (created via admin panel) | Dynamically rendered at `/p/:slug` | ✅ Yes — full section-based editing |
| **Blog posts** (`/blog`, `/blog/:slug`) | Dynamically rendered from `blog_posts` table | ✅ Yes — full blog editor |
| **Condition pages** (`/conditions/*`) | Hardcoded React components | ❌ Not CMS-editable |
| **Static pages** (`/privacy-policy`, `/terms-of-service`, `/our-team`, etc.) | Hardcoded React components | ❌ Not CMS-editable |

**Key principle:** Core page designs (CSS, layout, spacing) are preserved exactly as built. Only the *content* (text strings, image URLs, FAQ items, etc.) is pulled from the database.

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

These 5 core pages use predefined templates with structured content schemas:

| Template | Slug | Editable Sections |
|---|---|---|
| `home_v1` | `home` | Hero, About, Video, Treatments (items), Doctor, Conditions (items), Testimonials (items), Timeline (items), FAQ (items), Contact |
| `ketamine_v1` | `ketamine` | Hero, Stats (items), Parallax, Services (items), Eligibility, Cross-sell, FAQ (items) |
| `spravato_v1` | `spravato-Englewood` | Hero, Eligibility Form, TRD section, Benefits (items), What Is section, Timeline (items), FAQ (items), Contact |
| `contact_v1` | `contact` | Hero, Clinic Info (name, address, phone, email, hours), Form section |
| `faq_v1` | `faq` | Hero, FAQ Sections (grouped items), CTA |

### How to edit a template page:

1. Go to `/admin/pages`
2. Click on the page you want to edit
3. The **Template Content** tab shows a form organized by section
4. Each section is collapsible — click to expand and edit fields
5. For sections with repeatable items (treatments, testimonials, FAQ, etc.):
   - Click **"Add Item"** to add new entries
   - Click the trash icon to remove entries
   - Items can be reordered
6. Click **"Save Draft"** to save without publishing
7. Click **"Publish"** to make changes live on the website
8. A **live preview** panel shows how changes will look

### Section-based pages (Dynamic CMS pages)

New pages created via the admin use a section-based editor:

- **Section types available:** Text Block, Image Left, Image Right, FAQ, Call to Action, Statistics
- Sections can be added, reordered (up/down), duplicated, or deleted
- Each section has a unique ID for deep-linking
- Published at `/p/:slug`

### Content Protection Features:

- **Auto-backup:** Previous `content_json` is saved to `page_content_history` before each save
- **Removal warning:** If you remove items from any section, a confirmation dialog shows which sections lost items
- **Empty items warning:** If sections have empty items arrays, a dialog warns before publish
- **Validation:** Image alt text required, FAQ items need both Q&A, CTA needs label + href

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

### Current limitation:

Media is stored as URL references in the `media` database table. The actual files are uploaded to Supabase Storage (if configured) or referenced by external URL.

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

## 10. SEO Controls

### Standard SEO (all roles):
- SEO Title
- SEO Description

### Advanced SEO (admin role + `advanced_seo` plan feature):
- Canonical URL
- No Index toggle
- Open Graph: OG Title, OG Description, OG Image URL

Available on both **pages** and **blog posts**.

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

Three layers of protection prevent accidental content loss:

1. **Auto-backup history:** Every save creates an entry in `page_content_history` with the previous content
2. **Item removal warning:** Dialog appears if you reduce the number of items in any section (treatments, conditions, testimonials, timeline, FAQ)
3. **Empty items warning:** Dialog appears before publish if any sections have zero items

---

## 14. Database Tables Reference

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

All tables have **Row-Level Security (RLS)** policies. Key patterns:
- Members can **view** content in their tenant
- Editors can **create/update** content
- Admins can **delete** content and manage users
- Published blog posts and pages are **publicly readable** (no auth required)

---

## 15. Edge Functions Reference

| Function | Path | Purpose |
|---|---|---|
| `create-invite` | `/functions/v1/create-invite` | Creates invite token, stores in `invites` table |
| `accept-invite` | `/functions/v1/accept-invite` | Validates token, creates auth user, adds `tenant_members` row |
| `validate-invite` | `/functions/v1/validate-invite` | Checks if invite token is valid and not expired |

All three functions have `verify_jwt = false` (accessible without auth token).

---

## 16. Environment Variables

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

## 17. Recommendations: Features to Add Before Handoff

### 🔴 High Priority

1. **Supabase Storage Bucket Setup**
   - Currently no storage bucket exists. Media uploads need a `media` storage bucket configured in Supabase with proper RLS policies. Without this, the media library cannot upload files — only reference external URLs.

2. **Email Delivery for Invites**
   - Invite emails are not automatically sent. Currently, the admin must manually share the invite link. Consider integrating an email service (Resend, SendGrid) via an edge function to auto-send invite emails.

3. **Password Reset Flow**
   - There is no "Forgot Password" link on the admin login page. Supabase Auth supports this natively — just needs a UI button and redirect URL configuration.

4. **Condition Pages CMS Integration**
   - The 5 condition pages (`/conditions/depression`, `/anxiety`, `/ptsd`, `/ocd`, `/pain-management`) are fully hardcoded and not editable via CMS. Adding template schemas (like the core pages) would make them editable.

### 🟡 Medium Priority

5. **Blog Rich Text Editor**
   - Blog content is currently plain text with paragraph splitting. A rich text editor (e.g., TipTap, Lexical) would allow formatting: bold, italic, headings, links, embedded images.

6. **Media Picker in Editors**
   - Currently, image URLs must be pasted manually into page/post editors. A media picker that lets users browse and select from the media library would be much easier.

7. **Scheduled Publishing**
   - Posts/pages can have a `published_at` date, but there's no calendar/date picker UI to schedule future publication. Adding a date picker would enable scheduling.

8. **Content Revision Comparison (Diff View)**
   - `page_content_history` stores version backups but there's no UI to compare or restore previous versions. A diff viewer or "Restore this version" button would be valuable.

9. **Bulk Actions on Posts/Pages**
   - No multi-select or bulk operations (delete, unpublish, change category). Useful when managing many posts.

10. **Blog Post Image Upload Integration**
    - Blog hero images currently require pasting a URL. Integrating with the media library upload flow would streamline this.

### 🟢 Nice to Have

11. **Analytics Dashboard**
    - Add page view tracking or integrate with Google Analytics. Show traffic stats on the admin dashboard.

12. **Content Preview for Dynamic Pages**
    - The section-based editor shows a preview for template pages but dynamic pages (`/p/:slug`) could benefit from a similar live preview.

13. **Vitamin Infusions Page CMS Integration**
    - The `/vitamin-infusion-englewood` page is hardcoded. Could be templated for CMS editing.

14. **Contact Form Submissions Table**
    - The contact page has a form but submissions may not be stored in the database. Adding a `form_submissions` table and admin view would let the team see incoming inquiries.

15. **SEO Sitemap Generation**
    - Auto-generate `sitemap.xml` from published pages and blog posts for better search engine indexing.

16. **Blog Comment System**
    - If patient engagement is desired, a moderated comment system could be added to blog posts.

17. **Multi-Tenant White-Label**
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
| `/admin/settings` | Account & workspace settings |
| `/admin/license` | Plan & feature details |
| `/admin/accept-invite?token=...` | Accept an invite |
