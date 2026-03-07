import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Search, FileText, FolderOpen, Image, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityEntry {
  id: string;
  user_email: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  entity_title: string | null;
  details: Record<string, unknown>;
  created_at: string;
}

const ACTION_COLORS: Record<string, string> = {
  create: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  update: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  delete: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  publish: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  unpublish: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  upload: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  restore: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

const ENTITY_ICONS: Record<string, React.ReactNode> = {
  page: <FolderOpen className="h-4 w-4" />,
  post: <FileText className="h-4 w-4" />,
  media: <Image className="h-4 w-4" />,
};

const ActivityLog = () => {
  const { membership } = useAuth();
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');

  useEffect(() => {
    if (membership?.tenantId) fetchEntries();
  }, [membership?.tenantId]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('tenant_id', membership!.tenantId)
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) throw error;
      setEntries((data as any[]) || []);
    } catch (error) {
      console.error('Error fetching activity log:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = entries.filter(e => {
    if (entityFilter !== 'all' && e.entity_type !== entityFilter) return false;
    if (actionFilter !== 'all' && e.action !== actionFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        e.entity_title?.toLowerCase().includes(q) ||
        e.user_email?.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
          <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground">
            {entries.length} entries · {filtered.length} shown
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchEntries}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, user, or action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={entityFilter} onValueChange={setEntityFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Entity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="page">Pages</SelectItem>
            <SelectItem value="post">Posts</SelectItem>
            <SelectItem value="media">Media</SelectItem>
            <SelectItem value="category">Categories</SelectItem>
            <SelectItem value="tag">Tags</SelectItem>
            <SelectItem value="author">Authors</SelectItem>
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="publish">Publish</SelectItem>
            <SelectItem value="unpublish">Unpublish</SelectItem>
            <SelectItem value="upload">Upload</SelectItem>
            <SelectItem value="restore">Restore</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
          {entries.length === 0
            ? 'No activity recorded yet. Changes will appear here as you edit content.'
            : 'No entries match your filters.'}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry) => (
            <Card key={entry.id} className="hover:bg-muted/30 transition-colors">
              <CardContent className="flex items-center gap-4 py-3 px-4">
                <div className="flex-shrink-0 text-muted-foreground">
                  {ENTITY_ICONS[entry.entity_type] || <FileText className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm truncate">
                      {entry.entity_title || 'Untitled'}
                    </span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {entry.entity_type}
                    </Badge>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ACTION_COLORS[entry.action] || 'bg-muted text-muted-foreground'}`}>
                      {entry.action}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {entry.user_email || 'System'} · {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
