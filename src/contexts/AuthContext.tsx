import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'editor' | 'viewer';

interface TenantMembership {
  tenantId: string;
  tenantName: string;
  tenantSlug: string;
  role: AppRole;
  planName: string;
  planFeatures: {
    blog: boolean;
    treatment_pages: boolean;
    advanced_seo: boolean;
    max_posts: number | null;
    max_users: number | null;
  };
  licenseActive: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  membership: TenantMembership | null;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshMembership: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState<TenantMembership | null>(null);

  const fetchMembership = async (userId: string) => {
    try {
      const { data: memberData, error: memberError } = await supabase
        .from('tenant_members')
        .select(`
          tenant_id,
          role,
          tenants!inner (
            id,
            name,
            slug
          )
        `)
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

      if (memberError || !memberData) {
        setMembership(null);
        return;
      }

      const tenant = memberData.tenants as unknown as { id: string; name: string; slug: string };

      // Fetch license and plan
      const { data: licenseData } = await supabase
        .from('licenses')
        .select(`
          status,
          expires_at,
          plans!inner (
            name,
            features
          )
        `)
        .eq('tenant_id', tenant.id)
        .maybeSingle();

      const plan = licenseData?.plans as unknown as { name: string; features: TenantMembership['planFeatures'] } | null;
      const isActive = licenseData?.status === 'active' && 
        (!licenseData?.expires_at || new Date(licenseData.expires_at) > new Date());

      setMembership({
        tenantId: tenant.id,
        tenantName: tenant.name,
        tenantSlug: tenant.slug,
        role: memberData.role as AppRole,
        planName: plan?.name || 'starter',
        planFeatures: plan?.features || {
          blog: true,
          treatment_pages: false,
          advanced_seo: false,
          max_posts: 10,
          max_users: 2
        },
        licenseActive: isActive
      });
    } catch (error) {
      console.error('Error fetching membership:', error);
      setMembership(null);
    }
  };

  const refreshMembership = async () => {
    if (user) {
      await fetchMembership(user.id);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchMembership(session.user.id);
          }, 0);
        } else {
          setMembership(null);
        }
        
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchMembership(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string, rememberMe: boolean = true) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    // If "Remember Me" is unchecked, clear persistent storage so session ends on browser close
    if (!error && !rememberMe) {
      // Remove from localStorage but keep in-memory session active
      const storageKey = `sb-${import.meta.env.VITE_SUPABASE_PROJECT_ID}-auth-token`;
      localStorage.removeItem(storageKey);
    }
    
    return { error: error ? new Error(error.message) : null };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/admin`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error: error ? new Error(error.message) : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setMembership(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      membership,
      signIn,
      signUp,
      signOut,
      refreshMembership
    }}>
      {children}
    </AuthContext.Provider>
  );
};
