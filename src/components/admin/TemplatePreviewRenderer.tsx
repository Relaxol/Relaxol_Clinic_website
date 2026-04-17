import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Phone, Mail, MapPin, Clock, ChevronRight, Play } from 'lucide-react';
import {
  TemplateType,
  TemplateContent,
  HomeV1Content,
  KetamineV1Content,
  SpravatoV1Content,
  ContactV1Content,
  FAQV1Content,
  isHomeV1Content,
  isKetamineV1Content,
  isSpravatoV1Content,
  isContactV1Content,
  isFAQV1Content,
} from '@/lib/templates/schemas';
import {
  ConditionV1Content,
  VitaminInfusionsV1Content,
  OurTeamV1Content,
  isConditionV1Content,
  isVitaminInfusionsV1Content,
  isOurTeamV1Content,
} from '@/lib/templates/newSchemas';

interface TemplatePreviewRendererProps {
  template: TemplateType;
  content: TemplateContent;
}

// ── Shared preview blocks ──────────────────────────────────

function PreviewHero({ hero }: { hero: { subtitle?: string; headline: string; body?: string; ctaLabel?: string; ctaHref?: string } }) {
  return (
    <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background py-16 px-6 text-center">
      {hero.subtitle && (
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3 block">
          {hero.subtitle}
        </span>
      )}
      <h1 className="text-3xl font-bold mb-3 leading-tight">{hero.headline || 'Page Title'}</h1>
      {hero.body && <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-5">{hero.body}</p>}
      {hero.ctaLabel && (
        <Button size="sm" className="text-xs">{hero.ctaLabel}</Button>
      )}
    </div>
  );
}

function PreviewSection({ title, subtitle, children, bg }: { title?: string; subtitle?: string; children: React.ReactNode; bg?: string }) {
  return (
    <div className={`py-10 px-6 ${bg || ''}`}>
      <div className="max-w-3xl mx-auto">
        {subtitle && (
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary mb-1 block">{subtitle}</span>
        )}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

function PreviewCard({ title, description, imageUrl, tag }: { title: string; description?: string; imageUrl?: string; tag?: string }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      {imageUrl ? (
        <div className="h-28 bg-muted overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-28 bg-muted/50 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      )}
      <div className="p-3">
        {tag && <span className="text-[10px] font-medium text-primary uppercase">{tag}</span>}
        <h3 className="text-sm font-semibold mt-1">{title || 'Untitled'}</h3>
        {description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>}
      </div>
    </div>
  );
}

function PreviewFAQ({ items }: { items: { question: string; answer: string }[] }) {
  if (!items || items.length === 0) return <p className="text-xs text-muted-foreground text-center">No FAQ items</p>;
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border rounded-md p-3 bg-card">
          <p className="text-sm font-medium">{item.question || 'Question'}</p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.answer || 'Answer'}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewStats({ items }: { items: { label: string; value: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
      {items.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-bold text-primary">{stat.value || '0'}</div>
          <div className="text-xs text-muted-foreground">{stat.label || 'Label'}</div>
        </div>
      ))}
    </div>
  );
}

function PreviewTimeline({ items }: { items: { step: string; title: string; description: string }[] }) {
  if (!items || items.length === 0) return <p className="text-xs text-muted-foreground text-center">No timeline items</p>;
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
            {item.step || i + 1}
          </div>
          <div>
            <h4 className="text-sm font-semibold">{item.title}</h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewTestimonials({ items }: { items: { quote: string; author: string; role?: string; rating?: number }[] }) {
  if (!items || items.length === 0) return <p className="text-xs text-muted-foreground text-center">No testimonials</p>;
  return (
    <div className="grid gap-3">
      {items.slice(0, 3).map((item, i) => (
        <div key={i} className="border rounded-md p-3 bg-card">
          {item.rating && (
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: item.rating }).map((_, j) => (
                <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          )}
          <p className="text-xs italic text-muted-foreground line-clamp-2">"{item.quote}"</p>
          <p className="text-xs font-medium mt-1">{item.author}{item.role ? ` · ${item.role}` : ''}</p>
        </div>
      ))}
    </div>
  );
}

function PreviewCTA({ title, body, ctaLabel }: { title: string; body?: string; ctaLabel?: string }) {
  return (
    <div className="bg-primary text-primary-foreground py-10 px-6 text-center">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {body && <p className="text-sm opacity-90 mb-4">{body}</p>}
      {ctaLabel && <Button variant="secondary" size="sm">{ctaLabel}</Button>}
    </div>
  );
}

// ── Template-specific renderers ───────────────────────────

function HomePreview({ content }: { content: HomeV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection title={content.about.title}>
        <div className="text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: content.about.bodyHtml }} />
      </PreviewSection>
      {content.video?.embedUrl && (
        <PreviewSection title={content.video.title} subtitle={content.video.subtitle} bg="bg-muted/30">
          <div className="aspect-video bg-black/10 rounded-lg flex items-center justify-center">
            <Play className="h-8 w-8 text-muted-foreground" />
          </div>
        </PreviewSection>
      )}
      <PreviewSection title={content.treatments.title} subtitle={content.treatments.subtitle}>
        {content.treatments.description && <p className="text-xs text-muted-foreground mb-4">{content.treatments.description}</p>}
        <div className="grid grid-cols-2 gap-3">
          {content.treatments.items.map((item, i) => (
            <PreviewCard key={i} title={item.title} description={item.description} imageUrl={item.imageUrl} tag={item.tag} />
          ))}
        </div>
        {content.treatments.items.length === 0 && <p className="text-xs text-muted-foreground text-center">No treatments (defaults will show)</p>}
      </PreviewSection>
      <PreviewSection title={content.conditions.title} subtitle={content.conditions.subtitle}>
        <div className="grid grid-cols-2 gap-3">
          {content.conditions.items.map((item, i) => (
            <PreviewCard key={i} title={item.title} description={item.description} imageUrl={item.imageUrl} />
          ))}
        </div>
        {content.conditions.items.length === 0 && <p className="text-xs text-muted-foreground text-center">No conditions (defaults will show)</p>}
      </PreviewSection>
      <PreviewSection title={content.testimonials.title} subtitle={content.testimonials.subtitle} bg="bg-muted/30">
        <PreviewTestimonials items={content.testimonials.items} />
      </PreviewSection>
      <PreviewSection title={content.timeline.title} subtitle={content.timeline.subtitle}>
        <PreviewTimeline items={content.timeline.items} />
      </PreviewSection>
      <PreviewCTA title={content.contact.title} body={content.contact.body} />
    </>
  );
}

function KetaminePreview({ content }: { content: KetamineV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection bg="bg-muted/30">
        <PreviewStats items={content.stats.items} />
      </PreviewSection>
      <PreviewSection title={content.parallax.title}>
        <p className="text-xs text-muted-foreground">{content.parallax.body}</p>
      </PreviewSection>
      <PreviewSection title={content.services.title} bg="bg-muted/30">
        <div className="grid grid-cols-2 gap-3">
          {content.services.items.map((item, i) => (
            <PreviewCard key={i} title={item.title} description={item.description} imageUrl={item.imageUrl} />
          ))}
        </div>
        {content.services.items.length === 0 && <p className="text-xs text-muted-foreground text-center">No services (defaults will show)</p>}
      </PreviewSection>
      <PreviewSection title={content.eligibility.title} subtitle={content.eligibility.subtitle}>
        <p className="text-xs text-muted-foreground mb-2">{content.eligibility.body}</p>
        <ul className="space-y-1">
          {content.eligibility.trustBullets.map((b, i) => (
            <li key={i} className="text-xs flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-primary" />{b}
            </li>
          ))}
        </ul>
      </PreviewSection>
      <PreviewCTA title={content.crossSell.title} body={content.crossSell.body} ctaLabel={content.crossSell.ctaLabel} />
      <PreviewSection title={content.faq.title} bg="bg-muted/30">
        <PreviewFAQ items={content.faq.items} />
      </PreviewSection>
    </>
  );
}

function SpravatoPreview({ content }: { content: SpravatoV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection title={content.trd.title}>
        <p className="text-xs text-muted-foreground whitespace-pre-line">{content.trd.body}</p>
      </PreviewSection>
      <PreviewSection title={content.benefits.title} subtitle={content.benefits.subtitle} bg="bg-muted/30">
        <div className="grid grid-cols-2 gap-3">
          {content.benefits.items.map((item, i) => (
            <div key={i} className="p-3 border rounded-md bg-card">
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </PreviewSection>
      <PreviewSection title={content.whatIs.title} subtitle={content.whatIs.subtitle}>
        <p className="text-xs text-muted-foreground whitespace-pre-line">{content.whatIs.body}</p>
      </PreviewSection>
      <PreviewSection title={content.timeline.title} subtitle={content.timeline.subtitle} bg="bg-muted/30">
        <PreviewTimeline items={content.timeline.items} />
      </PreviewSection>
      <PreviewSection title={content.faq.title}>
        <PreviewFAQ items={content.faq.items} />
      </PreviewSection>
      <PreviewCTA title={content.contact.title} body={content.contact.body} />
    </>
  );
}

function ContactPreview({ content }: { content: ContactV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection title="Clinic Information" bg="bg-muted/30">
        <div className="space-y-2 text-xs">
          <p className="font-semibold">{content.clinicInfo.name}</p>
          <p className="flex items-center gap-1"><MapPin className="h-3 w-3" />{content.clinicInfo.address}</p>
          <p className="flex items-center gap-1"><Phone className="h-3 w-3" />{content.clinicInfo.phone}</p>
          <p className="flex items-center gap-1"><Mail className="h-3 w-3" />{content.clinicInfo.email}</p>
          <p className="flex items-center gap-1"><Clock className="h-3 w-3" />{content.clinicInfo.hours}</p>
        </div>
      </PreviewSection>
      <PreviewSection title={content.form.title} subtitle={content.form.subtitle}>
        <p className="text-xs text-muted-foreground">{content.form.body}</p>
        <div className="mt-3 space-y-2">
          <div className="h-8 bg-muted rounded" />
          <div className="h-8 bg-muted rounded" />
          <div className="h-16 bg-muted rounded" />
          <Button size="sm" className="w-full text-xs">Submit</Button>
        </div>
      </PreviewSection>
    </>
  );
}

function FAQPreview({ content }: { content: FAQV1Content }) {
  const sections = content.sections ?? [];
  const flatItems = content.flatItems ?? [];
  const hasFlat = flatItems.length > 0;
  const hasSections = sections.length > 0;
  return (
    <>
      <PreviewHero hero={content.hero} />
      {hasFlat && (
        <PreviewSection title="FAQ Items">
          <PreviewFAQ items={flatItems} />
        </PreviewSection>
      )}
      {hasSections && sections.map((section, i) => (
        <PreviewSection key={i} title={section.title} bg={i % 2 === 1 ? 'bg-muted/30' : ''}>
          <PreviewFAQ items={section.items} />
        </PreviewSection>
      ))}
      {!hasFlat && !hasSections && (
        <PreviewSection title="FAQ Items">
          <p className="text-xs text-muted-foreground text-center">No FAQ items configured</p>
        </PreviewSection>
      )}
      <PreviewCTA title={content.cta.title} body={content.cta.body} ctaLabel={content.cta.ctaLabel} />
    </>
  );
}

function ConditionPreview({ content }: { content: ConditionV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection title={content.content.title}>
        {content.content.paragraphs.map((p, i) => (
          <p key={i} className="text-xs text-muted-foreground mb-2">{p}</p>
        ))}
        {content.content.subsections.map((sub, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-sm font-semibold mb-1">{sub.title}</h3>
            {sub.body && <p className="text-xs text-muted-foreground">{sub.body}</p>}
            {sub.bullets && (
              <ul className="mt-1 space-y-1">
                {sub.bullets.map((b, j) => (
                  <li key={j} className="text-xs flex items-center gap-1">
                    <ChevronRight className="h-3 w-3 text-primary" />{b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </PreviewSection>
      <PreviewCTA title="Ready to Start?" ctaLabel={content.cta.label} />
    </>
  );
}

function VitaminInfusionsPreview({ content }: { content: VitaminInfusionsV1Content }) {
  return (
    <>
      <PreviewHero hero={{ headline: content.hero.headline, body: content.hero.body, subtitle: content.hero.badge, ctaLabel: content.hero.ctaLabel }} />
      <PreviewSection title={content.about.title} subtitle={content.about.subtitle}>
        {content.about.paragraphs.map((p, i) => (
          <p key={i} className="text-xs text-muted-foreground mb-2">{p}</p>
        ))}
      </PreviewSection>
      <PreviewSection title={content.infusions.title} bg="bg-muted/30">
        <div className="grid grid-cols-2 gap-3">
          {content.infusions.items.map((item, i) => (
            <PreviewCard key={i} title={item.title} description={item.description} imageUrl={item.imageUrl} />
          ))}
        </div>
      </PreviewSection>
      <PreviewSection title={content.b12.title}>
        {content.b12.paragraphs.map((p, i) => (
          <p key={i} className="text-xs text-muted-foreground mb-2">{p}</p>
        ))}
      </PreviewSection>
      <PreviewSection title={content.nad.title} bg="bg-muted/30">
        {content.nad.paragraphs.map((p, i) => (
          <p key={i} className="text-xs text-muted-foreground mb-2">{p}</p>
        ))}
      </PreviewSection>
      <PreviewCTA title={content.contact.title} body={content.contact.body} />
    </>
  );
}

function OurTeamPreview({ content }: { content: OurTeamV1Content }) {
  return (
    <>
      <PreviewHero hero={content.hero} />
      <PreviewSection title={content.doctor.name} subtitle={content.doctor.subtitle} bg="bg-muted/30">
        {content.doctor.bio.map((p, i) => (
          <p key={i} className="text-xs text-muted-foreground mb-2">{p}</p>
        ))}
        {content.doctor.credentials && content.doctor.credentials.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {content.doctor.credentials.map((c, i) => (
              <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c.label}</span>
            ))}
          </div>
        )}
      </PreviewSection>
      <PreviewCTA title={content.cta.title} body={content.cta.body} ctaLabel={content.cta.ctaLabel} />
    </>
  );
}

// ── Main renderer ─────────────────────────────────────────

const TemplatePreviewRenderer: React.FC<TemplatePreviewRendererProps> = ({ template, content }) => {
  if (!content) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>No content to preview.</p>
      </div>
    );
  }

  switch (template) {
    case 'home_v1':
      return isHomeV1Content(content) ? <HomePreview content={content} /> : null;
    case 'ketamine_v1':
      return isKetamineV1Content(content) ? <KetaminePreview content={content} /> : null;
    case 'spravato_v1':
      return isSpravatoV1Content(content) ? <SpravatoPreview content={content} /> : null;
    case 'contact_v1':
      return isContactV1Content(content) ? <ContactPreview content={content} /> : null;
    case 'faq_v1':
      return isFAQV1Content(content) ? <FAQPreview content={content} /> : null;
    case 'condition_v1':
      return isConditionV1Content(content) ? <ConditionPreview content={content} /> : null;
    case 'vitamin_infusions_v1':
      return isVitaminInfusionsV1Content(content) ? <VitaminInfusionsPreview content={content} /> : null;
    case 'our_team_v1':
      return isOurTeamV1Content(content) ? <OurTeamPreview content={content} /> : null;
    default:
      return (
        <div className="p-8 text-center text-muted-foreground">
          <p>Preview not available for this template type.</p>
        </div>
      );
  }
};

export default TemplatePreviewRenderer;
