import React from "react";
import "./Paginado.css"

const Paginado = ({pokemonsPerPage, allPokemons, currentPage, paginate, prevPage, nextPage}) => {
      const pageNumbers = []

      for(let i = 1; i<=Math.ceil(allPokemons/pokemonsPerPage); i++){ 
        pageNumbers.push(i)
      }

      return (
            <div className="pagination-container">
                <ul className="pagination">
                    <li onClick={prevPage} className="page-number">{'<'}</li>
                    {pageNumbers.map((number) => (
                        <li 
                        key={number} 
                        onClick={() => paginate(number)}
                        className={'page-number'}>
                            {number}
                        </li>
                    ))}
                    <li onClick={nextPage} className="page-number">{'>'}</li>
                </ul>
            </div>
        )
      };

    //   className={`page-number ${currentPage === number ? 'active-page' : ''}`}>

export default Paginado;

