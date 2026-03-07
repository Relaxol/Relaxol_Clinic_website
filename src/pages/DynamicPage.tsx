import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionRenderer } from "@/components/sections/dynamic";
import { AnySectionData } from "@/lib/sections/registry";
import { PageSEO } from "@/components/seo/PageSEO";
import NotFound from "./NotFound";

// Dev-only fallback warning
const DEV_MODE = import.meta.env.DEV;

interface PageData {
  id: string;
  slug: string;
  title: string;
  hero_headline: string | null;
  hero_subheadline: string | null;
  sections_json: AnySectionData[] | null;
  status: string;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
}

interface DynamicPageProps {
  slug?: string;
  fallback?: React.ComponentType;
}

export default function DynamicPage({ slug: propSlug, fallback: FallbackComponent }: DynamicPageProps) {
  const params = useParams<{ slug: string }>();
  const slug = propSlug || params.slug || '';
  
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        setError(null);

        // Fetch published page by slug
        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .lte('published_at', new Date().toISOString())
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!data) {
          // Page not found in CMS
          if (DEV_MODE && FallbackComponent) {
            console.warn(
              `[DEV FALLBACK] Page "${slug}" not found in CMS. Using hardcoded fallback. ` +
              `This will NOT work in production. Please seed the page to the CMS.`
            );
            setPage(null);
          } else {
            setError('Page not found');
          }
        } else {
          // Cast sections_json properly
          const pageData: PageData = {
            ...data,
            sections_json: Array.isArray(data.sections_json) 
              ? (data.sections_json as unknown as AnySectionData[])
              : null,
          };
          setPage(pageData);
          
          // Update document title and meta
          if (data.seo_title || data.title) {
            document.title = data.seo_title || data.title;
          }
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPage();
    } else {
      setLoading(false);
      setError('No page slug provided');
    }
  }, [slug, FallbackComponent]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Dev fallback - only in dev mode
  if (!page && DEV_MODE && FallbackComponent) {
    return <FallbackComponent />;
  }

  // Error or not found
  if (error || !page) {
    return <NotFound />;
  }

  // Parse sections
  const sections = Array.isArray(page.sections_json) ? page.sections_json : [];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={page.seo_title || page.title}
        description={page.seo_description || page.hero_subheadline || ""}
        path={`/p/${page.slug}`}
        ogTitle={page.og_title || undefined}
        ogDescription={page.og_description || undefined}
        ogImage={page.og_image_url || undefined}
      />
      <Header />
      <main>
        {sections.map((section) => (
          <SectionRenderer key={section.sectionId} section={section} />
        ))}
        
        {sections.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p>This page has no content sections.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
