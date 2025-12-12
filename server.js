const fetch = require('node-fetch');

app.get('/api/invites', async (req, res) => {
  const name = req.query.name;
  if (!name) return res.json({ error: "Missing name" });

  const response = await fetch(`https://rkrgtrzngfrwthbyywiv.supabase.co/rest/v1/invites?name=eq.${encodeURIComponent(name)}`, {
    headers: {
      'apikey': 'TON_SUPABASE_API_KEY',
      'Authorization': 'Bearer TON_SUPABASE_API_KEY'
    }
  });

  const data = await response.json();
  if (data.length === 0) return res.json({ found: false });
  res.json({ found: true, guest: data[0] });
});
