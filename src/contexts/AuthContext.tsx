import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'customer' | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'customer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchSession = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (mounted) {
        if (session?.user) {
          setUser(session.user);
          await fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase?.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        if (session?.user) {
          setLoading(true);
          setUser(session.user);
          await fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
      }
    }) || { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
      
      if (data && !error) {
        setRole(data.role as 'admin' | 'customer');
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error('Error fetching role:', err);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
