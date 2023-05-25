import { GET_POKEMONS, FILTER_TYPE, GET_TYPES, GET_POKEMONS_BY_ID, GET_POKEMONS_BY_NAME, CREATE_POKEMON, FILTER_CREATED, FILTER_AZ, FILTER_ATTACK  } from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemonDetail: {},
    types: []
}

const rootReducer = (state = initialState, action) => {
  switch(action.type){

    case GET_POKEMONS: //"en mi estado pokemons manda todo lo que te manda la accion getpokemons"
        return {...state,
               pokemons: action.payload,
               allPokemons: action.payload
               }

    
    case GET_TYPES: 
        return {
               ...state,
                 types: action.payload
                }
               
    case GET_POKEMONS_BY_ID:
        return {
                ...state,
                pokemonDetail: action.payload
                }
                
    case GET_POKEMONS_BY_NAME:
         return {
                 ...state,
                 pokemons: action.payload,
                 allPokemons: action.payload
                  }

    case CREATE_POKEMON: 
          return ({
                  ...state,
                  pokemons: [...state.pokemons, action.payload ]
                  })
                
    
    case FILTER_CREATED: 
    
    if (action.payload === "--") {
    return {
      ...state,
      pokemons: state.allPokemons,
    };
    }  
    
    if(action.payload === "db") {
        console.log(state.allPokemons.filter(p => p.id.length > 5))
        return {
                   ...state,
                   pokemons: state.allPokemons.filter(p => p.id.length > 5)
                    }
              } 
    else if (action.payload === "api") {
        console.log(state.allPokemons.filter(p => typeof(p.id) === "number"))
         return {
                   ...state,
                    pokemons: state.allPokemons.filter(p => typeof(p.id) === "number")
                    }
              }
      
        return {
                  ...state,
                    pokemons: state.pokemons
                }


    case FILTER_AZ:

    if(action.payload === "atoz") {
          return  {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) =>
                    a.name > b.name ? 1 : -1,)
                    }
                    } 
      else if (action.payload === "ztoa") {
           return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) =>
                    a.name > b.name ? -1 : 1,
                    )
                  }
        } else {
           return {
                    ...state,
                    pokemons: state.allPokemons
                    }
              }

        

      case FILTER_TYPE:
        if (action.payload === "--") {
            return {
                      ...state,
                      pokemons: state.allPokemons
                  }
        } else {
            return {
                      ...state,
                      pokemons: state.allPokemons.filter(p => (p.types && p.types.includes(action.payload)) || (p.types && p.types.map(t=> t.name).includes(action.payload)))
                  }
          }

    case FILTER_ATTACK:

      if(action.payload === "asc") {
          return {
              ...state,
              pokemons : state.pokemons.sort((a, b) => a.attack - b.attack)
          }
        } 
        else if (action.payload === "desc") {
            return {
              ...state,
              pokemons: state.pokemons.sort((a, b) => b.attack - a.attack)
            }
          }
          return {
            ...state,
            pokemons: state.pokemons
          }
    
    default:
        return {...state}
  }
}

export default rootReducer;