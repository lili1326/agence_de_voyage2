# Agence de Voyage - API + Front (Node.js + MongoDB)

Projet simple d'une API REST avec interface web pour gérer des voyages.

---

## Prérequis

Avant de commencer, installe :

- [Node.js](https://nodejs.org) (v16+ recommandé)
- [MongoDB](https://www.mongodb.com/try/download/community) installé **en local** (port 27017 par défaut)
- (Facultatif) [MongoDB Compass](https://www.mongodb.com/products/compass) pour visualiser les données

---

## Installation du projet

```bash
git clone https://github.com/<TON-NOM-UTILISATEUR>/agence_de_voyage2.git
cd agence_de_voyage2
npm install
```

---

## Configuration

Crée un fichier `.env` à la racine :

```
MONGO_URL=mongodb://localhost:27017/agencevoyage
```

---

## ▶ Lancement du projet

Lance le serveur Node.js :

```bash
npm start
```

> API disponible sur [http://localhost:3001](http://localhost:3001)

---

## Utilisation de l'interface web

1. Ouvre le fichier `public/index.html` via VS Code Live Server ou un navigateur :
   ```
   http://127.0.0.1:5500/public/index.html
   ```
2. Les données seront récupérées depuis l’API (`localhost:3001`)

---

## 🔧 Routes utiles

|  Méthode | URL            | Description                      |
| -------: | -------------- | -------------------------------- |
|    `GET` | `/voyages`     | Liste des voyages                |
|   `POST` | `/voyages`     | Ajouter un nouveau voyage        |
| `DELETE` | `/voyages/:id` | Supprimer un voyage par ID       |
|    `GET` | `/init`        | Réinitialise avec 2 voyages test |

---

## Fonctionnalités du front

- Affichage dynamique des voyages
- Filtres par pays et titre
- Formulaire pour ajouter un voyage
- Données stockées en MongoDB local

---

## Exemple de données initiales

L’URL [`/init`](http://localhost:3001/init) insère :

- **Circuit Tokyo** (Japon)
- **Sahara Aventure** (Maroc)

---

## 🛠 Technologies utilisées

- Node.js / Express
- MongoDB / Mongoose
- HTML / CSS / JS vanilla

---

## Arborescence

```
├── models/
│   └── Voyage.js          # Schéma Mongo
├── public/
│   ├── index.html         # Interface utilisateur
│   ├── style.css          # Styles de base
│   └── script.js          # Affichage et fetch()
├── .env
├── index.js               # API Express
└── README.md
```

---

## Auteur
