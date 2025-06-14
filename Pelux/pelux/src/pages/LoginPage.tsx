import { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '../context/UserContext'; // 1. On importe useAuth
import { Navigate } from 'react-router-dom'; // 2. On importe Navigate

const LoginPage = () => {
  const { user, isLoading } = useAuth(); // 3. On récupère l'état de l'utilisateur

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  // ... (les fonctions handleSignUp et handleLogin ne changent pas)
  const handleSignUp = async () => {
    if (!username) {
      toast.error("Veuillez choisir un nom d'utilisateur.");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    if (error) toast.error(error.message);
    else toast.success('Compte créé !');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else toast.success('Connexion réussie !');
  };

  // 4. On gère l'état de chargement
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl text-white">Chargement...</h1>
      </div>
    );
  }

  // 5. Si l'utilisateur est connecté, on le redirige vers l'accueil
  if (user) {
    return <Navigate to="/" replace />;
  }

  // 6. Si on arrive jusqu'ici, l'utilisateur n'est pas connecté, on affiche le formulaire
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <div className="w-full max-w-md rounded-lg bg-gray-900 p-8 shadow-lg">
        {/* Le reste du JSX du formulaire ne change pas */}
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          {isLoginView ? 'Connexion à Pelux' : 'Créer un Compte'}
        </h1>
        <div className="flex flex-col gap-4">
          {!isLoginView && (
            <input
              type="text"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border-2 border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border-2 border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Votre mot de passe (6+ caractères)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border-2 border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={isLoginView ? handleLogin : handleSignUp}
            className="w-full rounded-md bg-cyan-600 py-2 font-bold text-white transition hover:bg-cyan-500"
          >
            {isLoginView ? 'Se connecter' : "S'inscrire"}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          {isLoginView ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-semibold text-cyan-400 hover:underline focus:outline-none"
          >
            {isLoginView ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;