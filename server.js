const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔥 Endpoint pour rechercher les invités (recherche "contains")
app.get("/api/invite", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.json({ found: false });

  try {
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .ilike("name", `%${name}%`); // "contains" insensible à la casse

    if (error) throw error;
    if (!data || data.length === 0) return res.json({ found: false });

    res.json({ found: true, guests: data });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
