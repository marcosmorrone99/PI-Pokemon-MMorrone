import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"
import Paginado from "../Paginado/Paginado"
import { useState } from "react"


const CardsContainer = () => {

    const pokemons = useSelector(state=>state.pokemons) //"traeme en esta constante todo lo que esta en el estado de pokemones"
    
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const lastPokemonIndex = currentPage * pokemonsPerPage
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage
    const currentPokemons = pokemons.slice(firstPokemonIndex,lastPokemonIndex)

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

    return(
        <div className={style.container}>
            <div className={style.container}>
            {currentPokemons.map(pokemon => {
                return <Card
                key = {pokemon.id}
                id = {pokemon.id}
                image= {pokemon.image}
                name= {pokemon.name}
                types= {pokemon.types}
                />
            })}
            </div>
            <div className={style.paginadoContainer}>
            <Paginado 
            pokemonsPerPage={pokemonsPerPage} 
            allPokemons={pokemons.length} 
            setCurrentPage={setCurrentPage} />
            </div>
        </div>

    )
}
export default CardsContainer;