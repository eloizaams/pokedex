const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
 
  //about
  pokemon.species = pokeDetail.species.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;
   
  const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
  const [ability] = abilities;
  pokemon.abilities = abilities;
  pokemon.ability = ability
  return pokemon;
}

pokeApi.getPokemonDetaiL = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetaiL))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonById = (number = 1) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${number}/`;

  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((detailRequests) => Promise.resolve(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);

};

