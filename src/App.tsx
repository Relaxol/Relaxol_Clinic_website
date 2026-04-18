import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityWidget } from "@/components/AccessibilityWidget";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopOnNavigate } from "@/components/ScrollToTopOnNavigate";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import Home from "./pages/Home";
import Spravato from "./pages/Spravato";
import Ketamine from "./pages/Ketamine";
import Evaluations from "./pages/Evaluations"; // evaluations page
import FAQPage from "./pages/FAQPage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Depression from "./pages/conditions/Depression";
import Anxiety from "./pages/conditions/Anxiety";
import PTSD from "./pages/conditions/PTSD";
import OCD from "./pages/conditions/OCD";
import PainManagement from "./pages/conditions/PainManagement";
import OurTeam from "./pages/OurTeam";
import InsuranceVerification from "./pages/InsuranceVerification";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import DynamicPage from "./pages/DynamicPage";

// Admin imports
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import PostsList from "./pages/admin/posts/PostsList";
import PostEditor from "./pages/admin/posts/PostEditor";
import PagesList from "./pages/admin/pages/PagesList";
import PageEditor from "./pages/admin/pages/PageEditor";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import TagsList from "./pages/admin/tags/TagsList";
import AuthorsList from "./pages/admin/authors/AuthorsList";
import MediaLibrary from "./pages/admin/media/MediaLibrary";
import UsersList from "./pages/admin/users/UsersList";
import Settings from "./pages/admin/settings/Settings";
import License from "./pages/admin/license/License";
import ActivityLog from "./pages/admin/activity/ActivityLog";
import AcceptInvite from "./pages/admin/AcceptInvite";
import ResetPassword from "./pages/admin/ResetPassword";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ContentAudit from "./pages/admin/ContentAudit";
import SubmissionsList from "./pages/admin/submissions/SubmissionsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTopOnNavigate />
          <AccessibilityWidget />
          <ScrollToTop />
          <Analytics />
          <Routes>
            {/* Public routes - Hardcoded pages with custom designs */}
            <Route path="/" element={<Home />} />
            <Route path="/spravato-Englewood" element={<Spravato />} />
            <Route path="/ketamine" element={<Ketamine />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/conditions/depression" element={<Depression />} />
            <Route path="/conditions/anxiety" element={<Anxiety />} />
            <Route path="/conditions/ptsd" element={<PTSD />} />
            <Route path="/conditions/ocd" element={<OCD />} />
            <Route
              path="/conditions/pain-management"
              element={<PainManagement />}
            />
            <Route path="/our-team" element={<OurTeam />} />
            <Route
              path="/verify-coverage"
              element={<InsuranceVerification />}
            />

            {/* Dynamic CMS pages - for NEW pages created via admin */}
            <Route path="/p/:slug" element={<DynamicPage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/accept-invite" element={<AcceptInvite />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="posts" element={<PostsList />} />
              <Route path="posts/:id" element={<PostEditor />} />
              <Route path="pages" element={<PagesList />} />
              <Route path="pages/:id" element={<PageEditor />} />
              <Route path="categories" element={<CategoriesList />} />
              <Route path="tags" element={<TagsList />} />
              <Route path="authors" element={<AuthorsList />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="users" element={<UsersList />} />
              <Route path="settings" element={<Settings />} />
              <Route path="activity" element={<ActivityLog />} />
              <Route path="license" element={<License />} />
              <Route path="content-audit" element={<ContentAudit />} />
              <Route path="submissions" element={<SubmissionsList />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
