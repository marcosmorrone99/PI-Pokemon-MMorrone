const { Pokemon, Type } = require('../db')
const axios = require('axios')
const { Op } = require('sequelize');




const pokemonsfromDb = async () => {
  
  const databasePokemons = await Pokemon.findAll({
    include:[{ //especifica las asociaciones que deben incluirse al buscar los registros de Pokemon
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }]
  }); //Solo se va a devolver el atributo name del modelo Type para cada registro de Pokemon

  return databasePokemons
}

const pokemonsFromApi = async () => {

  const pokemonArr = []

  let pokeApi = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"

    const apiPokemonsBeta = (await axios(pokeApi)).data.results
    
    const apiPokemons = apiPokemonsBeta.map(pokemon => {return axios(pokemon.url)}) //El resultado de cada solicitud se devuelve como una promesa
    
    return Promise.all(apiPokemons).then(r => {//Se utiliza Promise.all() para esperar a que se resuelvan todas las promesas en apiPokemons
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
   //Se pasa el ID como argumento a findByPk() y se proporcionan opciones adicionales en un objeto. Las opciones incluyen la inclusión del modelo Type y la configuración de los atributos a incluir en la consulta.
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
//findAll() para buscar en la base de datos los registros de tipo que coincidan con los valores proporcionados en el array types. Se utiliza una cláusula where para especificar que se deben buscar los tipos cuyos nombres estén incluidos en types.

await newPokemon.addType(typeDb);
        
return newPokemon;

}

const getType = async () => {
    let typeArr = []
    const apiTypes = await axios.get('https://pokeapi.co/api/v2/type')
    .then(response => response.data) //extraigo solo data
    console.log(apiTypes.results);
    apiTypes.results.forEach(type =>{ 
      typeArr.push({
        name: type.name,
      })
    }) //En cada iteración, se agrega un objeto al array typeArr que contiene el nombre del tipo.
    
    typeArr.forEach(type => {Type.findOrCreate({
        where: {
            name: type.name
        }
    })}) //buscar o crear un registro de tipo en la base de datos. Se especifica que se debe buscar o crear un tipo cuyo nombre coincida con el nombre del tipo actual en la iteración.
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



// const { Type } = require('../db');

// const createType = async (req, res) => {
//   try {
//     const { name } = req.body;

//     // Verificar si el tipo ya existe en la base de datos
//     const existingType = await Type.findOne({
//       where: { name },
//     });

//     if (existingType) {
//       return res.status(400).json({ message: 'El tipo ya existe' });
//     }

//     // Crear un nuevo tipo
//     const newType = await Type.create({ name });

//     res.status(201).json(newType);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error al crear el tipo' });
//   }
// };

// module.exports = {
//   createType,
// };

module.exports = {
    createPokemon,
    getAllPokemons,
    getPokemonById,
    searchPokemonByName,
    getType,
    pokemonsFromApi,
    pokemonsfromDb,

}

