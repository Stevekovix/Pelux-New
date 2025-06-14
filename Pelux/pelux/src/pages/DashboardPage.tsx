import { useAuth } from '../context/UserContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const { user } = useAuth();

  // On construit l'URL ici, dans une variable JavaScript
  const overlayUrl = `${window.location.origin}/overlay/${user?.id}`;

  const handleTestAlert = async () => {
    if (!user) return;

    // On crée un "canal" de communication unique pour cet utilisateur
    const channel = supabase.channel(`user-channel-${user.id}`);

    // On envoie un message sur ce canal
    const status = await channel.send({
      type: 'broadcast',
      event: 'test-alert', // Le nom de notre événement
      payload: { message: `Alerte de test pour ${user.email} !` },
    });

    if (status === 'ok') {
      toast.success('Alerte de test envoyée !');
    } else {
      toast.error("Erreur lors de l'envoi de l'alerte.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">URL de votre Overlay</h2>
        <p className="text-sm text-gray-400 mb-2">
          Copiez cette URL et ajoutez-la comme une "Source Navigateur" dans votre logiciel de streaming (OBS, etc.).
        </p>
        <input
          type="text"
          readOnly
          // On utilise les accolades pour passer le contenu de la variable
          value={overlayUrl}
          className="w-full bg-gray-800 border-2 border-gray-700 rounded-md p-2 text-cyan-400"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(overlayUrl);
            toast.success('URL copiée !');
          }}
          className="mt-2 text-sm text-gray-300 hover:text-white"
        >
          Copier dans le presse-papiers
        </button>
        <hr className="my-6 border-gray-700" />
        <h2 className="text-lg font-semibold mb-4">Tester vos alertes</h2>
        <button
          onClick={handleTestAlert}
          className="rounded-md bg-indigo-600 px-4 py-2 font-bold text-white transition hover:bg-indigo-500"
        >
          Lancer une Alerte de Test
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;