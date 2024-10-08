const bodyPokemonPage = document.getElementById("body");
const infoPokemonPage = document.getElementById("info");
const menuItems = document.querySelectorAll(".detail-item");
const contents = document.querySelectorAll(".detailContent");
const about = document.getElementById("about");
const number = 1;

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
                      Species <span class="atributeDetail">${pokemon.species}</span>
                    </li>
                    <li class="detailList"> 
                      Height <span class="atributeDetail"> ${Math.floor(pokemon.height / 10 / 0.3048)}' ${(((pokemon.height / 0.3048) % 10)*1.2).toFixed(1)}" (${(pokemon.height / 10).toFixed(2)} cm)</span>
                    </li>
                    <li class="detailList">
                      Weight <span class="atributeDetail">${(pokemon.weight * 0.220462).toFixed(1)} libs (${(pokemon.weight /10).toFixed(1)} kg)</span>
                    </li>
                    <li class="detailList">
                      Ability <span class="atributeDetail ">
                       <ul class="atributeDetailList">
                        ${pokemon.abilities.map((ability) => `<li >${ability}</li>`).join(",&nbsp;")}
                      </ul>
                      </span>
                    </li>
                  </ul>
                  <p>Breeding</p>
                  <ul class="detailContent-list">
                    <li class="detailList">
                      Gender <span class="atributeDetail">${pokemon.species}</span>
                    </li>
                    <li class="detailList">
                      Egg Groups <span class="atributeDetail">${pokemon.species}</span>
                    </li>
                    <li class="detailList">
                      Egg Cycle <span class="atributeDetail">${pokemon.species}</span>
                    </li>
                  </ul>
         `;
}

function loadPokemonInfo(number) {
  pokeApi.getPokemonById(number).then((pokemon) => {
    console.log(pokeApi.getPokemonById(number));
    infoPokemonPage.innerHTML = convertPokemonToInfo(pokemon);
    bodyPokemonPage.classList.add(`${pokemon.type}`);
    about.innerHTML = convertPokemonToAbout(pokemon);
    document.title =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  });
}

loadPokemonInfo(1);

// Função para alternar entre as seções
menuItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // Evita a navegação padrão

    // Remove a classe 'active' de todos os links e conteúdos
    menuItems.forEach((i) => i.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("activeContent"));

    // Adiciona 'active' ao link clicado e à respectiva seção
    this.classList.add("active");
    const target = this.getAttribute("data-target");

    document.getElementById(target).classList.add("activeContent");
  });
});
