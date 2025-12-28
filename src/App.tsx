import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import VendorSignup from "./pages/VendorSignup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorManagement from "./pages/admin/VendorManagement";
import AgentDashboard from "./pages/agent/AgentDashboard";
import WorkOrders from "./pages/agent/WorkOrders";
import CreateWorkOrder from "./pages/agent/CreateWorkOrder";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AvailableOrders from "./pages/vendor/AvailableOrders";
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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/vendors" element={<VendorManagement />} />
            
            {/* Agent Routes */}
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/work-orders" element={<WorkOrders />} />
            <Route path="/agent/work-orders/new" element={<CreateWorkOrder />} />
            
            {/* Vendor Routes */}
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/orders" element={<AvailableOrders />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
