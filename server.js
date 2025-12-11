const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('invites.db');

app.use(express.static('public'));

// API pour récupérer un invité par nom
app.get('/api/invite', (req, res) => {
  const name = req.query.name;

  if (!name) return res.json({ error: "Missing name" });

  db.get(
    "SELECT * FROM invites WHERE LOWER(name) = LOWER(?)",
    [name],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.json({ found: false });

      return res.json({ found: true, guest: row });
    }
  );
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
