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

  fetch(`/api/invite?name=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.found) {
        resultBox.innerHTML = `<p>Invité non trouvé</p>`;
      } else if (data.guests.length === 1) {
        resultBox.innerHTML = `<p>Votre table : ${data.guests[0].table_number}</p>`;
      } else {
        window.guests = data.guests;
        resultBox.innerHTML = data.guests.map((g, i) => `
          <div class="guest-option" onclick="selectGuest(${i})">
            ${g.name} - ${g.table_number}
          </div>
        `).join('');
      }
    })
    .catch(err => {
      console.error("Erreur API :", err);
      resultBox.innerHTML = `<p>Erreur du serveur. Veuillez réessayer.</p>`;
    });
}

function selectGuest(index) {
  const guest = window.guests[index];
  const resultBox = document.getElementById('resultBox');
  resultBox.innerHTML = `<p>Votre table : ${guest.table_number}</p>`;
}
