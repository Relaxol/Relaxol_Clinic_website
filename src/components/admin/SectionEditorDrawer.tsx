import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

interface ValidationError {
  field: string;
  message: string;
}

interface SectionEditorDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: Section | null;
  onUpdate: (sectionId: string, updates: Partial<Section>) => void;
  onDelete?: (sectionId: string) => void;
  canEdit: boolean;
  canDelete: boolean;
  validationErrors?: ValidationError[];
}

const SECTION_TYPE_LABELS: Record<string, string> = {
  text: 'Text Block',
  imageLeft: 'Image Left',
  imageRight: 'Image Right',
  faq: 'FAQ',
  cta: 'Call to Action',
  stats: 'Statistics',
};

export const validateSection = (section: Section): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Image sections require alt text if URL is present
  if ((section.type === 'imageLeft' || section.type === 'imageRight') && section.image_url && !section.image_alt) {
    errors.push({ field: 'image_alt', message: 'Alt text is required for images' });
  }

  // CTA requires label and href
  if (section.type === 'cta') {
    if (!section.cta_label) {
      errors.push({ field: 'cta_label', message: 'CTA button label is required' });
    }
    if (!section.cta_href) {
      errors.push({ field: 'cta_href', message: 'CTA link is required' });
    }
  }

  // FAQ requires at least 1 item with question and answer
  if (section.type === 'faq') {
    if (!section.faq_items || section.faq_items.length === 0) {
      errors.push({ field: 'faq_items', message: 'At least one FAQ item is required' });
    } else {
      section.faq_items.forEach((item, idx) => {
        if (!item.question) {
          errors.push({ field: `faq_items.${idx}.question`, message: `Question ${idx + 1} is required` });
        }
        if (!item.answer) {
          errors.push({ field: `faq_items.${idx}.answer`, message: `Answer ${idx + 1} is required` });
        }
      });
    }
  }

  // Stats requires at least 1 item with label and value
  if (section.type === 'stats') {
    if (!section.stats_items || section.stats_items.length === 0) {
      errors.push({ field: 'stats_items', message: 'At least one stat is required' });
    } else {
      section.stats_items.forEach((item, idx) => {
        if (!item.label) {
          errors.push({ field: `stats_items.${idx}.label`, message: `Stat ${idx + 1} label is required` });
        }
        if (!item.value) {
          errors.push({ field: `stats_items.${idx}.value`, message: `Stat ${idx + 1} value is required` });
        }
      });
    }
  }

  return errors;
};

const SectionEditorDrawer: React.FC<SectionEditorDrawerProps> = ({
  open,
  onOpenChange,
  section,
  onUpdate,
  onDelete,
  canEdit,
  canDelete,
  validationErrors = [],
}) => {
  if (!section) return null;

  const getFieldError = (field: string) => {
    return validationErrors.find(e => e.field === field)?.message;
  };

  const hasFieldError = (field: string) => {
    return validationErrors.some(e => e.field.startsWith(field));
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>
            Edit Section: {SECTION_TYPE_LABELS[section.type]}
            {section.title && ` — ${section.title}`}
          </DrawerTitle>
          <DrawerDescription>
            {canEdit ? 'Make changes to this section. Click Apply when done.' : 'Read-only view'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto max-h-[60vh] space-y-4">
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This section has {validationErrors.length} validation error(s) that must be fixed before publishing.
              </AlertDescription>
            </Alert>
          )}

          {/* Title - common to all sections */}
          <div className="space-y-2">
            <Label>Section Title</Label>
            <Input
              value={section.title}
              onChange={(e) => onUpdate(section.sectionId, { title: e.target.value })}
              placeholder="Section title (optional)"
              disabled={!canEdit}
            />
          </div>

          {/* Body - for text, imageLeft, imageRight, cta */}
          {['text', 'imageLeft', 'imageRight', 'cta'].includes(section.type) && (
            <div className="space-y-2">
              <Label>Body Content</Label>
              <Textarea
                value={section.body}
                onChange={(e) => onUpdate(section.sectionId, { body: e.target.value })}
                placeholder="Section content..."
                rows={6}
                disabled={!canEdit}
              />
            </div>
          )}

          {/* Image fields */}
          {(section.type === 'imageLeft' || section.type === 'imageRight') && (
            <>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={section.image_url || ''}
                  onChange={(e) => onUpdate(section.sectionId, { image_url: e.target.value })}
                  placeholder="https://..."
                  disabled={!canEdit}
                />
              </div>
              <div className="space-y-2">
                <Label className={hasFieldError('image_alt') ? 'text-destructive' : ''}>
                  Image Alt Text *
                </Label>
                <Input
                  value={section.image_alt || ''}
                  onChange={(e) => onUpdate(section.sectionId, { image_alt: e.target.value })}
                  placeholder="Describe the image for accessibility"
                  disabled={!canEdit}
                  className={hasFieldError('image_alt') ? 'border-destructive' : ''}
                />
                {getFieldError('image_alt') && (
                  <p className="text-sm text-destructive">{getFieldError('image_alt')}</p>
                )}
              </div>
            </>
          )}

          {/* CTA fields */}
          {section.type === 'cta' && (
            <>
              <div className="space-y-2">
                <Label className={hasFieldError('cta_label') ? 'text-destructive' : ''}>
                  Button Label *
                </Label>
                <Input
                  value={section.cta_label || ''}
                  onChange={(e) => onUpdate(section.sectionId, { cta_label: e.target.value })}
                  placeholder="Learn More"
                  disabled={!canEdit}
                  className={hasFieldError('cta_label') ? 'border-destructive' : ''}
                />
                {getFieldError('cta_label') && (
                  <p className="text-sm text-destructive">{getFieldError('cta_label')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className={hasFieldError('cta_href') ? 'text-destructive' : ''}>
                  Button Link *
                </Label>
                <Input
                  value={section.cta_href || ''}
                  onChange={(e) => onUpdate(section.sectionId, { cta_href: e.target.value })}
                  placeholder="/contact"
                  disabled={!canEdit}
                  className={hasFieldError('cta_href') ? 'border-destructive' : ''}
                />
                {getFieldError('cta_href') && (
                  <p className="text-sm text-destructive">{getFieldError('cta_href')}</p>
                )}
              </div>
            </>
          )}

          {/* FAQ items */}
          {section.type === 'faq' && (
            <div className="space-y-4">
              <Label className={hasFieldError('faq_items') ? 'text-destructive' : ''}>
                FAQ Items *
              </Label>
              {getFieldError('faq_items') && (
                <p className="text-sm text-destructive">{getFieldError('faq_items')}</p>
              )}
              {section.faq_items?.map((item, idx) => (
                <div key={idx} className="space-y-2 p-3 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Item {idx + 1}</span>
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newItems = section.faq_items?.filter((_, i) => i !== idx);
                          onUpdate(section.sectionId, { faq_items: newItems });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={item.question}
                    onChange={(e) => {
                      const newItems = [...(section.faq_items || [])];
                      newItems[idx] = { ...newItems[idx], question: e.target.value };
                      onUpdate(section.sectionId, { faq_items: newItems });
                    }}
                    placeholder="Question"
                    disabled={!canEdit}
                    className={hasFieldError(`faq_items.${idx}.question`) ? 'border-destructive' : ''}
                  />
                  <Textarea
                    value={item.answer}
                    onChange={(e) => {
                      const newItems = [...(section.faq_items || [])];
                      newItems[idx] = { ...newItems[idx], answer: e.target.value };
                      onUpdate(section.sectionId, { faq_items: newItems });
                    }}
                    placeholder="Answer"
                    rows={3}
                    disabled={!canEdit}
                    className={hasFieldError(`faq_items.${idx}.answer`) ? 'border-destructive' : ''}
                  />
                </div>
              ))}
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onUpdate(section.sectionId, {
                      faq_items: [...(section.faq_items || []), { question: '', answer: '' }]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add FAQ Item
                </Button>
              )}
            </div>
          )}

          {/* Stats items */}
          {section.type === 'stats' && (
            <div className="space-y-4">
              <Label className={hasFieldError('stats_items') ? 'text-destructive' : ''}>
                Statistics *
              </Label>
              {getFieldError('stats_items') && (
                <p className="text-sm text-destructive">{getFieldError('stats_items')}</p>
              )}
              {section.stats_items?.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center p-2 border rounded-lg bg-muted/30">
                  <Input
                    value={item.value}
                    onChange={(e) => {
                      const newItems = [...(section.stats_items || [])];
                      newItems[idx] = { ...newItems[idx], value: e.target.value };
                      onUpdate(section.sectionId, { stats_items: newItems });
                    }}
                    placeholder="100+"
                    className={`w-24 ${hasFieldError(`stats_items.${idx}.value`) ? 'border-destructive' : ''}`}
                    disabled={!canEdit}
                  />
                  <Input
                    value={item.label}
                    onChange={(e) => {
                      const newItems = [...(section.stats_items || [])];
                      newItems[idx] = { ...newItems[idx], label: e.target.value };
                      onUpdate(section.sectionId, { stats_items: newItems });
                    }}
                    placeholder="Happy Customers"
                    disabled={!canEdit}
                    className={hasFieldError(`stats_items.${idx}.label`) ? 'border-destructive' : ''}
                  />
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = section.stats_items?.filter((_, i) => i !== idx);
                        onUpdate(section.sectionId, { stats_items: newItems });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onUpdate(section.sectionId, {
                      stats_items: [...(section.stats_items || []), { label: '', value: '' }]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Stat
                </Button>
              )}
            </div>
          )}
        </div>

        <DrawerFooter className="flex-row justify-between">
          <div>
            {canDelete && onDelete && (
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this section?')) {
                    onDelete(section.sectionId);
                    onOpenChange(false);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Section
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
            {canEdit && (
              <DrawerClose asChild>
                <Button>Apply</Button>
              </DrawerClose>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SectionEditorDrawer;
