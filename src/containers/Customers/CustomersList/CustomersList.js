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
  const { searchQuery, sortQuery, filterQueryOne, filterQueryTwo } = tools;

  let filteredCustomersArray = allCustomers
    .filter((el) =>
      el.customerData.companyName.toLowerCase().includes(searchQuery)
    )
    .filter((elm, i, arr) =>
      filterQueryOne.length
        ? filterQueryOne.some((k) => k.includes(elm.customerData.size))
        : arr
    )
    .filter((elem, idx, array) =>
      filterQueryTwo.length
        ? filterQueryTwo.some((k) => k.includes(elem.customerData.industry))
        : array
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
  // console.log("sortirano unutra", sortArr);
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

  // const handleFilteringAndSortingRef = useRef(handleFilteringAndSorting)
  useEffect(() => {
    const sortArr = handleFilteringAndSorting(props.tools, props.allCustomers);

    setResultArr(sortArr);
    setPaginationDetails((currentPaginatedResult) => ({
      ...currentPaginatedResult,
      data: sortArr,
      pageCount: Math.ceil(sortArr.length / currentPaginatedResult.perPage),
    }));
  }, [props.tools, props.allCustomers]);

  // console.log('sortirano napolju', resultArr)

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
    setPaginationDetails({
      ...paginationDetails,
      data: props.allCustomers,
      pageCount: Math.ceil(
        props.allCustomers.length / paginationDetails.perPage
      ),
    });
  }, [props.allCustomers]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(paginationDetails);

  let showAllCustomers = null;
  const customersArrayForMap = Object.values(props.tools).some((el) => el)
    ? resultArr
    : props.allCustomers;
  const slice = customersArrayForMap.slice(
    paginationDetails.offset,
    paginationDetails.offset + paginationDetails.perPage
  );
  // console.log(slice);
  // console.log(customersArrayForMap);
  if (slice) {
    showAllCustomers = slice.map((el) => (
      <Customer
        key={el.id}
        id={el.id}
        name={el.customerData.companyName}
        website={el.customerData.website}
        operatingRevenue={el.customerData.operatingRevenue}
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
      <Pagination
        pageCount={paginationDetails.pageCount}
        handlePageClick={handlePageClick}
      />
      <div className="CustomersBreakdown">
        {showAllCustomers ? showAllCustomers : null}
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

// const test = [
//   {
//     customerData: {
//       address: "bla bla bla",
//       assets: 100000,
//       companyName: "OTPISANI jer je FIca car",
//       email: "test@mail.com",
//       employees: "50",
//       equity: 10000,
//       industry: "Education",
//       liabilities: 90000,
//       operatingExpenses: 2000,
//       operatingRevenue: 3000,
//       phone: "011/999999999",
//       regNumber: "777777777",
//       size: "Medium",
//       taxation: 200,
//       totalExpenses: 9000,
//       totalRevenue: 10,
//       website: "https://test.com",
//     },
//     id: "-MBnsjHzG5lOOD42DExI",
//     userId: "hM2zJjDOcjVDCRIfs8Ljy2Dbz0U2",
//   },
//   {
//     customerData: {
//       address: "bla bla bla",
//       assets: 100000,
//       companyName: "MALO",
//       email: "test@mail.com",
//       employees: "50",
//       equity: 10000,
//       industry: "Education",
//       liabilities: 90000,
//       operatingExpenses: 2000,
//       operatingRevenue: 3000,
//       phone: "011/999999999",
//       regNumber: "777777777",
//       size: "Small",
//       taxation: 200,
//       totalExpenses: 9000,
//       totalRevenue: 10,
//       website: "https://test.com",
//     },
//     id: "-MBnsjHzG5lOOD42DExI",
//     userId: "hM2zJjDOcjVDCRIfs8Ljy2Dbz0U2",
//   },
//   {
//     customerData: {
//       address: "bla bla bla",
//       assets: 100000,
//       companyName: "MALO opet",
//       email: "test@mail.com",
//       employees: "50",
//       equity: 10000,
//       industry: "Education",
//       liabilities: 90000,
//       operatingExpenses: 2000,
//       operatingRevenue: 3000,
//       phone: "011/999999999",
//       regNumber: "777777777",
//       size: "Medium",
//       taxation: 200,
//       totalExpenses: 9000,
//       totalRevenue: 10,
//       website: "https://test.com",
//     },
//     id: "-MBnsjHzG5lOOD42DExI",
//     userId: "hM2zJjDOcjVDCRIfs8Ljy2Dbz0U2",
//   },
// ];
// let wordArr = ["Medium"];
// let word = "";
// let testFilter = test
//   .filter((el) => el.customerData.companyName.toLowerCase().includes(word))
//   .filter((elm, idx, arr) => wordArr.length ? wordArr.some((k) => k.includes(elm.customerData.size)) : arr)

// console.log("test", testFilter);

// const checked = ["Small", "Large"];

// const arr = test.filter((el) =>
//   checked.some((k) => k.includes(el.customerData.size))
// );

// console.log(checked[0].includes(test[0].customerData.size));
