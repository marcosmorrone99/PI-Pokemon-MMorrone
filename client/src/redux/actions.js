import axios from "axios"

export const GET_POKEMONS = "GET_POKEMONS"
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMONS_BY_ID = 'GET_POKEMONS_BY_ID';
export const FILTER_TYPE = 'FILTER_TYPE';
export const GET_POKEMONS_BY_NAME = 'GET_POKEMONS_BY_NAME';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const FILTER_AZ = 'FILTER_AZ';
export const FILTER_ATTACK = 'FILTER_ATTACK';
export const FILTER_CREATED = 'FILTER_CREATED';


export const getPokemons = () => { 
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
          type: GET_POKEMONS,
          payload: json.data
        })
    }
}

export const getTypes = () => dispatch => {
  axios.get('http://localhost:3001/types')
    .then(response => {
      dispatch({
        type: GET_TYPES,
        payload: response.data
      });
    })
};


export const getPokemonById = (id) => dispatch => {
  axios.get(`http://localhost:3001/pokemons/${id}`)
    .then(response => {
      dispatch({
        type: GET_POKEMONS_BY_ID,
        payload: response.data
      });
    })
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const pokesByName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch ({
        type: GET_POKEMONS_BY_NAME, 
        payload: pokesByName.data
      })
    } catch (error) {
      alert("No existe un pokemon con ese nombre")
      console.log(error)
    }
  }
}

export const createPokemon = (values) => {
  return async function (dispatch) {
  const newPokemon = await axios.post('http://localhost:3001/pokemons', values)
  .catch(error => alert(error.response.data))
      return dispatch ({type: CREATE_POKEMON, payload: newPokemon})
  }
}

export const filterTypes = (payload) => {
  return {type: FILTER_TYPE, payload}
}

export const filterAZ = (payload) => {
  return {type: FILTER_AZ, payload}
}

export const filterAttack = (payload) => {
  return {type: FILTER_ATTACK, payload}
}

export const filterCreated = (payload) => {
  return {type: FILTER_CREATED, payload}
}