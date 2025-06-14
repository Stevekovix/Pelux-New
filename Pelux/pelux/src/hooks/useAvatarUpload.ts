import { useState } from 'react';
import toast from 'react-hot-toast';

// On récupère les variables d'environnement de Cloudinary
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const useAvatarUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("L'upload a échoué.");
      }

      const data = await response.json();
      toast.success('Avatar téléversé avec succès !');
      setIsUploading(false);
      return data.secure_url; // On retourne l'URL sécurisée de l'image
    } catch (error) {
      console.error('Erreur Cloudinary:', error);
      toast.error("Erreur lors de l'upload de l'avatar.");
      setIsUploading(false);
      return null;
    }
  };

  return { isUploading, uploadAvatar };
};