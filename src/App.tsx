import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spravato from "./pages/Spravato";
import Ketamine from "./pages/Ketamine";
import VitaminInfusions from "./pages/VitaminInfusions";
import FAQPage from "./pages/FAQPage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Depression from "./pages/conditions/Depression";
import Anxiety from "./pages/conditions/Anxiety";
import PTSD from "./pages/conditions/PTSD";
import OCD from "./pages/conditions/OCD";
import PainManagement from "./pages/conditions/PainManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spravato-Englewood" element={<Spravato />} />
          <Route path="/ketamine" element={<Ketamine />} />
          <Route path="/vitamin-infusion-englewood" element={<VitaminInfusions />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/conditions/depression" element={<Depression />} />
          <Route path="/conditions/anxiety" element={<Anxiety />} />
          <Route path="/conditions/ptsd" element={<PTSD />} />
          <Route path="/conditions/ocd" element={<OCD />} />
          <Route path="/conditions/pain-management" element={<PainManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
