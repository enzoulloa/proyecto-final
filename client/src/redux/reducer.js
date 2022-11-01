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
  CLEAR_STATUS,
  USER_STATUS,
  USER_SALES,
  // USER_STATUS,
  LOGIN_MODAL,
  USER_FAVORITE,
  OWNERSHIP_FAVORITE,
  OWNERSHIP_FAVORITE_DELETE,
  REFRESH_FAVORITES,
  STATUS_USER,
  MODAL_SIGN,
  POST_REVIEW,
  GET_REVIEW,
  GET_USER_INFO,
  DELETE_USER,
  UPDATE_USERTYPE,
  NEW_PASSWORD,
} from "./common";

const initialState = {
  ownerships: [],
  ownershipDetail: [],
  ownershipsFiltered: [],
  users: [],
  loading: false,
  error: false,
  response: null,
  statuslogin: true,
  productId: "",
  // paymentId: '',
  saleSate: "",
  // newUserInfo: {},
  userSales: [],
  paymentStatus: null,
  Details: [],
  user: "No Logueado",
  userFavorite: [],
  userInfo: {},
  reviews: [],
  modalSign: true,
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
    case CLEAR_DETAIL:
      return {
        ...state,
        ownershipDetail: []
      }
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
    case USER_SALES:
      return {
        ...state,
        userSales: action.payload,
      };
    case CLEAR_STATUS:
      console.log(state[action.payload]);
      return {
        ...state,
        [state[action.payload]]: null,
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case USER_STATUS:
      return {
        ...state,
        user: action.payload,
      };

    case GET_REVIEW:
      return {
        ...state,
        reviews: action.payload,
      };

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
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case "USER_BY_ID":
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      const users = state.users;
      const usersLeft = users.filter((u) => u.id !== action.payload.userId);
      return {
        ...state,
        response: action.payload.response,
        users: usersLeft,
      };
    case UPDATE_USERTYPE:
      return {
        ...state,
        users: action.payload,
      };
    case NEW_PASSWORD:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_USERTYPE:
      return {
        ...state,
        userInfo: action.payload,
        user: "Cambio de usuario",
      };
    case STATUS_USER:
      return {
        ...state,
        statuslogin: action.payload,
      };
    case MODAL_SIGN:
      return {
        ...state,
        modalSign: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
