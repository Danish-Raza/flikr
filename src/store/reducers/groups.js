const initialState = {
  data: [],
  poolPhotos: [],
  totalCount: null,
  labels: [],
  chartData: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "groupSearch":
      return {
        ...state,
        data: action.groups,
        poolPhotos: action.poolPhotos,
        labels: action.labels,
        chartData: action.data,
        totalCount: action.totalCount,
        loading: action.loading
      };
    default:
      return state;
  }
};
export default reducer;
