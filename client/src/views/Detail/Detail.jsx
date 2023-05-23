import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import './Detail.module.css'
import { useParams } from "react-router-dom";



const Detail = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
        
    const pokemon = useSelector((state) => state.pokemonDetail)


    useEffect(()=>{
        dispatch(getPokemonById(id))
    },[dispatch, id])


    return (
        <div className="detail-page-container">
            <h3 className="title-detail">Details</h3>
        <div className="detail-container">
            <img className='img-detail' src={pokemon.image} alt={pokemon.image} width="140" height="150px"></img>
            <div className="details">
            <p className="name-detail">{pokemon.name}</p>
            <p>id: {pokemon.id}</p>
            <p>hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types ? (
            typeof pokemon.id === "string" ?
              pokemon.types.map(t => t.name).join(', ')
              : pokemon.types.join(', ')
          ) : (
            "Loading types..." // Mostrar mensaje de carga mientras se obtienen los datos
          )}</p>
        </div>
        </div>
        </div>
    )
} 

{/* <p>Types: {pokemon.types ? (
            typeof pokemon.id === "string" ?
              pokemon.types.map(t => t.name).join(', ')
              : pokemon.types.join(', ')
          ) : (
            "Loading types..." // Mostrar mensaje de carga mientras se obtienen los datos
          )}</p> */}

export default Detail;