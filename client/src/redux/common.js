export const GET_OWNERSHIPS = "GET_OWNERSHIPS";
export const LOADING = "LOADING";
export const GET_USERS = "GET_USERS";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const REMOVE_OWNERSHIP = "REMOVE_OWNERSHIP";
export const REMOVE_USER = "REMOVE_USER";
export const FILTER_BY_OP = "FILTER_BY_OP";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_OWNERSHIPS = "ORDER_OWNERSHIPS";

export function filterByOp(ownerships, op) {
  const newOwnerships = ownerships.filter((o) => o.state === op);
  return newOwnerships;
}

export function filterByType(ownerships, type) {
  const newOwnerships = ownerships.filter((o) => o.type === type);
  return newOwnerships;
}

export function order(ownerships, form) {
  const ownershipsFixed = [...ownerships];
  let ownershipsOrdered = [];
  if (form === "ASC") {
    ownershipsOrdered = ownershipsFixed.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  } else {
    ownershipsOrdered = ownershipsFixed.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
  }
  return ownershipsOrdered;
}
