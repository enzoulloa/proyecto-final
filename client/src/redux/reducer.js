const initialState = {
  properties: [],
  propertyDetail: [],
  loading: false,
  error: false,
  response: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;