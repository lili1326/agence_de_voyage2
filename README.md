# Agence de Voyage 2 - API Symfony + MongoDB (Docker)

API Symfony connectée à une base MongoDB.

Projet **en cours** —

---

## Objectif

Créer une API REST pour :

- Gérer les voyages, réservations, et clients _(étape future)_

La base de données est gérée avec **MongoDB** via **Docker**, et visualisée via **MongoDB Compass**.

---

## Technologies utilisées

- PHP 8.2+
- Symfony 6.x
- Doctrine MongoDB ODM (Object Document Mapper)
- MongoDB (Docker + Compass)
- Composer
- Docker & Docker Compose
- Git/GitHub

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/lili1326/agence_de_voyage2.git
cd agence_de_voyage2

2. Installer les dépendances PHP
composer install
 Mise en place de MongoDB avec Docker

1. Lancer MongoDB en conteneur
docker run -d -p 27017:27017 --name mongo_container mongo
Cela va lancer MongoDB sur localhost:27017.

Le conteneur est nommé mongo_container.

2. Se connecter avec MongoDB Compass
Ouvre MongoDB Compass.

Connecte-toi avec l'URI :

mongodb://localhost:27017
Tu pourras visualiser toutes les bases, collections et documents créés.

Configuration Symfony

Configure ta connexion MongoDB dans ton fichier .env ou .env.local :

MONGODB_URL=mongodb://localhost:27017
MONGODB_DB=agence_de_voyage
Lancer le serveur Symfony

symfony server:start
```
