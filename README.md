# 🎓 LYCÉE PASCAL NJÈRÈ IV - APPLICATION COMPLÈTE

## ✅ CE QUI EST INCLUS

- Interface moderne et professionnelle
- Navigation fonctionnelle entre toutes les pages
- Serveur backend Node.js avec Express
- Base de données JSON
- APIs pour gérer le personnel, les élèves et les notes
- Dashboard avec statistiques
- Toutes les pages : Personnel, Élèves, Emploi du Temps, Absences, Finance, Bulletins

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
│   ├── personnel.json
│   ├── eleves.json
│   ├── absences.json
│   ├── finances.json
│   ├── emplois.json
│   ├── bulletins.json
│   └── notes.json
└── public/                # Pages HTML
    ├── index.html         # Dashboard
    ├── personnel.html
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

### ✅ Personnel
- Catégories : Administration, Professeurs, Personnels d'appui
- Ajouter, modifier, supprimer un personnel
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

### Personnel
- `GET /api/personnel` - Liste tout le personnel
- `POST /api/personnel` - Ajouter un personnel
- `PUT /api/personnel/:id` - Modifier un personnel
- `DELETE /api/personnel/:id` - Supprimer un personnel

### Élèves
- `GET /api/eleves` - Liste tous les élèves
- `POST /api/eleves` - Inscrire un élève
- `PUT /api/eleves/:id` - Modifier un élève
- `DELETE /api/eleves/:id` - Supprimer un élève

### Absences
- `GET /api/absences` - Liste toutes les absences
- `POST /api/absences` - Ajouter une absence
- `PUT /api/absences/:id` - Modifier une absence
- `DELETE /api/absences/:id` - Supprimer une absence

### Finances
- `GET /api/finances` - Liste tous les paiements
- `POST /api/finances` - Enregistrer un paiement
- `PUT /api/finances/:id` - Modifier un paiement
- `DELETE /api/finances/:id` - Supprimer un paiement

### Emploi du temps
- `GET /api/emplois` - Liste tous les créneaux
- `POST /api/emplois` - Ajouter un créneau
- `PUT /api/emplois/:id` - Modifier un créneau
- `DELETE /api/emplois/:id` - Supprimer un créneau

### Bulletins
- `GET /api/bulletins` - Liste tous les bulletins
- `POST /api/bulletins` - Générer un bulletin
- `PUT /api/bulletins/:id` - Modifier un bulletin
- `DELETE /api/bulletins/:id` - Supprimer un bulletin

### Notes
- `GET /api/notes` - Liste toutes les notes
- `POST /api/notes` - Enregistrer une note
- `PUT /api/notes/:id` - Modifier une note
- `DELETE /api/notes/:id` - Supprimer une note

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
