import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Loader2 } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in, check role
  useEffect(() => {
    if (!loading && user) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        // User is logged in but doesn't have the admin role
        setError('Access Denied: You do not have administrative privileges.');
        setIsSubmitting(false);
        // Force sign out so they can try a different account if needed
        supabase?.auth.signOut();
      }
    }
  }, [user, role, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!supabase) {
      setError('System Error: Supabase client is not configured.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Invalid login credentials.');
        setIsSubmitting(false);
        return;
      }
      
      // We don't manually check role here, AuthContext handles it and
      // the useEffect above will redirect them if they're admin.
      // Wait for auth context to update and redirect naturally.
    } catch (err) {
      setError('An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#7A9E7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#171717] border border-[#2A2A2A] rounded-lg p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0A0A0A] border border-[#7A9E7E] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-[#7A9E7E]" />
          </div>
          <h1 className="text-2xl font-bold font-['Montserrat'] text-white">Admin Secure Login</h1>
          <p className="text-neutral-400 text-sm mt-2">Authentication required for access.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-neutral-700 focus:border-[#7A9E7E] text-white text-sm rounded p-3 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-neutral-700 focus:border-[#7A9E7E] text-white text-sm rounded p-3 outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#E8871E] hover:bg-[#d47817] disabled:bg-[#d47817]/50 text-white font-bold py-3.5 rounded text-sm transition-colors"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-neutral-800 pt-6">
          <a href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">
            &larr; Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
};
