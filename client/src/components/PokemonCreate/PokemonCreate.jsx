import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { createPokemon, getTypes } from "../../redux/actions";
import {Link} from "react-router-dom"
import style from "./PokemonCreate.module.css"



const PokemonCreate = () => {
 
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getTypes())
  },[dispatch]
  )

const types = useSelector((state) => state.types)


const [input, setInput] = useState({
  name: "",
  image: "",
  hp: 0,
  attack: 0,
  defense: 0,
  speed: 0,
  height: 0,
  weight: 0,
  types: [],
})

const [error, setError] = useState({});

const handleChange = (event) => { //se llama cuando ocurre un evento de cambio en los campos de entrada del formulario. 
    setInput({
        ...input,
        [event.target.name] : event.target.value
    })
    setError(validation({
        ...input,
        [event.target.name] : event.target.value
      }))
}

const validation = (input) => {
  
    let error = {};
   if (!input.name) {
    error.name = 'Se requiere un Nombre'
    } else if (!/^[a-z]+$/.test(input.name)) {
      error.name = 'Name can only contain lowercase letters'
    }
  
    if (!input.hp) {
      error.hp = 'Hp value is required'
    }
  
    if (!input.attack) {
      error.attack = 'Attack value is required'
    }
  
    if (!input.defense) {
      error.defense = 'Defense value is required'
    }
  
    if (!input.speed) {
      error.speed = 'Speed value is required'
    }
  
    if (!input.height) {
      error.height = 'Height value is required'
    }
  
    if (!input.weight) {
      error.weight = 'Weight value is required'
    }

    if (!input.types) { // no esta funcionando como intended.
      error.types = 'Select at least one type'
    }
    return error;
  }

  const [checked, setChecked] = useState([]); //Este estado se utiliza para almacenar los tipos seleccionados en los checkboxes.

const handleCheck = (event) => {
  var updatedList = [...checked];
   if(event.target.checked){
    updatedList = [...checked, event.target.value];
  } else {
    updatedList.splice(checked.indexOf(event.target.value), 1); //Si la casilla de verificación fue desmarcada se elimina el valor correspondiente de updatedList utilizando el método splice. 
  } //Esto actualiza updatedList sin el valor del tipo de pokémon desmarcado.
  console.log(updatedList)
  setChecked(updatedList);
  setInput({
    ...input,
    types: [...updatedList]
  })
  setError(validation({
    ...input,
    types : [...updatedList]
  }))
} //Se encarga de actualizar el estado checked en función de las selecciones del usuario. Si un checkbox se marca, se agrega el valor correspondiente al array checked. Si se desmarca, se elimina el valor del array.

// const isChecked = (item) =>
//   checked.includes(item) ? "checked-item" : "not-checked-item";

const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createPokemon(input)) //para enviar los datos del formulario a la acción createPokemon
    setInput({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
    })
}


return (
    <div>
        <h1>¡Create Your Pokemon!</h1>
        <form className={style.form} onSubmit={(event) => handleSubmit(event)}>
        <div>
        <label className={style.label} >Name </label>
        <input className={style.input} type="text" value={input.name} name= "name" onChange={handleChange}/>
        {error.name && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.name}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>HP </label>
        <input className={style.input} type="number" value={input.hp} name= "hp" onChange={handleChange}/>
        {error.hp && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.hp}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Attack </label>
        <input className={style.input} type="number" value={input.attack} name= "attack" onChange={handleChange}/>
        {error.attack && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.attack}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Defense </label>
        <input className={style.input} type="number" value={input.defense} name= "defense" onChange={handleChange}/>
        {error.defense && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.defense}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Speed </label>
        <input className={style.input} type="number" value={input.speed} name= "speed" onChange={handleChange}/>
        {error.speed && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.speed}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Height </label>
        <input className={style.input} type="number" value={input.height} name= "height" onChange={handleChange}/>
        {error.height && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.height}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Weight </label>
        <input className={style.input} type="number" value={input.weight} name= "weight" onChange={handleChange}/>
        {error.weight && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.weight}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        </div>
        <div>
        <label className={style.label}>Image (URL) </label>
        <input className={style.input} type="url" value={input.image} name= "image" onChange={handleChange}/>
        </div>
        <div> 

         <div>
          <div>Types: </div>
            {error.types && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.types}</p>)}
          <div>
            {types && types.map((item, index) => (
              <div key={index}>
                <input value={item.name} type="checkbox" onChange={handleCheck} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
        <button className={style.submit} type="submit"
         disabled={!input.name || error.name || error.hp || error.attack || error.defense || error.speed || error.height || error.weight || input.types.length === 0}
        >Create Pokemon</button>
       
        </form>
    </div>
)

}

export default PokemonCreate