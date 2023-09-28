// Selecciona el elemento HTML con el ID "listaPokemon"
const listaPokemon = document.querySelector("#listaPokemon");

// Selecciona todos los elementos HTML con la clase "btn-header"
const botonesHeader = document.querySelectorAll(".btn-header");

// Define la URL base para hacer las solicitudes a la API de Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Realiza una solicitud para obtener información sobre 1017 Pokémon
for (let i = 1; i <= 1017; i++) {
    // Realiza una solicitud para obtener información de un Pokémon específico
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

// Función para mostrar información de un Pokémon
function mostrarPokemon(poke) {
    // Obtiene los tipos del Pokémon y los formatea
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Obtiene el ID del Pokémon y lo formatea
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crea un nuevo elemento div para mostrar la información del Pokémon
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

    // Agrega un evento de clic al div del Pokémon para mostrar detalles
    div.addEventListener("click", async () => {
        let img = poke.sprites.other["official-artwork"].front_default;
        let defaultImg = "Img/Pokeball.png";

        Swal.fire({
            html: `
            <form>
        <div class="contenedor-swal"> 
        <p class="nombre-alert">${poke.name}</p>
        <p class="pokemon-id">#${pokeId}</p>
            <div class="cont-imagen-Swal">
            <img class="imagen-Swal" 
                src="${img ? img : defaultImg}" 
                alt="${poke.name}">
            </div>
            <div class="tipos-alert" style="text-align: center;">
            ${tipos}
            </div>
            <div class="pokeStat">${poke.stats
                    .map(
                        (data) => `
            <div class="stat-bar-container">
                <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${data.base_stat / 2}%;">
                </div>
                </div>
                <span class="stat_poke">
                <b class="base_stat">${data.base_stat}</b> <b class="name_stat">${data.stat.name
                            }</b>
                </span>
            </div>`
                    )
                    .join("")}</div>
        </div>
        </form>`,
            width: "auto",
            height: "auto",
            background: "transparent",
            padding: "0rem",
            margin: "0rem",
            showConfirmButton: false,
        });
    });
}

// Itera sobre los botones del encabezado y agrega un evento de clic a cada uno
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
}))


//Cuando se haga click sobre los botones del encabezador segun la clase se muestren los pokemones de dicha clase
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
}))

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
    pokeImg.setAttribute('src', 'poke-shadow.png' );
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}