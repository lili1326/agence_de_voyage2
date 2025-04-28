console.log(" script.js chargé");
fetch('/voyages')
  .then(res => res.json())
  .then(data => {
    console.log("Données reçues du backend :", data);
    const tbody = document.querySelector('#voyagesTable tbody');
    const select = document.getElementById('filterPays');
    const titres = document.getElementById('searchInput');

    const paysSet = new Set();
    tbody.innerHTML = '';

    data.forEach(voyage => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${voyage.titre}</td>
        <td>${voyage.pays}</td>
        <td>${voyage.prix}</td>
        <td>${voyage.placesDispo}</td>
        <td>${voyage.datesDisponibles.map(date => new Date(date).toLocaleDateString()).join(', ')}</td>`;
      tbody.appendChild(row);
      paysSet.add(voyage.pays);
      console.log("Fin traitement des données");
    });

    select.innerHTML = '<option value="">Tous les pays</option>';
    paysSet.forEach(pays => {
      const opt = document.createElement('option');
      opt.value = pays;
      opt.textContent = pays;
      select.appendChild(opt);
    });

    titres.addEventListener('input', () => {
      const val = titres.value.toLowerCase();
      Array.from(tbody.children).forEach(row => {
        row.style.display = row.children[0].textContent.toLowerCase().includes(val) ? '' : 'none';
      });
    });

    select.addEventListener('change', () => {
      const val = select.value;
      Array.from(tbody.children).forEach(row => {
        row.style.display = !val || row.children[1].textContent === val ? '' : 'none';
      });
    });
  })
  .catch(err => {
    console.error(" Erreur lors du fetch /voyages :", err);
  });