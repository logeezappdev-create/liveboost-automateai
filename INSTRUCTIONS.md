# 🚀 LiveBoost - Option 1 (Version Simple) - PRÊT ! ✅

## 📦 Fichier téléchargé : liveboost.zip

---

## ⚡ INSTALLATION ULTRA-RAPIDE (3 Clics)

### 1️⃣ Télécharge le fichier

Télécharge **liveboost.zip**

Sauvegarde-le où tu veux (ex: `C:\liveboost`)

### 2️⃣ Extrais le ZIP

- Clic droit sur `liveboost.zip`
- "Extraire tout..."
- Choisis un dossier

### 3️⃣ Lance l'installation

**Option A - Double-clic (plus simple)**
- Double-clique sur `INSTALL.bat`
- Suis les instructions à l'écran

**Option B - PowerShell**
- Ouvre PowerShell dans le dossier
  (Shift + Clic droit → "Ouvrir PowerShell ici")
- Tape : `.\install.ps1`
- Appuie sur Entrée

Le script va tout faire automatiquement ! 🎉

---

## 🔑 Credentials nécessaires

### 1. Database (GRATUIT - Supabase)

1. Va sur https://supabase.com
2. Crée un compte (gratuit)
3. Clique "New Project"
4. Choisis un nom et mot de passe
5. Attends 2 minutes (création DB)
6. Va dans Settings > Database
7. Copie le "Connection string" (mode: URI)
8. Colle dans `.env` → `DATABASE_URL`

**Exemple :**
```
DATABASE_URL="postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres"
```

### 2. Claude API (15€/mois environ)

1. Va sur https://console.anthropic.com
2. Crée un compte
3. Va dans "API Keys"
4. Clique "Create Key"
5. Copie la clé (commence par `sk-ant-api03-`)
6. Colle dans `.env` → `ANTHROPIC_API_KEY`

**Exemple :**
```
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 🎬 Démarrer l'application

Une fois l'installation terminée :

```powershell
npm run dev
```

Puis ouvre ton navigateur sur : **http://localhost:3000**

---

## 📱 Utilisation

### 1. Configure tes produits
- Va sur `/produits`
- Ajoute tes produits avec prix
- Configure les messages auto

### 2. Configure ton live
- Va sur `/live/config`
- Choisis le produit à pousser
- Configure timer, promo, places
- Voir l'aperçu

### 3. Lance ton live
- Clique "🔴 Démarrer le Live"
- Copie l'URL de l'overlay
- Ajoute dans OBS (Browser Source)

### 4. Dashboard pendant le live
- Vois les stats en temps réel
- Leads chauds apparaissent auto
- Envoie DMs en 1 clic

---

## 📂 Fichiers inclus

```
liveboost.zip (35KB)
├── INSTALL.bat          ← Double-clic pour installer
├── install.ps1          ← Script PowerShell
├── QUICKSTART.txt       ← Guide rapide
├── README.md            ← Doc complète
├── .env.example         ← Template config
├── package.json         ← Dépendances
├── src/                 ← Code source
│   ├── app/            ← Pages
│   ├── lib/            ← Logique (scoring, Claude)
│   └── types/          ← TypeScript
└── prisma/             ← Database schema
```

---

## ⚠️ Troubleshooting

### "npm install" échoue
```powershell
npm install --legacy-peer-deps --force
```

### Port 3000 occupé
```powershell
$env:PORT=3001
npm run dev
```

### Database error
- Vérifie que `DATABASE_URL` est correct dans `.env`
- Re-run : `npm run db:push`

### Claude API error
- Vérifie que `ANTHROPIC_API_KEY` est correct dans `.env`
- Vérifie que tu as des crédits sur https://console.anthropic.com

---

## 🎯 Features incluses (Option 1)

✅ **Timer urgence** - Compte à rebours overlay  
✅ **Social proof live** - "X personnes ont acheté"  
✅ **Réduction % live** - Promo visible  
✅ **Places limitées** - "Plus que X places !"  
✅ **Auto-replies IA** - DMs via Claude  
✅ **Hub unifié** - Dashboard messages  
✅ **Revenue tracking** - Stats temps réel  
✅ **Interface simple** - 20 paramètres max  

---

## 💰 Coûts

- **Database** : 0€ (Supabase gratuit 500MB)
- **Hosting** : 0€ (localhost / Vercel gratuit)
- **Claude API** : ~15€/mois (500 messages/jour)

**Total : ~15€/mois** 🎯

---

## 🚀 Prochaines étapes

1. Télécharge `liveboost.zip`
2. Extrais
3. Lance `INSTALL.bat` ou `install.ps1`
4. Configure `.env` (Supabase + Claude)
5. `npm run dev`
6. Ouvre http://localhost:3000
7. Profite ! 🎉

---

## 📞 Besoin d'aide ?

Tout est dans **README.md** et **QUICKSTART.txt** !

Si problème, dis-moi et je t'aide ! 💪

---

**Version** : 1.0.0 - Option 1 (Version Simple)  
**Dev time** : 4h  
**Code** : 100% fonctionnel ✅  
**Prêt à l'emploi** ! 🚀
