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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Loader2, AlertCircle, Copy, Check, Mail, Clock, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TenantMember {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}

interface Invite {
  id: string;
  email: string;
  role: string;
  token: string;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
}

const UsersList = () => {
  const { membership, session } = useAuth();
  const { toast } = useToast();
  const [members, setMembers] = useState<TenantMember[]>([]);
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Create user form state
  const [createEmail, setCreateEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createConfirmPassword, setCreateConfirmPassword] = useState('');
  const [createRole, setCreateRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [creatingUser, setCreatingUser] = useState(false);

  const isAdmin = membership?.role === 'admin';
  const licenseActive = membership?.licenseActive !== false;
  const maxUsers = membership?.planFeatures.max_users;
  const limitReached = maxUsers !== null && members.length >= maxUsers;

  useEffect(() => {
    fetchData();
  }, [membership?.tenantId]);

  const fetchData = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data: membersData, error: membersError } = await supabase
        .from('tenant_members')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('created_at');

      if (membersError) throw membersError;
      setMembers(membersData || []);

      // Fetch emails for members via edge function
      try {
        const { data: emailData } = await supabase.functions.invoke('list-member-emails', {
          body: { tenant_id: membership.tenantId }
        });
        if (emailData?.emails) setEmails(emailData.emails);
      } catch (e) {
        console.error('Failed to load member emails:', e);
      }

      if (isAdmin) {
        const { data: invitesData, error: invitesError } = await supabase
          .from('invites')
          .select('*')
          .eq('tenant_id', membership.tenantId)
          .is('accepted_at', null)
          .order('created_at', { ascending: false });

        if (!invitesError) {
          setInvites(invitesData || []);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvite = async () => {
    if (!email) {
      toast({ title: 'Email is required', variant: 'destructive' });
      return;
    }

    if (!membership?.tenantId || !session?.access_token) {
      toast({ title: 'Session error', description: 'Please refresh the page', variant: 'destructive' });
      return;
    }

    if (limitReached) {
      toast({ title: 'User limit reached', description: 'Upgrade your plan to add more users', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-invite', {
        body: {
          email: email.trim().toLowerCase(),
          role,
          tenant_id: membership.tenantId
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const inviteLink = `${window.location.origin}/admin/accept-invite?token=${data.invite.token}`;
      await navigator.clipboard.writeText(inviteLink);

      toast({ 
        title: 'Invite created!', 
        description: 'Invite link copied to clipboard. Send it to the user.',
      });

      setDialogOpen(false);
      setEmail('');
      setRole('editor');
      fetchData();
    } catch (error: any) {
      console.error('Error creating invite:', error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createEmail || !createPassword) {
      toast({ title: 'Email and password are required', variant: 'destructive' });
      return;
    }

    if (createPassword.length < 6) {
      toast({ title: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    if (createPassword !== createConfirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    if (!membership?.tenantId) {
      toast({ title: 'Session error', description: 'Please refresh the page', variant: 'destructive' });
      return;
    }

    if (limitReached) {
      toast({ title: 'User limit reached', description: 'Upgrade your plan to add more users', variant: 'destructive' });
      return;
    }

    setCreatingUser(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: createEmail.trim().toLowerCase(),
          password: createPassword,
          role: createRole,
          tenant_id: membership.tenantId
        }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({ 
        title: 'User created!', 
        description: `${data.user.email} has been added as ${data.user.role}. They can now log in with their credentials.`,
      });

      setCreateUserDialogOpen(false);
      setCreateEmail('');
      setCreatePassword('');
      setCreateConfirmPassword('');
      setCreateRole('editor');
      fetchData();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleCopyInviteLink = async (token: string, inviteId: string) => {
    const inviteLink = `${window.location.origin}/admin/accept-invite?token=${token}`;
    await navigator.clipboard.writeText(inviteLink);
    setCopiedId(inviteId);
    toast({ title: 'Invite link copied!' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteInvite = async (inviteId: string) => {
    if (!confirm('Are you sure you want to delete this invite?')) return;
    
    try {
      const { error } = await supabase
        .from('invites')
        .delete()
        .eq('id', inviteId);

      if (error) throw error;
      toast({ title: 'Invite deleted' });
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
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
      fetchData();
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
      fetchData();
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

  const isExpired = (expiresAt: string) => new Date(expiresAt) < new Date();

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
          <div className="flex gap-2">
            {/* Create User Dialog */}
            <Dialog open={createUserDialogOpen} onOpenChange={setCreateUserDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={limitReached}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create User Directly</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={createEmail}
                      onChange={(e) => setCreateEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password *</Label>
                    <Input
                      type="password"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password *</Label>
                    <Input
                      type="password"
                      value={createConfirmPassword}
                      onChange={(e) => setCreateConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select value={createRole} onValueChange={(v) => setCreateRole(v as typeof createRole)}>
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
                  <Button onClick={handleCreateUser} disabled={creatingUser} className="w-full">
                    {creatingUser && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Create User
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    The user will be able to log in immediately with these credentials. No email verification required.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            {/* Invite User Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={limitReached}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
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
                  <Button onClick={handleCreateInvite} disabled={saving} className="w-full">
                    {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Create Invite & Copy Link
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    The invite link will be copied to your clipboard. Send it to the user via email or messaging.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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

      <Tabs defaultValue="members" className="w-full">
        <TabsList>
          <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites ({invites.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
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
                      <TableCell className="text-sm">
                        {emails[member.user_id] || (
                          <span className="font-mono text-muted-foreground">{member.user_id.slice(0, 8)}…</span>
                        )}
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
        </TabsContent>

        <TabsContent value="invites" className="mt-4">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No pending invites
                    </TableCell>
                  </TableRow>
                ) : (
                  invites.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {invite.email}
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(invite.role)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className={`flex items-center gap-1 ${isExpired(invite.expires_at) ? 'text-destructive' : 'text-muted-foreground'}`}>
                          <Clock className="h-3 w-3" />
                          {isExpired(invite.expires_at) ? 'Expired' : format(new Date(invite.expires_at), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleCopyInviteLink(invite.token, invite.id)}
                            disabled={isExpired(invite.expires_at)}
                          >
                            {copiedId === invite.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteInvite(invite.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersList;