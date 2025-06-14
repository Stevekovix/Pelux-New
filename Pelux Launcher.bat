@echo off
title Pelux Launcher

:: =================================================================
:: ======================== CONFIGURATION ==========================
::     MODIFIEZ LES 2 LIGNES CI-DESSOUS AVEC VOS PROPRES CHEMINS
:: =================================================================

:: 1. Indiquez le chemin complet vers le dossier de votre projet Pelux
:: Exemple: set PELUX_PROJECT_PATH="C:\Users\VotreNom\Documents\Projets\pelux"
set PELUX_PROJECT_PATH="F:\Pelux-New\Pelux\pelux"

:: 2. Indiquez le chemin complet vers votre fichier ngrok.exe
:: Exemple: set NGROK_PATH="C:\Outils\ngrok.exe"
set NGROK_PATH="F:\Pelux-New\ngrok.exe"


:: =================================================================
:: ================= Lancement des services ========================
::               NE RIEN MODIFIER CI-DESSOUS
:: =================================================================

ECHO ########################################################
ECHO #                                                      #
ECHO #           Lanceur de developpement pour Pelux        #
ECHO #                                                      #
ECHO ########################################################
ECHO.

ECHO Lancement du serveur Next.js dans une nouvelle fenetre...
:: On se place dans le bon dossier puis on lance l'application
cd /d %PELUX_PROJECT_PATH%
START "Pelux App (Next.js)" cmd /k npm run dev

ECHO.
ECHO Lancement du tunnel ngrok dans une nouvelle fenetre...
:: On lance ngrok
START "Ngrok Tunnel" %NGROK_PATH% http 3000

ECHO.
ECHO C'est fait ! Les deux services ont ete lances.
ECHO Vous pouvez fermer cette fenetre principale.
ECHO.
pause