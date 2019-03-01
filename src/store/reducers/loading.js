const initialState = {
  loading: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}
export default reducer;