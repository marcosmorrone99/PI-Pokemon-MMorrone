const { Pokemon, Type } = require('../db')
const axios = require('axios')
const { Op } = require('sequelize');




const pokemonsfromDb = async () => {
  
  const databasePokemons = await Pokemon.findAll({
    include:[{
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }]
  });

  return databasePokemons
}

const pokemonsFromApi = async () => {

  const pokemonArr = []

  let pokeApi = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"

    const apiPokemonsBeta = (await axios(pokeApi)).data.results
    
    const apiPokemons = apiPokemonsBeta.map(pokemon => {return axios(pokemon.url)})
    
    return Promise.all(apiPokemons).then(r => { // por cada pokemon pusheo al arr que hice arriba solamente los elementos que necesito.
     r.forEach(p => {
             pokemonArr.push({
                 id: p.data.id,
                 name: p.data.name,
                 hp: p.data.stats[0].base_stat,
                 attack: p.data.stats[1].base_stat,
                 defense: p.data.stats[2].base_stat,
                 speed: p.data.stats[5].base_stat,
                 height: p.data.height,
                 weight: p.data.weigth,
                 types: p.data.types.map(t => t.type.name),
                 image: p.data.sprites.front_default
             })
         })
         return pokemonArr
        }
        )

  }
  

const getAllPokemons = async () => { // concateno el arr de db y el de api en uno para despues devolver todos los pokemones
  const apiData = await pokemonsFromApi()
  const dbData = await pokemonsfromDb()
  const allData = apiData.concat(dbData)

  return allData

}


const searchPokemonByName = async (name) => {


  const all = await getAllPokemons()

  const pokemonBuscado = all?.filter(e => e.name.toLowerCase() === name.toLowerCase())

  return pokemonBuscado;
}



const getPokemonById = async (id, source) => {
  if(source === "api") {
    
    const pokemonIdApi = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return {
        id: pokemonIdApi.data.id,
        name: pokemonIdApi.data.name,
        hp: pokemonIdApi.data.stats[0].base_stat,
        attack: pokemonIdApi.data.stats[1].base_stat,
        defense: pokemonIdApi.data.stats[2].base_stat,
        speed: pokemonIdApi.data.stats[5].base_stat,
        height: pokemonIdApi.data.height,
        weight: pokemonIdApi.data.weight,
        types: pokemonIdApi.data.types.map(t => t.type.name),
        image: pokemonIdApi.data.sprites.front_default
  }
} else {
  const pokemonIdDb = Pokemon.findByPk(id,
    {include: [{
     model: Type,
     attributes: ["name"],
     through: {
         attributes: []
   }
 }]})
 return pokemonIdDb;
}

}



const createPokemon = async (name, hp, attack, defense, speed, height, weight, types, image) => {

  console.log("listado de types",types)

  const newPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image
  })

// types.forEach(async (t) => {
//   console.log("type como parametro",t)
//   const type = await Type.findOne({
//     where: {
//       name: t,
//     }
//   })
//   console.log(type)
//   await newPokemon.addType(type)
// })

let typeDb = await Type.findAll({
  where: {
      name: types,
  }
});

await newPokemon.addType(typeDb);
        
return newPokemon;

}

const getType = async () => {
    let typeArr = []
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
    .then(response => response.data)
    console.log(apiTypes.results);
    apiTypes.results.forEach(type =>{
        typeArr.push({
            name: type.name,
        })
    })
    typeArr.forEach(type => {Type.findOrCreate({
        where: {
            name: type.name
        }
    })})
    console.log(typeArr);
    return typeArr
}

// const loadtypes = async () => {
//   try {
//     const types = (await axios.get('https://pokeapi.co/api/v2/type')).data.results
//     types.map(async(type) => {
//       const name = await type.name
//       await Type.create({name})
//     })
//   } catch (error) {
//     resizeBy.status(500).json({error:error.message})
//   }
// }

module.exports = {
    createPokemon,
    getAllPokemons,
    getPokemonById,
    searchPokemonByName,
    getType,
    pokemonsFromApi,
    pokemonsfromDb,

}

