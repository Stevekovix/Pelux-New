import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './context/UserContext.tsx';
import { ProfileProvider } from './context/ProfileContext.tsx'; // 1. Importer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider> {/* 2. Envelopper avec le ProfileProvider */}
        <App />
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>
);