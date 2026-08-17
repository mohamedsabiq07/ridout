import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PublicHome } from './pages/PublicHome';
import { ServicePage } from './pages/ServicePage';
import { LocationPage } from './pages/LocationPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminRoute } from './components/AdminRoute';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<PublicHome />} />
            
            {/* SEO DEDICATED PAGES */}
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/locations/:slug" element={<LocationPage />} />
            
            {/* ADMIN LOGIN */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* SECURE ADMIN ROUTES */}
            <Route 
              path="/admin/*" 
              element={
                <AdminRoute>
                  <Routes>
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                  </Routes>
                </AdminRoute>
              } 
            />

            {/* CATCH ALL - 404 could go here, or just redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
