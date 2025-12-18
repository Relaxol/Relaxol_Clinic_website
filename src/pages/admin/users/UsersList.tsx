import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TenantMember {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

const UsersList = () => {
  const { membership } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<TenantMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('viewer');
  const [saving, setSaving] = useState(false);

  const isAdmin = membership?.role === 'admin';
  const licenseActive = membership?.licenseActive !== false;
  const maxUsers = membership?.planFeatures.max_users;
  const limitReached = maxUsers !== null && members.length >= maxUsers;

  useEffect(() => {
    fetchMembers();
  }, [membership?.tenantId]);

  const fetchMembers = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('tenant_members')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('created_at');

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!email) {
      toast({ title: 'Email is required', variant: 'destructive' });
      return;
    }

    if (limitReached) {
      toast({ title: 'User limit reached', description: 'Upgrade your plan to add more users', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      // Note: In a real implementation, you'd need to look up the user by email
      // or send an invitation. This is a simplified version.
      toast({ 
        title: 'Invitation system', 
        description: 'In production, this would send an invitation email to the user.',
      });
      setDialogOpen(false);
      setEmail('');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('tenant_members')
        .update({ role: newRole })
        .eq('id', memberId);

      if (error) throw error;
      toast({ title: 'Role updated' });
      fetchMembers();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleRemoveUser = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this user?')) return;
    
    try {
      const { error } = await supabase
        .from('tenant_members')
        .delete()
        .eq('id', memberId);

      if (error) throw error;
      toast({ title: 'User removed' });
      fetchMembers();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      admin: 'default',
      editor: 'secondary',
      viewer: 'outline'
    };
    return <Badge variant={variants[role]}>{role}</Badge>;
  };

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Only administrators can manage users.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage team members
            {maxUsers && ` (${members.length}/${maxUsers})`}
          </p>
        </div>
        {licenseActive && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={limitReached}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as typeof role)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer (read-only)</SelectItem>
                      <SelectItem value="editor">Editor (can edit content)</SelectItem>
                      <SelectItem value="admin">Admin (full access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddUser} disabled={saving} className="w-full">
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {limitReached && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            User limit reached. Upgrade your plan to add more team members.
          </AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No team members
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-mono text-sm">
                    {member.user_id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={member.role} 
                      onValueChange={(v) => handleUpdateRole(member.id, v as typeof member.role)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {format(new Date(member.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveUser(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

export default UsersList;
