import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tags, 
  Users, 
  Image, 
  Settings, 
  CreditCard,
  LogOut,
  Menu,
  X,
  Lock,
  Eye,
  Globe,
  Activity,
  Inbox
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const AdminLayout = () => {
  const { user, membership, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const canAccessBlog = membership?.planFeatures.blog !== false;
  const canAccessPages = membership?.planFeatures.treatment_pages !== false;
  const isAdmin = membership?.role === 'admin';
  const licenseActive = membership?.licenseActive !== false;

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/submissions', icon: Inbox, label: 'Submissions' },
    { to: '/admin/posts', icon: FileText, label: 'Blog Posts', locked: !canAccessBlog },
    { to: '/admin/pages', icon: FolderOpen, label: 'Pages', locked: !canAccessPages },
    { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
    { to: '/admin/tags', icon: Tags, label: 'Tags' },
    { to: '/admin/authors', icon: Users, label: 'Authors' },
    { to: '/admin/media', icon: Image, label: 'Media' },
    { to: '/admin/users', icon: Users, label: 'Users', adminOnly: true },
    { to: '/admin/activity', icon: Activity, label: 'Activity Log' },
    { to: '/admin/content-audit', icon: Eye, label: 'Content Audit' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
    { to: '/admin/license', icon: CreditCard, label: 'License' },
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className="font-bold text-lg">Eleration CMS</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              if (item.adminOnly && !isAdmin) return null;
              
              const isLocked = item.locked;
              
              return (
                <NavLink
                  key={item.to}
                  to={isLocked ? '#' : item.to}
                  end={item.end}
                  onClick={(e) => {
                    if (isLocked) e.preventDefault();
                    setSidebarOpen(false);
                  }}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive && !isLocked
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    isLocked && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {isLocked && <Lock className="h-3 w-3 ml-auto" />}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {membership && (
              <span className="text-sm font-medium hidden sm:block">
                {membership.tenantName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!licenseActive && (
              <Badge variant="destructive" className="hidden sm:flex">
                License Inactive
              </Badge>
            )}
            
            {membership && (
              <>
                <Badge variant="secondary" className="hidden sm:flex">
                  {membership.role.charAt(0).toUpperCase() + membership.role.slice(1)}
                </Badge>
                <Badge variant="outline" className="hidden sm:flex">
                  {membership.planName.charAt(0).toUpperCase() + membership.planName.slice(1)}
                </Badge>
              </>
            )}

            <Link to="/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">View Website</span>
              </Button>
            </Link>

            <Button
              variant={previewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview Mode</span>
            </Button>

            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
          </div>
        </header>

        {/* License inactive banner */}
        {!licenseActive && (
          <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm">
            License inactive — editing disabled. Please contact support.
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet context={{ previewMode, licenseActive }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
