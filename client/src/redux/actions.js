import axios from "axios";
import Swal from "sweetalert2";
// import { use } from "../../../server/src/routes/payment";
import {
  GET_OWNERSHIPS,
  GET_USERS,
  LOADING,
  GET_DETAIL,
  CLEAR_DETAIL,
  REMOVE_OWNERSHIP,
  REMOVE_USER,
  FILTER_BY,
  ORDER_OWNERSHIPS,
  POST_PROPERTY,
  GET_STATUS_LOGIN,
  FILTER_CARDS,
  MERCADO_PAGO,
  MERCADO_PAGO_ID,
  MERCADO_PAGO_PAYMENT_SATUS,
  SELL_FORM,
  LOGIN_USER,
  EXIT_SESSION,
  LOGIN_USER_AUTH0,
  CLEAR_STATUS,
  USER_STATUS,
  USER_SALES,
  LOGIN_MODAL,
  USER_FAVORITE,
  OWNERSHIP_FAVORITE,
  OWNERSHIP_FAVORITE_DELETE,
  REFRESH_FAVORITES,
  STATUS_USER,
  MODAL_SIGN,
  NEW_PASSWORD,
  UPDATE_USERTYPE,
  GET_USER_INFO,
  GET_REVIEW,
  POST_REVIEW,
} from "./common";
const ACCESS_TOKEN =
  "TEST-7893132721883360-101817-34c31b28ae790652f296a05af3cf9adf-1078900971";

const URL_SERVER = "https://proyecto-final.up.railway.app";

const localHost = "http://localhost:3001";

export function GetOwnerships() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    const res = await axios.get(`${URL_SERVER}/ownerships`);
    return dispatch({
      type: GET_OWNERSHIPS,
      payload: res.data,
    });
  };
}

export function GetUsers() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    const res = await axios.get(`${URL_SERVER}/users`);
    return dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  };
}

export function filterBy(filters) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_BY,
      payload: filters,
    });
  };
}

export function orderOwnerships(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_OWNERSHIPS,
      payload: payload,
    });
  };
}

export function postProperty(payload) {
  return async function (dispatch) {
    const response = await axios.post(`${URL_SERVER}/ownerships/`, {
      name: payload.name,
      location: payload.location,
      rooms: payload.rooms,
      garage: payload.garage,
      type: payload.type,
      m2: payload.m2,
      expenses: payload.expenses,
      seller: payload.seller,
      description: payload.description,
      images: payload.images,
      state: payload.state,
      price: payload.price,
      floors: payload.floors,
      address: payload.address,
      seller: "Bautista",
    });
    return dispatch({
      type: POST_PROPERTY,
      payload: response.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_SERVER}/ownerships/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error 404",
        text: "Ownership info dont found, see if it exist first.",
      });
    }
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}
export function removeOwnership(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `${URL_SERVER}/deleteOwnerships/${id}`
      );
      return dispatch({
        type: REMOVE_OWNERSHIP,
        payload: response.data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: "Cant delete ownership",
        footer: "Check if ownership id is correct, and try again",
      });
    }
  };
}

export function GetStatusLogin(e) {
  return {
    type: GET_STATUS_LOGIN,
    payload: e,
  };
}

export function filterCards(search) {
  return async function (dispatch) {
    try {
      const newHouses = await axios.get(`${URL_SERVER}/ownerships?${search}`);
      if (newHouses.data.length === 0)
        throw new Error("No se encontró ninguna casa");
      return dispatch({
        type: FILTER_CARDS,
        payload: newHouses.data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: "No se encontro ninguna casa",
      });
    }
  };
}

export function UserRegister(payload) {
  return async function (dispatch) {
    const newUser = await axios.post(`${URL_SERVER}/users/register`, payload);
    return newUser;
  };
}

export function LoginUser(payload) {
  return async function (dispatch) {
    const LoginUser = await axios.post(`${URL_SERVER}/login`, payload);
    localStorage.setItem("UserLogin", JSON.stringify(LoginUser.data));
    return dispatch({
      type: LOGIN_USER,
      payload: "USUARIO LOGUEADO",
    });
  };
}

export function ExitSession() {
  return async function (dispatch) {
    const ExitSession = await axios.get(`${URL_SERVER}/logout`);
    localStorage.removeItem("UserLogin");
    return dispatch({
      type: EXIT_SESSION,
      payload: "USUARIO NO LOGUEADO",
    });
  };
}

export function getUserId(userId) {
  return async function (dispatch) {
    try {
      console.log(userId);
      const user = await axios.get(`${URL_SERVER}/users/id/${userId}`);
      const userObj = {
        id: user.data.id,
        name: user.data.name,
        rol: user.data.rol,
        photo: user.data.photo,
        Ownerships: user.data.Ownerships,
      };
      localStorage.removeItem("UserLogin");
      localStorage.setItem("UserLogin", JSON.stringify(userObj));
      return dispatch({
        type: "USER_BY_ID",
        payload: userObj,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function mercadoPago(payload) {
  return async function (dispatch) {
    try {
      // const response = await axios.post(`${URL_SERVER}/payment`, payload);
      const response = await axios.post(`${localHost}/payment`, payload);
      return dispatch({
        type: MERCADO_PAGO,
        payload: response.data.productId,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function mercadoPagoId(ownershipId, userId) {
  return async function (dispatch) {
    try {
      console.log('entro a la action');
      console.log(ownershipId);
      const response = await axios.get(
        // `${URL_SERVER}/payment/paymentId/${ownershipId}/${userId}`
        `${localHost}/payment/paymentId/${ownershipId}/${userId}`
      );
      console.log(response.data);
      const paymentId = response.data;
      const paymentStatus = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}/?access_token=${ACCESS_TOKEN}`
      );
      const state = paymentStatus.data.status;
      const state_detail = paymentStatus.data.status_detail;
      const ownershipSale = await axios.put(
        // `${URL_SERVER}/payment/editSale`
        `${localHost}/payment/editSale`
        , {
          state,
          state_detail,
          paymentId,
      });
      const userSales = await axios.get(`${localHost}/payment/getSales/${userId}`);
      console.log(userSales.data);
      return dispatch({
        type: USER_SALES,
        payload: userSales.data,
      });
      // return dispatch({
      //   type: MERCADO_PAGO_ID,
      //   payload: ownershipSale.data,
      // });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSales(userId) {
  console.log(userId);
  return async function (dispatch) {
    try {
      // const userSales = await axios.get(`${URL_SERVER}/payment/getSales/${userId}`);
      const userSales = await axios.get(`${localHost}/payment/getSales/${userId}`);
      console.log(userSales.data);
      return dispatch({
        type: USER_SALES,
        payload: userSales.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function mercadoPagoPayment(id) {
//   return async function (dispatch) {
//     try {
//       // console.log(id);
//       const response = await axios.get(`https://api.mercadopago.com/v1/payments/${id}/?access_token=${ACCESS_TOKEN}`);
//       // console.log(response);
//       const paymentStatus = {
//         status: response.data.status,
//         status_detail: response.data.status_detail
//       };
//       return dispatch({
//         type: MERCADO_PAGO_PAYMENT_SATUS,
//         payload: paymentStatus
//       })
//     } catch (error) {
//       console.log(error);
//     };
//   };
// };

export function clearStatus(status) {
  return {
    type: CLEAR_STATUS,
    payload: status,
  };
}

export function LoginUserAuth0(payload) {
  return async function (dispatch) {
    const LoginUserAuth0 = await axios.post(
      `${URL_SERVER}/login/auth0`,
      payload
    );
    localStorage.setItem("UserLogin", JSON.stringify(LoginUserAuth0.data));
    return {
      type: LOGIN_USER_AUTH0,
      payload: "USUARIO AUTH0 LOGUEADO",
    };
  };
}
export function LoginStatus() {
  const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
  if (!userLogin) {
    return {
      type: USER_STATUS,
      payload: "No Logueado",
    };
  } else {
    return {
      type: USER_STATUS,
      payload: "Logueado",
    };
  }
}

export function postReview(payload) {
  return async (dispatch) => {
    const response = await axios.post(
      `${URL_SERVER}/reviews?ownerID=${payload.ownerID}&userID=${payload.user.id}`,
      payload.review
    );
    const newReview = {
      ...payload.review,
      Users: [
        {
          ...payload.user,
        },
      ],
    };

    return dispatch({
      type: POST_REVIEW,
      payload: newReview,
    });
  };
}

export function getReview(ownerID) {
  return async (dispatch) => {
    const response = await axios.get(`${URL_SERVER}/reviews/${ownerID}`);
    return dispatch({
      type: GET_REVIEW,
      payload: response.data,
    });
  };
}

export function statusLoginModal(boolean) {
  return {
    type: LOGIN_MODAL,
    payload: boolean,
  };
}

export function userFavorite() {
  return async (dispatch) => {
    try {
      const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
      const favorites = await axios.get(
        `${URL_SERVER}/users/${userLogin.name}`
      );
      return dispatch({
        type: USER_FAVORITE,
        payload: favorites.data.Ownerships.length
          ? favorites.data.Ownerships
          : { Error: "no existe" },
      });
    } catch (error) {
      return dispatch({
        type: USER_FAVORITE,
        payload: { Error: "no tiene favoritos" },
      });
    }
  };
}

export function addfavorite(payload) {
  return async (dispatch) => {
    try {
      const addfavorite = await axios.put(
        `${URL_SERVER}/users/addfavorite`,
        payload
      );
      const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
      const favorites = await axios.get(
        `${URL_SERVER}/users/${userLogin.name}`
      );
      return dispatch({
        type: OWNERSHIP_FAVORITE,
        payload: favorites.data.Ownerships,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: "No se puedo agregar propiedad",
      });
    }
  };
}

export function deleteFavorite(payload) {
  return async (dispatch) => {
    try {
      const deletefavorite = await axios.delete(
        `${URL_SERVER}/users/addfavorite?id=${payload.id}&idUser=${payload.idUser}`
      );
      const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
      const favorites = await axios.get(
        `${URL_SERVER}/users/${userLogin.name}`
      );
      return dispatch({
        type: OWNERSHIP_FAVORITE_DELETE,
        payload: favorites.data.Ownerships,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: "No se puedo eliminar propiedad",
      });
    }
  };
}

export function refresh() {
  return async (dispatch) => {
    const userLogin = JSON.parse(localStorage.getItem("UserLogin"));
    const favorites = await axios.get(`${URL_SERVER}/users/${userLogin.name}`);
    return dispatch({
      type: REFRESH_FAVORITES,
      payload: favorites.data.Ownerships,
    });
  };
}

export function getUserInfo(name) {
  return async function (dispatch) {
    const response = await axios.get(`${URL_SERVER}/users/${name}`);
    return dispatch({
      type: GET_USER_INFO,
      payload: response.data,
    });
  };
}

export function banUser(userId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `${URL_SERVER}/deleteUsers/${userId}`
      );
      return dispatch({
        type: DELETE_USER,
        payload: { userId, response: "Usuario borrado" },
      });
    } catch (error) {
      return dispatch({
        type: DELETE_USER,
        payload: "Ocurrio un error, vuelva a intentarlo",
      });
    }
  };
}

export function updateRole(data) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `${URL_SERVER}/create/admin/${data.userId}`,
        { userType: data.userType }
      );
      if (response.status === 200) {
        const newUsers = await axios.get(`${URL_SERVER}/users`);
        return dispatch({
          type: UPDATE_USERTYPE,
          payload: newUsers.data,
        });
      }
    } catch (error) {
      console.log(error);
      return dispatch({
        type: UPDATE_USERTYPE,
        payload: error.message,
      });
    }
  };
}

export function updatePassword(payload) {
  return async function (dispatch) {
    try {
      const password = payload.passwordChangeForm;
      await axios.put(
        `${URL_SERVER}/create/password/${payload.userID}`,
        password
      );
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada con exito",
      });
      return dispatch({
        type: NEW_PASSWORD,
      });
    } catch (err) {
      console.log(err.response.data);
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: err.response.data.message,
      });
    }
  };
}

export function updateUserData(payload) {
  return async function (dispatch) {
    try {
      let userLogin = JSON.parse(localStorage.getItem("UserLogin"));
      if (payload.newInfo.name) {
        userLogin.name = payload.newInfo.name;
      }
      if (payload.newInfo.photo) {
        userLogin.photo = payload.newInfo.photo[0];
      }
      localStorage.setItem("UserLogin", JSON.stringify(userLogin));
      const response = await axios.put(
        `${URL_SERVER}/create/update/${payload.userID}`,
        payload.newInfo
      );
      return dispatch({
        type: "UPDATE_USER",
        payload: response.data,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error 412",
        text: err.response.data.message,
      });
    }
  };
}

export function statusUser(boolean) {
  return {
    type: STATUS_USER,
    payload: boolean,
  };
}

export function ModalSign(boolean) {
  return {
    type: MODAL_SIGN,
    payload: boolean,
  };
}
