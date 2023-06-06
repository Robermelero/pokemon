
let formulario = document.getElementById('pokemon');
let pokemon1 = document.getElementById('pokemonName');
let pokemon2 = document.getElementById('tablaHabilidades');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  let pokemonName = pokemon1.value.trim().toLowerCase();
  getPokemonFetch(pokemonName);
});

function getPokemonFetch(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      let abilities = data.abilities.map(ability => ability.ability.name);
      let tableHTML = generateTableHTML(data.name, data.sprites.other.home.front_default, abilities);
      pokemon2.innerHTML = tableHTML;
    })
    .catch(error => {
      pokemon2.innerHTML = `<p class="error">No se encontró el Pokemon.</p>`;
    });
}
function generateTableHTML(name, imageUrl, abilities) {
    let tableHTML = `<table class="pokemon-table">
                        <tr>
                          <th>Nombre</th>
                          <th>Imagen</th>
                        </tr>
                        <tr>
                          <td>${name}</td>
                          <td><img src="${imageUrl}" alt="${name}" class="pokemon-image"></td>
                        </tr>`;
  
    if (abilities.length > 0) {
      tableHTML += `<tr>
                      <th colspan="2">Habilidades</th>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <ul>`;
  
      abilities.slice(0, 4).forEach(ability => {
        tableHTML += `<li>${ability}</li>`;
      });
  
      tableHTML += `</ul>
                    </td>
                  </tr>`;
    }
  
    tableHTML += `</table>`;
    return tableHTML;
  }