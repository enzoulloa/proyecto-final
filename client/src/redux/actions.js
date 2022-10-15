import axios from "axios";
import { GET_OWNERSHIPS, GET_USERS, LOADING, POST_PROPERTY, SELL_FORM } from "./common";

export function GetOwnerships() {
  return async function (dispatch) {
    dispatch({ type: LOADING, payload });
    const res = await axios.get(`localhost:3001/ownerships`);
    return dispatch({
      type: GET_OWNERSHIPS,
      payload: res.data,
    });
  };
}

export function GetUsers(){
    return async function (dispatch){
        dispatch({type: LOADING, payload});
        const res = await axios.get(`localhost:3001/users`)
        return dispatch({
            type: GET_USERS,
            payload: res.data,
        })
    }
}

export function postProperty(payload){
  return async function (dispatch){
    const response = await axios.post('localhost:3001/ownerships/', payload);
    return dispatch({
      type: POST_PROPERTY,
      payload: response.data
    });
  };
};

// export function sellFormPost(payload){
//   return {
//     type: SELL_FORM,
//     payload
//   };
// };