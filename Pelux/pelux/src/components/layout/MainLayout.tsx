import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/UserContext';
import { useProfile } from '../../context/ProfileContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const MainLayout = () => {
  const { user } = useAuth();
  const { profile, isLoading } = useProfile();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion');
    } else {
      toast.success('Vous êtes déconnecté.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Toaster />
      <header className="bg-gray-900 p-4 shadow-md">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-cyan-400">
              Pelux
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isLoading ? (
              <span>Chargement...</span>
            ) : user && profile ? (
              // --- Vue quand l'utilisateur est connecté ---
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/profil" className="hover:text-cyan-400 transition">
                  <span>{profile.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-600 px-3 py-1 font-semibold transition hover:bg-red-500"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              // --- Vue quand l'utilisateur n'est pas connecté ---
              <Link to="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;