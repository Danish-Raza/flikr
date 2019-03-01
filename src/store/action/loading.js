const getLoading = (loading) => {

  return dispatch => {
    dispatch({
      type: "loading",
      loading: loading
    })
  }
}
export default getLoading;