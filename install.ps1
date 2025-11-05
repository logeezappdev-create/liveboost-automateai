# LiveBoost - Installation Script
# Run: .\install.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🚀 LiveBoost" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Vérification Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non trouvé!" -ForegroundColor Red
    Write-Host "Télécharge Node.js: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "Installation des dépendances (2-3 min)..." -ForegroundColor Yellow
npm install --legacy-peer-deps

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation échouée!" -ForegroundColor Red
    Write-Host "Essaie: npm install --legacy-peer-deps --force" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Dépendances installées" -ForegroundColor Green

# Check .env
Write-Host ""
if (Test-Path ".env") {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
} else {
    Write-Host "⚠️  Fichier .env manquant!" -ForegroundColor Yellow
    Write-Host "Création depuis .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ .env créé" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Édite .env avec tes credentials!" -ForegroundColor Yellow
    Write-Host "   - DATABASE_URL (Supabase)" -ForegroundColor Yellow
    Write-Host "   - ANTHROPIC_API_KEY (Claude)" -ForegroundColor Yellow
    Write-Host ""
    $edit = Read-Host "Éditer .env maintenant? (o/n)"
    if ($edit -eq "o") {
        notepad .env
    }
}

# Setup database
Write-Host ""
Write-Host "Setup database..." -ForegroundColor Yellow
$setupDb = Read-Host "Push le schema Prisma vers la DB? (o/n)"
if ($setupDb -eq "o") {
    npm run db:push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database configurée" -ForegroundColor Green
    } else {
        Write-Host "❌ Database setup échoué" -ForegroundColor Red
        Write-Host "Vérifie DATABASE_URL dans .env" -ForegroundColor Yellow
    }
}

# Done
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Installation terminée!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pour démarrer:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Puis ouvre: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

$start = Read-Host "Démarrer maintenant? (o/n)"
if ($start -eq "o") {
    Write-Host ""
    Write-Host "🚀 Démarrage du serveur..." -ForegroundColor Green
    Write-Host "Ouvre http://localhost:3000 dans ton navigateur" -ForegroundColor Cyan
    Write-Host ""
    npm run dev
}
