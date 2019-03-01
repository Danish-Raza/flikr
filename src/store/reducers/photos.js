const initialState = {
  photos: [],
  totalPages: "",
  commentArray: [],
  viewArray: [],
  owners: [],
  titles: [],
  dates: [],
  descriptions: [],
  comments: [],
  views: [],
  loading: true

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "photoInfo":
      return {
        ...state,
        photos: action.photos,
        totalPages: action.totalPages,
        commentArray: action.commentArray,
        viewArray: action.viewArray,
        owners: action.owners,
        titles: action.titles,
        dates: action.dates,
        descriptions: action.descriptions,
        comments: action.comments,
        views: action.views,
        loading: action.loading
      };
    default:
      return state;
  }
};
export default reducer;
