import { GET_OWNERSHIPS, GET_USERS, LOADING, GET_DETAIL, CLEAR_DETAIL, REMOVE_OWNERSHIP, REMOVE_USER, POST_PROPERTY } from "./common";

const initialState = {
  ownerships: [],
  ownershipDetail: [],
  loading: false,
  error: false,
  response: null,
  Details: [],
    // propertiesToCheck: [],
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

    case POST_PROPERTY: 
      return {
        ...state
      }

      
      case GET_DETAIL:
        return {
            ...state,
            Details: action.payload
    };

    case CLEAR_DETAIL:
        return {
            ...state,
            Details: []
    };

    case REMOVE_OWNERSHIP:
      return {
          ...state,
      }

    case REMOVE_USER:
        return {
            ...state,
        }

    default:
      return state;
  }
}

export default rootReducer;
