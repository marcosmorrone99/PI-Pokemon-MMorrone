import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"
import Paginado from "../Paginado/Paginado"
import { useState } from "react"


const CardsContainer = (props) => {

    const pokemons = useSelector(state=>state.pokemons) //"traeme en esta constante todo lo que esta en el estado de pokemones"
    
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //lo podria haber hecho una constante ya que no uso el modificador de estado local
    const lastPokemonIndex = currentPage * pokemonsPerPage
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage
    const currentPokemons = pokemons.slice(firstPokemonIndex,lastPokemonIndex)

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const prevPage = () => {
        if (currentPage !== 1) {
           setCurrentPage(currentPage - 1);
        }
     };
    
     const nextPage = () => {
        if (currentPage !== Math.ceil(pokemons.length / pokemonsPerPage)) {
           setCurrentPage(currentPage + 1);
        }
     };

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
            currentPage={currentPage}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            />
            </div>
        </div>

    )
}
export default CardsContainer;