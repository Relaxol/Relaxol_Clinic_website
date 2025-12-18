import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, membership, signOut } = useAuth();
  const location = useLocation();
  const [membershipChecked, setMembershipChecked] = useState(false);

  // Give membership time to load after user is set
  useEffect(() => {
    if (user && !loading) {
      const timer = setTimeout(() => {
        setMembershipChecked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Wait for membership to load
  if (!membershipChecked && !membership) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  // User is logged in but has no tenant membership
  if (membershipChecked && !membership) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
            <CardTitle>No Workspace Access</CardTitle>
            <CardDescription>
              Your account ({user.email}) is not assigned to any workspace or organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Please contact an administrator to be added to a workspace, or sign in with a different account.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
              <Button 
                className="flex-1"
                onClick={() => window.location.href = '/'}
              >
                Go to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;