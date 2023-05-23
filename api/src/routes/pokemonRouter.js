const { Router } = require('express');
const {Pokemon} = require('../db')
const { createPokemon, getAllPokemons, getPokemonById, searchPokemonByName} = require('./controllers');
const axios = require('axios')

const pokemonRouter = Router()

pokemonRouter.get("/", async (req , res) => {
    const {name} = req.query
    
    try {
        const results = name ? await searchPokemonByName(name) : await getAllPokemons()
    
        return res.status(200).json(results)
        
    } catch (error) {
        console.log(error)
       return res.status(400).json({message: 'El nombre no existe'})
    }
        
});


pokemonRouter.get("/:id", async (req , res) => {
   const {id} = req.params

   const source = isNaN(id) ? "bdd" : "api"

   try {
        const pokemon = await getPokemonById (id, source)

        return res.status(200).json(pokemon)
        
    } catch (error) {
       console.log(error)
       return res.status(400).json({message: 'El id no existe'})
    }
    
});

pokemonRouter.post('/', async (req,res) => {
    
    try {

    const {name, hp, attack, defense, speed, height, weight, types, image} = req.body


    // const existsInDb = await Pokemon.findOne({
    //     where: {name}
    // })
    
    // if(existsInDb) return res.status(400).send('Un pokemon con ese nombre ya existe')

    
    const newPokemon = await createPokemon(name, hp, attack, defense, speed, height, weight, types, image)

    res.status(200).json(newPokemon)

    } catch (error) {
        console.log(error)
        res.status(404).json(error.message)
    }
})



module.exports = pokemonRouter;