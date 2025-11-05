# 🚀 LiveBoost

Automatise tes DMs et booste tes ventes pendant tes lives TikTok/Instagram.

## ✨ Features (Option 1 - Version Simple)

- ✅ **Timer urgence** - Compte à rebours en overlay
- ✅ **Social proof live** - "X personnes ont acheté"
- ✅ **Réduction % live** - Affiche ta promo en gros
- ✅ **Places limitées** - "Plus que 3 places !"
- ✅ **Auto-replies IA** - DMs automatiques via Claude
- ✅ **Hub unifié** - Dashboard messages
- ✅ **Revenue tracking** - Suivi temps réel
- ✅ **Interface 20 paramètres** - Simple et intuitif

## 📋 Prérequis

- **Node.js 20+** (https://nodejs.org)
- **PostgreSQL** (Supabase recommandé - gratuit)
- **Clé API Claude** (https://console.anthropic.com)

## 🎯 Installation Rapide

### Option A: PowerShell (Windows)

```powershell
# 1. Extraire le ZIP
Expand-Archive -Path automateai.zip -DestinationPath C:\automateai

# 2. Aller dans le dossier
cd C:\automateai

# 3. Installer les dépendances
npm install --legacy-peer-deps

# 4. Configurer .env
Copy-Item .env.example .env
# Éditer .env avec tes credentials

# 5. Setup database
npm run db:push

# 6. Lancer le serveur
npm run dev
```

### Option B: Ligne par ligne (plus sûr)

```powershell
# Extraire
Expand-Archive -Path automateai.zip -DestinationPath C:\automateai

# Installer
cd C:\automateai
npm install --legacy-peer-deps

# Config
Copy-Item .env.example .env
notepad .env
# Configure les variables (voir section Config)

# Database
npm run db:push

# Start
npm run dev
```

Le site sera accessible sur **http://localhost:3000** 🎉

## ⚙️ Configuration .env

Édite le fichier `.env` avec tes credentials:

```env
# 1. Database (Supabase gratuit)
DATABASE_URL="postgresql://user:password@db.xxx.supabase.co:5432/postgres"

# 2. Claude API (https://console.anthropic.com)
ANTHROPIC_API_KEY="sk-ant-api03-xxxxx"

# 3. OAuth Apps (optionnel pour démo)
FACEBOOK_APP_ID="ton_app_id"
FACEBOOK_APP_SECRET="ton_app_secret"
# etc...
```

### Setup Supabase (Database gratuite)

1. Va sur https://supabase.com
2. Crée un projet (gratuit)
3. Dans Settings > Database > Connection string
4. Copie le "Connection string" format PostgreSQL
5. Colle dans DATABASE_URL

### Setup Claude API

1. Va sur https://console.anthropic.com
2. Crée un compte
3. Génère une clé API
4. Colle dans ANTHROPIC_API_KEY

## 🎬 Utilisation

### 1. Configurer les produits

```
http://localhost:3000/produits
```

- Ajoute tes produits
- Configure les prix et messages auto

### 2. Configurer le Live

```
http://localhost:3000/live/config
```

- Choisis le produit à pousser
- Configure timer, réduction, places
- Voir l'aperçu overlay

### 3. Démarrer le Live

- Clique "🔴 Démarrer le Live"
- Copie l'URL de l'overlay
- Ajoute dans OBS comme "Browser Source"

### 4. Dashboard pendant le Live

```
http://localhost:3000/live/[liveId]
```

- Vois les stats en temps réel
- Leads chauds apparaissent automatiquement
- Envoie des DMs en 1 clic

## 📁 Structure du Projet

```
automateai/
├── src/
│   ├── app/                    # Pages Next.js
│   │   ├── page.tsx           # Landing page
│   │   ├── produits/          # Gestion produits
│   │   ├── live/
│   │   │   ├── config/        # Config live
│   │   │   └── [liveId]/      # Dashboard live
│   │   ├── overlay/[liveId]/  # Overlay OBS
│   │   ├── hub/               # Dashboard principal
│   │   ├── parametres/        # Settings
│   │   └── api/               # API routes
│   ├── components/            # Composants React
│   ├── lib/                   # Utilitaires
│   │   ├── scoring.ts         # Logique scoring
│   │   └── claude.ts          # Claude API
│   └── types/                 # Types TypeScript
├── prisma/
│   └── schema.prisma          # Database schema
├── package.json
└── .env                       # Config (à créer)
```

## 🔧 Commandes Utiles

```bash
# Dev
npm run dev              # Démarre serveur dev
npm run build            # Build production
npm run start            # Démarre production

# Database
npm run db:push          # Push schema vers DB
npm run db:studio        # UI pour voir la DB
```

## 🐛 Troubleshooting

### "npm install" échoue

```powershell
npm install --legacy-peer-deps --force
```

### Port 3000 déjà utilisé

```powershell
# Changer de port
$env:PORT=3001
npm run dev
```

### Database connection error

- Vérifie DATABASE_URL dans .env
- Teste la connexion Supabase
- Run `npm run db:push` à nouveau

### Claude API error

- Vérifie ANTHROPIC_API_KEY dans .env
- Teste la clé sur https://console.anthropic.com
- Vérifie que tu as des crédits

## 📊 Stack Technique

- **Frontend**: Next.js 14 + React 18 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **IA**: Claude API (Anthropic)
- **Real-time**: WebSocket (Socket.io)
- **Deploy**: Vercel (recommandé)

## 🚀 Déploiement Production (Vercel)

1. Push le code sur GitHub
2. Connecte GitHub à Vercel
3. Configure les env variables dans Vercel
4. Deploy automatique !

## 💰 Coûts

- **Database**: 0€ (Supabase gratuit jusqu'à 500MB)
- **Hosting**: 0€ (Vercel gratuit)
- **Claude API**: ~15€/mois par client (500 messages/jour)
- **Total**: ~15€/mois

## 📞 Support

Besoin d'aide ? Ouvre une issue ou contacte-moi !

## 🎯 Roadmap Phase 2

- [ ] Instagram OAuth complet
- [ ] TikTok OAuth complet
- [ ] Webhooks temps réel
- [ ] Redis cache
- [ ] Analytics avancés

---

**Version**: 1.0.0 - Option 1 (Version Sarah Simple)  
**Développé avec** ❤️ **par Claude + L'humain**
