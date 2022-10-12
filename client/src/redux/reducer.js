const initialState = {
  properties: [],
  propertyDetail: [],
  loading: false,
  error: false,
  response: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
