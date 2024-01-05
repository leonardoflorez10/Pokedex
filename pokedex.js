const listadoPokemon = document.querySelector("#listadoPokemon");
// llamo a TODOS los botones del NAV
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => muestraPokemon(data))
}

function muestraPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    // join para juntar todos los elemetos que hay en una string
    tipos = tipos.join('');
    // console.log(tipos);

    // convierto los numeros que solo tienen un solo digito para que aparezcan ceros por delante con toString
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
        // si la longitud es superior a 2 digitos le agrega un cero
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-numero">#${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["dream_world"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-datos">
        <div class="nombre-contenedor">
        <p class="pokemon-parrafo">#${pokeId}</p>
        <h2 class="pokemon-nombre">${poke.name}</h>
    </div>

    <div class="pokemon-tabla">
        ${tipos}
    </div>
    <div class="pokemon-stats">
        <p class="stat">${poke.height}M</p> 
        <p class="stat">${poke.weight}KG</p>
    </div>
    </div>
    `;

    listadoPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listadoPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver todos") {
                    muestraPokemon(data);
                } else {
                    //    console.log(nombre.types.map(type => type.type.name));
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        muestraPokemon(data);
                    }
                }
            })
    }
}))
