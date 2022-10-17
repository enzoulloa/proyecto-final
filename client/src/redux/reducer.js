import {
  GET_OWNERSHIPS,
  GET_USERS,
  LOADING,
  GET_DETAIL,
  CLEAR_DETAIL,
  REMOVE_OWNERSHIP,
  REMOVE_USER,
  FILTER_BY_OP,
  POST_PROPERTY, 
  filterByOp,
  GET_STATUS_LOGIN
} from "./common";


const initialState = {
  ownerships: [],
  ownershipDetail: [],
  ownershipsFiltered: [],
  loading: false,
  error: false,
  response: null,
  Details: [],
  statuslogin: '',
    // propertiesToCheck: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OWNERSHIPS:
      return {
        ...state,
        ownerships: action.payload,
        ownershipsFiltered: action.payload,
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

    case FILTER_BY_OP:
      const ownerships = state.ownerships;
      const ownershipsFilteredByOp = filterByOp(ownerships, action.payload);
      return {
        ...state,
        filteredOwnerships: ownershipsFilteredByOp,
      };

    case GET_DETAIL:
      return {
        ...state,
        Details: action.payload,
      };

    case POST_PROPERTY: 
      return {
        ...state
      }

    case CLEAR_DETAIL:
      return {
        ...state,
        Details: [],
      };

    case REMOVE_OWNERSHIP:
      return {
        ...state,
      };

    case REMOVE_USER:
      return {
        ...state,
      };
    case GET_STATUS_LOGIN:
      return{
        ...state,
        statuslogin: action.payload
      }

    default:
      return state;
  }
}

export default rootReducer;
