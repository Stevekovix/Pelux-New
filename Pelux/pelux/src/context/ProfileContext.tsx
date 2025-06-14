import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/Profile';
import { useAuth } from './UserContext';
import toast from 'react-hot-toast';

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  // La fonction accepte maintenant un objet avec les champs à mettre à jour
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

// ... (createContext et le début de ProfileProvider ne changent pas)
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ... (useEffect ne change pas)
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (error) console.error("Erreur fetch profil", error);
        else setProfile(data);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [user]);
  
  // Fonction de mise à jour améliorée
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    const finalUpdates = {
      ...updates,
      updated_at: new Date(), // On met toujours à jour la date de modification
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(finalUpdates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      console.error(error);
    } else {
      setProfile(data); // On met à jour l'état local avec les nouvelles données
      toast.success("Profil mis à jour !");
    }
  };

  const value = { profile, isLoading, updateProfile };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  // ... (useProfile ne change pas)
  const context = useContext(ProfileContext);
  if (context === undefined) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};