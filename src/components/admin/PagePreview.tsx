import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface Section {
  sectionId: string;
  type: 'text' | 'imageLeft' | 'imageRight' | 'faq' | 'cta' | 'stats';
  title: string;
  body: string;
  image_url?: string;
  image_alt?: string;
  cta_label?: string;
  cta_href?: string;
  faq_items?: { question: string; answer: string }[];
  stats_items?: { label: string; value: string }[];
}

interface PagePreviewProps {
  page: {
    title: string;
    slug: string;
    hero_headline: string;
    hero_subheadline: string;
    sections_json: Section[];
    seo_title: string;
    seo_description: string;
  };
  onSectionEdit?: (sectionId: string) => void;
  previewMode?: boolean;
  highlightedSectionId?: string | null;
}

const PagePreview: React.FC<PagePreviewProps> = ({ 
  page, 
  onSectionEdit, 
  previewMode = true,
  highlightedSectionId 
}) => {
  const showOverlays = previewMode && !!onSectionEdit;
  const highlightedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedSectionId && highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedSectionId]);

  const EditOverlay = ({ sectionId, label }: { sectionId: string; label: string }) => {
    if (!showOverlays) return null;
    
    return (
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={() => onSectionEdit?.(sectionId)}
      >
        <Edit className="h-3 w-3 mr-1" />
        {label}
      </Button>
    );
  };

  const isHighlighted = (sectionId: string) => highlightedSectionId === sectionId;

  const renderSection = (section: Section) => {
    const highlighted = isHighlighted(section.sectionId);
    const highlightClass = highlighted ? 'ring-2 ring-primary ring-offset-2 animate-pulse' : '';

    switch (section.type) {
      case 'text':
        return (
          <div 
            key={section.sectionId}
            ref={highlighted ? highlightedRef : undefined}
            data-section-id={section.sectionId}
            data-section-type={section.type}
            className={`relative group py-12 px-6 ${highlightClass}`}
          >
            <EditOverlay sectionId={section.sectionId} label="Edit section" />
            <div className="max-w-3xl mx-auto">
              {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
              <div className="prose prose-sm max-w-none">
                {section.body.split('\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>
            </div>
          </div>
        );

      case 'imageLeft':
      case 'imageRight':
        return (
          <div 
            key={section.sectionId}
            ref={highlighted ? highlightedRef : undefined}
            data-section-id={section.sectionId}
            data-section-type={section.type}
            className={`relative group py-12 px-6 ${highlightClass}`}
          >
            <EditOverlay sectionId={section.sectionId} label="Edit section" />
            <div className={`max-w-5xl mx-auto flex flex-col ${section.type === 'imageRight' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              <div className="flex-1">
                {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
                <div className="prose prose-sm max-w-none">
                  {section.body.split('\n').map((para, i) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                {section.image_url ? (
                  <img 
                    src={section.image_url} 
                    alt={section.image_alt || ''} 
                    className="w-full rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div 
            key={section.sectionId}
            ref={highlighted ? highlightedRef : undefined}
            data-section-id={section.sectionId}
            data-section-type={section.type}
            className={`relative group py-12 px-6 bg-muted/30 ${highlightClass}`}
          >
            <EditOverlay sectionId={section.sectionId} label="Edit section" />
            <div className="max-w-3xl mx-auto">
              {section.title && <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>}
              <div className="space-y-4">
                {section.faq_items?.map((item, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-background">
                    <h3 className="font-semibold mb-2">{item.question || 'Question'}</h3>
                    <p className="text-muted-foreground">{item.answer || 'Answer'}</p>
                  </div>
                ))}
                {(!section.faq_items || section.faq_items.length === 0) && (
                  <p className="text-center text-muted-foreground">No FAQ items yet</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div 
            key={section.sectionId}
            ref={highlighted ? highlightedRef : undefined}
            data-section-id={section.sectionId}
            data-section-type={section.type}
            className={`relative group py-16 px-6 bg-primary text-primary-foreground ${highlightClass}`}
          >
            <EditOverlay sectionId={section.sectionId} label="Edit section" />
            <div className="max-w-3xl mx-auto text-center">
              {section.title && <h2 className="text-3xl font-bold mb-4">{section.title}</h2>}
              {section.body && <p className="text-lg mb-8 opacity-90">{section.body}</p>}
              {section.cta_label && (
                <Button 
                  variant="secondary" 
                  size="lg"
                  asChild={!!section.cta_href}
                >
                  {section.cta_href ? (
                    <a href={section.cta_href}>{section.cta_label}</a>
                  ) : (
                    section.cta_label
                  )}
                </Button>
              )}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div 
            key={section.sectionId}
            ref={highlighted ? highlightedRef : undefined}
            data-section-id={section.sectionId}
            data-section-type={section.type}
            className={`relative group py-12 px-6 bg-muted/50 ${highlightClass}`}
          >
            <EditOverlay sectionId={section.sectionId} label="Edit section" />
            <div className="max-w-5xl mx-auto">
              {section.title && <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {section.stats_items?.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value || '0'}</div>
                    <div className="text-sm text-muted-foreground">{stat.label || 'Label'}</div>
                  </div>
                ))}
                {(!section.stats_items || section.stats_items.length === 0) && (
                  <p className="col-span-full text-center text-muted-foreground">No stats yet</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-background min-h-full">
      {/* SEO Preview */}
      <div className="p-4 border-b bg-muted/50">
        <p className="text-xs text-muted-foreground mb-1">SEO Preview</p>
        <p className="text-blue-600 text-lg font-medium truncate">
          {page.seo_title || page.title || 'Page Title'}
        </p>
        <p className="text-green-700 text-sm truncate">
          example.com/{page.slug || 'slug'}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {page.seo_description || 'Meta description will appear here...'}
        </p>
      </div>

      {/* Hero Section */}
      <div 
        className={`relative group bg-gradient-to-br from-primary/10 to-primary/5 py-20 px-6 ${isHighlighted('hero') ? 'ring-2 ring-primary ring-offset-2 animate-pulse' : ''}`}
        data-section-id="hero"
        data-section-type="hero"
      >
        <EditOverlay sectionId="hero" label="Edit hero" />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {page.hero_headline || page.title || 'Page Headline'}
          </h1>
          {page.hero_subheadline && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {page.hero_subheadline}
            </p>
          )}
        </div>
      </div>

      {/* Sections */}
      {page.sections_json.length > 0 ? (
        page.sections_json.map(section => renderSection(section))
      ) : (
        <div className="py-16 text-center text-muted-foreground">
          <p>No sections yet. Add sections in the editor.</p>
        </div>
      )}
    </div>
  );
};

export default PagePreview;
