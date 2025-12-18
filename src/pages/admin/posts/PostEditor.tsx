import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Loader2, Save, Send, Clock, Eye, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostPreview from '@/components/admin/PostPreview';

interface PostForm {
  title: string;
  slug: string;
  excerpt: string;
  content_json: any[];
  hero_image: string;
  hero_image_alt: string;
  status: string;
  published_at: string;
  category_id: string;
  author_id: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  noindex: boolean;
  og_title: string;
  og_description: string;
  og_image_url: string;
}

interface Category {
  id: string;
  name: string;
}

interface Author {
  id: string;
  name: string;
}

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { membership, user } = useAuth();
  const { toast } = useToast();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  
  const [form, setForm] = useState<PostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content_json: [],
    hero_image: '',
    hero_image_alt: '',
    status: 'draft',
    published_at: '',
    category_id: '',
    author_id: '',
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

  useEffect(() => {
    if (membership?.tenantId) {
      fetchCategories();
      fetchAuthors();
      if (!isNew) {
        fetchPost();
      }
    }
  }, [membership?.tenantId, id]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .eq('tenant_id', membership!.tenantId);
    setCategories(data || []);
  };

  const fetchAuthors = async () => {
    const { data } = await supabase
      .from('authors')
      .select('id, name')
      .eq('tenant_id', membership!.tenantId);
    setAuthors(data || []);
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setForm({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content_json: Array.isArray(data.content_json) ? data.content_json : [],
        excerpt: data.excerpt || '',
        content_json: data.content_json || [],
        hero_image: data.hero_image || '',
        hero_image_alt: data.hero_image_alt || '',
        status: data.status || 'draft',
        published_at: data.published_at || '',
        category_id: data.category_id || '',
        author_id: data.author_id || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        canonical_url: data.canonical_url || '',
        noindex: data.noindex || false,
        og_title: data.og_title || '',
        og_description: data.og_description || '',
        og_image_url: data.og_image_url || ''
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error',
        description: 'Failed to load post',
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

    setSaving(true);

    try {
      const postData = {
        ...form,
        tenant_id: membership!.tenantId,
        status: newStatus || form.status,
        published_at: newStatus === 'published' ? new Date().toISOString() : form.published_at,
        category_id: form.category_id || null,
        author_id: form.author_id || null,
        created_by: user?.id
      };

      if (isNew) {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select('id')
          .single();

        if (error) throw error;

        toast({ title: 'Post created successfully' });
        navigate(`/admin/posts/${data.id}`);
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;

        toast({ title: 'Post saved successfully' });
        if (newStatus) {
          setForm(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save post',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
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
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/posts')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">{isNew ? 'New Post' : 'Edit Post'}</h1>
        </div>
        
        {canEdit && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleSave()} 
              disabled={saving}
            >
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
              <Button 
                variant="secondary"
                onClick={() => handleSave('draft')} 
                disabled={saving}
              >
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
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title"
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="post-url-slug"
                  disabled={!canEdit || (form.status === 'published' && !isAdmin)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => setForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post"
                  rows={3}
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero_image">Hero Image URL</Label>
                <Input
                  id="hero_image"
                  value={form.hero_image}
                  onChange={(e) => setForm(prev => ({ ...prev, hero_image: e.target.value }))}
                  placeholder="https://..."
                  disabled={!canEdit}
                />
              </div>

              {form.hero_image && (
                <div className="space-y-2">
                  <Label htmlFor="hero_image_alt">Hero Image Alt Text *</Label>
                  <Input
                    id="hero_image_alt"
                    value={form.hero_image_alt}
                    onChange={(e) => setForm(prev => ({ ...prev, hero_image_alt: e.target.value }))}
                    placeholder="Describe the image"
                    disabled={!canEdit}
                  />
                  <p className="text-xs text-muted-foreground">Alt text is required for accessibility</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={JSON.stringify(form.content_json, null, 2)}
                  onChange={(e) => {
                    try {
                      setForm(prev => ({ ...prev, content_json: JSON.parse(e.target.value) }));
                    } catch {}
                  }}
                  placeholder='[{"type": "paragraph", "content": "Your content here..."}]'
                  rows={10}
                  className="font-mono text-sm"
                  disabled={!canEdit}
                />
                <p className="text-xs text-muted-foreground">
                  Content is stored as JSON blocks. Supported types: heading, paragraph, list, quote, image
                </p>
              </div>
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
                <>
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-4">Advanced SEO</h3>
                    
                    <div className="space-y-4">
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
                        <Label htmlFor="noindex">No Index (hide from search engines)</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="og_title">OG Title</Label>
                        <Input
                          id="og_title"
                          value={form.og_title}
                          onChange={(e) => setForm(prev => ({ ...prev, og_title: e.target.value }))}
                          placeholder="Open Graph title"
                          disabled={!canEdit}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="og_description">OG Description</Label>
                        <Textarea
                          id="og_description"
                          value={form.og_description}
                          onChange={(e) => setForm(prev => ({ ...prev, og_description: e.target.value }))}
                          placeholder="Open Graph description"
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
                          placeholder="https://..."
                          disabled={!canEdit}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
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

              {(form.status === 'scheduled' || form.status === 'published') && (
                <div className="space-y-2">
                  <Label htmlFor="published_at">Publish Date</Label>
                  <Input
                    id="published_at"
                    type="datetime-local"
                    value={form.published_at ? form.published_at.slice(0, 16) : ''}
                    onChange={(e) => setForm(prev => ({ ...prev, published_at: e.target.value }))}
                    disabled={!canEdit}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={form.category_id}
                  onValueChange={(value) => setForm(prev => ({ ...prev, category_id: value }))}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Select
                  value={form.author_id}
                  onValueChange={(value) => setForm(prev => ({ ...prev, author_id: value }))}
                  disabled={!canEdit}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview pane */}
        <Card className="h-full overflow-hidden">
          <CardHeader className="py-3 border-b">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-53px)] overflow-auto">
            <PostPreview post={form} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;
