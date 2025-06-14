# Roadmap de développement – Pelux

Pelux est en développement actif. Cette feuille de route reflète les fonctionnalités implémentées et les étapes à venir.

---

## ✅ Phase 0 — Infrastructure & socle
- [ ] Stack React + Vite + Tailwind
- [ ] Authentification Supabase (email/password)
- [ ] Architecture 100% cloud, multi- [ ]utilisateur
- [ ] Liaison comptes Twitch / YouTube via OAuth
- [ ] Stockage Supabase simplifié (profil uniquement, pas de Storage)

----

## ✅ Phase 1 — MVP Streaming (v0.1.0)
- [ ] Création et édition d’alertes
- [ ] Génération d’URL d’overlay sécurisée (OBS)
- [ ] Interface de prévisualisation des alertes
- [ ] Gestion complète du profil utilisateur
- [ ] Système d’avatar fonctionnel via Cloudinary

----

## ✅ Patchs récents (v0.2.0)
- [ ] Refactor des pages critiques : profil, auth
- [ ] Support complet avatars Cloudinary
- [ ] Séparation stricte des types/interfaces
- [ ] Système de composants UI modulaires

----

## 🚧 Phase 2 — Freemium & Paiement (en cours)
- [ ] Intégration Stripe (plans gratuits/premium)
- [ ] Limitation des fonctionnalités selon l’abonnement
- [ ] Historique de facturation

----

## 🧠 Phase 3 — Bots, Automatisations et Triggers
- [ ] Bot Twitch connecté au chat
- [ ] Réponses automatiques (follow, mots- [ ]clés…)
- [ ] Commandes personnalisées
- [ ] Système de triggers conditionnels dynamiques
- [ ] Interface IA pour réponses intelligentes (Premium)

----

## 📊 Phase 4 — Statistiques avancées
- [ ] Dashboard de session live
- [ ] Heatmap de replay interactif
- [ ] Logs & graphes d’activité
- [ ] Exportation CSV / JSON

----

## 🚀 Phase 5 — Public Launch & Innovations
- [ ] UI responsive 100%
- [ ] Multilingue (FR / EN)
- [ ] Site marketing & onboarding
- [ ] Support utilisateur intégré
- [ ] Dashboard mobile (contrôle à distance)
- [ ] Auto-layout overlays par jeu
- [ ] Mode démo lecture seule
- [ ] Journal de sécurité (IP, activité OAuth)

- [ ]- [ ]- [ ]

## 🌐 Stack technique
- [ ] Frontend : React, Vite, Tailwind, TypeScript
- [ ] Backend : Supabase (auth, base, API)
- [ ] Stockage avatars : Cloudinary (provisoire, externe)
- [ ] Paiement à venir : Stripe
