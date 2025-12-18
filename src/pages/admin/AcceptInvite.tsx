import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, CheckCircle, XCircle, Mail, Shield, Building } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InviteInfo {
  email: string;
  role: string;
  tenant_name: string;
  expires_at: string;
}

const AcceptInvite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading, signIn, refreshMembership } = useAuth();
  const { toast } = useToast();
  
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(true);
  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate invite token on mount
  useEffect(() => {
    if (!token) {
      setError('No invite token provided');
      setLoading(false);
      return;
    }

    validateInvite();
  }, [token]);

  // Auto-accept if user is logged in with matching email
  useEffect(() => {
    if (user && inviteInfo && !accepting && !accepted) {
      if (user.email?.toLowerCase() === inviteInfo.email.toLowerCase()) {
        handleAcceptInvite();
      }
    }
  }, [user, inviteInfo]);

  const validateInvite = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('validate-invite', {
        body: {},
        headers: {},
      });

      // Use GET params approach - call the function URL directly with token
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-invite?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!result.valid) {
        setError(result.error || 'Invalid invite');
        setLoading(false);
        return;
      }

      setInviteInfo(result.invite);
      setEmail(result.invite.email);
    } catch (err) {
      console.error('Error validating invite:', err);
      setError('Failed to validate invite');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: 'Missing credentials',
        description: 'Please enter both email and password.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
    }
    // If login succeeds, useEffect will trigger auto-accept
    
    setIsSubmitting(false);
  };

  const handleAcceptInvite = async () => {
    if (!token) return;

    setAccepting(true);
    try {
      const { data, error } = await supabase.functions.invoke('accept-invite', {
        body: { token }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setAccepted(true);
      toast({
        title: 'Welcome!',
        description: data.message || 'You now have access to the workspace.'
      });

      // Refresh membership data
      await refreshMembership();

      // Redirect to admin after a short delay
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (err: any) {
      console.error('Error accepting invite:', err);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive'
      });
      setError(err.message);
    } finally {
      setAccepting(false);
    }
  };

  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error && !inviteInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-xl">Invalid Invite</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Welcome to {inviteInfo?.tenant_name}!</CardTitle>
            <CardDescription>
              Your account has been set up with {inviteInfo?.role} access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground text-sm mb-4">
              Redirecting to dashboard...
            </p>
            <Link to="/admin">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Accepting state
  if (accepting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Setting up your account...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show invite details and login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">You're Invited!</CardTitle>
          <CardDescription>
            You've been invited to join a workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Invite Details */}
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Workspace</p>
                <p className="font-medium">{inviteInfo?.tenant_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{inviteInfo?.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{inviteInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Login or Accept */}
          {user ? (
            user.email?.toLowerCase() !== inviteInfo?.email.toLowerCase() ? (
              <Alert variant="destructive">
                <AlertDescription>
                  This invite is for {inviteInfo?.email}. You're currently logged in as {user.email}.
                  Please log out and sign in with the correct email.
                </AlertDescription>
              </Alert>
            ) : (
              <Button onClick={handleAcceptInvite} className="w-full" disabled={accepting}>
                {accepting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Accept Invite
              </Button>
            )
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Sign in to accept this invite
              </p>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Sign In & Accept Invite
              </Button>
            </form>
          )}

          <div className="pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Don't have an account? Contact the person who invited you to get your initial password.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcceptInvite;