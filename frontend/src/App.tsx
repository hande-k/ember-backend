import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apartments from "./pages/Apartments";
import BookingPage from "./pages/BookingPage";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Amenities from "./pages/Amenities";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import { LanguageProvider } from "./contexts/LanguageContext";
import AdminLayout from "./pages/admin/AdminLayout";
import BooksManager from "./pages/admin/BooksManager";
import GenresManager from "./pages/admin/GenresManager";
import UsersManager from "./pages/admin/UsersManager";
import InteractionsManager from "./pages/admin/InteractionsManager";
import WritePage from "./pages/WritePage";

// Create a react-query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/admin/books" element={<BooksManager />} />
            <Route path="/admin/genres" element={<GenresManager />} />
            <Route path="/admin/users" element={<UsersManager />} />
            <Route path="/admin/interactions" element={<InteractionsManager />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/write" element={<WritePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
