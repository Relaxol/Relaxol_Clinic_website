import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Plus, Trash2, RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  TemplateType,
  TemplateContent,
  HomeV1Content,
  KetamineV1Content,
  SpravatoV1Content,
  ContactV1Content,
  FAQV1Content,
} from '@/lib/templates/schemas';
import {
  ConditionV1Content,
  VitaminInfusionsV1Content,
  OurTeamV1Content,
} from '@/lib/templates/newSchemas';
import {
  defaultTreatmentItems,
  defaultConditionItems,
  defaultTestimonialItems,
  defaultTimelineItems,
  defaultFaqItems,
  defaultStatItems,
  defaultBenefitItems,
  defaultServiceItems,
} from '@/lib/templates/defaultItems';

interface TemplateFormEditorProps {
  template: TemplateType;
  content: TemplateContent;
  onChange: (content: TemplateContent) => void;
  disabled?: boolean;
}

// Reusable panel component
function Panel({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="border-border/50">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

// Field components
function TextField({ 
  label, 
  value, 
  onChange, 
  placeholder,
  disabled,
  required 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

function TextAreaField({ 
  label, 
  value, 
  onChange, 
  placeholder,
  disabled,
  rows = 3 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
      />
    </div>
  );
}

// Repeater for items with optional reset to defaults
function ItemRepeater<T extends object>({
  label,
  items,
  onChange,
  renderItem,
  createItem,
  disabled,
  defaultItems,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, updateItem: (updates: Partial<T>) => void) => React.ReactNode;
  createItem: () => T;
  disabled?: boolean;
  defaultItems?: T[];
}) {
  const addItem = () => {
    onChange([...items, createItem()]);
  };

  const updateItem = (index: number, updates: Partial<T>) => {
    const newItems = items.map((item, i) => (i === index ? { ...item, ...updates } : item));
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const resetToDefaults = () => {
    if (defaultItems) {
      onChange(defaultItems);
    }
  };

  const isEmpty = items.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-base font-semibold">{label}</Label>
          {isEmpty && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Empty - defaults will show
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {defaultItems && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="outline" size="sm" disabled={disabled}>
                  <RotateCcw className="h-4 w-4 mr-1" /> Reset to Defaults
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset to Default Content?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will replace all current {label.toLowerCase()} with the default content. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetToDefaults}>
                    Reset to Defaults
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="button" variant="outline" size="sm" onClick={addItem} disabled={disabled}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => {
          // Generate a stable key from item content to avoid React reconciliation issues
          const itemKey = JSON.stringify(item).slice(0, 100) + '-' + index;
          return (
          <Card key={itemKey} className="border-border/30">
            <CardContent className="pt-4 space-y-3">
              {renderItem(item, index, (updates) => updateItem(index, updates))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeItem(index)}
                disabled={disabled}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Remove
              </Button>
            </CardContent>
          </Card>
        );
        })}
      </div>
    </div>
  );
}

// Home Template Editor
function HomeTemplateEditor({ 
  content, 
  onChange, 
  disabled 
}: { 
  content: HomeV1Content; 
  onChange: (content: HomeV1Content) => void;
  disabled?: boolean;
}) {
  const update = <K extends keyof HomeV1Content>(key: K, value: HomeV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField
          label="Subtitle"
          value={content.hero.subtitle || ''}
          onChange={(v) => update('hero', { ...content.hero, subtitle: v })}
          placeholder="FIND HOPE AND RELIEF TODAY"
          disabled={disabled}
        />
        <TextField
          label="Headline"
          value={content.hero.headline}
          onChange={(v) => update('hero', { ...content.hero, headline: v })}
          placeholder="New Jersey's Premier Ketamine & SPRAVATO® Clinic"
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.hero.body || ''}
          onChange={(v) => update('hero', { ...content.hero, body: v })}
          placeholder="Advanced, clinician-led treatments..."
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Label"
            value={content.hero.ctaLabel || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaLabel: v })}
            placeholder="Book Your Free Consultation Today!"
            disabled={disabled}
          />
          <TextField
            label="CTA Link"
            value={content.hero.ctaHref || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaHref: v })}
            placeholder="#contact"
            disabled={disabled}
          />
        </div>
      </Panel>

      <Panel title="About Section">
        <TextField
          label="Title"
          value={content.about.title}
          onChange={(v) => update('about', { ...content.about, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body (HTML)"
          value={content.about.bodyHtml}
          onChange={(v) => update('about', { ...content.about, bodyHtml: v })}
          disabled={disabled}
          rows={5}
        />
        <ImageUploadField
          label="Image"
          value={content.about.imageUrl || ''}
          onChange={(v) => update('about', { ...content.about, imageUrl: v })}
          altText={content.about.imageAlt || ''}
          onAltChange={(v) => update('about', { ...content.about, imageAlt: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Video Section">
        <TextField
          label="Subtitle"
          value={content.video.subtitle || ''}
          onChange={(v) => update('video', { ...content.video, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.video.title}
          onChange={(v) => update('video', { ...content.video, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.video.body || ''}
          onChange={(v) => update('video', { ...content.video, body: v })}
          disabled={disabled}
        />
        <TextField
          label="Embed URL"
          value={content.video.embedUrl}
          onChange={(v) => update('video', { ...content.video, embedUrl: v })}
          placeholder="https://www.youtube.com/embed/..."
          disabled={disabled}
          required
        />
        <TextField
          label="Embed Title (for accessibility)"
          value={content.video.embedTitle || ''}
          onChange={(v) => update('video', { ...content.video, embedTitle: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Treatments Section">
        <TextField
          label="Subtitle"
          value={content.treatments.subtitle || ''}
          onChange={(v) => update('treatments', { ...content.treatments, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.treatments.title}
          onChange={(v) => update('treatments', { ...content.treatments, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Description"
          value={content.treatments.description || ''}
          onChange={(v) => update('treatments', { ...content.treatments, description: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Treatment Items"
          items={content.treatments.items}
          onChange={(items) => update('treatments', { ...content.treatments, items })}
          disabled={disabled}
          defaultItems={defaultTreatmentItems}
          createItem={() => ({ title: '', description: '', tag: '', imageUrl: '', ctaLabel: 'Learn More', href: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextField label="Tag" value={item.tag || ''} onChange={(v) => updateItem({ tag: v })} disabled={disabled} />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
              <ImageUploadField label="Image" value={item.imageUrl || ''} onChange={(v) => updateItem({ imageUrl: v })} disabled={disabled} />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="CTA Label" value={item.ctaLabel || ''} onChange={(v) => updateItem({ ctaLabel: v })} disabled={disabled} />
                <TextField label="Link" value={item.href || ''} onChange={(v) => updateItem({ href: v })} disabled={disabled} />
              </div>
            </>
          )}
        />
      </Panel>

      <Panel title="Doctor Section">
        <TextField
          label="Subtitle"
          value={content.doctor.subtitle || ''}
          onChange={(v) => update('doctor', { ...content.doctor, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Name"
          value={content.doctor.name}
          onChange={(v) => update('doctor', { ...content.doctor, name: v })}
          disabled={disabled}
          required
        />
        <ImageUploadField
          label="Image"
          value={content.doctor.imageUrl || ''}
          onChange={(v) => update('doctor', { ...content.doctor, imageUrl: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Bio Paragraphs"
          items={content.doctor.bio.map(text => ({ text }))}
          onChange={(items) => update('doctor', { ...content.doctor, bio: items.map(i => i.text) })}
          disabled={disabled}
          createItem={() => ({ text: '' })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
        />
      </Panel>

      <Panel title="Conditions Section">
        <TextField
          label="Subtitle"
          value={content.conditions.subtitle || ''}
          onChange={(v) => update('conditions', { ...content.conditions, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.conditions.title}
          onChange={(v) => update('conditions', { ...content.conditions, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="Condition Items"
          items={content.conditions.items}
          onChange={(items) => update('conditions', { ...content.conditions, items })}
          disabled={disabled}
          defaultItems={defaultConditionItems}
          createItem={() => ({ title: '', description: '', imageUrl: '', href: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
              <ImageUploadField label="Image" value={item.imageUrl || ''} onChange={(v) => updateItem({ imageUrl: v })} disabled={disabled} />
              <TextField label="Link" value={item.href || ''} onChange={(v) => updateItem({ href: v })} disabled={disabled} />
            </>
          )}
        />
      </Panel>

      <Panel title="Testimonials Section">
        <TextField
          label="Subtitle"
          value={content.testimonials.subtitle || ''}
          onChange={(v) => update('testimonials', { ...content.testimonials, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.testimonials.title}
          onChange={(v) => update('testimonials', { ...content.testimonials, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="Testimonial Items"
          items={content.testimonials.items}
          onChange={(items) => update('testimonials', { ...content.testimonials, items })}
          disabled={disabled}
          defaultItems={defaultTestimonialItems}
          createItem={() => ({ quote: '', author: '', role: '', rating: 5 })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextAreaField label="Quote" value={item.quote} onChange={(v) => updateItem({ quote: v })} disabled={disabled} />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Author" value={item.author} onChange={(v) => updateItem({ author: v })} disabled={disabled} required />
                <TextField label="Role" value={item.role || ''} onChange={(v) => updateItem({ role: v })} disabled={disabled} />
              </div>
              <TextField
                label="Rating (1-5)"
                value={String(item.rating || 5)}
                onChange={(v) => updateItem({ rating: parseInt(v) || 5 })}
                disabled={disabled}
              />
            </>
          )}
        />
      </Panel>

      <Panel title="Timeline Section">
        <TextField
          label="Subtitle"
          value={content.timeline.subtitle || ''}
          onChange={(v) => update('timeline', { ...content.timeline, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.timeline.title}
          onChange={(v) => update('timeline', { ...content.timeline, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="Timeline Steps"
          items={content.timeline.items}
          onChange={(items) => update('timeline', { ...content.timeline, items })}
          disabled={disabled}
          defaultItems={defaultTimelineItems}
          createItem={() => ({ step: String((content.timeline.items.length || 0) + 1), title: '', description: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Step Number" value={item.step} onChange={(v) => updateItem({ step: v })} disabled={disabled} required />
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
            </>
          )}
        />
      </Panel>

      <Panel title="FAQ Section">
        <TextField
          label="Title"
          value={content.faq.title}
          onChange={(v) => update('faq', { ...content.faq, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="FAQ Items"
          items={content.faq.items}
          onChange={(items) => update('faq', { ...content.faq, items })}
          disabled={disabled}
          defaultItems={defaultFaqItems}
          createItem={() => ({ question: '', answer: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Question" value={item.question} onChange={(v) => updateItem({ question: v })} disabled={disabled} required />
              <TextAreaField label="Answer" value={item.answer} onChange={(v) => updateItem({ answer: v })} disabled={disabled} rows={4} />
            </>
          )}
        />
      </Panel>

      <Panel title="Contact Section">
        <TextField
          label="Subtitle"
          value={content.contact.subtitle || ''}
          onChange={(v) => update('contact', { ...content.contact, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.contact.title}
          onChange={(v) => update('contact', { ...content.contact, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.contact.body || ''}
          onChange={(v) => update('contact', { ...content.contact, body: v })}
          disabled={disabled}
        />
      </Panel>
    </div>
  );
}

// Ketamine Template Editor
function KetamineTemplateEditor({
  content,
  onChange,
  disabled,
}: {
  content: KetamineV1Content;
  onChange: (content: KetamineV1Content) => void;
  disabled?: boolean;
}) {
  const update = <K extends keyof KetamineV1Content>(key: K, value: KetamineV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField
          label="Headline"
          value={content.hero.headline}
          onChange={(v) => update('hero', { ...content.hero, headline: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.hero.body || ''}
          onChange={(v) => update('hero', { ...content.hero, body: v })}
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Label"
            value={content.hero.ctaLabel || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaLabel: v })}
            disabled={disabled}
          />
          <TextField
            label="CTA Link"
            value={content.hero.ctaHref || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaHref: v })}
            disabled={disabled}
          />
        </div>
      </Panel>

      <Panel title="Stats">
        <TextField
          label="Title"
          value={content.stats.title || ''}
          onChange={(v) => update('stats', { ...content.stats, title: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Stat Items"
          items={content.stats.items}
          onChange={(items) => update('stats', { ...content.stats, items })}
          disabled={disabled}
          defaultItems={defaultStatItems}
          createItem={() => ({ value: '', label: '' })}
          renderItem={(item, _, updateItem) => (
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Value" value={item.value} onChange={(v) => updateItem({ value: v })} disabled={disabled} required />
              <TextField label="Label" value={item.label} onChange={(v) => updateItem({ label: v })} disabled={disabled} required />
            </div>
          )}
        />
      </Panel>

      <Panel title="Parallax Banner">
        <TextField
          label="Title"
          value={content.parallax.title}
          onChange={(v) => update('parallax', { ...content.parallax, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.parallax.body}
          onChange={(v) => update('parallax', { ...content.parallax, body: v })}
          disabled={disabled}
        />
        <TextField
          label="CTA Label"
          value={content.parallax.ctaLabel || ''}
          onChange={(v) => update('parallax', { ...content.parallax, ctaLabel: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Services">
        <TextField
          label="Title"
          value={content.services.title}
          onChange={(v) => update('services', { ...content.services, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Description"
          value={content.services.description || ''}
          onChange={(v) => update('services', { ...content.services, description: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Service Items"
          items={content.services.items}
          onChange={(items) => update('services', { ...content.services, items })}
          disabled={disabled}
          defaultItems={defaultServiceItems}
          createItem={() => ({ title: '', description: '', imageUrl: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
              <ImageUploadField label="Image" value={item.imageUrl || ''} onChange={(v) => updateItem({ imageUrl: v })} disabled={disabled} />
            </>
          )}
        />
      </Panel>

      <Panel title="Eligibility Section">
        <TextField
          label="Subtitle"
          value={content.eligibility.subtitle || ''}
          onChange={(v) => update('eligibility', { ...content.eligibility, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.eligibility.title}
          onChange={(v) => update('eligibility', { ...content.eligibility, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.eligibility.body}
          onChange={(v) => update('eligibility', { ...content.eligibility, body: v })}
          disabled={disabled}
        />
        <TextField
          label="Phone"
          value={content.eligibility.phone}
          onChange={(v) => update('eligibility', { ...content.eligibility, phone: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Trust Bullets"
          items={content.eligibility.trustBullets.map(text => ({ text }))}
          onChange={(items) => update('eligibility', { ...content.eligibility, trustBullets: items.map(i => i.text) })}
          disabled={disabled}
          createItem={() => ({ text: '' })}
          renderItem={(item, _, updateItem) => (
            <TextField label="Bullet" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
        />
      </Panel>

      <Panel title="Cross-Sell (SPRAVATO)">
        <TextField
          label="Title"
          value={content.crossSell.title}
          onChange={(v) => update('crossSell', { ...content.crossSell, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.crossSell.body}
          onChange={(v) => update('crossSell', { ...content.crossSell, body: v })}
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Label"
            value={content.crossSell.ctaLabel}
            onChange={(v) => update('crossSell', { ...content.crossSell, ctaLabel: v })}
            disabled={disabled}
          />
          <TextField
            label="CTA Link"
            value={content.crossSell.ctaHref}
            onChange={(v) => update('crossSell', { ...content.crossSell, ctaHref: v })}
            disabled={disabled}
          />
        </div>
        <ImageUploadField
          label="Image"
          value={content.crossSell.imageUrl || ''}
          onChange={(v) => update('crossSell', { ...content.crossSell, imageUrl: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="FAQ Section">
        <TextField
          label="Title"
          value={content.faq.title}
          onChange={(v) => update('faq', { ...content.faq, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="FAQ Items"
          items={content.faq.items}
          onChange={(items) => update('faq', { ...content.faq, items })}
          disabled={disabled}
          defaultItems={defaultFaqItems}
          createItem={() => ({ question: '', answer: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Question" value={item.question} onChange={(v) => updateItem({ question: v })} disabled={disabled} required />
              <TextAreaField label="Answer" value={item.answer} onChange={(v) => updateItem({ answer: v })} disabled={disabled} rows={4} />
            </>
          )}
        />
      </Panel>
    </div>
  );
}

// Contact Template Editor  
function ContactTemplateEditor({
  content,
  onChange,
  disabled,
}: {
  content: ContactV1Content;
  onChange: (content: ContactV1Content) => void;
  disabled?: boolean;
}) {
  const update = <K extends keyof ContactV1Content>(key: K, value: ContactV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField
          label="Subtitle"
          value={content.hero.subtitle || ''}
          onChange={(v) => update('hero', { ...content.hero, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Headline"
          value={content.hero.headline}
          onChange={(v) => update('hero', { ...content.hero, headline: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.hero.body || ''}
          onChange={(v) => update('hero', { ...content.hero, body: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Clinic Information">
        <TextField
          label="Clinic Name"
          value={content.clinicInfo.name}
          onChange={(v) => update('clinicInfo', { ...content.clinicInfo, name: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Address"
          value={content.clinicInfo.address}
          onChange={(v) => update('clinicInfo', { ...content.clinicInfo, address: v })}
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Phone"
            value={content.clinicInfo.phone}
            onChange={(v) => update('clinicInfo', { ...content.clinicInfo, phone: v })}
            disabled={disabled}
          />
          <TextField
            label="Email"
            value={content.clinicInfo.email}
            onChange={(v) => update('clinicInfo', { ...content.clinicInfo, email: v })}
            disabled={disabled}
          />
        </div>
        <TextAreaField
          label="Hours"
          value={content.clinicInfo.hours}
          onChange={(v) => update('clinicInfo', { ...content.clinicInfo, hours: v })}
          disabled={disabled}
        />
        <TextField
          label="Map Embed URL"
          value={content.clinicInfo.mapEmbedUrl || ''}
          onChange={(v) => update('clinicInfo', { ...content.clinicInfo, mapEmbedUrl: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Form Section">
        <TextField
          label="Subtitle"
          value={content.form.subtitle || ''}
          onChange={(v) => update('form', { ...content.form, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.form.title}
          onChange={(v) => update('form', { ...content.form, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.form.body || ''}
          onChange={(v) => update('form', { ...content.form, body: v })}
          disabled={disabled}
        />
      </Panel>
    </div>
  );
}

// FAQ Template Editor
function FAQTemplateEditor({
  content,
  onChange,
  disabled,
}: {
  content: FAQV1Content;
  onChange: (content: FAQV1Content) => void;
  disabled?: boolean;
}) {
  const update = <K extends keyof FAQV1Content>(key: K, value: FAQV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField
          label="Headline"
          value={content.hero.headline}
          onChange={(v) => update('hero', { ...content.hero, headline: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.hero.body || ''}
          onChange={(v) => update('hero', { ...content.hero, body: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="FAQ Sections">
        <ItemRepeater
          label="Sections"
          items={content.sections}
          onChange={(sections) => update('sections', sections)}
          disabled={disabled}
          createItem={() => ({ id: `section-${Date.now()}`, title: '', items: [] })}
          renderItem={(section, _, updateSection) => (
            <>
              <TextField
                label="Section Title"
                value={section.title}
                onChange={(v) => updateSection({ title: v })}
                disabled={disabled}
                required
              />
              <ItemRepeater
                label="Questions"
                items={section.items}
                onChange={(items) => updateSection({ items })}
                disabled={disabled}
                createItem={() => ({ question: '', answer: '' })}
                renderItem={(item, __, updateItem) => (
                  <>
                    <TextField label="Question" value={item.question} onChange={(v) => updateItem({ question: v })} disabled={disabled} required />
                    <TextAreaField label="Answer" value={item.answer} onChange={(v) => updateItem({ answer: v })} disabled={disabled} rows={4} />
                  </>
                )}
              />
            </>
          )}
        />
      </Panel>

      <Panel title="CTA Section">
        <TextField
          label="Title"
          value={content.cta.title}
          onChange={(v) => update('cta', { ...content.cta, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.cta.body || ''}
          onChange={(v) => update('cta', { ...content.cta, body: v })}
          disabled={disabled}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Label"
            value={content.cta.ctaLabel}
            onChange={(v) => update('cta', { ...content.cta, ctaLabel: v })}
            disabled={disabled}
          />
          <TextField
            label="CTA Link"
            value={content.cta.ctaHref}
            onChange={(v) => update('cta', { ...content.cta, ctaHref: v })}
            disabled={disabled}
          />
        </div>
      </Panel>
    </div>
  );
}

// Spravato Template Editor (simplified version - can be expanded)
function SpravatoTemplateEditor({
  content,
  onChange,
  disabled,
}: {
  content: SpravatoV1Content;
  onChange: (content: SpravatoV1Content) => void;
  disabled?: boolean;
}) {
  const update = <K extends keyof SpravatoV1Content>(key: K, value: SpravatoV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField
          label="Subtitle"
          value={content.hero.subtitle || ''}
          onChange={(v) => update('hero', { ...content.hero, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Headline"
          value={content.hero.headline}
          onChange={(v) => update('hero', { ...content.hero, headline: v })}
          disabled={disabled}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="CTA Label"
            value={content.hero.ctaLabel || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaLabel: v })}
            disabled={disabled}
          />
          <TextField
            label="CTA Link"
            value={content.hero.ctaHref || ''}
            onChange={(v) => update('hero', { ...content.hero, ctaHref: v })}
            disabled={disabled}
          />
        </div>
      </Panel>

      <Panel title="Eligibility Form Section">
        <TextField
          label="Title"
          value={content.eligibilityForm.title}
          onChange={(v) => update('eligibilityForm', { ...content.eligibilityForm, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.eligibilityForm.body}
          onChange={(v) => update('eligibilityForm', { ...content.eligibilityForm, body: v })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Trust Bullets"
          items={content.eligibilityForm.trustBullets.map(text => ({ text }))}
          onChange={(items) => update('eligibilityForm', { ...content.eligibilityForm, trustBullets: items.map(i => i.text) })}
          disabled={disabled}
          createItem={() => ({ text: '' })}
          renderItem={(item, _, updateItem) => (
            <TextField label="Bullet" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
        />
      </Panel>

      <Panel title="Treatment-Resistant Depression">
        <TextField
          label="Title"
          value={content.trd.title}
          onChange={(v) => update('trd', { ...content.trd, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.trd.body}
          onChange={(v) => update('trd', { ...content.trd, body: v })}
          disabled={disabled}
          rows={5}
        />
        <ImageUploadField
          label="Image"
          value={content.trd.imageUrl || ''}
          onChange={(v) => update('trd', { ...content.trd, imageUrl: v })}
          altText={content.trd.imageAlt || ''}
          onAltChange={(v) => update('trd', { ...content.trd, imageAlt: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Benefits Section">
        <TextField
          label="Subtitle"
          value={content.benefits.subtitle || ''}
          onChange={(v) => update('benefits', { ...content.benefits, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.benefits.title}
          onChange={(v) => update('benefits', { ...content.benefits, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="Benefit Items"
          items={content.benefits.items}
          onChange={(items) => update('benefits', { ...content.benefits, items })}
          disabled={disabled}
          defaultItems={defaultBenefitItems}
          createItem={() => ({ title: '', description: '', icon: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
              <TextField label="Icon (lucide name)" value={item.icon || ''} onChange={(v) => updateItem({ icon: v })} disabled={disabled} />
            </>
          )}
        />
      </Panel>

      <Panel title="What Is SPRAVATO Section">
        <TextField
          label="Subtitle"
          value={content.whatIs.subtitle || ''}
          onChange={(v) => update('whatIs', { ...content.whatIs, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.whatIs.title}
          onChange={(v) => update('whatIs', { ...content.whatIs, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.whatIs.body}
          onChange={(v) => update('whatIs', { ...content.whatIs, body: v })}
          disabled={disabled}
          rows={5}
        />
        <ImageUploadField
          label="Image"
          value={content.whatIs.imageUrl || ''}
          onChange={(v) => update('whatIs', { ...content.whatIs, imageUrl: v })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Timeline Section">
        <TextField
          label="Subtitle"
          value={content.timeline.subtitle || ''}
          onChange={(v) => update('timeline', { ...content.timeline, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.timeline.title}
          onChange={(v) => update('timeline', { ...content.timeline, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="Timeline Steps"
          items={content.timeline.items}
          onChange={(items) => update('timeline', { ...content.timeline, items })}
          disabled={disabled}
          defaultItems={defaultTimelineItems}
          createItem={() => ({ step: '', title: '', description: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Step" value={item.step} onChange={(v) => updateItem({ step: v })} disabled={disabled} />
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
            </>
          )}
        />
      </Panel>

      <Panel title="FAQ Section">
        <TextField
          label="Title"
          value={content.faq.title}
          onChange={(v) => update('faq', { ...content.faq, title: v })}
          disabled={disabled}
          required
        />
        <ItemRepeater
          label="FAQ Items"
          items={content.faq.items}
          onChange={(items) => update('faq', { ...content.faq, items })}
          disabled={disabled}
          defaultItems={defaultFaqItems}
          createItem={() => ({ question: '', answer: '' })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Question" value={item.question} onChange={(v) => updateItem({ question: v })} disabled={disabled} required />
              <TextAreaField label="Answer" value={item.answer} onChange={(v) => updateItem({ answer: v })} disabled={disabled} rows={4} />
            </>
          )}
        />
      </Panel>

      <Panel title="Contact Section">
        <TextField
          label="Subtitle"
          value={content.contact.subtitle || ''}
          onChange={(v) => update('contact', { ...content.contact, subtitle: v })}
          disabled={disabled}
        />
        <TextField
          label="Title"
          value={content.contact.title}
          onChange={(v) => update('contact', { ...content.contact, title: v })}
          disabled={disabled}
          required
        />
        <TextAreaField
          label="Body"
          value={content.contact.body || ''}
          onChange={(v) => update('contact', { ...content.contact, body: v })}
          disabled={disabled}
        />
      </Panel>
    </div>
  );
}

// Condition Template Editor
function ConditionTemplateEditor({ 
  content, onChange, disabled 
}: { content: ConditionV1Content; onChange: (c: ConditionV1Content) => void; disabled?: boolean }) {
  const update = <K extends keyof ConditionV1Content>(key: K, value: ConditionV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField label="Subtitle" value={content.hero.subtitle || ''} onChange={(v) => update('hero', { ...content.hero, subtitle: v })} disabled={disabled} />
        <TextField label="Headline" value={content.hero.headline} onChange={(v) => update('hero', { ...content.hero, headline: v })} disabled={disabled} required />
        <TextAreaField label="Body" value={content.hero.body} onChange={(v) => update('hero', { ...content.hero, body: v })} disabled={disabled} rows={4} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="CTA Label" value={content.hero.ctaLabel || ''} onChange={(v) => update('hero', { ...content.hero, ctaLabel: v })} disabled={disabled} />
          <TextField label="CTA Link" value={content.hero.ctaHref || ''} onChange={(v) => update('hero', { ...content.hero, ctaHref: v })} disabled={disabled} />
        </div>
        <ImageUploadField label="Hero Image" value={content.hero.imageUrl || ''} onChange={(v) => update('hero', { ...content.hero, imageUrl: v })} altText={content.hero.imageAlt || ''} onAltChange={(v) => update('hero', { ...content.hero, imageAlt: v })} disabled={disabled} />
      </Panel>

      <Panel title="Main Content">
        <TextField label="Section Title" value={content.content.title} onChange={(v) => update('content', { ...content.content, title: v })} disabled={disabled} required />
        <ItemRepeater
          label="Paragraphs"
          items={content.content.paragraphs.map(p => ({ text: p }))}
          onChange={(items) => update('content', { ...content.content, paragraphs: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} rows={3} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Content Subsections">
        <ItemRepeater
          label="Subsections"
          items={content.content.subsections}
          onChange={(items) => update('content', { ...content.content, subsections: items })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextAreaField label="Body Text" value={item.body || ''} onChange={(v) => updateItem({ body: v })} disabled={disabled} rows={3} />
              <ItemRepeater
                label="Bullet Points"
                items={(item.bullets || []).map(b => ({ text: b }))}
                onChange={(bullets) => updateItem({ bullets: bullets.map(b => b.text) })}
                renderItem={(b, _, updateB) => (
                  <TextField label="Bullet" value={b.text} onChange={(v) => updateB({ text: v })} disabled={disabled} />
                )}
                createItem={() => ({ text: '' })}
                disabled={disabled}
              />
            </>
          )}
          createItem={() => ({ title: '', body: '', bullets: [] })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="CTA Button">
        <TextField label="Button Label" value={content.cta.label} onChange={(v) => update('cta', { ...content.cta, label: v })} disabled={disabled} required />
        <TextField label="Button Link" value={content.cta.href} onChange={(v) => update('cta', { ...content.cta, href: v })} disabled={disabled} required />
      </Panel>
    </div>
  );
}

// Vitamin Infusions Template Editor
function VitaminInfusionsTemplateEditor({ 
  content, onChange, disabled 
}: { content: VitaminInfusionsV1Content; onChange: (c: VitaminInfusionsV1Content) => void; disabled?: boolean }) {
  const update = <K extends keyof VitaminInfusionsV1Content>(key: K, value: VitaminInfusionsV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField label="Badge Text" value={content.hero.badge || ''} onChange={(v) => update('hero', { ...content.hero, badge: v })} disabled={disabled} />
        <TextField label="Headline" value={content.hero.headline} onChange={(v) => update('hero', { ...content.hero, headline: v })} disabled={disabled} required />
        <TextAreaField label="Body" value={content.hero.body} onChange={(v) => update('hero', { ...content.hero, body: v })} disabled={disabled} rows={4} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="CTA Label" value={content.hero.ctaLabel || ''} onChange={(v) => update('hero', { ...content.hero, ctaLabel: v })} disabled={disabled} />
          <TextField label="CTA Link" value={content.hero.ctaHref || ''} onChange={(v) => update('hero', { ...content.hero, ctaHref: v })} disabled={disabled} />
        </div>
      </Panel>

      <Panel title="About Section">
        <TextField label="Subtitle" value={content.about.subtitle || ''} onChange={(v) => update('about', { ...content.about, subtitle: v })} disabled={disabled} />
        <TextField label="Title" value={content.about.title} onChange={(v) => update('about', { ...content.about, title: v })} disabled={disabled} required />
        <ItemRepeater
          label="Paragraphs"
          items={content.about.paragraphs.map(p => ({ text: p }))}
          onChange={(items) => update('about', { ...content.about, paragraphs: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} rows={3} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Benefits"
          items={content.about.benefits.map(b => ({ text: b }))}
          onChange={(items) => update('about', { ...content.about, benefits: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextField label="Benefit" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Infusion Types">
        <ItemRepeater
          label="Infusions"
          items={content.infusions.items}
          onChange={(items) => update('infusions', { ...content.infusions, items })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Title" value={item.title} onChange={(v) => updateItem({ title: v })} disabled={disabled} required />
              <TextField label="Short Description" value={item.description} onChange={(v) => updateItem({ description: v })} disabled={disabled} />
              <TextAreaField label="Full Description (Modal)" value={item.fullDescription} onChange={(v) => updateItem({ fullDescription: v })} disabled={disabled} rows={4} />
              <ImageUploadField label="Image" value={item.imageUrl || ''} onChange={(v) => updateItem({ imageUrl: v })} disabled={disabled} />
              <TextField label="Ingredients" value={item.ingredients} onChange={(v) => updateItem({ ingredients: v })} disabled={disabled} />
              <TextField label="Duration" value={item.duration} onChange={(v) => updateItem({ duration: v })} disabled={disabled} />
              <ItemRepeater
                label="Benefits"
                items={item.benefits.map(b => ({ text: b }))}
                onChange={(benefits) => updateItem({ benefits: benefits.map(b => b.text) })}
                renderItem={(b, _, updateB) => (
                  <TextField label="Benefit" value={b.text} onChange={(v) => updateB({ text: v })} disabled={disabled} />
                )}
                createItem={() => ({ text: '' })}
                disabled={disabled}
              />
            </>
          )}
          createItem={() => ({ title: '', description: '', fullDescription: '', imageUrl: '', benefits: [] as string[], ingredients: '', duration: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Vitamin B12 Section">
        <TextField label="Title" value={content.b12.title} onChange={(v) => update('b12', { ...content.b12, title: v })} disabled={disabled} required />
        <ImageUploadField label="Image" value={content.b12.imageUrl || ''} onChange={(v) => update('b12', { ...content.b12, imageUrl: v })} altText={content.b12.imageAlt || ''} onAltChange={(v) => update('b12', { ...content.b12, imageAlt: v })} disabled={disabled} />
        <ItemRepeater
          label="Paragraphs"
          items={content.b12.paragraphs.map(p => ({ text: p }))}
          onChange={(items) => update('b12', { ...content.b12, paragraphs: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} rows={3} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
        <TextAreaField label="Modal Description" value={content.b12.modalDescription} onChange={(v) => update('b12', { ...content.b12, modalDescription: v })} disabled={disabled} rows={4} />
        <ItemRepeater
          label="Modal Benefits"
          items={content.b12.modalBenefits.map(b => ({ text: b }))}
          onChange={(items) => update('b12', { ...content.b12, modalBenefits: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextField label="Benefit" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="NAD+ Section">
        <TextField label="Title" value={content.nad.title} onChange={(v) => update('nad', { ...content.nad, title: v })} disabled={disabled} required />
        <ImageUploadField label="Image" value={content.nad.imageUrl || ''} onChange={(v) => update('nad', { ...content.nad, imageUrl: v })} altText={content.nad.imageAlt || ''} onAltChange={(v) => update('nad', { ...content.nad, imageAlt: v })} disabled={disabled} />
        <ItemRepeater
          label="Paragraphs"
          items={content.nad.paragraphs.map(p => ({ text: p }))}
          onChange={(items) => update('nad', { ...content.nad, paragraphs: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} rows={3} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
        <TextAreaField label="Modal Description" value={content.nad.modalDescription} onChange={(v) => update('nad', { ...content.nad, modalDescription: v })} disabled={disabled} rows={4} />
        <TextAreaField label="Modal Sub-Description" value={content.nad.modalSubDescription || ''} onChange={(v) => update('nad', { ...content.nad, modalSubDescription: v })} disabled={disabled} rows={3} />
        <ItemRepeater
          label="Modal Benefits"
          items={content.nad.modalBenefits.map(b => ({ text: b }))}
          onChange={(items) => update('nad', { ...content.nad, modalBenefits: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextField label="Benefit" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="Contact Section">
        <TextField label="Title" value={content.contact.title} onChange={(v) => update('contact', { ...content.contact, title: v })} disabled={disabled} required />
        <TextAreaField label="Body" value={content.contact.body} onChange={(v) => update('contact', { ...content.contact, body: v })} disabled={disabled} />
        <TextField label="Phone" value={content.contact.phone} onChange={(v) => update('contact', { ...content.contact, phone: v })} disabled={disabled} />
        <TextField label="Email" value={content.contact.email} onChange={(v) => update('contact', { ...content.contact, email: v })} disabled={disabled} />
        <TextAreaField label="Address" value={content.contact.address} onChange={(v) => update('contact', { ...content.contact, address: v })} disabled={disabled} />
      </Panel>
    </div>
  );
}

// Our Team Template Editor
function OurTeamTemplateEditor({ 
  content, onChange, disabled 
}: { content: OurTeamV1Content; onChange: (c: OurTeamV1Content) => void; disabled?: boolean }) {
  const update = <K extends keyof OurTeamV1Content>(key: K, value: OurTeamV1Content[K]) => {
    onChange({ ...content, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Panel title="Hero Section" defaultOpen>
        <TextField label="Subtitle" value={content.hero.subtitle || ''} onChange={(v) => update('hero', { ...content.hero, subtitle: v })} disabled={disabled} />
        <TextField label="Headline" value={content.hero.headline} onChange={(v) => update('hero', { ...content.hero, headline: v })} disabled={disabled} required />
        <TextAreaField label="Body" value={content.hero.body} onChange={(v) => update('hero', { ...content.hero, body: v })} disabled={disabled} />
      </Panel>

      <Panel title="Doctor Section">
        <TextField label="Subtitle" value={content.doctor.subtitle || ''} onChange={(v) => update('doctor', { ...content.doctor, subtitle: v })} disabled={disabled} />
        <TextField label="Name" value={content.doctor.name} onChange={(v) => update('doctor', { ...content.doctor, name: v })} disabled={disabled} required />
        <ImageUploadField label="Image" value={content.doctor.imageUrl || ''} onChange={(v) => update('doctor', { ...content.doctor, imageUrl: v })} altText={content.doctor.imageAlt || ''} onAltChange={(v) => update('doctor', { ...content.doctor, imageAlt: v })} disabled={disabled} />
        <ItemRepeater
          label="Bio Paragraphs"
          items={content.doctor.bio.map(p => ({ text: p }))}
          onChange={(items) => update('doctor', { ...content.doctor, bio: items.map(i => i.text) })}
          renderItem={(item, _, updateItem) => (
            <TextAreaField label="Paragraph" value={item.text} onChange={(v) => updateItem({ text: v })} disabled={disabled} rows={3} />
          )}
          createItem={() => ({ text: '' })}
          disabled={disabled}
        />
        <ItemRepeater
          label="Credentials"
          items={content.doctor.credentials}
          onChange={(items) => update('doctor', { ...content.doctor, credentials: items })}
          renderItem={(item, _, updateItem) => (
            <>
              <TextField label="Icon (e.g. Award, Clock, GraduationCap)" value={item.icon} onChange={(v) => updateItem({ icon: v })} disabled={disabled} />
              <TextField label="Label" value={item.label} onChange={(v) => updateItem({ label: v })} disabled={disabled} />
            </>
          )}
          createItem={() => ({ icon: 'Award', label: '' })}
          disabled={disabled}
        />
      </Panel>

      <Panel title="CTA Section">
        <TextField label="Title" value={content.cta.title} onChange={(v) => update('cta', { ...content.cta, title: v })} disabled={disabled} required />
        <TextAreaField label="Body" value={content.cta.body} onChange={(v) => update('cta', { ...content.cta, body: v })} disabled={disabled} />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="CTA Label" value={content.cta.ctaLabel} onChange={(v) => update('cta', { ...content.cta, ctaLabel: v })} disabled={disabled} required />
          <TextField label="CTA Link" value={content.cta.ctaHref} onChange={(v) => update('cta', { ...content.cta, ctaHref: v })} disabled={disabled} required />
        </div>
      </Panel>
    </div>
  );
}

// Main component
export default function TemplateFormEditor({ template, content, onChange, disabled }: TemplateFormEditorProps) {
  switch (template) {
    case 'home_v1':
      return <HomeTemplateEditor content={content as HomeV1Content} onChange={onChange} disabled={disabled} />;
    case 'ketamine_v1':
      return <KetamineTemplateEditor content={content as KetamineV1Content} onChange={onChange} disabled={disabled} />;
    case 'spravato_v1':
      return <SpravatoTemplateEditor content={content as SpravatoV1Content} onChange={onChange} disabled={disabled} />;
    case 'contact_v1':
      return <ContactTemplateEditor content={content as ContactV1Content} onChange={onChange} disabled={disabled} />;
    case 'faq_v1':
      return <FAQTemplateEditor content={content as FAQV1Content} onChange={onChange} disabled={disabled} />;
    case 'condition_v1':
      return <ConditionTemplateEditor content={content as ConditionV1Content} onChange={onChange} disabled={disabled} />;
    case 'vitamin_infusions_v1':
      return <VitaminInfusionsTemplateEditor content={content as VitaminInfusionsV1Content} onChange={onChange} disabled={disabled} />;
    case 'our_team_v1':
      return <OurTeamTemplateEditor content={content as OurTeamV1Content} onChange={onChange} disabled={disabled} />;
    default:
      return <div className="text-muted-foreground">Unknown template type: {template}</div>;
  }
}
