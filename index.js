const express = require('express');
const mongoose = require('mongoose');
const Voyage = require('./models/Voyage');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

console.log("MONGO_URL =", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log(" Mongo connecté");
    
    // Affiche les bases Mongo réellement visibles
    const dbs = await mongoose.connection.db.admin().listDatabases();
    console.log(" Bases Mongo visibles :", dbs.databases.map(db => db.name));
  })
  .catch(err => console.error(" Mongo erreur:", err));

app.get('/voyages', async (req, res) => {
  const voyages = await Voyage.find();
  console.log(" Données reçues :", voyages);
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

// Route de debug
app.get('/debug', async (req, res) => {
  const voyages = await Voyage.find();
  res.json({
    mongo_url: process.env.MONGO_URL,
    count: voyages.length,
    data: voyages
  });
});

app.listen(3000, () => console.log(" API sur http://localhost:3000"));
