import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const OverlayPage = () => {
  const { userId } = useParams<{ userId: string }>(); // Récupère l'ID depuis l'URL
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    // On s'abonne au MÊME canal que celui utilisé dans le dashboard
    const channel = supabase.channel(`user-channel-${userId}`);

    channel
      .on('broadcast', { event: 'test-alert' }, (payload) => {
        console.log('Alerte reçue !', payload);
        // On affiche le message reçu
        setAlertMessage(payload.payload.message);

        // On fait disparaître le message après 5 secondes
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
      })
      .subscribe();

    // On se désabonne proprement quand le composant est retiré
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return (
    <div className="w-screen h-screen">
      {alertMessage && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white text-4xl font-bold p-8 rounded-lg animate-pulse">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default OverlayPage;