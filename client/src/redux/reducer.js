import { GET_OWNERSHIPS, GET_USERS, LOADING } from "./common";

const initialState = {
  ownerships: [],
  ownershipDetail: [],
  loading: false,
  error: false,
  response: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OWNERSHIPS:
      return {
        ...state,
        ownerships: action.payload,
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

    default:
      return state;
  }
}

export default rootReducer;
