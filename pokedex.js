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

moves: damage_class, type

*/

// current total number of pokemon


var currentId = 1;
const LAST_ID = 898;
const pageEntries = 9;

const BASE_URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/'
const BASE_URL_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

const BASE_URL_TYPE = 'https://pokeapi.co/api/v2/type/'
const BASE_URL_MOVE = 'https://pokeapi.co/api/v2/move/'
const BASE_URL_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/'


const ID = "id"
const NAME = "name"
const DESCRIPTION = "description"
const WEIGHT = "weight"
const HEIGHT = "height"
const TYPE = "type"
const FORMS = "forms"

const STAT = "stat";
const STATS = "stats"
const HP = "hp"
const ATTACK = "attack"
const DEFENSE = "defense"
const SPATK = "spAtk"
const SPDEF = "spDef"
const SPEED = "speed"


const SPRITE = "sprite"
const ABILITIES = "abilities"
const MOVES = "moves"
const TOTAL = "total"


const POKESEARCH = "searchPokemon"

const type_colors = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
    unknown: '#CACACA', 
    shadow: '#696383', 
}

const STAT_LENGTH_VALUE = 0.45;



class Stats {
    total = 0;
    constructor(hp, attack, defense, specialAttack, specialDefense, speed) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.speed = speed;
        this.total = hp.base_stat + attack.base_stat + defense.base_stat + specialAttack.base_stat + specialDefense.base_stat + speed.base_stat;
    }
}

class Move {
    constructor(name, damageClass, type) {
        this.name = name;
        this.damageClass = damageClass;
        this.type = type;
    }
}



class Pokemon {
    constructor(id, name, img, description, weight, height, types, forms, abilities, stats, moves) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.types = types;
        this.description = description;
        this.weight = weight;
        this.height = height;
        this.forms = forms;
        this.abilities = abilities;
        this.stats = stats;
        this.moves = moves;
    }
}


const createPokemonFromJson = async (pokemonData) => {
    let stats = createStatsFromJson(pokemonData.stats);
    let moves = createMovesFromJson(pokemonData.moves);
    let img = getPokemonImage(pokemonData.id);
    let description = await fetchSpeciesDescription(pokemonData.species.name);
    const pokemon = new Pokemon(
        pokemonData.id, 
        pokemonData.name, 
        img,
        description, 
        pokemonData.weight, 
        pokemonData.height, 
        pokemonData.types,
        pokemonData.forms, 
        pokemonData.abilities,
        stats, 
        moves   
    );
    
    updateMainPokemon(pokemon);
    return pokemon;
}


function createStatsFromJson(pokemonStatsData)
{
    let stats = new Stats(
        pokemonStatsData.find(s => s.stat.name == "hp"), 
        pokemonStatsData.find(s => s.stat.name == "attack"), 
        pokemonStatsData.find(s => s.stat.name == "defense"), 
        pokemonStatsData.find(s => s.stat.name == "special-attack"), 
        pokemonStatsData.find(s => s.stat.name == "special-defense"), 
        pokemonStatsData.find(s => s.stat.name == "speed"), 
    )
    return stats;
}

function createMovesFromJson(pokemonMovesData)
{
    let moves = []
    try {
        pokemonMovesData.forEach(m => {
            const url = BASE_URL_MOVE + m.move.name.toLowerCase();

            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                if (data) {
                    //console.log(data);
                    moves.push(new Move(m.move.name, data.damage_class.name, data.type.name));
                }
            })
        });
    } catch (error) {
        throw error;
    }
    //console.log(moves.Move[0]);
    return moves;
}


const fetchPokemon = (id) => {
    const url = BASE_URL_POKEMON + id;
    try {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            if (data) {
                createPokemonFromJson(data);
            }
        });
    } catch (error) {
        throw error;
    }
}

const fetchPokemonByType = (type) => {
    const url = BASE_URL_TYPE + type;
    try {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            if (data) {
                updatePokemonList(data.pokemon);
            }
        });
    } catch (error) {
        throw error;
    }
}

const fetchSpeciesDescription = async (species) => {
    const url = BASE_URL_SPECIES + species;
    try {
        let res = await fetch(url);
        result = await res.json();
        if (result) {
            return result.flavor_text_entries.find(d => d.language.name == 'en').flavor_text.replace('', '\n');
        }
    } catch (error)
    {
        throw error;
    }
}


const getPokemonImage =  (id) => {
    return BASE_URL_IMAGE + id + ".png";
}


const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const removeElementsFromClass = (className) => {
    const classElements = document.getElementsByClassName(className);
    console.log(classElements);
    for (let index = 0; index < classElements.length; index++) {
        const element = classElements.item(index);
        element.parentNode.removeChild(element);
    }
}

const setText = (text, id) => {
    let element = document.getElementById(id);
    element.textContent = text;
}

const setImg = (url, id) => {
    let element = document.getElementById(id)
    element.src = url;
}


const getTextFromObjectArray = (array, splitChr, key, key2) => {
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

/*const fetchPokemon = () => {
    const pokeNameInput = document.getElementById(POKESEARCH);
    let pokeName = pokeNameInput.value.toLowerCase();
    const url = BASE_URL_POKEMON + pokeName;
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
}*/

const nextPokemon = () => {
    if (currentId < LAST_ID) {
        currentId++;
    }
    else {
        currentId = 1;
    }
    fetchPokemon(currentId);
}

const previousPokemon = () => {
    if (currentId > 1) {
        currentId--;
    }
    else {
        currentId = LAST_ID;
    }
    fetchPokemon(currentId);
}

function updatePokemonList(pokemons) {
    let pokeList = document.getElementById("pokeList");
    pokemons.forEach(pokemon => {
        let pokePreview = document.createElement('p');
        pokePreview.textContent = pokemon.pokemon.name;
        pokeList.appendChild(pokePreview);
    });
}

/*fetchPokemonByType("fire");*/


function readAndSearchPokemon()
{
    const pokeNameInput = document.getElementById(POKESEARCH);
    let pokeName = pokeNameInput.value.toLowerCase();
    fetchPokemon(pokeName);
}

const drawInfoDrops = (array, container_id, class_name, color_array, color) => {
    let container = document.getElementById(container_id);

    array.forEach(text => {
        let drop = document.createElement("div");
        drop.className = class_name;
        //let pokeType = document.createElement('p');
        drop.textContent = text;
        if (color_array) {
            drop.style.backgroundColor = color_array[text];
        }
        else {
            drop.style.backgroundColor = color;
        }
        //pokeTypeDiv.appendChild(pokeType);
        container.appendChild(drop);
    });
}


const drawStatBar = (value, class_name, id) => {
    statContainer = document.getElementById(id);
    statBar = document.createElement("div");
    statBar.className = class_name;
    statBar.style.minWidth  = `${STAT_LENGTH_VALUE * value}%`;
    statContainer.appendChild(statBar);
}




function updateMainPokemon(pokemon){
    clearPokeInfo();
    currentId = pokemon.id;
    setText('# ' + pokemon.id, ID);
    setText(pokemon.name, NAME);
    setImg(pokemon.img, SPRITE);
    setText(pokemon.description, DESCRIPTION);
    setText(pokemon.weight / 10 + "KG", WEIGHT);
    setText(pokemon.height * 10  + "CM", HEIGHT);

    let abilities = getTextFromObjectArray(pokemon.abilities, ' ', "ability", "name").split(' ');

    drawInfoDrops(abilities, "abilities", "poke-ability", undefined, '#a0a0a0')

    /*let forms = getTextFromObjectArray(pokemon.forms,  ', ', "name");
    setText(forms, FORMS);*/

    let hp = pokemon.stats.hp;
    setText(hp.base_stat, HP);
    drawStatBar(hp.base_stat, "chart-stat", "hp-stat");

    let attack = pokemon.stats.attack;
    setText(attack.base_stat, ATTACK);
    drawStatBar(attack.base_stat, "chart-stat", "attack-stat");


    let defense = pokemon.stats.defense;
    setText(defense.base_stat, DEFENSE);
    drawStatBar(defense.base_stat, "chart-stat", "defense-stat");

    let spAtk = pokemon.stats.specialAttack;
    setText(spAtk.base_stat, SPATK);
    drawStatBar(spAtk.base_stat, "chart-stat", "spAtk-stat");

    let spDef = pokemon.stats.specialDefense;
    setText(spDef.base_stat, SPDEF);
    drawStatBar(spDef.base_stat, "chart-stat", "spDef-stat");

    let speed = pokemon.stats.speed;
    setText(speed.base_stat, SPEED);
    drawStatBar(speed.base_stat, "chart-stat", "speed-stat");

    let pokeTypes = getTextFromObjectArray(pokemon.types, ' ', "type", "name").split(' ');
    drawInfoDrops(pokeTypes, "types", "poke-type", type_colors);
    /*let pokeTypesDivContainer = document.getElementById("types");
    pokeTypes.forEach(type => {
        let pokeTypeDiv = document.createElement('div');
        pokeTypeDiv.className = "poke-type";
        let pokeType = type.type.name;;
        //let pokeType = document.createElement('p');
        pokeTypeDiv.textContent = pokeType;
        pokeTypeDiv.style.backgroundColor = type_colors[pokeType];
        //pokeTypeDiv.appendChild(pokeType);
        pokeTypesDivContainer.appendChild(pokeTypeDiv);
    });*/

    let pokeMovesTable = document.getElementById("movesTable");


    let pokeMoves = pokemon.moves;
    for (let i = 0; i < pokeMoves.length; i++) {
        let row = document.createElement('tr');
        let nameData = document.createElement('td');
        let dmgClssData = document.createElement('td');
        let typeData = document.createElement('td');
        
        //let entryOpener = document.createElement('summary');
        //entryOpener.textContent = "Effect entry"
        //let entry = document.createElement('details');
        
        nameData.textContent = pokeMoves[i].name;
        dmgClssData.textContent = pokeMoves[i].damageClass;
        typeData.textContent = pokeMoves[i].type;

        typeData.style.backgroundColor = type_colors[pokeMoves[i].type];
        //entry.textContent = pokeMoves[i].entry;

        row.className = "move-row";
        nameData.className = "name-data";
        dmgClssData.className = "dmgClass-data";
        typeData.className = "type-data";

        row.appendChild(nameData);
        row.appendChild(dmgClssData);
        row.appendChild(typeData);
        //entryOpener.appendChild(entry);

        //pokeMovesTable.appendChild(entryOpener);

        
        pokeMovesTable.appendChild(row);
    }
    //console.log(pokeMoves[0]);

    /*pokeMoves.forEach(move => {
        let row = document.createElement('tr');
        let nameData = document.createElement('td');
        let dmgClssData = document.createElement('td');
        let typeData = document.createElement('td');
        nameData.textContent = move.name;
        dmgClssData.textContent = move.damageClass;
        typeData.textContent = move.type;
        row.appendChild(nameData);
        row.appendChild(dmgClssData);
        row.appendChild(typeData);
        
        console.log(row);
        pokeMovesTable.appendChild(row);
    });*/
    
    setText(pokemon.stats.total, TOTAL);
}


function clearPokeInfo()
{
    let container;
    let classElements;

    setText('', ID);
    setText('', NAME);
    setImg('', SPRITE);
    setText('', DESCRIPTION);
    setText('', WEIGHT);
    setText('', HEIGHT);
    setText('', ABILITIES);
    //setText('', FORMS);
    setText('', HP);
    container = document.getElementById("hp-stat");
    removeAllChildNodes(container);

    setText('', ATTACK);
    container = document.getElementById("attack-stat");
    removeAllChildNodes(container);

    setText('', DEFENSE);
    container = document.getElementById("defense-stat");
    removeAllChildNodes(container);

    setText('', SPATK);
    container = document.getElementById("spAtk-stat");
    removeAllChildNodes(container);

    setText('', SPDEF);
    container = document.getElementById("spDef-stat");
    removeAllChildNodes(container);
    
    setText('', SPEED);
    container = document.getElementById("speed-stat");
    removeAllChildNodes(container);
    
    removeElementsFromClass("name-data");
    removeElementsFromClass("dmgClass-data");
    removeElementsFromClass("type-data");
    removeElementsFromClass("move-row");




    setText('', TOTAL)


    let pokeTypesDivContainer = document.getElementById("types");
    removeAllChildNodes(pokeTypesDivContainer);
}


function openTabInfo(evt, tabName) {
    let tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tabcontent");
    
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        
    }

    tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


fetchPokemon(currentId);


//var searchBtn = document.getElementById("searchBtn");
var input = document.getElementById("searchPokemon");

//searchBtn.onclick = readAndSearchPokemon;

input.addEventListener("keydown", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      clearPokeInfo();
      readAndSearchPokemon();
    }
  });



document.getElementById("statsBt").click();