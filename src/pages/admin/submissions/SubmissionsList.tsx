import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Trash2, Eye, RefreshCw, Inbox } from 'lucide-react';
import { format } from 'date-fns';

interface FormSubmission {
  id: string;
  tenant_id: string;
  form_type: string;
  data: Record<string, any>;
  created_at: string;
}

export default function SubmissionsList() {
  const { membership } = useAuth();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selected, setSelected] = useState<FormSubmission | null>(null);

  const tenantId = membership?.tenantId;

  const fetchSubmissions = async () => {
    if (!tenantId) return;
    setLoading(true);
    try {
      let query = supabase
        .from('form_submissions' as any)
        .select('*')
        .eq('tenant_id', tenantId)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('form_type', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setSubmissions((data as any as FormSubmission[]) || []);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      toast({ title: 'Error', description: 'Failed to load submissions.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [tenantId, filter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    try {
      const { error } = await supabase
        .from('form_submissions' as any)
        .delete()
        .eq('id', id);
      if (error) throw error;
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({ title: 'Deleted', description: 'Submission removed.' });
    } catch {
      toast({ title: 'Error', description: 'Failed to delete.', variant: 'destructive' });
    }
  };

  const formTypeLabel = (type: string) => {
    switch (type) {
      case 'contact': return 'Contact';
      case 'insurance_verification': return 'Insurance Verification';
      default: return type;
    }
  };

  const formTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'contact': return 'default' as const;
      case 'insurance_verification': return 'secondary' as const;
      default: return 'outline' as const;
    }
  };

  const displayName = (data: Record<string, any>) => {
    const first = data.first_name || '';
    const last = data.last_name || '';
    return `${first} ${last}`.trim() || '—';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Form Submissions</h1>
          <p className="text-muted-foreground text-sm">
            {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Forms</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="insurance_verification">Insurance Verification</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={fetchSubmissions} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading…</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16">
          <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No submissions yet</h3>
          <p className="text-muted-foreground text-sm">Form submissions will appear here.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{displayName(s.data)}</TableCell>
                  <TableCell>{s.data.email || '—'}</TableCell>
                  <TableCell>{s.data.phone || '—'}</TableCell>
                  <TableCell>
                    <Badge variant={formTypeBadgeVariant(s.form_type)}>
                      {formTypeLabel(s.form_type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(s.created_at), 'MMM d, yyyy h:mm a')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => setSelected(s)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={formTypeBadgeVariant(selected.form_type)}>
                  {formTypeLabel(selected.form_type)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(selected.created_at), 'MMM d, yyyy h:mm a')}
                </span>
              </div>
              <div className="grid gap-3">
                {Object.entries(selected.data).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-2">
                    <span className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm col-span-2">{String(value || '—')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
