const apiURL = "http://localhost:5050/pichamones";  // Ruta de la API JSON en tu servidor
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 1017; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

async function createOrUpdatePokemon(name, imageUrl, stats) {
    try {
        const existingPokemonResponse = await fetch(`${apiURL}?name=${name}`);
        const existingPokemonData = await existingPokemonResponse.json();

        if (existingPokemonData.length > 0) {
            const existingPokemonId = existingPokemonData[0].id;
            updatePokemon(existingPokemonId, name, imageUrl, stats);
        } else {
            createPokemon(name, imageUrl, stats);
        }
    } catch (error) {
        console.error("Error al crear o actualizar un Pokémon:", error);
    }
}

async function createPokemon(name, imageUrl, stats) {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                imageUrl: imageUrl,
                stats: stats,
            }),
        });
        const data = await response.json();
        console.log(`Pokémon ${data.name} creado con éxito en la API mock.`);
    } catch (error) {
        console.error("Error al crear un Pokémon:", error);
    }
}

async function updatePokemon(id, name, imageUrl, stats) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                imageUrl: imageUrl,
                stats: stats,
            }),
        });
        const data = await response.json();
        console.log(`Pokémon ${data.name} actualizado con éxito en la API mock.`);
    } catch (error) {
        console.error("Error al actualizar un Pokémon:", error);
    }
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon-info">
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <button id=myPokemons>
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </button>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    </div>
    `;
    listaPokemon.append(div);

    div.addEventListener("click", async () => {
        let img = poke.sprites.other["official-artwork"].front_default;
        let defaultImg = "Img/Pokeball.png";

        Swal.fire({
            html: `
                <div class="contenedor-swal"> 
                    <div class="cont-imagen-Swal">
                        <img class="imagen-Swal" 
                            src="${img ? img : defaultImg}" 
                            alt="${poke.name}">
                    </div>
                    <p class="pokemon-id">#${pokeId}</p> 
                    <p class="nombre-alert">${poke.name}</p>
                    <div class="tipos-alert" style="text-align: center;">
                        ${tipos}
                    </div>
                    <div class="pokeStat">
                        <form>${poke.stats
                            .map(
                                (data) => `
                                <div class="stat-bar-container">
                                    <div class="stat-bar">
                                        <input 
                                            type="range" 
                                            value ="${data.base_stat}"
                                            name="${data.stat.name}" max="260"/>
                                        <label data-name="${data.stat.name}">
                                            <b>${data.base_stat}</b>
                                            ${data.stat.name}
                                        </label>
                                    </div>
                                </div>`
                            )
                            .join("")}
                        <input type="submit" value="Guardar Nueva Version"/>
                    </form>
                </div>
            `,
            width: "auto",
            height: "auto",
            background: "transparent",
            padding: "0rem",
            margin: "0rem",
            showConfirmButton: false,
        });

        const contenedorHtml = document.querySelector(".pokeStat");

        contenedorHtml
            .querySelector("form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const stats = {};
                formData.forEach((value, key) => {
                    stats[key] = parseInt(value);
                });

                await createOrUpdatePokemon(poke.name, img, stats);
            });

        contenedorHtml.addEventListener("input", (e) => {
            let myLabelStat = e.target.nextElementSibling;
            myLabelStat.innerHTML = `<b>${e.target.value}</b> ${myLabelStat.dataset.name}`;
        });

        contenedorHtml.addEventListener("input", (e) => {
            let myLabelStat = e.target.nextElementSibling;
            myLabelStat.innerHTML = `<b>${e.target.value}</b> ${myLabelStat.dataset.name}`;
        });
    });
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 1017; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}));

/*-------------------------------------------seccion2*/


//Seleccionan los divs a manipular para mostrar la informacion
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');


//Segun el tipo del pokemon muestre el color correspondiente
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}