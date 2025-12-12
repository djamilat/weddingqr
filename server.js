require('dotenv').config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
const PORT = process.env.PORT || 3000;

// Crée le client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(express.json());
app.use(express.static("public"));

// 🔥 Endpoint pour rechercher les invités avec filtrage
app.get("/api/invite/search", async (req, res) => {
  const name = req.query.name;
  
  if (!name || name.trim() === '') {
    return res.json({ found: false, guests: [] });
  }

  try {
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .ilike("name", `%${name.trim()}%`) // Recherche partielle insensible à la casse
      .order('name', { ascending: true }); // Tri alphabétique

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.json({ found: false, guests: [] });
    }

    res.json({ found: true, guests: data });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 🔥 Endpoint alternatif pour recherche exacte (optionnel)
app.get("/api/invite", async (req, res) => {
  const name = req.query.name;
  
  if (!name) {
    return res.json({ found: false });
  }

  try {
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .eq("name", name.trim())
      .single();

    if (error || !data) {
      return res.json({ found: false });
    }

    res.json({ found: true, guest: data });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});