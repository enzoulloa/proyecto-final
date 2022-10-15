import { GET_OWNERSHIPS, GET_USERS, LOADING, POST_PROPERTY } from "./common";

const initialState = {
  properties: [],
  propertyDetail: [],
  // propertiesToCheck: [],
  loading: false,
  error: false,
  response: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OWNERSHIPS:
      return {
        ...state,
        properties: action.payload,
        loading: false,
        error: false,
        response: null,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
        response: null,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_PROPERTY: 
      return {
        ...state
      }
    default:
      return state;
  }
}

export default rootReducer;
