import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const CategoriesList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [saving, setSaving] = useState(false);

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';

  useEffect(() => {
    fetchCategories();
  }, [membership?.tenantId]);

  const fetchCategories = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingId(category.id);
      setForm({
        name: category.name,
        slug: category.slug,
        description: category.description || ''
      });
    } else {
      setEditingId(null);
      setForm({ name: '', slug: '', description: '' });
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
          .from('categories')
          .update({ name: form.name, slug: form.slug, description: form.description || null })
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Category updated' });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert({ ...form, tenant_id: membership!.tenantId, description: form.description || null });
        if (error) throw error;
        toast({ title: 'Category created' });
      }
      setDialogOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Category deleted' });
      fetchCategories();
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
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage blog categories</p>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Category' : 'New Category'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : generateSlug(e.target.value) })}
                    placeholder="Category name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="category-slug"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
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

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No categories yet
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-xs">
                    {cat.description || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {canEdit && (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cat)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesList;
