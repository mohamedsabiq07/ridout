import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#7A9E7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in, but NOT an admin -> Access Denied
  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#171717] border border-red-900/50 p-8 rounded-lg max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-['Montserrat'] mb-2">Access Restricted</h1>
            <p className="text-neutral-400 text-sm">
              You do not have permission to access this area. If you believe this is an error, please contact the system administrator.
            </p>
          </div>
          <a
            href="/"
            className="inline-block bg-[#E8871E] hover:bg-[#d47817] text-white font-bold py-3 px-6 rounded transition-colors"
          >
            Return to Website
          </a>
        </div>
      </div>
    );
  }

  // User is authenticated AND has admin role
  return <>{children}</>;
};
