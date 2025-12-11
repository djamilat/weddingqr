const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('invites.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS invites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      table_number TEXT NOT NULL
  )`);

  const stmt = db.prepare("INSERT INTO invites (name, table_number) VALUES (?, ?)");

  let invites = [
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

  invites.forEach(inv => stmt.run(inv[0], inv[1]));
  stmt.finalize();
});

db.close();
console.log("Base SQLite créée et invités insérés !");
