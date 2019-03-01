import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class GroupCard extends Component {
  render() {
    if (this.props.flikrData.groups.poolPhotos[this.props.index] === undefined) {
      return (<div></div>)
    } else {
      let photo = this.props.flikrData.groups.data[this.props.index]
      let photos = this.props.flikrData.groups.poolPhotos[this.props.index]
      return (
        <Link to={`group/${photo.nsid}`} style={{ color: "black" }}>
          <div className="col-md-6 car group container animated bounceInLeft delay-1s" key={this.props.index}>
            <div className="innerGroup">
              <div className="d-flex justify-content-center row"><img className="rounded-circle" src={`http://farm${photo.iconfarm}.staticflickr.com/${photo.iconserver}/buddyicons/${photo.nsid}.jpg`} width='70px' height='70px' alt="" /></div>
              <div className="row d-flex justify-content-center font-weight-bold">
                <p className="text-center">{photo.name}</p>
              </div>
              <div className="d-flex justify-content-center">
                <i className="far fa-images mr-5">{photo.pool_count}</i>
                <i className="fas fa-users ">{photo.members}</i>
              </div>
              <div className="row" >
                <div className="groupGallery">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-between">
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[0]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[1]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[2]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[3]} alt="" width="70px" height="70px" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[4]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[5]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[6]} alt="" width="70px" height="70px" />
                      </div>
                      <div className="mb-2 mr-2 imgGroup">
                        <img className="img-fluid" src={photos[7]} alt="" width="70px" height="70px" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    flikrData: state
  };
};
export default connect(
  mapStateToProps
)(GroupCard);