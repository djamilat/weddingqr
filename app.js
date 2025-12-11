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

  // 🔥 Nouvelle API pour SQLite
  fetch(`/api/invite?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.found) {
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
              <p class="result-table">${data.guest.table_number}</p>
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
