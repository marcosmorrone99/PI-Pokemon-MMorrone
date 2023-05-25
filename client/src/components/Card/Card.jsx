import style from "./Card.module.css"
import {NavLink} from "react-router-dom"

const Card = (props) => {
    


    return(
        <div className={style.cardOut}>
        <div className={style.card}>
              <NavLink to={`/detail/${props.id}`}>
            <img src={props.image} alt={props.name} width="140px" height="150px" />
            </NavLink>
            <p>Name: {props.name}</p>
            <p>Types: {typeof props.id === "string" 
            ? props.types.map(t => t.name).join(', ')
            : props.types.join(', ')}</p>
        </div>
        </div>
    )
}


export default Card;