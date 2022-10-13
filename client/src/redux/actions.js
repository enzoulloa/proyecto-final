import axios from "axios";
import { GET_OWNERSHIPS, GET_USERS, LOADING } from "./common";

export default function GetOwnerships() {
  return async function (dispatch) {
    dispatch({ type: LOADING, payload });
    const res = await axios.get(`localhost:3001/ownerships`);
    return dispatch({
      type: GET_OWNERSHIPS,
      payload: res.data,
    });
  };
}


export default function GetUsers(){
    return async function (dispatch){
        dispatch({type: LOADING, payload});
        const res = await axios.get(`localhost:3001/users`)
        return dispatch({
            type: GET_USERS,
            payload: res.data,
        })
    }
}