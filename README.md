# 🎓 LYCÉE PASCAL NJÈRÈ IV - APPLICATION COMPLÈTE

## ✅ CE QUI EST INCLUS

- Interface moderne et professionnelle
- Navigation fonctionnelle entre toutes les pages
- Serveur backend Node.js avec Express
- Base de données JSON
- APIs pour gérer professeurs et élèves
- Dashboard avec statistiques
- Toutes les pages : Professeurs, Élèves, Emploi du Temps, Absences, Finance, Bulletins

## 🚀 INSTALLATION RAPIDE

### 1. Installer Node.js (si pas déjà fait)
- Va sur https://nodejs.org/
- Télécharge et installe la version LTS
- Redémarre ton ordinateur

### 2. Installer les dépendances
Ouvre un terminal dans ce dossier et tape:
```bash
npm install
```

### 3. Démarrer l'application
```bash
npm start
```

### 4. Ouvrir dans le navigateur
Ouvre ton navigateur et va sur:
```
http://localhost:3000
```

## 📁 STRUCTURE DU PROJET

```
lycee-pascal-njere-iv/
├── server.js              # Serveur backend
├── package.json           # Dépendances
├── data/                  # Base de données JSON
│   ├── professeurs.json
│   └── eleves.json
└── public/                # Pages HTML
    ├── index.html         # Dashboard
    ├── professeurs.html
    ├── eleves.html
    ├── emploi-temps.html
    ├── absences.html
    ├── finance.html
    └── bulletins.html
```

## 🎯 FONCTIONNALITÉS

### ✅ Dashboard
- Vue d'ensemble avec statistiques en temps réel
- Navigation vers tous les modules

### ✅ Professeurs
- Liste complète des professeurs
- Ajouter un nouveau professeur
- Modifier les informations
- Supprimer un professeur
- Recherche

### ✅ Élèves
- Liste des élèves avec photos
- Inscription d'un nouvel élève
- Modification des dossiers
- Filtres par classe et statut financier

### ✅ Autres modules
- Emploi du Temps
- Suivi des Absences
- Gestion Financière (APEE)
- Génération de Bulletins

## 🛠️ APIS DISPONIBLES

### Professeurs
- `GET /api/professeurs` - Liste tous les professeurs
- `POST /api/professeurs` - Ajouter un professeur
- `PUT /api/professeurs/:id` - Modifier un professeur
- `DELETE /api/professeurs/:id` - Supprimer un professeur

### Élèves
- `GET /api/eleves` - Liste tous les élèves
- `POST /api/eleves` - Inscrire un élève
- `PUT /api/eleves/:id` - Modifier un élève
- `DELETE /api/eleves/:id` - Supprimer un élève

### Statistiques
- `GET /api/stats` - Statistiques du dashboard

## 📝 NOTES

- Les données sont sauvegardées dans des fichiers JSON
- Toutes les modifications sont persistantes
- L'application fonctionne en local sur ton ordinateur
- Pour arrêter le serveur : CTRL+C dans le terminal

## 🎉 FÉLICITATIONS !

Ton système de gestion scolaire est prêt à être utilisé !

---
Fait avec ❤️ pour le Lycée Pascal Njèrè IV
