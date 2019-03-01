import axios from "axios";
import getLoading from "./loading";

//this fuction fetchs 100 photos of selected groups and then fetchs all the details of each photos.
export const getPhotoInfo = (params) => {
  let commentArray = [];
  let viewArray = [];
  let owners = [];
  let titles = [];
  let dates = [];
  let descriptions = [];
  let comments = [];
  let views = [];
  let photos = "";
  let totalPages = "";
  return dispatch => {
    dispatch(getLoading(true))
    axios
      .get("https:/api.flickr.com/services/rest", { params })
      .then(res => {
        totalPages = res.data.photos.pages
        photos = res.data.photos.photo
        for (var i = 0; i < res.data.photos.photo.length; i++) {
          axios.get("https:/api.flickr.com/services/rest", {
            params: {
              method: "flickr.photos.getInfo",
              api_key: process.env.REACT_APP_API_KEY,
              photo_id: res.data.photos.photo[i].id,
              secret: res.data.photos.photo[i].secret,
              format: "json",
              nojsoncallback: 1
            }
          })
            .then(res => {
              commentArray.push({
                title: res.data.photo.title._content,
                comments: parseInt(res.data.photo.comments._content)
              })
              viewArray.push({
                title: res.data.photo.title._content,
                views: parseInt(res.data.photo.views)
              })
              owners.push(res.data.photo.owner.username)
              titles.push(res.data.photo.title._content);
              dates.push(res.data.photo.dates.taken);
              descriptions.push(res.data.photo.description._content);
              comments.push(res.data.photo.comments._content);
              views.push(res.data.photo.views);
              dispatch(getLoading(false))
              dispatch({
                type: "photoInfo",
                photos: photos,
                totalPages: totalPages,
                viewArray: viewArray,
                commentArray: commentArray,
                owners: owners,
                titles: titles,
                dates: dates,
                descriptions: descriptions,
                comments: comments,
                views: views,
              });
            })
            .catch(error => {
              dispatch(getLoading(false));
            });
        }
      })
      .catch(error => {
        dispatch(getLoading(false));
      })
      .catch(err => dispatch(getLoading(false)));
  };
};