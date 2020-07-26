import React from "react";
import ReactPaginate from "react-paginate";

import "./Pagination.scss";
import Icon from '../../../components/UI/Icon/Icon'

const Pagination = (props) => {
  return (
    <div className="Pagination">
      <ReactPaginate
        previousLabel={<Icon icon={"angle-double-left"}/>}
        nextLabel={<Icon icon={"angle-double-right"}/>}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default Pagination;
