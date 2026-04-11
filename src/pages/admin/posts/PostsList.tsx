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

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  updated_at: string;
  category_id: string | null;
  author_id: string | null;
  categories: { name: string } | null;
  authors: { name: string } | null;
}

const PostsList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;

  useEffect(() => {
    fetchPosts();
  }, [membership?.tenantId]);

  const fetchPosts = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          status,
          published_at,
          updated_at,
          category_id,
          author_id,
          categories (name),
          authors (name)
        `)
        .eq('tenant_id', membership.tenantId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setPosts((data || []) as any);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (post: BlogPost) => {
    if (!canEdit) return;

    try {
      const { data: original, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', post.id)
        .single();

      if (fetchError) throw fetchError;

      const { id, created_at, updated_at, slug, ...rest } = original;
      const newSlug = `${slug}-copy-${Date.now()}`;

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          ...rest,
          slug: newSlug,
          title: `${original.title} (Copy)`,
          status: 'draft'
        });

      if (insertError) throw insertError;

      toast({ title: 'Post duplicated successfully' });
      fetchPosts();
    } catch (error) {
      console.error('Error duplicating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to duplicate post',
        variant: 'destructive'
      });
    }
  };

  const handleArchive = async (postId: string) => {
    if (!canEdit) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: 'archived' })
        .eq('id', postId);

      if (error) throw error;

      toast({ title: 'Post archived' });
      fetchPosts();
    } catch (error) {
      console.error('Error archiving post:', error);
      toast({
        title: 'Error',
        description: 'Failed to archive post',
        variant: 'destructive'
      });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
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
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        {canEdit && (
          <Button asChild>
            <Link to="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
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
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden sm:table-cell">Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No posts found
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{getStatusBadge(post.status)}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.categories?.name || '-'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.authors?.name || '-'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {format(new Date(post.updated_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/posts/${post.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {canEdit && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDuplicate(post)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleArchive(post.id)}
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

export default PostsList;
