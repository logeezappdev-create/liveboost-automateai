@echo off
chcp 65001 >nul
echo ═══════════════════════════════════════
echo    🚀 LIVEBOOST - Installation
echo ═══════════════════════════════════════
echo.

echo ⚠️  NOTE: Ce script va lancer PowerShell
echo    Si tu préfères installer manuellement,
echo    ouvre QUICKSTART.txt
echo.
pause

echo.
echo Lancement de l'installation PowerShell...
echo.

powershell -ExecutionPolicy Bypass -File install.ps1

pause
