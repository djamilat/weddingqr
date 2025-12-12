// init_db.js avec better-sqlite3
const Database = require('better-sqlite3');
const db = new Database('invites.db');

// Créer la table si elle n'existe pas
db.prepare(`
  CREATE TABLE IF NOT EXISTS invites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    table_number TEXT NOT NULL
  )
`).run();

// Insérer les invités
const invites = [
  ["Alice Koné", "Table 1"],
  ["Moussa Traoré", "Table 1"],
  ["Fatou Diarra", "Table 2"],
  ["Yacouba Coulibaly", "Table 2"],
  ["Aminata Sangaré", "Table 3"],
  ["Adama Traoré", "Table 3"],
  ["Issa Coulibaly", "Table 4"],
  ["Mariame Konaté", "Table 4"],
  ["Ousmane Diakité", "Table 5"],
  ["Kadiatou Sangaré", "Table 5"],
];

const stmt = db.prepare("INSERT INTO invites (name, table_number) VALUES (?, ?)");
for (const inv of invites) {
  stmt.run(inv[0], inv[1]);
}

db.close();
console.log("Base SQLite créée et invités insérés !");
