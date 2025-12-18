import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface Author {
  id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
}

const AuthorsList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', bio: '', avatar_url: '' });
  const [saving, setSaving] = useState(false);

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';

  useEffect(() => {
    fetchAuthors();
  }, [membership?.tenantId]);

  const fetchAuthors = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('name');

      if (error) throw error;
      setAuthors(data || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (author?: Author) => {
    if (author) {
      setEditingId(author.id);
      setForm({
        name: author.name,
        bio: author.bio || '',
        avatar_url: author.avatar_url || ''
      });
    } else {
      setEditingId(null);
      setForm({ name: '', bio: '', avatar_url: '' });
    }
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name) {
      toast({ title: 'Name is required', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const data = {
        name: form.name,
        bio: form.bio || null,
        avatar_url: form.avatar_url || null
      };

      if (editingId) {
        const { error } = await supabase
          .from('authors')
          .update(data)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Author updated' });
      } else {
        const { error } = await supabase
          .from('authors')
          .insert({ ...data, tenant_id: membership!.tenantId });
        if (error) throw error;
        toast({ title: 'Author created' });
      }
      setDialogOpen(false);
      fetchAuthors();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    
    try {
      const { error } = await supabase.from('authors').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Author deleted' });
      fetchAuthors();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
          <h1 className="text-2xl font-bold tracking-tight">Authors</h1>
          <p className="text-muted-foreground">Manage content authors</p>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                New Author
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Author' : 'New Author'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Avatar URL</Label>
                  <Input
                    value={form.avatar_url}
                    onChange={(e) => setForm({ ...form, avatar_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Short bio"
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
              <TableHead>Author</TableHead>
              <TableHead className="hidden md:table-cell">Bio</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {authors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  No authors yet
                </TableCell>
              </TableRow>
            ) : (
              authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={author.avatar_url || undefined} />
                        <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-xs">
                    {author.bio || '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {canEdit && (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(author)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(author.id)}>
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

export default AuthorsList;
