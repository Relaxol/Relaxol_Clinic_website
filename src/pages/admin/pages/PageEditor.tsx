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
import PagePreview from '@/components/admin/PagePreview';
import SectionEditorDrawer, { validateSection } from '@/components/admin/SectionEditorDrawer';
import { v4 as uuidv4 } from 'uuid';

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

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('hero');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [previewModeEnabled, setPreviewModeEnabled] = useState(true);
  
  const [form, setForm] = useState<PageForm>({
    title: '',
    slug: '',
    type: 'page',
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

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';
  const showAdvancedSeo = membership?.planFeatures.advanced_seo && isAdmin;
  const canCreateTreatment = membership?.planFeatures.treatment_pages;

  // Handle deep-linking from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    const sectionId = searchParams.get('sectionId');
    
    if (tab === 'sections') {
      setActiveTab('sections');
    }
    
    if (sectionId && !loading) {
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
  }, [searchParams, loading, form.sections_json]);

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

      let sections = Array.isArray(data.sections_json) ? data.sections_json as unknown as Section[] : [];
      
      // Ensure all sections have sectionId
      let needsUpdate = false;
      sections = sections.map(section => {
        if (!section.sectionId) {
          needsUpdate = true;
          return { ...section, sectionId: uuidv4() };
        }
        return section;
      });

      setForm({
        title: data.title || '',
        slug: data.slug || '',
        type: data.type || 'page',
        hero_headline: data.hero_headline || '',
        hero_subheadline: data.hero_subheadline || '',
        sections_json: sections as Section[],
        status: data.status || 'draft',
        published_at: data.published_at || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        canonical_url: data.canonical_url || '',
        noindex: data.noindex || false,
        og_title: data.og_title || '',
        og_description: data.og_description || '',
        og_image_url: data.og_image_url || ''
      });

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

  const handleSave = async (newStatus?: string) => {
    if (!canEdit) return;
    
    if (!form.title || !form.slug) {
      toast({
        title: 'Validation Error',
        description: 'Title and slug are required',
        variant: 'destructive'
      });
      return;
    }

    // Validate before publish
    if (newStatus === 'published') {
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
    setSaving(true);

    try {
      const pageData = {
        tenant_id: membership!.tenantId,
        title: form.title,
        slug: form.slug,
        type: form.type,
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
        if (newStatus) {
          setForm(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save page',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSectionEdit = (sectionId: string) => {
    if (sectionId === 'hero') {
      setActiveTab('hero');
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

            {(section.type === 'imageLeft' || section.type === 'imageRight') && (
              <>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={section.image_url || ''}
                    onChange={(e) => updateSection(section.sectionId, { image_url: e.target.value })}
                    placeholder="https://..."
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image Alt Text *</Label>
                  <Input
                    value={section.image_alt || ''}
                    onChange={(e) => updateSection(section.sectionId, { image_alt: e.target.value })}
                    placeholder="Describe the image"
                    disabled={!canEdit}
                  />
                </div>
              </>
            )}

            {section.type === 'cta' && (
              <>
                <div className="space-y-2">
                  <Label>CTA Button Label</Label>
                  <Input
                    value={section.cta_label || ''}
                    onChange={(e) => updateSection(section.sectionId, { cta_label: e.target.value })}
                    placeholder="Learn More"
                    disabled={!canEdit}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Link</Label>
                  <Input
                    value={section.cta_href || ''}
                    onChange={(e) => updateSection(section.sectionId, { cta_href: e.target.value })}
                    placeholder="/contact"
                    disabled={!canEdit}
                  />
                </div>
              </>
            )}

            {section.type === 'faq' && (
              <div className="space-y-4">
                <Label>FAQ Items</Label>
                {section.faq_items?.map((item, idx) => (
                  <div key={idx} className="space-y-2 p-3 border rounded">
                    <Input
                      value={item.question}
                      onChange={(e) => {
                        const newItems = [...(section.faq_items || [])];
                        newItems[idx] = { ...newItems[idx], question: e.target.value };
                        updateSection(section.sectionId, { faq_items: newItems });
                      }}
                      placeholder="Question"
                      disabled={!canEdit}
                    />
                    <Textarea
                      value={item.answer}
                      onChange={(e) => {
                        const newItems = [...(section.faq_items || [])];
                        newItems[idx] = { ...newItems[idx], answer: e.target.value };
                        updateSection(section.sectionId, { faq_items: newItems });
                      }}
                      placeholder="Answer"
                      rows={2}
                      disabled={!canEdit}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newItems = section.faq_items?.filter((_, i) => i !== idx);
                        updateSection(section.sectionId, { faq_items: newItems });
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateSection(section.sectionId, {
                      faq_items: [...(section.faq_items || []), { question: '', answer: '' }]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add FAQ Item
                </Button>
              </div>
            )}

            {section.type === 'stats' && (
              <div className="space-y-4">
                <Label>Statistics</Label>
                {section.stats_items?.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      value={item.value}
                      onChange={(e) => {
                        const newItems = [...(section.stats_items || [])];
                        newItems[idx] = { ...newItems[idx], value: e.target.value };
                        updateSection(section.sectionId, { stats_items: newItems });
                      }}
                      placeholder="100+"
                      className="w-24"
                      disabled={!canEdit}
                    />
                    <Input
                      value={item.label}
                      onChange={(e) => {
                        const newItems = [...(section.stats_items || [])];
                        newItems[idx] = { ...newItems[idx], label: e.target.value };
                        updateSection(section.sectionId, { stats_items: newItems });
                      }}
                      placeholder="Happy Customers"
                      disabled={!canEdit}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = section.stats_items?.filter((_, i) => i !== idx);
                        updateSection(section.sectionId, { stats_items: newItems });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateSection(section.sectionId, {
                      stats_items: [...(section.stats_items || []), { label: '', value: '' }]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Stat
                </Button>
              </div>
            )}
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
          <h1 className="text-xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
        </div>
        
        {canEdit && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave()} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Draft
            </Button>
            {form.status !== 'published' && (
              <Button onClick={() => handleSave('published')} disabled={saving}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            )}
            {form.status === 'published' && (
              <Button variant="secondary" onClick={() => handleSave('draft')} disabled={saving}>
                Unpublish
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Split pane editor */}
      <div className="grid lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
        {/* Editor pane */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-4 mt-4">
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

        {/* Preview pane */}
        <Card className="h-full overflow-hidden">
          <CardHeader className="py-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Live Preview
              </CardTitle>
              {canEdit && (
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
            <PagePreview 
              page={form} 
              onSectionEdit={handleSectionEdit} 
              previewMode={canEdit && previewModeEnabled}
              highlightedSectionId={highlightedSection}
            />
          </CardContent>
        </Card>
      </div>

      {/* Section Editor Drawer */}
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

      {/* Validation errors summary */}
      {validationErrors.length > 0 && (
        <Alert variant="destructive" className="fixed bottom-4 right-4 w-auto max-w-md z-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Fix {validationErrors.length} validation error(s) before publishing
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default PageEditor;
