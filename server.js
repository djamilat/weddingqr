const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const SUPABASE_URL = "https://rkrgtrzngfrwthbyywiv.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// 🔥 Route correcte : /api/invite (SANS S)
app.get("/api/invite", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.json({ found: false });

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/invites?name=eq.${encodeURIComponent(name)}`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.json({ found: false });
    }

    return res.json({ found: true, guest: data[0] });
  } catch (err) {
    console.error("Erreur Supabase:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
);
