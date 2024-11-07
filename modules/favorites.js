// Call Pokemon
const errorMSG = document.getElementById("error-Message");
const pokemonList = document.getElementById("pokemon-list");

// Fetch and display a list of favorite Pokémon
async function fetchFavoritePokemon() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    errorMSG.innerHTML = "No Pokémon in favorites.";
    errorMSG.classList.remove("hidden");
    return;
  }

  try {
    for (const name of favorites) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      displayFavoritePokemon(data);
    }
  } catch (error) {
    errorMSG.innerHTML = `${error}`;
    errorMSG.classList.remove("hidden");
    console.error("Error fetching favorite Pokémon:", error);
  }
}

// Display favorite Pokémon
function displayFavoritePokemon(pokemon) {
  // Get the Pokémon's type(s) as a string
  const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add("pokemon-card", "shadow-md", "w-52", "bg-gray-200", "p-4");

  pokeDiv.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="bg-gray-400 p-4 h-24" />
    <h4>Type: ${types}</h4>    
    <ul>
      <li>Attack: ${pokemon.stats[1].base_stat}</li>
      <li>Defense: ${pokemon.stats[2].base_stat}</li>
    </ul>
    <button onclick="playCry('${pokemon.name}')" class="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md mt-2">Play Cry</button>
  `;

  pokemonList.appendChild(pokeDiv);
}

// Pokémon Cry
async function playCry(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const data = await response.json();

    // The sound file for the cry can typically be accessed by replacing the name in this URL format
    const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName.toLowerCase()}.mp3`;
    const audio = new Audio(cryUrl);
    audio.play();
  } catch (error) {
    console.error("Error fetching Pokémon cry:", error);
    alert("Sorry, could not play the Pokémon cry.");
  }
}

// Initial call to display favorites on page load
fetchFavoritePokemon();
