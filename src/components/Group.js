import React, { Component } from "react";
import { connect } from "react-redux";
import "./component.css";
import PaiChart from "./PaiChart";
import LazyLoad from "react-image-lazy-load";
import { getPhotoInfo } from "../store/action/photos";
import Pagination from "./Pagination";
import Spinner from "./spinner.gif";

class Group extends Component {
  state = {
    selectedPhoto: 1,
    commentData: [],
    commentLabels: [],
    viewLabels: [],
    viewData: [],
    selectedPage: 1,
    showModal: false
  }

  componentWillMount() {
    let params = {
      method: "flickr.groups.pools.getPhotos",
      api_key: process.env.REACT_APP_API_KEY,
      group_id: this.props.match.params.nsid,
      page: this.state.selectedPage,
      format: "json",
      nojsoncallback: 1
    }
    this.props.getPhotoInfo(params)
  }

  handlePageClick = page => {
    this.setState({ selectedPage: page.selected + 1 })
    let params = {
      method: "flickr.groups.pools.getPhotos",
      api_key: process.env.REACT_APP_API_KEY,
      group_id: this.props.match.params.nsid,
      page: page.selected + 1,
      format: "json",
      nojsoncallback: 1
    }
    this.props.getPhotoInfo(params)
  }

  getSpinner = () => {
    return <div className="d-flex justify-content-center">
      <img
        src={Spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  }

  // this function extracts top 10 comments and top 10 views and then adds sum of rest views and comments in "other" keyword
  pieChartData = () => {
    let commentLabels = [];
    let commentData = [];
    let viewLabels = [];
    let viewData = [];
    let restCommentSum = 0;
    let restViewSum = 0;

    //coping whole views 
    let viewArray = this.props.data.photos.viewArray.slice()

    //sorting the array (viewArray) in decending order which we copied before using sort function and then taking out top ten view and storing in top10View array
    let top10View = viewArray.sort(function (a, b) { return a.views < b.views ? 1 : -1; })
      .slice(0, 10);

    //storing title and value of top ten view in viewLabels and viewData respectively 
    top10View.forEach(view => {
      viewLabels.push(view.title)
      viewData.push(view.views)
    })
    viewLabels.push("other")
    //calculating the sum of all the rest views 
    let restView = viewArray.slice(11);
    restView.forEach(view => {
      restViewSum = restViewSum + view.views
    })
    viewData.push(restViewSum)

    //coping whole comments 
    let commentArray = this.props.data.photos.commentArray.slice()

    //sorting the array (commentArray) in decending order which we copied before using sort function and then taking out top ten comments and storing in top10Comment array
    let top10Comment = commentArray.sort(function (a, b) { return a.comments < b.comments ? 1 : -1; })
      .slice(0, 10);

    //storing title and value of top ten view in commentLabels and commentData respectively 
    top10Comment.forEach(comment => {
      commentLabels.push(comment.title)
      commentData.push(comment.comments)
    })
    commentLabels.push("other")

    //calculating the sum of all the rest comment
    let restComment = commentArray.slice(11);
    restComment.forEach(comment => {
      restCommentSum = restCommentSum + comment.comments
    })
    commentData.push(restCommentSum)
    this.setState({ viewData: viewData, viewLabels: viewLabels, commentData: commentData, commentLabels: commentLabels })
  }

  getPaichart = () => {
    return <div>
      <div >
        <PaiChart title="Comments Analysis" label="Comments" labels={this.state.commentLabels} data={this.state.commentData} closeModal={() => this.setState({ showModal: false })} />
      </div>
      <div>
        <PaiChart title="Views Analysis" label="Views" labels={this.state.viewLabels} data={this.state.viewData} closeModal={() => this.setState({ showModal: false })} />
      </div>
    </div>
  }

  //this function displays the details of a photo when mouse enters that photo  
  displayHamdler = (index) => {
    this.pieChartData()
    this.setState({ selectedPhoto: index, display: true })
  }

  //this function hides the details of a photo when mouse leave that photo 
  hideHamdler = () => {
    this.pieChartData()
    this.setState({ selectedPhoto: "", display: false })
  }

  getPagination = () => {
    return <div className="animated bounceInUp delay-3s chart">
      <Pagination
        pageCount={parseInt(this.props.data.photos.totalPages)}
        handlePageClick={(page) => this.handlePageClick(page)}
        forcePage={this.state.selectedPage}
      />
    </div>
  }

  //this function returns all the photos of the selected group
  getPhotos = () => {
    return this.props.data.photos.photos.map((photo, index) =>
      <div key={index} onClick={() => this.setState({ showModal: true })} onMouseEnter={() => this.displayHamdler(index)} onMouseLeave={() => this.hideHamdler()} className="col-md-3 imageBox ">
        <LazyLoad height={300} offsetVertical={900} imageProps={{
          src: `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          ref: "image",
          height: "300px",
          width: "100%",
          style: { filter: this.state.selectedPhoto === index && this.state.display ? "brightness(20%)" : "" },
          className: "imagei animated bounceInUp delay-1s"
        }} />
        <div className="info" style={{ display: this.state.selectedPhoto === index && this.state.display ? "block" : "none" }}>
          <p className="font-weight-bold title">{this.props.data.photos.titles[index]}</p>
          <p >Owner:  <span>{this.props.data.photos.owners[index]}</span></p>
          <p>Views:  <span>{this.props.data.photos.views[index]}</span></p>
          <p>Comment:  <span>{this.props.data.photos.comments[index]}</span></p>
          <p >Uploaded on:  <span>{this.props.data.photos.dates[index]}</span></p>
          <p className="desc">Description:  <span>{this.props.data.photos.descriptions[index]}</span></p>
        </div>
      </div>
    )
  }

  render() {
    let photo = this.props.data.loading.loading ? this.getSpinner() : this.props.data.photos.photos ? this.getPhotos() : "";
    let pagination = this.getPagination();
    let paiChart = this.getPaichart();
    return (
      <div>
        <div className="container" onMouseLeave={() => { this.setState({ selectedPage: "", display: false }) }}>
          <div className="paichart animated bounceInDown" style={{ display: this.state.showModal ? "block" : "none" }}>
            {paiChart}
          </div>
          <div className="row justify-content-center" onMouseLeave={() => { this.setState({ selectedPage: "", display: false }) }} style={{ display: this.state.showModal ? "none" : "block" }}>
            {photo}
          </div>
        </div>
        <div style={{ display: this.state.showModal ? "none" : "block" }}>
          {pagination}
        </div>

      </div>);
  }
}
const mapStateToProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPhotoInfo: params => dispatch(getPhotoInfo(params))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);