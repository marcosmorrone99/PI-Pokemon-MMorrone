import {Link} from "react-router-dom"
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar"

const NavBar = () => {
    return(
        <div className={style.mainContainer}>
         <Link to="/home">
         <button className={style.buttonNav}>Home</button>
         </Link>
         <SearchBar/>
         <Link to= '/form'>
         <button className={style.buttonNav}>Crear Pokemon</button>
         </Link>
        </div>
    )
}

export default NavBar;