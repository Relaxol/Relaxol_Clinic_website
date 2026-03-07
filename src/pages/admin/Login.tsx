import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, user, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Check for redirect after invite acceptance
  const redirectTo = searchParams.get('redirect') || '/admin';
  const message = searchParams.get('message');

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  const handleSignIn = async (e: React.FormEvent) => {
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

    const { error } = await signIn(email, password, rememberMe);
    
    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'You have been signed in successfully.'
      });
      navigate(redirectTo);
    }
    
    setIsSubmitting(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({ title: 'Enter your email', description: 'Please enter your email address.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setResetSent(true);
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 self-start">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to website
          </Link>
          <CardTitle className="text-2xl font-bold">Eleration CMS</CardTitle>
          <CardDescription>Sign in to manage your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {forgotMode ? (
            resetSent ? (
              <div className="text-center space-y-3 py-4">
                <p className="text-sm text-muted-foreground">
                  If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
                </p>
                <Button variant="link" onClick={() => { setForgotMode(false); setResetSent(false); }}>
                  Back to login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Send Reset Link
                </Button>
                <Button variant="link" className="w-full" onClick={() => setForgotMode(false)}>
                  Back to login
                </Button>
              </form>
            )
          ) : (
            <>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">Password</Label>
                    <button
                      type="button"
                      onClick={() => setForgotMode(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember-me" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
              </form>

              <div className="pt-4 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Access is by invitation only. Contact your administrator for an account.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;