import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { membership, user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and workspace settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your personal account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>User ID</Label>
              <Input value={user?.id || ''} disabled className="font-mono text-sm" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>Your current workspace details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {membership ? (
              <>
                <div className="space-y-2">
                  <Label>Workspace Name</Label>
                  <Input value={membership.tenantName} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Workspace Slug</Label>
                  <Input value={membership.tenantSlug} disabled />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <Label className="text-muted-foreground">Your Role</Label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="capitalize">
                        {membership.role}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Plan</Label>
                    <div className="mt-1">
                      <Badge variant="outline" className="capitalize">
                        {membership.planName}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Badge variant={membership.licenseActive ? 'default' : 'destructive'}>
                        {membership.licenseActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">No workspace connected</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>What each role can do in the CMS</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Admin</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Full access to all features including user management, advanced SEO, and content deletion.
                </p>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">Editor</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Can create and edit posts, pages, categories, tags, authors, and upload media. Cannot delete content or manage users.
                </p>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Viewer</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Read-only access to all content. Cannot create, edit, or delete anything.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
