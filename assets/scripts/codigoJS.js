document.addEventListener("DOMContentLoaded", async () => {
    const characterList = document.getElementById("characterList");
    const searchInput = document.getElementById("searchInput");

    const apiUrl = "https://hp-api.onrender.com/api/characters";

    try {
        const response = await fetch(apiUrl);
        const characters = await response.json();

        displayCharacters(characters);

        searchInput.addEventListener("input", () => {
            filterCharacters(searchInput.value.toLowerCase(), characters);
        });
    } catch (error) {
        console.error("Error fetching data from API:", error);
    }
});

function displayCharacters(characters) {
    const characterList = document.getElementById("characterList");
    characterList.innerHTML = "";

    characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        characterList.appendChild(characterCard);
    });
    
}

function createCharacterCard(character) {
    const card = document.createElement("div");
    card.className = "character-card";
    
    const name = document.createElement("h2");
    name.textContent = character.name;
    
    const image = document.createElement("img");
    image.src = character.image;
    image.alt = character.name;
    

    const house = document.createElement("p");
    house.textContent = `House: ${character.house}`;

    const patronus = document.createElement("p");
    patronus.textContent = `Patronus: ${character.patronus}`;

    const ancestry = document.createElement("p"); // Add this line
    ancestry.textContent = `Ancestry: ${character.ancestry}`; // Add this line

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(house);
    card.appendChild(patronus);
    card.appendChild(ancestry); // Add this line
    return card;
}

function filterCharacters(query, characters) {
    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(query)
    );
    displayCharacters(filteredCharacters);
}
