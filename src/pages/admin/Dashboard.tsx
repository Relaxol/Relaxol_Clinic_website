import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FolderOpen, Image, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Stats {
  posts: number;
  pages: number;
  media: number;
  users: number;
}

const AdminDashboard = () => {
  const { membership } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!membership?.tenantId) return;

      try {
        const [postsRes, pagesRes, mediaRes, usersRes] = await Promise.all([
          supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('tenant_id', membership.tenantId),
          supabase.from('pages').select('id', { count: 'exact', head: true }).eq('tenant_id', membership.tenantId),
          supabase.from('media').select('id', { count: 'exact', head: true }).eq('tenant_id', membership.tenantId),
          supabase.from('tenant_members').select('id', { count: 'exact', head: true }).eq('tenant_id', membership.tenantId),
        ]);

        setStats({
          posts: postsRes.count || 0,
          pages: pagesRes.count || 0,
          media: mediaRes.count || 0,
          users: usersRes.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [membership?.tenantId]);

  const statCards = [
    { 
      label: 'Blog Posts', 
      value: stats?.posts, 
      icon: FileText, 
      limit: membership?.planFeatures.max_posts,
      color: 'text-blue-600'
    },
    { 
      label: 'Pages', 
      value: stats?.pages, 
      icon: FolderOpen, 
      limit: null,
      color: 'text-green-600'
    },
    { 
      label: 'Media Files', 
      value: stats?.media, 
      icon: Image, 
      limit: null,
      color: 'text-purple-600'
    },
    { 
      label: 'Team Members', 
      value: stats?.users, 
      icon: Users, 
      limit: membership?.planFeatures.max_users,
      color: 'text-orange-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {card.value}
                    {card.limit && (
                      <span className="text-sm font-normal text-muted-foreground">
                        {' '}/ {card.limit}
                      </span>
                    )}
                  </div>
                  {card.limit && card.value !== undefined && card.value >= card.limit && (
                    <p className="text-xs text-destructive mt-1">Limit reached</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/admin/posts/new" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="font-medium">Create New Post</div>
              <div className="text-sm text-muted-foreground">Write a new blog post</div>
            </a>
            <a href="/admin/pages/new" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="font-medium">Create New Page</div>
              <div className="text-sm text-muted-foreground">Add a new content page</div>
            </a>
            <a href="/admin/media" className="block p-3 rounded-lg border hover:bg-muted transition-colors">
              <div className="font-medium">Upload Media</div>
              <div className="text-sm text-muted-foreground">Add images to your library</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent>
            {membership ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium capitalize">{membership.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className={membership.licenseActive ? 'text-green-600' : 'text-destructive'}>
                    {membership.licenseActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blog</span>
                  <span>{membership.planFeatures.blog ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Treatment Pages</span>
                  <span>{membership.planFeatures.treatment_pages ? '✓' : '✗'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advanced SEO</span>
                  <span>{membership.planFeatures.advanced_seo ? '✓' : '✗'}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No active membership</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
