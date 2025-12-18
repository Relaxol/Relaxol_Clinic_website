import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Copy, Archive, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Page {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
  published_at: string | null;
  updated_at: string;
}

const PagesList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;

  useEffect(() => {
    fetchPages();
  }, [membership?.tenantId]);

  const fetchPages = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('pages')
        .select('id, title, slug, type, status, published_at, updated_at')
        .eq('tenant_id', membership.tenantId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load pages',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (page: Page) => {
    if (!canEdit) return;

    try {
      const { data: original, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', page.id)
        .single();

      if (fetchError) throw fetchError;

      const { id, created_at, updated_at, slug, ...rest } = original;
      const newSlug = `${slug}-copy-${Date.now()}`;

      const { error: insertError } = await supabase
        .from('pages')
        .insert({
          ...rest,
          slug: newSlug,
          title: `${original.title} (Copy)`,
          status: 'draft'
        });

      if (insertError) throw insertError;

      toast({ title: 'Page duplicated successfully' });
      fetchPages();
    } catch (error) {
      console.error('Error duplicating page:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate page',
        variant: 'destructive'
      });
    }
  };

  const handleArchive = async (pageId: string) => {
    if (!canEdit) return;

    try {
      const { error } = await supabase
        .from('pages')
        .update({ status: 'archived' })
        .eq('id', pageId);

      if (error) throw error;

      toast({ title: 'Page archived' });
      fetchPages();
    } catch (error) {
      console.error('Error archiving page:', error);
      toast({
        title: 'Error',
        description: 'Failed to archive page',
        variant: 'destructive'
      });
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesType = typeFilter === 'all' || page.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      published: 'default',
      draft: 'secondary',
      scheduled: 'outline',
      archived: 'destructive'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge variant="outline" className="capitalize">
        {type}
      </Badge>
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
          <p className="text-muted-foreground">Manage your site pages</p>
        </div>
        {canEdit && (
          <Button asChild>
            <Link to="/admin/pages/new">
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="page">Page</SelectItem>
            <SelectItem value="treatment">Treatment</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No pages found
                </TableCell>
              </TableRow>
            ) : (
              filteredPages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{getStatusBadge(page.status)}</TableCell>
                  <TableCell>{getTypeBadge(page.type)}</TableCell>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {format(new Date(page.updated_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/pages/${page.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {canEdit && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDuplicate(page)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleArchive(page.id)}
                          >
                            <Archive className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
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

export default PagesList;
