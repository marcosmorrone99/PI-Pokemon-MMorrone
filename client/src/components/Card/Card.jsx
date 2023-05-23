import style from "./Card.module.css"
import {NavLink} from "react-router-dom"

const Card = (props) => {
    


    return(
        
        <div className={style.card}>
              <NavLink to={`/detail/${props.id}`}>
            <img src={props.image} alt={props.name} width="140px" height="150px" />
            </NavLink>
            <p>Nombre: {props.name}</p>
            <p>Tipos: {typeof props.id === "string" 
            ? props.types.map(t => t.name).join(', ')
            : props.types.join(', ')}</p>
            
        </div>
    )
}

{/* Tipos: {typeof props.id === "string" 
            ? props.types.map(t => t.name).join(', ')
            : props.types.join(', ')}</p> */}

export default Card;