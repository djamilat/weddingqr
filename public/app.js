const SUPABASE_URL = 'https://rkrgtrzngfrwthbyywiv.supabase.co/rest/v1';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrcmd0cnpuZ2Zyd3RoYnl5d2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDg1MjEsImV4cCI6MjA4MTEyNDUyMX0.dFSOdw5aI8a6jzvpd4wpCqagrLmrzd9P-8cT5s8GdMg'; // remplace par ta clé

function showSearch() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('searchScreen').classList.add('active');
}

function showWelcome() {
  document.getElementById('searchScreen').classList.remove('active');
  document.getElementById('welcomeScreen').style.display = 'flex';
  document.getElementById('searchInput').value = '';
  document.getElementById('resultBox').innerHTML = '';
}

function handleSearch(name) {
  const resultBox = document.getElementById('resultBox');

  if (name.trim() === '') {
    resultBox.innerHTML = '';
    return;
  }

  // 🔥 Appel à Supabase REST API
  fetch(`${SUPABASE_URL}/invites?name=eq.${encodeURIComponent(name)}`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        resultBox.innerHTML = `
          <div class="result-box">
            <div class="result-not-found">
              <p class="result-not-found-title">Invité non trouvé</p>
              <p class="result-not-found-text">Veuillez vérifier l'orthographe de votre nom</p>
            </div>
          </div>
        `;
      } else {
        resultBox.innerHTML = `
          <div class="result-box">
            <div class="result-found">
              <p class="result-label">Votre table</p>
              <p class="result-table">${data[0].table_number}</p>
            </div>
          </div>
        `;
      }
    })
    .catch(err => {
      console.error("Erreur API :", err);
      resultBox.innerHTML = `
        <div class="result-box">
          <div class="result-not-found">
            <p class="result-not-found-title">Erreur du serveur</p>
            <p class="result-not-found-text">Veuillez réessayer</p>
          </div>
        </div>
      `;
    });
}
