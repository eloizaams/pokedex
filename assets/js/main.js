const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 2000;
const limit = 10;
let offset = 0;

function formatNumber(number) {
  return number.toString().padStart(3, "0");
}

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" data-pokemon="${pokemon.number}">
            <span class="number">#${formatNumber(pokemon.number)}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

document.addEventListener("click", function (event) {
  
  const pokemonElement = event.target.closest("li.pokemon");

  if (pokemonElement) {
   
      const number = pokemonElement.getAttribute("data-pokemon");
  
      // Redireciona para pokeInfo.html, passando o número do Pokémon na URL
      window.location.href = `pokeInfo.html?number=${number}`;
    }
});
