# 📦 Pelux – README Technique

**Pelux** est une plateforme **SaaS cloud multi-utilisateur** dédiée aux streamers Twitch / YouTube.  
Elle centralise les outils essentiels : alertes, overlays, profil utilisateur, commandes bot, etc.

Inspirée de solutions comme **Streamlabs, Wizebot ou StreamElements**, elle se distingue par :
- une interface plus moderne
- des interactions temps réel
- un backend allégé (100% Supabase)

---


---

## ⚙️ Stack technique

| Élément        | Technologie                     |
|----------------|---------------------------------|
| Frontend       | React 18 + TypeScript           |
| Build          | Vite                            |
| Auth & Backend | Supabase (auth, BDD, policies)  |
| Storage        | Cloudinary (avatar), Supabase (optionnel) |
| UI             | TailwindCSS                     |
| Notifications  | react-hot-toast                 |
| Routing        | react-router-dom                |

---

## 📁 Structure des dossiers

```
src/
├── components/             # UI réutilisables
├── context/                # React Contexts (auth, profil, comptes liés)
├── hooks/                  # Hooks custom (ex: useCommandes, useAvatarUpload, useTriggerRulesDB)
├── pages/
│   └── auth/               # AuthPage, ProfilPage
├── lib/                    # Config Supabase
├── routes/                 # AppRoutes.tsx
├── types/                  # Interfaces : User, Profile, LinkedAccount
```

---

## 👤 Authentification

- Email/password
- OAuth : Twitch & Google
- AuthProvider (`context/UserContext.tsx`)
- Le plan utilisateur (`metadata.plan`) permet de différencier **Free** et **Premium**

---

## 🧠 Données globales via Context API

| Contexte               | Données exposées                      |
|------------------------|----------------------------------------|
| UserContext            | Utilisateur connecté, login/signup    |
| ProfileContext         | Données issues de la table `profiles` |
| LinkedAccountsContext  | Comptes liés (Google / Twitch)        |

---

## ✨ Fonctionnalités principales

- 🔐 Authentification & gestion des sessions
- 🧸 Modification de l’avatar utilisateur (Cloudinary)
- ✏️ Édition du username/email
- 🤖 Commandes personnalisées (3 max en free, ∞ en premium)
- 🔗 Lier / délier comptes Twitch & Google
- 🧪 Triggers conditionnels : follow, messages
- 🎵 Alertes personnalisées avec son et animation
- 🖼️ Overlay OBS public avec preview en temps réel


---

## 🛠️ Scripts

```bash
npm install          # Installe les dépendances
npm run dev          # Lance le projet en mode dev (localhost:5173)
npm run build        # Build production
```

---

## ✅ Standards et bonnes pratiques

- Typage strict avec `interface` dans `types/`
- Séparation claire entre UI (components), logique (hooks) et data (context)
- Composants segmentés pour `ProfilPage`
- Requêtes Supabase dans les hooks ou context, pas dans les composants
- Préférer `useCallback` sur les fonctions asynchrones appelées depuis des effets
- Les `broadcasts` overlay doivent passer par un seul canal Supabase (memoisé)

---

## 🗺️ Pour suivre l'avancement

- 📋 `CHANGELOG.md` : Historique des modifications
- 📌 `ROADMAP.md` : Étapes majeures du projet
- 🧠 `RESUME_PELUX.md` : Résumé fonctionnel + technique
- 🛠️ `refactor_priorite.md` : Fichiers critiques à refactoriser
- 💡 `SUGGESTION.md` : Idées en réflexion

---

## 🔒 Variables d’environnement (.env)

```
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=...
VITE_CLOUDINARY_UPLOAD_PRESET=pelux-avatar
VITE_CLOUDINARY_CLOUD_NAME=dgwroilcf
```

---

## 👀 À faire / En cours

- [ ] Triggers conditionnels + overlay isolé
- [ ] Intégration preview son & animation
- [ ] Refactorisation finale des pages alertes / commandes
- [ ] Séparation formulaire AuthPage
- [ ] Export `.env.example`
- [ ] Auto-layout overlay (selon jeu)


---

Pour toute question : consulte les fichiers `.md` associés, ou ping un contributeur ✉️