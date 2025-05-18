
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import OffersPage from "./pages/OffersPage";
import DemandsPage from "./pages/DemandsPage";
import OfferDetailsPage from "./pages/OfferDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import CreateOfferPage from "./pages/CreateOfferPage";
import CreateDemandPage from "./pages/CreateDemandPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="offers" element={<OffersPage />} />
              <Route path="demands" element={<DemandsPage />} />
              <Route path="offers/:id" element={<OfferDetailsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="auth" element={<AuthPage />} />
              <Route path="complete-profile" element={<CompleteProfilePage />} />
              <Route path="create-offer" element={<CreateOfferPage />} />
              <Route path="create-demand" element={<CreateDemandPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
