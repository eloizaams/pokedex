const bodyPokemonPage = document.getElementById("body");
const infoPokemonPage = document.getElementById("info");
const menuItems = document.querySelectorAll(".detail-item");
const contents = document.querySelectorAll(".detailContent");
const about = document.getElementById("about");
const breeding = document.getElementById("breeding");
const baseStats = document.getElementById("baseStats");

function formatNumber(number) {
  return number.toString().padStart(3, "0");
}

function convertPokemonToInfo(pokemon) {
  return `
          <div class=infoHead>
            <div class="headName">
              <span class="name">${pokemon.name}</span>
              <ol class="types">
                 ${pokemon.types
                   .map((type) => `<li class="type ${type}">${type}</li>`)
                   .join("")}
              </ol>
            </div>
            <div class="number">
              <span>#${formatNumber(pokemon.number)}</span>
            </div>
          </div>
          <div class="pokemonImg dotted">
            <img src="${pokemon.photo}" alt="${pokemon.name}" />
          </div>
            `;
}

function convertPokemonToAbout(pokemon) {
  return `
                  <ul class="detailContent-list">
                    <li class="detailList">
                     <span class="statName">Species</span>
                      <span class="atributeDetail">${pokemon.species}</span>
                    </li>
                    <li class="detailList"> 
                    <span class="statName">Height</span>
                       <span class="atributeDetail"> ${Math.floor(
                         pokemon.height / 10 / 0.3048
                       )}' ${(((pokemon.height / 0.3048) % 10) * 1.2).toFixed(
    1
  )}" (${(pokemon.height / 10).toFixed(2)} cm)</span>
                    </li>
                    <li class="detailList">
                    <span class="statName">Weight</span>
                       <span class="atributeDetail">${(
                         pokemon.weight * 0.220462
                       ).toFixed(1)} libs (${(pokemon.weight / 10).toFixed(
    1
  )} kg)</span>
                    </li>
                    <li class="detailList">
                    <span class="statName">Ability</span>
                       <span class="atributeDetail ">
                       <ul class="atributeDetailList">
                        ${pokemon.abilities
                          .map((ability) => `<li >${ability}</li>`)
                          .join(",&nbsp;")}
                      </ul>
                      </span>
                    </li>
                  </ul>
                  
         `;
}

function convertPokemonToSpecies(pokemon) {
  return `<li class="detailList">
                      <span class="statName">Gender</span>
                     <span class="atributeDetail">
                      <ul class="gender">
                        <li> <i class="fa-classic fa-mars"></i>${(
                          100 -
                          (pokemon.gender * 100) / 8
                        ).toFixed(1)}  </li>
                        <li> <i class="fa-classic fa-venus"></i>${(
                          (pokemon.gender * 100) /
                          8
                        ).toFixed(1)} </li>
                       
                      </ul>
                      
                      </span>
                    </li>
                    <li class="detailList">
                    <span class="statName">Egg Groups</span>
                      <span  class="atributeDetail">
                       <ul class="atributeDetailList">
                        ${pokemon.eggGroups
                          .map((eggGroup) => `<li >${eggGroup}</li>`)
                          .join(",&nbsp;")}
                      </ul>
                    
                    </li>
                    <li class="detailList">
                    <span class="statName">Egg Cycle</span>
                       <span class="atributeDetail">${pokemon.eggCycle}</span>
                    </li>
                    `;
}

function convertPokemonToBaseStats(pokemon) {
  const totalBaseStat = pokemon.stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0
  );
  const numberOfStats = pokemon.stats.length;

  return `
    <ul class="detailContent-list statsWithBar">
      ${pokemon.stats
        .map((stat) => {
          const barColor = stat.base_stat >= 50 ? "#4caf50" : "#f44336";

          return `
            <li class="detailList withBar">
              <span class="statName">${stat.name.replace(
                "special",
                "spc"
              )}</span>
              <span class="atributeDetail">${stat.base_stat}</span>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${
                  stat.base_stat
                }%; background-color: ${barColor};"></div>
              </div>
            </li>`;
        })
        .join("")}

      <li class="detailList withBar">
        <span class="statName">Total</span>
        <span class="atributeDetail">${totalBaseStat}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${
            totalBaseStat / numberOfStats
          }%; background-color: ${
    totalBaseStat / numberOfStats >= 50 ? "#4caf50" : "#f44336"
  };"></div>
        </div>
      </li>
    </ul>
  `;
}

function loadPokemonInfo(number) {
  pokeApi.getPokemonById(number).then((pokemon) => {
    infoPokemonPage.innerHTML = convertPokemonToInfo(pokemon);
    bodyPokemonPage.classList.add(`${pokemon.type}`);
    about.innerHTML = convertPokemonToAbout(pokemon);
    baseStats.innerHTML = convertPokemonToBaseStats(pokemon);
    document.title =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  });

  pokeApi.getSpeciesById(number).then((pokeSpecies) => {
    breeding.innerHTML = convertPokemonToSpecies(pokeSpecies);
  });
}
// Função para pegar o valor do parâmetro "number" da URL
function getPokemonNumberFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("number"); // Retorna o valor do parâmetro "number"
}

// Captura o número do Pokémon
const number = getPokemonNumberFromUrl();
loadPokemonInfo(number);
// Função para alternar entre as seções
menuItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Evita a navegação padrão

    // Remove a classe 'active' de todos os links
    menuItems.forEach((i) => i.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("activeContent"));
    // Adiciona 'active' ao link clicado
    this.classList.add("active");

    const target = this.getAttribute("data-target");

    const targetElement = document.getElementById(target);

    // Verifica se o elemento alvo existe e adiciona a classe 'activeContent' ao seu elemento superior (parentNode)
    if (targetElement && targetElement.parentNode) {
      targetElement.parentNode.classList.add("activeContent");
    }
  });
});
