document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("searchPoke");
    
    fetchBtn.addEventListener("click", fetchData);
  });
  
  async function fetchData() {
    const wrongName = document.getElementById('nameError')
    try {
        wrongName.textContent = ''
      const pokemonName = document
        .getElementById("pokemonName")
        .value.trim()
        .toLowerCase();
  
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
  
      if (!response.ok) {
        throw new Error("Could not fetch resources");
      }
  
      const data = await response.json();
  
      displayPokemonData(data);
    } catch (error) {
      wrongName.textContent = '* Wrong Pokemon Name!';
      wrongName.style.color='red'
    }
  }
  
  function displayPokemonData(data) {
    const imgElement = document.getElementById("spite");
    const nameElement = document.getElementById("name");
    const typeElement = document.getElementById("type");
    const idElement = document.getElementById("id");
    const abilityElement = document.getElementById("ability");
  
    // Reset content
    typeElement.textContent = "";
    abilityElement.textContent = "";
  
    // Display types
    const pokemonTypes = data.types.map((type) => type.type.name);
    typeElement.textContent = `Type: ${pokemonTypes.join(", ")}`;
  
    // Display abilities
    const pokemonAbilities = data.abilities.map(
      (ability) => ability.ability.name
    );
    abilityElement.textContent = `Abilities: ${pokemonAbilities.join(", ")}`;
  
    // Display other information
    nameElement.textContent = `Name: ${data.name}`;
    idElement.textContent = `ID: ${data.id}`;
    imgElement.src = data.sprites.front_default;
    imgElement.style.display = "block";
  }
  