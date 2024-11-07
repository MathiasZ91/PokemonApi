/* Call Pokemon */
const errorMSG = document.getElementById("error-Message");
const pokemonList = document.getElementById("pokemon-list");

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
      displayPokemon(data);
    }
  } catch (e) {
    errorMSG.innerHTML = `${e}`;
    errorMSG.classList.remove("hidden");
    console.error("Error fetching Pokémon:", e);
  }
}

/* Display Pokemon */
function displayPokemon(pokemon) {
  const pokeDiv = document.createElement("div");
  /* Create container displayin Pokemon */
  pokeDiv.innerHTML = `
    <div class="shadow-md w-52 bg-gray-200 p-4">
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="bg-gray-400 p-4 h-24" />
      <h4>Stats</h4>    
      <ul >
        <li>Attack: ${pokemon.stats[1].base_stat}</li>
        <li>Defense: ${pokemon.stats[2].base_stat}</li>
      </ul>
      <button onclick="addToFavorites('${pokemon.name}')" class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 shadow-md mt-2">Add to Favorites</button>
    </div>`;
  /* Append to parent elemnt */
  pokemonList.appendChild(pokeDiv);
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

fetchPokemons(0);
