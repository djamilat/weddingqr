function handleSearch(name) {
  const resultBox = document.getElementById('resultBox');

  if (name.trim() === '') {
    resultBox.innerHTML = '';
    return;
  }

  // 🔥 Appel à notre API backend
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
      } else if (data.guests.length === 1) {
        // Un seul invité
        resultBox.innerHTML = `
          <div class="result-box">
            <div class="result-found">
              <p class="result-label">Votre table</p>
              <p class="result-table">${data.guests[0].table_number}</p>
            </div>
          </div>
        `;
      } else {
        // Plusieurs correspondances : liste cliquable
        window.guests = data.guests; // stocke temporairement
        resultBox.innerHTML = data.guests.map((g, i) => `
          <div class="guest-option" onclick="selectGuest(${i})">
            ${g.name} - ${g.table_number}
          </div>
        `).join('');
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

// Fonction appelée quand l’utilisateur clique sur un invité
function selectGuest(index) {
  const guest = window.guests[index];
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
