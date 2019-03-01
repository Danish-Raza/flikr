import React from "react";
import ReactPaginate from "react-paginate";

const pagination = props => {
  let paginationContent = null;
  paginationContent = (
    <div className="card-footer bg-white text-center">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel="..."
        breakClassName={"break-me"}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName="active"
        forcePage={props.forcePage - 1}
      />
    </div>)
  return <div>{paginationContent}</div>;
};
export default pagination;