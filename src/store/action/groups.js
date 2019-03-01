import axios from "axios";
import getLoading from "./loading";

//this function fetchs 10 groups and then fetchs pool photos of each group 
export const getGroups = (params) => {
  return dispatch => {
    let src = {};
    let index = 0;
    dispatch(getLoading(true))
    axios
      .get("https:/api.flickr.com/services/rest", { params })
      .then(res => {
        let groups = res.data.groups.group
        let totalCount = res.data.groups.pages
        let labels = []
        let data = []
        if (res.data.groups.group.length === 0) {
          dispatch(getLoading(false))
          dispatch({
            type: "groupSearch",
            groups: groups,
            poolPhotos: src,
            labels: labels,
            data: data,
            params: params,
            totalCount: totalCount,
            loading: false
          });
        }
        //now looping through the groups to get pool photos of each group
        for (var i = 0; i < res.data.groups.group.length; i++) {
          labels.push(res.data.groups.group[i].name)
          data.push(parseInt(res.data.groups.group[i].pool_count))
          axios.get("https:/api.flickr.com/services/rest", {
            params: {
              method: "flickr.groups.pools.getPhotos",
              api_key: process.env.REACT_APP_API_KEY,
              group_id: res.data.groups.group[i].nsid,
              per_page: 8,
              format: "json",
              nojsoncallback: 1
            }
          })
            .then(res => {
              dispatch(getLoading(false))
              let imageSource = [];
              for (var j = 0; j < res.data.photos.photo.length; j++) {
                let src = `http://farm${res.data.photos.photo[j].farm}.staticflickr.com/${res.data.photos.photo[j].server}/${res.data.photos.photo[j].id}_${res.data.photos.photo[j].secret}.jpg`;
                imageSource.push(src)
              }
              let temp = src;
              temp[`${index}`] = imageSource;
              src = temp;
              dispatch({
                type: "groupSearch",
                groups: groups,
                poolPhotos: src,
                labels: labels,
                data: data,
                params: params,
                totalCount: totalCount,
                loading: false
              });
              index++;
            })
            .catch(err => dispatch(getLoading(false)))
        }
      })
      .catch(err => dispatch(getLoading(false)));
  };
};