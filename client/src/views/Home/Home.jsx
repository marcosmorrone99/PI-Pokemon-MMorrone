import CardsContainer from "../../components/CardsContainer/CardsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,filterTypes, filterAttack, filterCreated, filterAZ, getTypes } from "../../redux/actions";
import { Link } from "react-router-dom"
import style from "./Home.module.css"
// import Paginado from "../../components/Paginado/Paginado";

const Home = (props) => {

const dispatch = useDispatch()

const allPokemons = useSelector ((state) => state.pokemons)

const types = useSelector((state) => state.types)

console.log(allPokemons);
console.log(types);

const [orden, setOrden] = useState('')
   
   useEffect(()=>{
    dispatch(getPokemons())
    dispatch(getTypes())
   },[dispatch])


   
const handleClick = (event) => {
     event.preventDefault()
     dispatch(getPokemons())
  }

  const handlerFilterCreated = (event) => {
    setOrden(dispatch(filterCreated(event.target.value))) //actualizo el estado orden. Desarrollar mas adelante
 }

const handleFilterTypes = (event) => {
    setOrden(dispatch(filterTypes(event.target.value)))
}

const handlerAttack = (event) => {
    dispatch(filterAttack(event.target.value))
    setOrden(`Ordenado ${event.target.value}`)
   }

const handlerAtoZ = (event) => {
    dispatch(filterAZ(event.target.value))
    setOrden(`Ordenado ${event.target.value}`)
}

    return(
        <div className={style.home}>
            <div>
                <select className={style.select} onChange={event => handleFilterTypes(event)}>
                <option value="--">Types</option>
                {types && types.map(t => (<option value={t.name}>{t.name}</option>))}
                </select>
                <select className={style.select} onChange={event => handlerFilterCreated(event)}>
                    <option value="--">---</option>
                    <option value="api">From API</option>
                    <option value="db">Created By You</option>
                </select>
                <select className={style.select} onChange={event => handlerAttack(event)}>
                    <option value="--">---</option>
                    <option value="desc">Higher To Lower Attack</option>
                    <option value="asc">Lower To Higher Attack</option>
                </select>
                <select className={style.select} onChange={event => handlerAtoZ(event)}>
                    <option value="--">---</option>
                    <option value="atoz">A-Z</option>
                    <option value="ztoa">Z-A</option>
                </select>
           <button className={style.button} onClick={event => handleClick(event)}>
            Reset Filters
            </button>
           <CardsContainer/>
            </div>
            </div>
    )
}
export default Home;