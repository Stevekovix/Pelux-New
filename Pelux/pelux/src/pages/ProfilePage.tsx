import { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { useAvatarUpload } from '../hooks/useAvatarUpload';
import toast from 'react-hot-toast';
import { useAuth } from '../context/UserContext';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
  const { user, refreshUserSession } = useAuth();
  const { profile, isLoading: isProfileLoading, updateProfile } = useProfile();
  const { isUploading, uploadAvatar } = useAvatarUpload();

  const [username, setUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
    }
  }, [profile]);

  const handleUpdateUsername = async () => {
    if (username === profile?.username) {
      toast.error("Vous n'avez pas changé votre nom d'utilisateur.");
      return;
    }
    setIsUpdatingUsername(true);
    await updateProfile({ username });
    setIsUpdatingUsername(false);
  };

  const handleUpdateAvatar = async () => {
    if (!avatarFile) {
      toast.error('Veuillez sélectionner une image.');
      return;
    }
    const newAvatarUrl = await uploadAvatar(avatarFile);
    if (newAvatarUrl) {
      await updateProfile({ avatar_url: newAvatarUrl });
      setAvatarFile(null);
    }
  };

  const handleLinkTwitch = async () => {
    const { error } = await supabase.auth.linkIdentity({
      provider: 'twitch',
      options: {
        redirectTo: window.location.origin + '/profil',
      },
    });
    if (error) {
      toast.error('Erreur lors de la liaison du compte Twitch.');
      console.error(error);
    }
  };

  const twitchIdentity = user?.identities?.find(
    (identity) => identity.provider === 'twitch'
  );

  const handleUnlinkTwitch = async () => {
    if (twitchIdentity) {
      const { error } = await supabase.auth.unlinkIdentity(twitchIdentity);
      if (error) {
        toast.error("Erreur lors de la dissociation du compte.");
        console.error(error);
      } else {
        await refreshUserSession(); // On force la mise à jour de l'état global
        toast.success("Compte Twitch dissocié avec succès.");
      }
    }
  };

  if (isProfileLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <h1 className="text-2xl text-white">Chargement du profil...</h1>
        </div>
    );
  }

  const avatarSrc = avatarFile
    ? URL.createObjectURL(avatarFile)
    : profile?.avatar_url ||
      `https://api.dicebear.com/8.x/pixel-art/svg?seed=${profile?.id}`;
      
  const isTwitchLinked = user?.app_metadata.providers.includes('twitch');
  const twitchUsername = twitchIdentity?.identity_data?.user_name;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <div className="flex flex-col gap-8 max-w-md">
        
        {/* --- Bloc : Comptes Liés --- */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Comptes Liés</h2>
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-400">Twitch</span>
            {isTwitchLinked ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-400 font-semibold">
                  <span>✅</span>
                  <span>{twitchUsername || 'Compte lié'}</span>
                </div>
                <button
                  onClick={handleUnlinkTwitch}
                  className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-500"
                >
                  Dissocier
                </button>
              </div>
            ) : (
              <button
                onClick={handleLinkTwitch}
                className="rounded-md bg-purple-600 px-4 py-2 font-bold text-white transition hover:bg-purple-500"
              >
                Lier mon compte
              </button>
            )}
          </div>
        </div>

        {/* --- Bloc : Mise à jour de l'avatar --- */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Image de profil</h2>
          <div className="flex flex-col items-center gap-4">
            <img src={avatarSrc} alt="Avatar" className="w-24 h-24 rounded-full bg-gray-700 object-cover" />
            <input
              type="file"
              id="avatar"
              accept="image/png, image/jpeg"
              onChange={(e) => e.target.files && setAvatarFile(e.target.files[0])}
              disabled={isUploading}
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 disabled:opacity-50"
            />
            <button
              onClick={handleUpdateAvatar}
              disabled={!avatarFile || isUploading}
              className="w-full rounded-md bg-cyan-600 py-2 font-bold text-white transition hover:bg-cyan-500 disabled:opacity-50"
            >
              {isUploading ? 'Envoi en cours...' : "Mettre à jour l'avatar"}
            </button>
          </div>
        </div>

        {/* --- Bloc : Mise à jour du nom d'utilisateur --- */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Nom d'utilisateur</h2>
          <div className="flex flex-col gap-4">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isUpdatingUsername}
              className="w-full rounded-md border-2 border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-400 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleUpdateUsername}
              disabled={username === profile?.username || isUpdatingUsername}
              className="w-full rounded-md bg-cyan-600 py-2 font-bold text-white transition hover:bg-cyan-500 disabled:opacity-50"
            >
              {isUpdatingUsername ? 'Mise à jour...' : "Mettre à jour le nom"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;