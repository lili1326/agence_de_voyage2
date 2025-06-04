 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Voyage = require('./models/Voyage');
 
 // Charge les variables d'environnement depuis un fichier .env (ex : MONGO_URL)
require('dotenv').config();

// Initialise l'application Express (framework web Node.js)
const app = express();

// Autorise les requêtes provenant d'autres origines (CORS = Cross-Origin Resource Sharing)
app.use(cors());

// Autorise le serveur à recevoir des requêtes en JSON (ex. : POST avec un body JSON)
app.use(express.json());

// Sert les fichiers statiques du dossier 'public' (ex. : index.html, script.js, style.css)
app.use(express.static('public'));

// Affiche la chaîne de connexion MongoDB utilisée (depuis .env)
console.log("MONGO_URL =", process.env.MONGO_URL);

// Connexion à la base MongoDB (avec Mongoose)
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,        // Utilise le nouveau parser d'URL (plus sécurisé)
  useUnifiedTopology: true      // Utilise le moteur de gestion de connexions moderne
})
  // Si la connexion réussit, affiche un message dans la console
  .then(() => console.log("Mongo connecté"))
  // Si la connexion échoue, affiche une erreur
  .catch(err => console.error(" Mongo erreur:", err));


app.get('/voyages', async (req, res) => {
  const voyages = await Voyage.find();
  res.json(voyages);
});

app.post('/voyages', async (req, res) => {
  const voyage = new Voyage(req.body);
  await voyage.save();
  res.status(201).json(voyage);
});

app.delete('/voyages/:id', async (req, res) => {
  await Voyage.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.get('/init', async (req, res) => {
  await Voyage.deleteMany({});
  await Voyage.insertMany([
    {
      titre: "Circuit Tokyo",
      description: "Explorez la capitale japonaise",
      prix: 1900,
      pays: "Japon",
      datesDisponibles: [new Date(), new Date(Date.now() + 1000 * 3600 * 24 * 15)],
      placesDispo: 10
    },
    {
      titre: "Sahara Aventure",
      description: "Voyage dans le désert",
      prix: 1300,
      pays: "Maroc",
      datesDisponibles: [new Date()],
      placesDispo: 6
    }
  ]);
  res.send(" Données circuits insérées !");
});

app.listen(3001, () => console.log(" API disponible sur http://localhost:3001"));
