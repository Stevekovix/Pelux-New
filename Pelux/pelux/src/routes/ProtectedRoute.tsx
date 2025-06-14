import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

// Ce composant prend en "enfant" la page qu'on veut protéger
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();

  // 1. Pendant que l'on vérifie l'état de l'authentification, on ne montre rien
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl text-white">Chargement...</h1>
      </div>
    );
  }

  // 2. Si le chargement est terminé et qu'il n'y a PAS d'utilisateur...
  if (!user) {
    // ...on redirige vers la page de connexion.
    return <Navigate to="/login" replace />;
  }

  // 3. Si le chargement est terminé ET qu'il y a un utilisateur, on affiche la page protégée.
  return children;
};

export default ProtectedRoute;