/*
numero id
tipo
habilidades
peso
estatura
formas
stats
nombre
sprite

moves**/


const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

const ID = "id"
const NAME = "name"
const SPECIES = "species"
const WEIGHT = "weight"
const HEIGHT = "height"
const TYPE = "type"
const FORMS = "forms"
const STAT = "stat";
const STATS = "stats"
const SPRITE = "sprite"
const ABILITIES = "abilities"
const MOVES = "moves"
const TOTAL = "total"


const POKESEARCH = "searchPokemon"


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById(POKESEARCH);
    let pokeName = pokeNameInput.value.toLowerCase();
    const url = BASE_URL + pokeName;
    try {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            if (data) {
                updatePokemon(data);
            }
        });
    } catch (error) {
        throw error;
    }
}


function updatePokemon(pokemon){
    clearPokeInfo();
    setText('# ' + pokemon.id, ID);
    setText(pokemon.name, NAME);
    setImg(pokemon.sprites.front_default, SPRITE);
    setText(pokemon.species.name, SPECIES);
    setText(pokemon.weight, WEIGHT);
    setText(pokemon.height, HEIGHT);

    let abilities = getTextFromObjectArray(pokemon.abilities, ', ', 'ability', 'name');
    setText(abilities, ABILITIES);

    let forms = getTextFromObjectArray(pokemon.forms,  ', ', 'name');
    setText(forms, FORMS);

    let hp = pokemon.stats.find(stat => stat.stat.name == "hp");
    setText(hp.base_stat, `hp`);

    let attack = pokemon.stats.find(stat => stat.stat.name == "attack");
    setText(attack.base_stat, `attack`);

    let defense = pokemon.stats.find(stat => stat.stat.name == "defense");
    setText(defense.base_stat, `defense`);

    let spAtk = pokemon.stats.find(stat => stat.stat.name == "special-attack");
    setText(spAtk.base_stat, `spAtk`);

    let spDef = pokemon.stats.find(stat => stat.stat.name == "special-defense");
    setText(spDef.base_stat, `spDef`);

    let speed = pokemon.stats.find(stat => stat.stat.name == "speed");
    setText(speed.base_stat, `speed`);

    let pokeTypes = pokemon.types;
    let pokeTypesDivContainer = document.getElementById("types");
    pokeTypes.forEach(type => {
        let pokeTypeDiv = document.createElement('div');
        pokeTypeDiv.className = "poke-type";
        let pokeType = document.createElement('p');
        pokeType.textContent = type.type.name;
        pokeTypeDiv.appendChild(pokeType);
        pokeTypesDivContainer.appendChild(pokeTypeDiv);
    });

    setText(parseInt(hp.base_stat) + 
            parseInt(attack.base_stat) +
            parseInt(defense.base_stat) +
            parseInt(spAtk.base_stat) +
            parseInt(spDef.base_stat) +
            parseInt(speed.base_stat), 
            TOTAL);
}


function clearPokeInfo()
{
    setText('', ID);
    setText('', NAME);
    setImg('', SPRITE);
    setText('', SPECIES);
    setText('', WEIGHT);
    setText('', HEIGHT);
    setText('', ABILITIES);
    setText('', FORMS);
    setText('', `hp`);
    setText('', `attack`);
    setText('', `defense`);
    setText('', `spAtk`);
    setText('', `spDef`);
    setText('', `speed`);
    setText('', TOTAL)

    let pokeTypesDivContainer = document.getElementById("types");
    removeAllChildNodes(pokeTypesDivContainer);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function setText(text, id){
    let element = document.getElementById(id);
    element.textContent = text;
}

const setImg = (url, id) => {
    let element = document.getElementById(id)
    element.src = url;
}


function getTextFromObjectArray(array, splitChr, key, key2){
    let text = '';
    let count = 0;
    array.forEach(index => {
        if (key2 != undefined){
            text += index[key][key2] + (count < array.length-1 ? splitChr: '');
        }
        else{
            text += index[key] + (count < array.length-1 ? splitChr: '');
        }
        count++;
    });
    return text;
}


document.getElementById("searchBtn").onclick = fetchPokemon;


const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}