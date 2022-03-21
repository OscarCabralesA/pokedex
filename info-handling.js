
/*const BASE_URL_MOVE = 'https://pokeapi.co/api/v2/move/'



var pokemon = {
    id: 0,
    name: '', 
    species: '', 
    weight: 0, 
    height: 0, 
    type: '', 
    forms: '',
    abilities: [],
    stats: {
        hp: 0, 
        attack: 0,
        defense: 0, 
        specialAttack: 0, 
        specialDefense: 0,
        speed: 0,
        total: 0
    }, 
    moves: {
        name: '',
        damageClass: '', 
        type: ''
    }
}



function Stats(hp, attack, defense, specialAttack, specialDefense, speed)
{
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
    this.total = hp + attack + defense + specialAttack + specialDefense + speed;
}

function Move(name, damageClass, type)
{
    this.name = name;
    this.damageClass = damageClass;
    this.type = type;
}

function Pokemon(id, name, species, weight, height, types, forms, abilities, stats, moves)
{
    this.id = id;
    this.name = name;
    this.types = types;
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.forms = forms;
    this.abilities = abilities;
    this.stats = stats;
    this.moves = moves;
}


function createPokemonFromJson(pokemonData)
{
    let stats = createStatsFromJson(pokemonData.stats);
    let moves = createMovesFromJson(pokemonData.moves);
    const pokemon = new Pokemon(
        pokemonData.id, 
        pokemonData.name, 
        pokemonData.species.name, 
        pokemonData.weight, 
        pokemonData.height, 
        pokemonData.types,
        pokemonData.forms, 
        pokemonData.abilities,
        stats, 
        moves   
    )
    
    console.log(pokemon);

    return pokemon;
}


function createStatsFromJson(pokemonStatsData)
{
    let stats = new Stats(
        hp = pokemonStatsData.find(s => s.stat.name == "hp"), 
        attack = pokemonStatsData.find(s => s.stat.name == "attack"), 
        defense = pokemonStatsData.find(s => s.stat.name == "defense"), 
        specialAttack = pokemonStatsData.find(s => s.stat.name == "special-attack"), 
        specialDefense = pokemonStatsData.find(s => s.stat.name == "specialDefense"), 
        speed = pokemonStatsData.find(s => s.stat.name == "speed"), 
    )
    return stats;
}

function createMovesFromJson(pokemonMovesData)
{
    let moves = []
    try {
        pokemonMovesData.forEach(m => {
            let move = fetchMove(m.move.name);
            moves.push(new Move(m.move.name, move.damage_class.name, type.name));
        });
    } catch (error) {
        throw error;
    }
    return moves;
}

function fetchMove(id)
{
    console.log(id);
    const url = BASE_URL_MOVE + id.toLowerCase();
    try {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            if (data) {
                console.log(data);
                return data;
            }
        })
    } catch (error) {
        throw error;
    }
}

const fetchPokemon = (id) => {
    const url = BASE_URL_POKEMON + id.toLowerCase();
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
*/