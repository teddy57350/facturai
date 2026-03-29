@echo off
REM Script de setup automatique Facturly pour Windows
REM Usage: setup.bat

echo.
echo ================================
echo    SETUP FACTURLY
echo ================================
echo.

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js n'est pas installe
    echo   Installer depuis: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detecte
echo.

REM Installer les dépendances
echo Installation des dependances...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo X Erreur lors de l'installation
    pause
    exit /b 1
)

echo [OK] Dependances installees
echo.

REM Configurer .env
if not exist .env (
    echo Configuration de l'environnement...
    copy .env.example .env
    echo.
    echo Veuillez editer le fichier .env et ajouter votre cle API Anthropic
    echo   ANTHROPIC_API_KEY=sk-ant-xxxxx
    echo.
    pause
) else (
    echo [OK] Fichier .env deja present
)

echo.
echo ================================
echo    Setup termine !
echo ================================
echo.
echo Pour demarrer l'application:
echo   npm run dev
echo.
echo Puis ouvrir: http://localhost:3000
echo.
pause
