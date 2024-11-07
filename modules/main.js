/* Call Pokémon */
const errorMSG = document.getElementById("error-Message");
const pokemonList = document.getElementById("pokemon-list");

/* Play Pokémon cry */
function playCry(url) {
  const audio = new Audio(url);
  audio.play();
}

/* Add Pokémon to favorites in localStorage */
function addToFavorites(pokemonName) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(pokemonName)) {
    favorites.push(pokemonName);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${pokemonName} added to favorites!`);
  } else {
    alert(`${pokemonName} is already in favorites.`);
  }
}

/* Display Pokémon */
function displayPokemon(pokemon, id) {
  const pokeDiv = document.createElement("div");
  const cryUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/cry/${id}.ogg`;
  const types = pokemon.types
    .map(
      (typeInfo) =>
        typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)
    )
    .join(", ");

  /* Create container displayin Pokémon */
  pokeDiv.innerHTML = `
    <div class="shadow-md w-52 bg-gray-200 p-4">
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="bg-gray-400 p-4 h-24" />
      <h4>Stats</h4>    
      <ul >
        <li>Type: ${types}</li>
        <li>Attack: ${pokemon.stats[1].base_stat}</li>
        <li>Defense: ${pokemon.stats[2].base_stat}</li>
      </ul>
      <button 
        onclick="playCry('${cryUrl}')" 
        class="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300 shadow-md mt-2"
      >
        Play cry
      </button>
      <button onclick="addToFavorites('${pokemon.name}')" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 shadow-md mt-2">Add to Favorites</button>
    </div>`;
  /* Append to parent elemnt */
  pokemonList.appendChild(pokeDiv);
}

// Fetch and display a list of Pokémon
async function fetchPokemons(offset) {
  if (offset <= 0) {
    offset;
  }
  try {
    for (let i = 1; i <= 10; i++) {
      // Fetch the first 10 Pokémon as an example
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      displayPokemon(data, i);
    }
  } catch (e) {
    errorMSG.innerHTML = `${e}`;
    errorMSG.classList.remove("hidden");
    console.error("Error fetching Pokémon:", e);
  }
}

fetchPokemons(0);
