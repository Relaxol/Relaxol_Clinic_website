import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TemplateType, TemplateContent } from '@/lib/templates/schemas';

interface PageData {
  id: string;
  slug: string;
  template: TemplateType | null;
  content_json: TemplateContent | null;
  status: string;
  published_at: string | null;
}

interface UsePageContentResult {
  content: TemplateContent | null;
  loading: boolean;
  error: string | null;
  pageData: PageData | null;
}

export function usePageContent(slug: string): UsePageContentResult {
  const [content, setContent] = useState<TemplateContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);

      try {
        // Query for published pages matching the slug
        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('id, slug, template, content_json, status, published_at')
          .eq('slug', slug)
          .eq('status', 'published')
          .lte('published_at', new Date().toISOString())
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          // Cast through unknown to handle new columns not in generated types
          const rawData = data as unknown as Record<string, unknown>;

          setPageData({
            id: rawData.id as string,
            slug: rawData.slug as string,
            template: (rawData.template as TemplateType) || null,
            content_json: (rawData.content_json as unknown as TemplateContent) || null,
            status: rawData.status as string,
            published_at: (rawData.published_at as string) || null,
          });
          setContent((rawData.content_json as unknown as TemplateContent) || null);
        } else {
          // No published page found - use hardcoded content
          setPageData(null);
          setContent(null);
        }
      } catch (err: unknown) {
        console.error('Error fetching page content:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load page content';
        setError(errorMessage);
        setContent(null);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug]);

  return { content, loading, error, pageData };
}

// Hook for admin to get page content (including drafts)
export function useAdminPageContent(pageId: string) {
  const [content, setContent] = useState<TemplateContent | null>(null);
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      if (!pageId || pageId === 'new') {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: fetchError } = await supabase
          .from('pages')
          .select('template, content_json')
          .eq('id', pageId)
          .single();

        if (fetchError) throw fetchError;

        // Cast through unknown to handle new columns
        const rawData = data as unknown as Record<string, unknown>;

        setTemplate((rawData.template as TemplateType) || null);
        setContent((rawData.content_json as unknown as TemplateContent) || null);
      } catch (err: unknown) {
        console.error('Error fetching admin page content:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load page content';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [pageId]);

  return { content, template, loading, error };
}
