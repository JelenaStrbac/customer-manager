import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";
import * as sorts from "../../../components/helper/SortingFunctions";
import Customer from "../../../components/Customers/Customer";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Pagination from "../../Tools/Pagination/Pagination";

const handleFilteringAndSorting = (tools, allCustomers) => {
  const { searchQuery, sortQuery, filterQueryOne, filterQueryTwo } = tools; // tools destructured from props

  let filteredCustomersArray = allCustomers
    .filter((el) =>
      el.customerData.companyName.toLowerCase().includes(searchQuery)
    )
    .filter((elm) =>
      Object.values(filterQueryOne).some((item) => item)
        ? filterQueryOne[elm.customerData.size]
        : true
    )
    .filter((elem) =>
      Object.values(filterQueryTwo).some((item) => item)
        ? filterQueryTwo[elem.customerData.industry]
        : true
    );

  let sortArr = [];
  switch (sortQuery) {
    case "az":
      sortArr = sorts.sortAsc(filteredCustomersArray, "companyName");
      break;
    case "za":
      sortArr = sorts.sortDesc(filteredCustomersArray, "companyName");
      break;
    case "asc":
      sortArr = sorts.sortAscNum(filteredCustomersArray, "operatingRevenue");
      break;
    case "des":
      sortArr = sorts.sortDescNum(filteredCustomersArray, "operatingRevenue");
      break;
    default:
      sortArr = filteredCustomersArray;
  }
  return sortArr;
};

const CustomersList = (props) => {
  //// 1. fetching of customers
  const fetchAllCustomersRef = useRef(props.fetchAllCustomers);
  const tokenRef = useRef(props.token);
  const userIdRef = useRef(props.userId);

  useEffect(() => {
    fetchAllCustomersRef.current(tokenRef.current, userIdRef.current);
  }, []);

  //// 2. search, filter and sort
  const [resultArr, setResultArr] = useState([]);

  useEffect(() => {
    const sortArr = handleFilteringAndSorting(props.tools, props.allCustomers);

    setResultArr(sortArr);
    setPaginationDetails((currentPaginatedResult) => ({
      ...currentPaginatedResult,
      data: sortArr,
      pageCount: Math.ceil(sortArr.length / currentPaginatedResult.perPage),
    }));
  }, [props.tools, props.allCustomers]);

  //// 3. pagination
  const [paginationDetails, setPaginationDetails] = useState({
    offset: 0,
    data: [],
    perPage: 10,
    currentPage: 0,
    pageCount: 0,
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * paginationDetails.perPage;

    setPaginationDetails({
      ...paginationDetails,
      currentPage: selectedPage,
      offset: offset,
    });
  };

  useEffect(() => {
    setPaginationDetails((currentPaginatedResult) => ({
      ...currentPaginatedResult,
      data: props.allCustomers,
      pageCount: Math.ceil(
        props.allCustomers.length / currentPaginatedResult.perPage
      ),
    }));
  }, [props.allCustomers]);

  let showAllCustomers = null;
  const customersArrayForMap = Object.values(props.tools).some((el) => el) // check if there is anything in Redux store in tools obj (any query)
    ? resultArr
    : props.allCustomers;
  const slice = customersArrayForMap.slice(
    paginationDetails.offset,
    paginationDetails.offset + paginationDetails.perPage
  );

  if (slice) {
    showAllCustomers = slice.map((el) => (
      <Customer
        key={el.id}
        id={el.id}
        name={el.customerData.companyName}
        website={el.customerData.website}
        operatingRevenue={el.customerData.operatingRevenue}
        operatingExpenses={el.customerData.operatingExpenses}
        size={el.customerData.size}
        industry={el.customerData.industry}
        phone={el.customerData.phone}
        email={el.customerData.email}
      />
    ));
  }

  if (props.isLoading) {
    showAllCustomers = <Spinner />;
  }

  return (
    <div className="CustomersList">
      <div className="AddCustomerButton_Container">
        <Link to="/new" className="AddCustomerButton">
          <div className="Plus">+</div>
          <div>Add customer</div>
        </Link>
      </div>
      <div>
        <Pagination
          pageCount={paginationDetails.pageCount}
          handlePageClick={handlePageClick}
        />
        <div className="CustomersBreakdown">
          {showAllCustomers ? showAllCustomers : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allCustomers: state.customers.allCustomers,
    token: state.auth.idToken,
    userId: state.auth.userId,
    isLoading: state.customers.loading,
    tools: state.tools,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomers: (token, userId) =>
      dispatch(actions.fetchAllCustomers(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
