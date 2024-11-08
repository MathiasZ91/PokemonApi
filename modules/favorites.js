// Call Pokemon
const errorMSG = document.getElementById("error-Message");
const pokemonList = document.getElementById("pokemon-list");
//use div?



// Fetch and display a list of favorite Pokemon
async function fetchFavoritePokemon() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    errorMSG.textContent = "No Pokémon in favorites.";
    errorMSG.classList.remove("hidden");
    return;
  }

  try {
    for (const name of favorites) {
       // Fetch Pokemon data from the Pokemon API by name
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      displayFavoritePokemon(data);
    }
  } catch (error) {
    errorMSG.textContent = 'Something went wrong!';
    errorMSG.classList.remove("hidden");
    console.error("Error fetching favorite Pokémon:", error);
  }
}

// Display favorite Pokemon
function displayFavoritePokemon(pokemon) {
  // Get the Pokemons types
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
// Add the Pokemon to the list on the page
  pokemonList.appendChild(pokeDiv);
}

// Pokemon Cry
async function playCry(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    const data = await response.json();

  // The URL to the Pokemons cry audio file
    const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName.toLowerCase()}.mp3`;
     // Create a new audio element and play the cry sound
    const audio = new Audio(cryUrl);
    audio.play();
  } catch (error) {
    console.error("Error fetching Pokémon cry:", error);
    alert("Sorry, could not play the Pokémon cry.");
  }
}

// Initial call to display favorites on page load
fetchFavoritePokemon();
