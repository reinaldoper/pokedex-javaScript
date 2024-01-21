const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 8;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

async function loadPokemonItens(offset, limit) {
    try {
        const pokemons = await pokeApi.getPokemons(offset, limit);
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    } catch (error) {
        console.error('Error loading Pokemon items:', error);
    }
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', async () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    try {
        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            await loadPokemonItens(offset, newLimit);

            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            await loadPokemonItens(offset, limit);
        }
    } catch (error) {
        console.error('Error loading more Pokemon items:', error);
    }
});
