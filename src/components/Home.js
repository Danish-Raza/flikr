import React, { Component } from "react";
import "./component.css";
import Pagination from "./Pagination";
import Chart from "./Chart";
import Spinner from "./spinner.gif";
import { connect } from "react-redux";
import { getGroups } from "../store/action/groups";
import getLoading from "../store/action/loading";
import GroupCard from "./GroupCard";

class Home extends Component {
  state = {
    searchKey: '',
    selectedPage: 1,
    searchCondition: false
  }

  inputChangeHandler = (e) => {
    if (e !== null) {
      this.setState({ searchKey: e.target.value })
    }
  }

  handlePageClick = page => {
    this.setState({ selectedPage: page.selected + 1 })
    let params = {
      method: "flickr.groups.search",
      api_key: process.env.REACT_APP_API_KEY,
      text: this.state.searchKey,
      per_page: 10,
      page: page.selected + 1,
      format: "json",
      nojsoncallback: 1
    }
    this.props.getGroups(params);
  }

  submitHandler = (e) => {
    if (e.keyCode === 13) {
      this.setState({ searchCondition: true, selectedPage: 1 })
      let params = {
        method: "flickr.groups.search",
        api_key: process.env.REACT_APP_API_KEY,
        text: this.state.searchKey,
        per_page: 10,
        page: this.state.selectedPage,
        format: "json",
        nojsoncallback: 1
      }
      this.props.getGroups(params);
    }
  }

  //this fuction returns spinner
  getSpinner = () => {
    return <div className="d-flex justify-content-center">
      <img
        src={Spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  }

  //this function returns pagination 
  getPagination = () => {
    return <div className="animated bounceInUp delay-3s chart">
      <Pagination
        pageCount={this.props.flikrData.groups.totalCount}
        handlePageClick={(page) => this.handlePageClick(page)}
        forcePage={this.state.selectedPage}
      />
    </div>
  }

  // this function returns the barchart displaying no. of photos on each group along with the group name.On one page 10 groups are there.
  getChart = () => {
    return <div className="animated bounceInRight delay-1s chart">
      <Chart labels={this.props.flikrData.groups.labels} data={this.props.flikrData.groups.chartData} />;
  </div>
  }

  //this function returns all groups as card, displaying group avatar, group name ,no. of members and 8 photos of that group
  getGroupCard = () => {
    return this.props.flikrData.groups.data.map((group, index) =>
      <GroupCard index={index} key={index} />
    )
  }

  render() {
    let photo, pagination, chart = null;
    if (this.props.flikrData.loading.loading) {
      photo = this.getSpinner();
    } else if (this.props.flikrData.groups.data.length > 0) {
      photo = this.getGroupCard();
      pagination = this.getPagination();
      chart = this.getChart();
    } else {
      if (!this.state.searchCondition) {
        photo = <div></div>
      } else {
        photo = <div className="d-flex justify-content-center font-weight-bold">No Data Found.</div>
      }
    }
    return (
      <div >
        <div className="home" id="myHome">
          <div className="search" >
            <div className="d-flex justify-content-end">
              <div className="col-md-4 d-flex justify-content-end">
                <i className="fas fa-search"></i>
                <input className="input" placeholder="Photos, people or groups" onChange={(e) => this.inputChangeHandler(e)} onKeyDown={e => this.submitHandler(e)} />
              </div>
            </div>
          </div>
          <div className="cat" >
            <ul className="list">
              <li className="item">Photo</li>
              <li className="item">People</li>
              <li className="item">Groups</li>
            </ul>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="row">
            {this.props.flikrData.loading.loading ?
              <div className="col-md-12">{photo}</div>
              :
              <div>
                <div className="col-md-6">
                  {photo}
                </div>
                <div className="col-md-6 chart">
                  {chart}
                </div>
              </div>}
          </div>
          <div className="row d-flex justify-content-center pagination ">
            {pagination}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    flikrData: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getGroups: params => dispatch(getGroups(params)),
    getLoading: loading => dispatch(getLoading(loading))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);