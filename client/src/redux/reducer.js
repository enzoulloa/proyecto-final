import {
  GET_OWNERSHIPS,
  GET_USERS,
  LOADING,
  GET_DETAIL,
  CLEAR_DETAIL,
  REMOVE_OWNERSHIP,
  REMOVE_USER,
  POST_PROPERTY,
  FILTER_BY,
  ORDER_OWNERSHIPS,
  order,
  filterBy,
} from "./common";

const initialState = {
  ownerships: [],
  ownershipDetail: [],
  ownershipsFiltered: [],
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
        ownershipsFiltered: action.payload,
        ownershipDetail: [],
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

    // case FILTER_BY:
    //   const ownerships = state.ownerships;
    //   const ownershipsFilteredByOp = filterByOp(ownerships, action.payload);
    //   return {
    //     ...state,
    //     ownershipsFiltered: ownershipsFilteredByOp,
    //   };

    case FILTER_BY:
      const ownershipsToFilter = state.ownerships;
      const ownershipsFilteredByType = filterBy(
        ownershipsToFilter,
        action.payload
      );
      return {
        ...state,
        ownershipsFiltered: ownershipsFilteredByType,
      };

    case ORDER_OWNERSHIPS:
      const ownershipsToOrder = state.ownershipsFiltered;
      const ownershipsOrdered = order(ownershipsToOrder, action.payload);
      return {
        ...state,
        ownershipsFiltered: ownershipsOrdered,
      };

    case GET_DETAIL:
      return {
        ...state,
        ownershipDetail: action.payload,
      };

    case POST_PROPERTY:
      return {
        ...state,
        response: action.payload,
      };

    case REMOVE_OWNERSHIP:
      return {
        ...state,
      };

    case REMOVE_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
