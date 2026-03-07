import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://relaxolclinic.com";

// Static routes with priorities
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/spravato-Englewood", priority: "0.9", changefreq: "monthly" },
  { path: "/ketamine", priority: "0.9", changefreq: "monthly" },
  { path: "/vitamin-infusion-englewood", priority: "0.8", changefreq: "monthly" },
  { path: "/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/our-team", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "daily" },
  { path: "/verify-coverage", priority: "0.7", changefreq: "monthly" },
  { path: "/conditions/depression", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/anxiety", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/ptsd", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/ocd", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/pain-management", priority: "0.8", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
];

Deno.serve(async () => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    // Fetch published dynamic pages
    const { data: pages } = await supabase
      .from("pages")
      .select("slug, updated_at, type")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static routes
    for (const route of STATIC_ROUTES) {
      xml += `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }

    // Blog posts
    if (posts) {
      for (const post of posts) {
        const lastmod = (post.updated_at || post.published_at || today).split("T")[0];
        xml += `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    }

    // Dynamic CMS pages (served at /p/slug)
    if (pages) {
      for (const page of pages) {
        // Skip pages that match static routes (they're already handled by hardcoded pages)
        const isStaticSlug = STATIC_ROUTES.some(
          (r) => r.path === `/${page.slug}` || r.path === `/${page.slug.replace(/^conditions-/, "conditions/")}`
        );
        if (isStaticSlug) continue;

        const lastmod = (page.updated_at || today).split("T")[0];
        xml += `
  <url>
    <loc>${SITE_URL}/p/${page.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
      }
    }

    xml += `
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
});
