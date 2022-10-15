import axios from "axios";
import { GET_OWNERSHIPS, GET_USERS, LOADING } from "./common";

export function GetOwnerships() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    const res = await axios.get(`http://localhost:3001/ownerships`);
    return dispatch({
      type: GET_OWNERSHIPS,
      payload: res.data,
    });
  };
}

export function GetUsers() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    const res = await axios.get(`http://localhost:3001/users`);
    return dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  };
}
