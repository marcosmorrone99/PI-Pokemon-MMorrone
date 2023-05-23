import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({pokemonsPerPage, allPokemons, setCurrentPage}) => {
      const pageNumber = []

      for(let i = 1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){ 
        pageNumber.push(i)
      }

      return (
        
            <div >
                {pageNumber && pageNumber.map((number, index) => {
                    return <button key={index} onClick={() => setCurrentPage(number)} className={style.paginado}>{number}</button>
                  })}
            </div>
        
      )
}

export default Paginado;