import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Loader2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const TagsList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '' });
  const [saving, setSaving] = useState(false);

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';

  useEffect(() => {
    fetchTags();
  }, [membership?.tenantId]);

  const fetchTags = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('name');

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleOpenDialog = (tag?: Tag) => {
    if (tag) {
      setEditingId(tag.id);
      setForm({ name: tag.name, slug: tag.slug });
    } else {
      setEditingId(null);
      setForm({ name: '', slug: '' });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) {
      toast({ title: 'Name and slug are required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('tags')
          .update({ name: form.name, slug: form.slug })
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Tag updated' });
      } else {
        const { error } = await supabase
          .from('tags')
          .insert({ ...form, tenant_id: membership!.tenantId });
        if (error) throw error;
        toast({ title: 'Tag created' });
      }
      setDialogOpen(false);
      fetchTags();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    
    try {
      const { error } = await supabase.from('tags').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Tag deleted' });
      fetchTags();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
          <p className="text-muted-foreground">Manage blog tags</p>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Tag' : 'New Tag'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : generateSlug(e.target.value) })}
                    placeholder="Tag name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="tag-slug"
                  />
                </div>
                <Button onClick={handleSave} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  {editingId ? 'Update' : 'Create'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {tags.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
          No tags yet. Create your first tag.
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge 
              key={tag.id} 
              variant="secondary" 
              className="text-sm py-2 px-3 flex items-center gap-2"
            >
              {tag.name}
              {canEdit && (
                <div className="flex items-center gap-1 ml-2">
                  <button 
                    onClick={() => handleOpenDialog(tag)}
                    className="hover:text-primary"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => handleDelete(tag.id)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsList;
