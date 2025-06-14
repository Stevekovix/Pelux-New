# Roadmap de Développement pour Pelux 🐻‍❄️

Ce document est la feuille de route complète pour la création de Pelux, notre plateforme SaaS pour les créateurs de contenu. Chaque phase est une étape majeure de notre projet.

---

## Partie 1 : Les Fondations (Terminé ✅)

*Objectif : Mettre en place un squelette d'application sécurisé et fonctionnel.*

### **Phase 1-3 : Planification et Outillage**
- **Fait :** Définition de l'architecture (Frontend, Backend, Base de données).
- **Fait :** Création de l'identité visuelle de "Pelux".
- **Fait :** Installation des outils de développement (VS Code, Node.js).

### **Phase 4-6 : Système d'Authentification**
- **Fait :** Création du projet sur Supabase (notre "cerveau").
- **Fait :** Connexion sécurisée entre notre application et Supabase.
- **Fait :** Création de la page de connexion / inscription fonctionnelle.

### **Phase 7-8 : Espace Utilisateur Sécurisé**
- **Fait :** Création d'une page "Tableau de Bord" protégée.
- **Fait :** Implémentation de la logique de redirection pour les utilisateurs non connectés.
- **Fait :** Ajout d'un bouton de déconnexion fonctionnel.

### **Phase 9 : Connexion aux Services Externes**
- **Fait :** Déclaration de Pelux auprès de la console développeur Twitch.
- **Fait :** Configuration du fournisseur d'authentification OAuth pour Twitch dans Supabase.
- **Fait :** Ajout du bouton "Connecter mon compte Twitch" et validation du flux de connexion.

---

## Partie 2 : Les Fonctionnalités Essentielles (À Venir 🚀)

*Objectif : Construire les outils de base que tout streamer attend.*

### **Phase 10 : Interaction avec l'API Twitch**
- Utiliser le "laissez-passer" (token) obtenu pour afficher des informations dynamiques sur le tableau de bord (ex: statut du live "En ligne/Hors ligne", nombre de followers, titre du stream).
- Mettre en place un rafraîchissement automatique de ces données.

### **Phase 11 : Le Système d'Alertes en Temps Réel**
- **Backend :** Mettre en place Twitch EventSub pour "écouter" les événements en direct (nouveau follow, don, sub, raid).
- **Frontend (Dashboard) :** Créer une page "Alertes" où l'utilisateur pourra personnaliser le message, l'image (GIF) et le son pour chaque type d'événement.
- **Frontend (Overlay) :** Créer une page spéciale "Source Navigateur" (ex: `/overlay/alerts`). C'est cette URL que le streamer ajoutera dans son logiciel (OBS, Streamlabs) pour afficher les alertes en direct sur son stream.

### **Phase 12 : Le Chat Bot Basique**
- **Backend :** Connecter Pelux au chat Twitch via le protocole IRC.
- **Frontend (Dashboard) :** Créer une page "Commandes Chat" pour que l'utilisateur puisse créer des commandes personnalisées simples (ex: `!discord`, `!reseaux`).
- **Backend :** Mettre en place la logique pour que le bot réponde automatiquement dans le chat quand une commande est tapée.

---

## Partie 3 : L'Expansion Multi-Plateformes

*Objectif : Tenir la promesse d'être un outil "Multi-Plateforme".*

### **Phase 13 : Intégration de YouTube**
- Répéter le processus de la Phase 9 pour l'API Google/YouTube (créer un projet sur la Google Cloud Console, obtenir les clés, configurer Supabase).
- Adapter le tableau de bord pour afficher les informations de la chaîne YouTube connectée.
- Adapter le système d'alertes et de commandes pour qu'il soit compatible avec YouTube Live.

### **Phase 14 : Intégration de Kick et TikTok**
- Répéter le processus pour les API de Kick et TikTok (si leurs API publiques le permettent de manière stable).
- L'objectif est d'avoir une section "Connexions" unifiée où l'utilisateur voit tous ses comptes liés.

---

## Partie 4 : Le Modèle Économique (Freemium)

*Objectif : Transformer Pelux en un vrai produit SaaS avec des revenus.*

### **Phase 15 : Implémentation du "Freemium" et des Paiements**
- **Définition des Tiers :**
  - **Free :** 1 plateforme connectée, 5 commandes de chat, alertes basiques, avec un petit logo "Pelux".
  - **Premium :** Multi-plateformes, commandes illimitées, alertes avancées (animations, sons custom), pas de logo, accès aux statistiques.
- **Intégration de Stripe :**
  - Mettre en place le processus d'abonnement avec Stripe Checkout.
  - Créer des webhooks pour que Stripe informe automatiquement notre base de données Supabase quand un utilisateur paie (ou arrête de payer) afin de débloquer/bloquer les fonctionnalités "Premium".

### **Phase 16 : Fonctionnalités "Premium" Avancées**
- Construire un tableau de bord de statistiques (évolution des followers, spectateurs moyens, etc.).
- Développer un éditeur d'alertes plus poussé (animations CSS, conditions d'affichage).
- Ajouter des modules interactifs pour le chat (sondages, prédictions, mini-jeux).

---

## Partie 5 : Finitions et Lancement

*Objectif : Polir l'application pour la rendre professionnelle, moderne et prête pour le public.*

### **Phase 17 : Raffinement du Design (UI/UX)**
- Abandonner le style basique pour implémenter un vrai design system avec Tailwind CSS, en s'inspirant de l'élégance de Huly.io.
- S'assurer que l'intégralité du site est parfaitement "responsive" (utilisable sur mobile, tablette et ordinateur).
- Travailler l'expérience utilisateur pour que tout soit fluide et intuitif.

### **Phase 18 : Le Support Multilingue**
- Intégrer une librairie d'internationalisation (comme `next-intl`).
- Traduire l'interface au minimum en Français et en Anglais pour commencer.

### **Phase 19 : Déploiement en Production**
- Acheter un nom de domaine (ex: `pelux.io`).
- Configurer le déploiement final sur Vercel.
- Mettre en place un monitoring d'erreurs (Sentry) et de performance pour s'assurer que l'application est rapide et stable.

### **Phase 20 : Lancement !**
- Lancer une version "Bêta" pour un petit groupe d'utilisateurs afin de récolter les premiers retours.
- Communiquer sur le lancement.
- Mettre en place un cycle de développement continu basé sur les retours des utilisateurs.