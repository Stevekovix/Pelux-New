import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refreshUserSession: () => Promise<void>; // On ajoute notre nouvelle fonction
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );
    return () => { subscription?.unsubscribe(); };
  }, []);

  // Notre nouvelle fonction pour forcer la mise à jour
  const refreshUserSession = async () => {
    // refreshSession() va mettre à jour la session et déclencher onAuthStateChange
    // ce qui mettra à jour notre état 'user' automatiquement.
    await supabase.auth.refreshSession();
  };

  const value = {
    user,
    isLoading,
    refreshUserSession, // On expose la fonction dans le contexte
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};