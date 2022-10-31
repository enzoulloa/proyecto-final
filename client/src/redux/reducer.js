import {
  GET_OWNERSHIPS,
  GET_USERS,
  LOADING,
  GET_DETAIL,
  CLEAR_DETAIL,
  REMOVE_OWNERSHIP,
  REMOVE_USER,
  FILTER_BY,
  POST_PROPERTY,
  filterBy,
  GET_STATUS_LOGIN,
  ORDER_OWNERSHIPS,
  REGISTER_USER,
  FILTER_CARDS,
  order,
  MERCADO_PAGO,
  LOGIN_USER,
  EXIT_SESSION,
  LOGIN_USER_AUTH0,
  MERCADO_PAGO_ID,
  MERCADO_PAGO_PAYMENT_SATUS,
  USER_STATUS,
  LOGIN_MODAL,
  USER_FAVORITE,
  OWNERSHIP_FAVORITE,
  OWNERSHIP_FAVORITE_DELETE,
  REFRESH_FAVORITES,
  CLEAR_STATUS,
  USER_STATUS
} from "./common";

const initialState = {
  ownerships: [],
  ownershipDetail: [],
  ownershipsFiltered: [],
  loading: false,
  error: false,
  response: null,
  statuslogin: true,
  productId: "",
  paymentStatus: null,
  Details: [],
  user: "No Logueado",
  userFavorite: [],
  userInfo: {},
  // propertiesToCheck: [],
  reviews: [],
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
        productId: null,
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
    case GET_STATUS_LOGIN:
      return {
        ...state,
        statuslogin: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
      };
    case FILTER_CARDS:
      return {
        ...state,
        ownershipsFiltered: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: "USUARIO LOGUEADO",
      };
    case EXIT_SESSION:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_USER_AUTH0:
      return {
        ...state,
        user: action.payload,
      };
    case "POST_REVIEW":
      console.log(action.payload)
      return {
        ...state,
        reviews: [...state.reviews, action.payload]

      };
    case MERCADO_PAGO:
      console.log(action.payload)
      return {
        ...state,
        productId: action.payload
      }
    case MERCADO_PAGO_ID:
      console.log(action.payload);
      return {
        ...state,
        paymentId: action.payload
      }
    case MERCADO_PAGO_PAYMENT_SATUS:
      // console.log(action.payload);
      return {
        ...state,
        paymentStatus: action.payload
        }
    case USER_STATUS:
      return {
        ...state,
        user: action.payload
      }
    case 'GET_REVIEW':
      return {
        ...state,
        reviews: action.payload}

    case LOGIN_MODAL:
      return {
        ...state,
        loginuserModal: action.payload,
      };
    case USER_FAVORITE:
      return {
        ...state,
        userFavorite: action.payload.length
          ? action.payload
          : { Error: "No Tiene Favoritos" },
      };
    case MERCADO_PAGO:
      return {
        ...state,
        productId: action.payload,
      };
    case MERCADO_PAGO_ID:
      return {
        ...state,
        paymentId: action.payload,
      };
    case OWNERSHIP_FAVORITE:
      return {
        ...state,
        userFavorite: [...state.userFavorite, ...action.payload],
      };
    case OWNERSHIP_FAVORITE_DELETE:
      return {
        ...state,
        userFavorite: action.payload,
      };
    case MERCADO_PAGO_PAYMENT_SATUS:
      return {
        ...state,
        paymentStatus: action.payload,
      };
    case "GET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case CLEAR_STATUS:
      console.log(state[action.payload]);
      return {
        ...state,
        [state[action.payload]]: null
      }
    default:
      return state;
  }
}

export default rootReducer;
