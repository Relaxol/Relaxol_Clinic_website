import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Send, Eye, ArrowLeft, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Copy, Link, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PagePreview from '@/components/admin/PagePreview';
import SectionEditorDrawer, { validateSection } from '@/components/admin/SectionEditorDrawer';
import TemplateFormEditor from '@/components/admin/TemplateFormEditor';
import { v4 as uuidv4 } from 'uuid';
import { 
  TemplateType, 
  TemplateContent, 
  TEMPLATE_TYPES, 
  TEMPLATE_LABELS,
  createDefaultContent 
} from '@/lib/templates/schemas';

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

interface PageForm {
  title: string;
  slug: string;
  type: string;
  template: TemplateType | null;
  content_json: TemplateContent | null;
  hero_headline: string;
  hero_subheadline: string;
  sections_json: Section[];
  status: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  noindex: boolean;
  og_title: string;
  og_description: string;
  og_image_url: string;
}

interface ValidationError {
  sectionId: string;
  field: string;
  message: string;
}

const SECTION_TYPES = [
  { value: 'text', label: 'Text Block' },
  { value: 'imageLeft', label: 'Image Left' },
  { value: 'imageRight', label: 'Image Right' },
  { value: 'faq', label: 'FAQ' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'stats', label: 'Statistics' },
];

const PageEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { membership, user } = useAuth();
  const { toast } = useToast();
  const isNew = id === 'new';

  const isEmptyJsonObject = (value: unknown) => {
    if (!value || typeof value !== 'object') return true;
    if (Array.isArray(value)) return value.length === 0;
    return Object.keys(value as Record<string, unknown>).length === 0;
  };

  const getCoreTemplateForSlug = (slug: string): TemplateType | null => {
    const map: Record<string, TemplateType> = {
      home: 'home_v1',
      ketamine: 'ketamine_v1',
      'spravato-Englewood': 'spravato_v1',
      contact: 'contact_v1',
      faq: 'faq_v1',
      'conditions-depression': 'condition_v1',
      'conditions-anxiety': 'condition_v1',
      'conditions-ptsd': 'condition_v1',
      'conditions-ocd': 'condition_v1',
      'conditions-pain-management': 'condition_v1',
      'vitamin-infusions': 'vitamin_infusions_v1',
      'our-team': 'our_team_v1',
    };
    return map[slug] ?? null;
  };

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('content');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [previewModeEnabled, setPreviewModeEnabled] = useState(true);
  
  // Store original content for comparison (to detect item removal)
  const [originalContentJson, setOriginalContentJson] = useState<TemplateContent | null>(null);
  
  const [form, setForm] = useState<PageForm>({
    title: '',
    slug: '',
    type: 'page',
    template: null,
    content_json: null,
    hero_headline: '',
    hero_subheadline: '',
    sections_json: [],
    status: 'draft',
    published_at: '',
    seo_title: '',
    seo_description: '',
    canonical_url: '',
    noindex: false,
    og_title: '',
    og_description: '',
    og_image_url: ''
  });

  // Check if this is a template-based page
  const isTemplatePage = form.template !== null && TEMPLATE_TYPES.includes(form.template);

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';
  const showAdvancedSeo = membership?.planFeatures.advanced_seo && isAdmin;
  const canCreateTreatment = membership?.planFeatures.treatment_pages;

  // Handle deep-linking from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    const sectionId = searchParams.get('sectionId');
    
    if (tab === 'sections' && !isTemplatePage) {
      setActiveTab('sections');
    }
    
    if (sectionId && !loading && !isTemplatePage) {
      // Find the section and open it
      const section = form.sections_json.find(s => s.sectionId === sectionId);
      if (section) {
        setActiveTab('sections');
        setExpandedSections(prev => new Set([...prev, sectionId]));
        setEditingSection(section);
        setDrawerOpen(true);
        setHighlightedSection(sectionId);
        setTimeout(() => setHighlightedSection(null), 3000);
      } else if (sectionId === 'hero') {
        setActiveTab('hero');
        setHighlightedSection('hero');
        setTimeout(() => setHighlightedSection(null), 3000);
      }
    }
  }, [searchParams, loading, form.sections_json, isTemplatePage]);

  useEffect(() => {
    if (membership?.tenantId && !isNew) {
      fetchPage();
    }
  }, [membership?.tenantId, id]);

  const fetchPage = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Cast to handle new columns
      const rawData = data as unknown as Record<string, unknown>;

      let sections = Array.isArray(rawData.sections_json) ? rawData.sections_json as unknown as Section[] : [];
      
      // Ensure all sections have sectionId
      let needsUpdate = false;
      sections = sections.map(section => {
        if (!section.sectionId) {
          needsUpdate = true;
          return { ...section, sectionId: uuidv4() };
        }
        return section;
      });

      const rawContentJson = rawData.content_json as unknown;
      const template = (rawData.template as TemplateType) || null;
      
      // Auto-initialize content_json with defaults if template is set but content is empty
      let normalizedContentJson: TemplateContent | null;
      if (isEmptyJsonObject(rawContentJson)) {
        if (template && TEMPLATE_TYPES.includes(template)) {
          normalizedContentJson = createDefaultContent(template);
        } else {
          normalizedContentJson = null;
        }
      } else {
        normalizedContentJson = rawContentJson as unknown as TemplateContent;
      }

      setForm({
        title: (rawData.title as string) || '',
        slug: (rawData.slug as string) || '',
        type: (rawData.type as string) || 'page',
        template: template,
        content_json: normalizedContentJson,
        hero_headline: (rawData.hero_headline as string) || '',
        hero_subheadline: (rawData.hero_subheadline as string) || '',
        sections_json: sections as Section[],
        status: (rawData.status as string) || 'draft',
        published_at: (rawData.published_at as string) || '',
        seo_title: (rawData.seo_title as string) || '',
        seo_description: (rawData.seo_description as string) || '',
        canonical_url: (rawData.canonical_url as string) || '',
        noindex: (rawData.noindex as boolean) || false,
        og_title: (rawData.og_title as string) || '',
        og_description: (rawData.og_description as string) || '',
        og_image_url: (rawData.og_image_url as string) || ''
      });

      // Store original content for comparison (detect item removal)
      setOriginalContentJson(normalizedContentJson);

      // Auto-save if we generated missing sectionIds
      if (needsUpdate && canEdit) {
        await supabase
          .from('pages')
          .update({ sections_json: sections as unknown as any })
          .eq('id', id);
      }
    } catch (error) {
      console.error('Error fetching page:', error);
      toast({
        title: 'Error',
        description: 'Failed to load page',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: isNew ? generateSlug(title) : prev.slug
    }));
  };

  const handleTemplateContentChange = (newContent: TemplateContent) => {
    setForm(prev => ({
      ...prev,
      content_json: newContent
    }));
  };

  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      sectionId: uuidv4(),
      type,
      title: '',
      body: '',
      ...(type === 'faq' && { faq_items: [{ question: '', answer: '' }] }),
      ...(type === 'stats' && { stats_items: [{ label: '', value: '' }] }),
      ...(type === 'cta' && { cta_label: '', cta_href: '' }),
      ...((type === 'imageLeft' || type === 'imageRight') && { image_url: '', image_alt: '' }),
    };
    
    setForm(prev => ({
      ...prev,
      sections_json: [...prev.sections_json, newSection]
    }));
    
    setExpandedSections(prev => new Set([...prev, newSection.sectionId]));
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setForm(prev => ({
      ...prev,
      sections_json: prev.sections_json.map(section =>
        section.sectionId === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  const deleteSection = (sectionId: string) => {
    setForm(prev => ({
      ...prev,
      sections_json: prev.sections_json.filter(section => section.sectionId !== sectionId)
    }));
  };

  const duplicateSection = (sectionId: string) => {
    const section = form.sections_json.find(s => s.sectionId === sectionId);
    if (!section) return;

    const newSection = { ...section, sectionId: uuidv4() };
    const index = form.sections_json.findIndex(s => s.sectionId === sectionId);
    
    setForm(prev => ({
      ...prev,
      sections_json: [
        ...prev.sections_json.slice(0, index + 1),
        newSection,
        ...prev.sections_json.slice(index + 1)
      ]
    }));
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = form.sections_json.findIndex(s => s.sectionId === sectionId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === form.sections_json.length - 1) return;

    const newSections = [...form.sections_json];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    setForm(prev => ({ ...prev, sections_json: newSections }));
  };

  const copySectionLink = (sectionId: string) => {
    const link = `${window.location.origin}/admin/pages/${id}?tab=sections&sectionId=${sectionId}`;
    navigator.clipboard.writeText(link);
    toast({ title: 'Section edit link copied!' });
  };

  const validateAllSections = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    form.sections_json.forEach(section => {
      const sectionErrors = validateSection(section);
      sectionErrors.forEach(err => {
        errors.push({ sectionId: section.sectionId, ...err });
      });
    });
    return errors;
  };

  // Validate template content for empty items arrays
  const validateTemplateContent = (): { sectionName: string; warning: string }[] => {
    const warnings: { sectionName: string; warning: string }[] = [];
    
    if (!form.content_json || !isTemplatePage) return warnings;
    
    const content = form.content_json as unknown as Record<string, unknown>;
    
    // Check common section patterns that have items arrays
    const sectionsToCheck = [
      { key: 'treatments', label: 'Treatments' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'testimonials', label: 'Testimonials' },
      { key: 'timeline', label: 'Timeline' },
      { key: 'faq', label: 'FAQ' },
      { key: 'features', label: 'Features' },
      { key: 'benefits', label: 'Benefits' },
      { key: 'stats', label: 'Statistics' },
    ];
    
    sectionsToCheck.forEach(({ key, label }) => {
      const section = content[key] as Record<string, unknown> | undefined;
      if (section && 'items' in section) {
        const items = section.items as unknown[];
        if (Array.isArray(items) && items.length === 0) {
          warnings.push({
            sectionName: label,
            warning: `${label} section has no items. Default content will be shown on the website.`
          });
        }
      }
    });
    
    return warnings;
  };

  const [emptyItemsWarnings, setEmptyItemsWarnings] = useState<{ sectionName: string; warning: string }[]>([]);
  const [removedItemsWarnings, setRemovedItemsWarnings] = useState<{ sectionName: string; originalCount: number; newCount: number }[]>([]);

  const [showEmptyItemsDialog, setShowEmptyItemsDialog] = useState(false);
  const [showRemovedItemsDialog, setShowRemovedItemsDialog] = useState(false);
  const [pendingSaveStatus, setPendingSaveStatus] = useState<string | undefined>(undefined);

  // Detect sections where items were removed
  const detectRemovedItems = (): { sectionName: string; originalCount: number; newCount: number }[] => {
    const warnings: { sectionName: string; originalCount: number; newCount: number }[] = [];
    
    if (!form.content_json || !originalContentJson || !isTemplatePage) return warnings;
    
    const currentContent = form.content_json as unknown as Record<string, unknown>;
    const originalContent = originalContentJson as unknown as Record<string, unknown>;
    
    const sectionsToCheck = [
      { key: 'treatments', label: 'Treatments' },
      { key: 'conditions', label: 'Conditions' },
      { key: 'testimonials', label: 'Testimonials' },
      { key: 'timeline', label: 'Timeline' },
      { key: 'faq', label: 'FAQ' },
    ];
    
    sectionsToCheck.forEach(({ key, label }) => {
      const currentSection = currentContent[key] as Record<string, unknown> | undefined;
      const originalSection = originalContent[key] as Record<string, unknown> | undefined;
      
      if (currentSection && originalSection && 'items' in currentSection && 'items' in originalSection) {
        const currentItems = currentSection.items as unknown[];
        const originalItems = originalSection.items as unknown[];
        
        if (Array.isArray(currentItems) && Array.isArray(originalItems)) {
          if (currentItems.length < originalItems.length) {
            warnings.push({
              sectionName: label,
              originalCount: originalItems.length,
              newCount: currentItems.length
            });
          }
        }
      }
    });
    
    return warnings;
  };

  // Save content history before updating
  const saveContentHistory = async (pageId: string, contentJson: TemplateContent | null) => {
    if (!contentJson) return;
    
    try {
      await supabase
        .from('page_content_history')
        .insert({
          page_id: pageId,
          content_json: contentJson as unknown as any,
          saved_by: user?.id,
          version_note: 'Auto-backup before save'
        });
    } catch (error) {
      console.error('Failed to save content history:', error);
      // Don't block the save operation
    }
  };

  const handleSave = async (newStatus?: string, bypassWarnings = false, bypassRemovedWarnings = false) => {
    if (!canEdit) return;
    
    if (!form.title || !form.slug) {
      toast({
        title: 'Validation Error',
        description: 'Title and slug are required',
        variant: 'destructive'
      });
      return;
    }

    // Check for removed items warnings on template pages (before empty check)
    if (isTemplatePage && !bypassRemovedWarnings) {
      const removedWarnings = detectRemovedItems();
      if (removedWarnings.length > 0) {
        setRemovedItemsWarnings(removedWarnings);
        setPendingSaveStatus(newStatus);
        setShowRemovedItemsDialog(true);
        return;
      }
    }

    // Check for empty items warnings on template pages
    if (isTemplatePage && !bypassWarnings) {
      const warnings = validateTemplateContent();
      if (warnings.length > 0) {
        setEmptyItemsWarnings(warnings);
        setPendingSaveStatus(newStatus);
        setShowEmptyItemsDialog(true);
        return;
      }
    }

    // Validate before publish (only for non-template pages)
    if (newStatus === 'published' && !isTemplatePage) {
      const errors = validateAllSections();
      if (errors.length > 0) {
        setValidationErrors(errors);
        toast({
          title: 'Cannot Publish',
          description: `Fix ${errors.length} validation error(s) before publishing`,
          variant: 'destructive'
        });
        return;
      }
    }

    setValidationErrors([]);
    setEmptyItemsWarnings([]);
    setRemovedItemsWarnings([]);
    setSaving(true);

    try {
      // Save content history before updating (for existing pages with template content)
      if (!isNew && isTemplatePage && originalContentJson) {
        await saveContentHistory(id as string, originalContentJson);
      }

      const pageData = {
        tenant_id: membership!.tenantId,
        title: form.title,
        slug: form.slug,
        type: form.type,
        template: form.template,
        content_json: form.content_json as unknown as any,
        hero_headline: form.hero_headline || null,
        hero_subheadline: form.hero_subheadline || null,
        sections_json: form.sections_json as unknown as any,
        status: newStatus || form.status,
        published_at: newStatus === 'published' ? new Date().toISOString() : form.published_at || null,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        canonical_url: form.canonical_url || null,
        noindex: form.noindex,
        og_title: form.og_title || null,
        og_description: form.og_description || null,
        og_image_url: form.og_image_url || null,
        created_by: user?.id
      };

      if (isNew) {
        const { data, error } = await supabase
          .from('pages')
          .insert(pageData)
          .select('id')
          .single();

        if (error) throw error;

        toast({ title: 'Page created successfully' });
        navigate(`/admin/pages/${data.id}`);
      } else {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', id);

        if (error) throw error;

        toast({ title: 'Page saved successfully' });
        // Update original content reference after successful save
        setOriginalContentJson(form.content_json);
        if (newStatus) {
          setForm(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error: unknown) {
      console.error('Error saving page:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save page';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSectionEdit = (sectionId: string) => {
    if (sectionId === 'hero') {
      setActiveTab('content');
      setHighlightedSection('hero');
      setTimeout(() => setHighlightedSection(null), 3000);
      return;
    }

    const section = form.sections_json.find(s => s.sectionId === sectionId);
    if (section) {
      setActiveTab('sections');
      setExpandedSections(prev => new Set([...prev, sectionId]));
      setEditingSection(section);
      setDrawerOpen(true);
      setHighlightedSection(sectionId);
      
      // Update URL for deep-linking
      setSearchParams({ tab: 'sections', sectionId });
      
      setTimeout(() => setHighlightedSection(null), 3000);
    }
  };

  const openSectionDrawer = (section: Section) => {
    setEditingSection(section);
    setDrawerOpen(true);
    setSearchParams({ tab: 'sections', sectionId: section.sectionId });
  };

  const getSectionErrors = (sectionId: string) => {
    return validationErrors
      .filter(e => e.sectionId === sectionId)
      .map(e => ({ field: e.field, message: e.message }));
  };

  const renderSectionEditor = (section: Section, index: number) => {
    const isExpanded = expandedSections.has(section.sectionId);
    const isHighlighted = highlightedSection === section.sectionId;
    const sectionErrors = getSectionErrors(section.sectionId);
    const hasErrors = sectionErrors.length > 0;

    return (
      <Collapsible
        key={section.sectionId}
        open={isExpanded}
        onOpenChange={(open) => {
          setExpandedSections(prev => {
            const next = new Set(prev);
            if (open) next.add(section.sectionId);
            else next.delete(section.sectionId);
            return next;
          });
        }}
      >
        <div 
          id={`section-${section.sectionId}`}
          className={`border rounded-lg ${isHighlighted ? 'ring-2 ring-primary animate-pulse' : ''} ${hasErrors ? 'border-destructive' : ''}`}
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{section.title || `${SECTION_TYPES.find(t => t.value === section.type)?.label} ${index + 1}`}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {section.type}
                </span>
                {hasErrors && (
                  <span className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {sectionErrors.length} error(s)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); openSectionDrawer(section); }}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveSection(section.sectionId, 'up'); }}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveSection(section.sectionId, 'down'); }}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); duplicateSection(section.sectionId); }}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copySectionLink(section.sectionId); }} title="Copy edit link">
                  <Link className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteSection(section.sectionId); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input
                value={section.title}
                onChange={(e) => updateSection(section.sectionId, { title: e.target.value })}
                placeholder="Section title"
                disabled={!canEdit}
              />
            </div>

            <div className="space-y-2">
              <Label>Body Content</Label>
              <Textarea
                value={section.body}
                onChange={(e) => updateSection(section.sectionId, { body: e.target.value })}
                placeholder="Section content..."
                rows={4}
                disabled={!canEdit}
              />
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pages')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
              {isTemplatePage && (
                <span className="text-sm text-muted-foreground">
                  Template: {TEMPLATE_LABELS[form.template!]}
                </span>
              )}
            </div>
            {/* Status Badge */}
            {!isNew && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                form.status === 'published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : form.status === 'scheduled'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  : form.status === 'archived'
                  ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {form.status === 'published' ? 'Published' : form.status === 'scheduled' ? 'Scheduled' : form.status === 'archived' ? 'Archived' : 'Draft'}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Preview as visitor button */}
          {!isNew && form.slug && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Map slug to the correct public route
                const slugToRoute: Record<string, string> = {
                  'home': '/',
                  'ketamine': '/ketamine',
                  'spravato-Englewood': '/spravato-Englewood',
                  'contact': '/contact',
                  'faq': '/faq',
                  'our-team': '/our-team',
                  'vitamin-infusion-englewood': '/vitamin-infusion-englewood',
                };
                const route = slugToRoute[form.slug] || `/p/${form.slug}`;
                window.open(route, '_blank');
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          )}

          {canEdit && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSave()} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save
              </Button>
              {form.status === 'published' ? (
                <Button variant="secondary" onClick={() => handleSave('draft')} disabled={saving}>
                  Unpublish
                </Button>
              ) : (
                <Button onClick={() => handleSave('published')} disabled={saving}>
                  <Send className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Split pane editor */}
      <div className="grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
        {/* Editor pane */}
        <div className="space-y-4 overflow-auto max-h-[calc(100vh-200px)]">
          {isTemplatePage ? (
            // Template-based editing
            <div className="space-y-4">

              {/* Basic info */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Page Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Page Title *</Label>
                    <Input
                      id="title"
                      value={form.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Page title"
                      disabled={!canEdit}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="page-url-slug"
                      disabled={!canEdit || (form.status === 'published' && !isAdmin)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Template content editor */}
              {form.template && form.content_json && (
                <TemplateFormEditor
                  template={form.template}
                  content={form.content_json}
                  onChange={handleTemplateContentChange}
                  disabled={!canEdit}
                />
              )}

              {/* Initialize content if empty */}
              {form.template && !form.content_json && canEdit && (
                <Card>
                  <CardContent className="py-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      This page has no content yet. Initialize it with default content?
                    </p>
                    <Button
                      onClick={() => {
                        const defaultContent = createDefaultContent(form.template!);
                        setForm(prev => ({ ...prev, content_json: defaultContent }));
                      }}
                    >
                      Initialize Content
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            // Generic section-based editing
            <div className="space-y-4">
              {(() => {
                const coreTemplate = getCoreTemplateForSlug(form.slug);
                if (!coreTemplate || form.template) return null;

                return (
                  <Alert>
                    <AlertDescription>
                      This is a core page (/{form.slug}). The public site reads from Template Content.
                      The fields in this editor are legacy and won’t appear on the live site.
                      <div className="mt-3">
                        <Button
                          onClick={() => {
                            const defaultContent = createDefaultContent(coreTemplate);
                            setForm(prev => ({
                              ...prev,
                              template: coreTemplate,
                              content_json: prev.content_json && !isEmptyJsonObject(prev.content_json) ? prev.content_json : defaultContent,
                            }));
                          }}
                        >
                          Switch to Template Editor
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                );
              })()}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="sections">Sections</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Page title"
                    disabled={!canEdit}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="page-url-slug"
                    disabled={!canEdit || (form.status === 'published' && !isAdmin)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Page Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value) => setForm(prev => ({ ...prev, type: value }))}
                    disabled={!canEdit || (!canCreateTreatment && form.type !== 'treatment')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="treatment" disabled={!canCreateTreatment}>
                        Treatment {!canCreateTreatment && '(Upgrade required)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_headline">Hero Headline</Label>
                  <Input
                    id="hero_headline"
                    value={form.hero_headline}
                    onChange={(e) => setForm(prev => ({ ...prev, hero_headline: e.target.value }))}
                    placeholder="Main headline"
                    disabled={!canEdit}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero_subheadline">Hero Subheadline</Label>
                  <Textarea
                    id="hero_subheadline"
                    value={form.hero_subheadline}
                    onChange={(e) => setForm(prev => ({ ...prev, hero_subheadline: e.target.value }))}
                    placeholder="Supporting text"
                    rows={3}
                    disabled={!canEdit}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}
                    disabled={!canEdit}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4 mt-4">
                <div className="flex justify-between items-center">
                  <Label>Page Sections</Label>
                  <Select onValueChange={(value) => addSection(value as Section['type'])}>
                    <SelectTrigger className="w-40">
                      <Plus className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Add section" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {form.sections_json.length === 0 ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                    <p>No sections yet. Add a section to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {form.sections_json.map((section, index) => renderSectionEditor(section, index))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="seo" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={form.seo_title}
                    onChange={(e) => setForm(prev => ({ ...prev, seo_title: e.target.value }))}
                    placeholder="SEO-optimized title (max 60 chars)"
                    maxLength={60}
                    disabled={!canEdit}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={form.seo_description}
                    onChange={(e) => setForm(prev => ({ ...prev, seo_description: e.target.value }))}
                    placeholder="Meta description (max 160 chars)"
                    maxLength={160}
                    rows={3}
                    disabled={!canEdit}
                  />
                </div>

                {showAdvancedSeo && (
                  <div className="pt-4 border-t space-y-4">
                    <h3 className="font-medium">Advanced SEO</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="canonical_url">Canonical URL</Label>
                      <Input
                        id="canonical_url"
                        value={form.canonical_url}
                        onChange={(e) => setForm(prev => ({ ...prev, canonical_url: e.target.value }))}
                        placeholder="https://..."
                        disabled={!canEdit}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="noindex"
                        checked={form.noindex}
                        onCheckedChange={(checked) => setForm(prev => ({ ...prev, noindex: checked }))}
                        disabled={!canEdit}
                      />
                      <Label htmlFor="noindex">No Index</Label>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og_title">OG Title</Label>
                      <Input
                        id="og_title"
                        value={form.og_title}
                        onChange={(e) => setForm(prev => ({ ...prev, og_title: e.target.value }))}
                        disabled={!canEdit}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og_description">OG Description</Label>
                      <Textarea
                        id="og_description"
                        value={form.og_description}
                        onChange={(e) => setForm(prev => ({ ...prev, og_description: e.target.value }))}
                        rows={2}
                        disabled={!canEdit}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og_image_url">OG Image URL</Label>
                      <Input
                        id="og_image_url"
                        value={form.og_image_url}
                        onChange={(e) => setForm(prev => ({ ...prev, og_image_url: e.target.value }))}
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            </div>
          )}
        </div>

        {/* Preview pane */}
        <Card className="h-full overflow-hidden">
          <CardHeader className="py-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Preview
              </CardTitle>
              {canEdit && !isTemplatePage && (
                <div className="flex items-center gap-2">
                  <Label htmlFor="preview-mode" className="text-xs text-muted-foreground">
                    Edit Overlays
                  </Label>
                  <Switch
                    id="preview-mode"
                    checked={previewModeEnabled}
                    onCheckedChange={setPreviewModeEnabled}
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-53px)] overflow-auto">
            {isTemplatePage ? (
              <div className="p-4 text-center text-muted-foreground">
                <p>Preview not available for template pages.</p>
                <p className="text-sm mt-2">
                  View the live page at: <a href={`/${form.slug}`} target="_blank" className="text-primary underline">/{form.slug}</a>
                </p>
              </div>
            ) : (
              <PagePreview 
                page={form} 
                onSectionEdit={handleSectionEdit} 
                previewMode={canEdit && previewModeEnabled}
                highlightedSectionId={highlightedSection}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section Editor Drawer */}
      {!isTemplatePage && (
        <SectionEditorDrawer
          open={drawerOpen}
          onOpenChange={(open) => {
            setDrawerOpen(open);
            if (!open) {
              setEditingSection(null);
              setSearchParams({});
            }
          }}
          section={editingSection}
          onUpdate={updateSection}
          onDelete={deleteSection}
          canEdit={canEdit}
          canDelete={isAdmin || membership?.role === 'editor'}
          validationErrors={editingSection ? getSectionErrors(editingSection.sectionId) : []}
        />
      )}

      {/* Validation errors summary */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="fixed bottom-4 right-4 w-auto max-w-md z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Fix {validationErrors.length} validation error(s) before publishing
          </AlertDescription>
        </Alert>
      )}

      {/* Removed Items Warning Dialog */}
      <AlertDialog open={showRemovedItemsDialog} onOpenChange={setShowRemovedItemsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Content Will Be Removed
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>The following sections have fewer items than before:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {removedItemsWarnings.map((warning, index) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="font-medium text-foreground">{warning.sectionName}</span>: {warning.originalCount} → {warning.newCount} items
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium">A backup will be saved automatically. Continue?</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowRemovedItemsDialog(false);
              setPendingSaveStatus(undefined);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowRemovedItemsDialog(false);
              handleSave(pendingSaveStatus, false, true);
            }}>
              Save with Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Empty Items Warning Dialog */}
      <AlertDialog open={showEmptyItemsDialog} onOpenChange={setShowEmptyItemsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Empty Sections Detected
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>The following sections have no items and will show default content on the website:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {emptyItemsWarnings.map((warning, index) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="font-medium text-foreground">{warning.sectionName}</span>: No items configured
                    </li>
                  ))}
                </ul>
                <p className="text-sm">Do you want to save anyway?</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowEmptyItemsDialog(false);
              setPendingSaveStatus(undefined);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowEmptyItemsDialog(false);
              handleSave(pendingSaveStatus, true, true);
              setPendingSaveStatus(undefined);
            }}>
              Save Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PageEditor;
