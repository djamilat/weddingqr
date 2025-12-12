function showSearch() {
  document.getElementById('welcomeScreen').style.display = 'none';
  document.getElementById('searchScreen').classList.add('active');
}

function showWelcome() {
  document.getElementById('searchScreen').classList.remove('active');
  document.getElementById('welcomeScreen').style.display = 'flex';
  document.getElementById('searchInput').value = '';
  document.getElementById('resultBox').innerHTML = '';
  document.getElementById('suggestionsList').innerHTML = '';
}

function handleSearch(name) {
  const resultBox = document.getElementById('resultBox');
  const suggestionsList = document.getElementById('suggestionsList');

  // Réinitialiser les résultats
  resultBox.innerHTML = '';

  if (name.trim() === '') {
    suggestionsList.innerHTML = '';
    return;
  }

  // 🔥 Appel à l'API backend pour filtrer
  fetch(`/api/invite/search?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.found || data.guests.length === 0) {
        suggestionsList.innerHTML = '';
        resultBox.innerHTML = `
          <div class="result-box">
            <div class="result-not-found">
              <p class="result-not-found-title">Aucun invité trouvé</p>
              <p class="result-not-found-text">Veuillez vérifier l'orthographe</p>
            </div>
          </div>
        `;
      } else if (data.guests.length === 1) {
        // Un seul résultat : afficher directement la table
        suggestionsList.innerHTML = '';
        showGuestTable(data.guests[0]);
      } else {
        // Plusieurs résultats : afficher la liste
        displaySuggestions(data.guests);
      }
    })
    .catch(err => {
      console.error("Erreur API :", err);
      suggestionsList.innerHTML = '';
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

function displaySuggestions(guests) {
  const suggestionsList = document.getElementById('suggestionsList');
  
  suggestionsList.innerHTML = `
    <div class="suggestions-container">
      <p class="suggestions-title">Plusieurs invités trouvés :</p>
      ${guests.map(guest => `
        <div class="suggestion-item" onclick='selectGuest(${JSON.stringify(guest)})'>
          <div class="suggestion-name">${guest.full_name}</div>
          <div class="suggestion-arrow">→</div>
        </div>
      `).join('')}
    </div>
  `;
}

function selectGuest(guest) {
  // Effacer les suggestions
  document.getElementById('suggestionsList').innerHTML = '';
  // Mettre à jour le champ de recherche
  document.getElementById('searchInput').value = guest.full_name;
  // Afficher la table
  showGuestTable(guest);
}

function showGuestTable(guest) {
  const resultBox = document.getElementById('resultBox');
  resultBox.innerHTML = `
    <div class="result-box">
      <div class="result-found">
        <p class="result-label">Votre table</p>
        <p class="result-table">${guest.table_number}</p>
      </div>
    </div>
  `;
}