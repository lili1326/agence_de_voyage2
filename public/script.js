 console.log("script.js chargé");

 fetch('http://localhost:3001/voyages')
  .then(res => res.json())
  .then(data => {
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
    console.error("Erreur lors du fetch /voyages :", err);
  });

  // ajouter un voyage 
  document.getElementById('voyageForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    titre: document.getElementById('titre').value,
    description: document.getElementById('description').value,
    pays: document.getElementById('pays').value,
    prix: Number(document.getElementById('prix').value),
    placesDispo: Number(document.getElementById('placesDispo').value),
    datesDisponibles: [
      new Date(document.getElementById('date1').value),
      ...(document.getElementById('date2').value ? [new Date(document.getElementById('date2').value)] : [])
    ]
  };

  const response = await fetch('http://localhost:3001/voyages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert(' Voyage ajouté !');
    window.location.reload(); // Recharge pour voir le nouveau voyage
  } else {
    alert(' Erreur lors de l’ajout');
  }
});
