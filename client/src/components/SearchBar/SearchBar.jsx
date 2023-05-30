import React from "react";
import  {useState} from "react"
import { getPokemonByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css"

const SearchBar = () => {
 
const dispatch = useDispatch()
const [name, setName] = useState('')


const handleInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value);
}

const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getPokemonByName(name))
    }


   return (
  <div>
    <input className={style.input} type='text' placeholder="Name Of Pokemon..." onChange={(event) => handleInputChange(event)} value={name}/>
    <button className={style.button} type='submit' onClick={(event) => handleSubmit(event)}>Search</button>
  </div>
   )

}

export default SearchBar;