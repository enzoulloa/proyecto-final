export const GET_OWNERSHIPS = "GET_OWNERSHIPS";
export const LOADING = "LOADING";
export const GET_USERS = "GET_USERS";
export const POST_PROPERTY = "POST_PROPERTY";
export const SELL_FORM = "SELL_FORM";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const REMOVE_OWNERSHIP = "REMOVE_OWNERSHIP";
export const REMOVE_USER = "REMOVE_USER";
export const FILTER_BY = "FILTER_BY";
// export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const ORDER_OWNERSHIPS = "ORDER_OWNERSHIPS";
export const GET_STATUS_LOGIN = 'GET_STATUS_LOGIN';


export function filterBy(ownerships, filters) {
  console.log(filters);
  const newOwnerships = ownerships.filter((o) => {
    if (filters.type && filters.op) {
      return o.type === filters.type && o.state === filters.op;
    } else if (!filters.op) {
      return o.type === filters.type;
    }
    return o.state === filters.op;
  });
  console.log(newOwnerships);
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
