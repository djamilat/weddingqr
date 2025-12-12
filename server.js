const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('invites.db');

app.use(express.static('public'));

// API pour récupérer un invité par nom
app.get('/api/invite', (req, res) => {
  const name = req.query.name;
  if (!name) return res.json({ error: "Missing name" });

  // Recherche insensible à la casse (Koné = kone = KONE)
  const row = db.prepare("SELECT * FROM invites WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))").get(name);

  if (!row) return res.json({ found: false });
  return res.json({ found: true, guest: row });
});

// Lancer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
