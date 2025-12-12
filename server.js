require("dotenv").config(); // charge le .env

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// ⚡ Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(express.json());
app.use(express.static("public"));

// Route API sécurisée
app.get("/api/invite", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.json({ found: false });

  try {
    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .ilike("name", name); // ignore la casse

    if (error) {
      console.error("Erreur Supabase:", error);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (!data || data.length === 0) return res.json({ found: false });

    res.json({ found: true, guest: data[0] });
  } catch (err) {
    console.error("Erreur serveur:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
