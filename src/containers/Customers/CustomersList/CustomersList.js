import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";
import * as sorts from "../../../components/helper/SortingFunctions";
import Customer from "../../../components/Customers/Customer";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Pagination from "../../Tools/Pagination/Pagination";

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

  const handleFilteringAndSorting = () => {
    let filteredCustomersArray = props.allCustomers
      .filter((el) =>
        el.customerData.companyName.toLowerCase().includes(props.searchQuery)
      )
      .filter((elm, i, arr) =>
        props.filterQueryOne.length
          ? props.filterQueryOne.some((k) => k.includes(elm.customerData.size))
          : arr
      )
      .filter((elem, idx, array) =>
        props.filterQueryTwo.length
          ? props.filterQueryTwo.some((k) =>
              k.includes(elem.customerData.industry)
            )
          : array
      );

    let sortArr = [];
    switch (props.sortQuery) {
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
    setResultArr(sortArr);
    setPaginationDetails({...paginationDetails, data: sortArr, pageCount: Math.ceil(
      sortArr.length / paginationDetails.perPage
    )})
  };

  // const handleFilteringAndSortingRef = useRef(handleFilteringAndSorting)
  useEffect(() => {
    handleFilteringAndSorting();
    // handleFilteringAndSortingRef.current();
  }, [props.tools]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log('sortirano napolju', resultArr)

  //// 3. pagination
  const [paginationDetails, setPaginationDetails] = useState({
    offset: 0,
    data: [],
    perPage: 6,
    currentPage: 0,
    pageCount: 0
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
    setPaginationDetails({...paginationDetails, data: props.allCustomers, pageCount: Math.ceil(
      props.allCustomers.length / paginationDetails.perPage
    )})
  }, [props.allCustomers]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(paginationDetails);


  let showAllCustomers = null;
  const customersArrayForMap = resultArr.length ? resultArr : props.allCustomers;
  const slice = customersArrayForMap.slice(paginationDetails.offset, (paginationDetails.offset + paginationDetails.perPage))
  console.log(slice)
  console.log(customersArrayForMap)
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
      />
    ));
  }

  if (props.isLoading) {
    showAllCustomers = <Spinner />;
  }

  return (
    <div className="CustomersList">
      <Link to="/new" className="AddCustomerButton">
        <div className="Plus">+</div>
        <div>Add customer</div>
      </Link>
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
    searchQuery: state.tools.searchQuery,
    sortQuery: state.tools.sortQuery,
    filterQueryOne: state.tools.filterQueryOne,
    filterQueryTwo: state.tools.filterQueryTwo,
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

// let sortedArr =
//   props.sortQuery === "az"
//     ? sorts.sortAsc(watchArrForSorting, "companyName")
//     : props.sortQuery === "za"
//     ? sorts.sortDesc(watchArrForSorting, "companyName")
//     : props.sortQuery === "asc"
//     ? sorts.sortAscNum(watchArrForSorting, "operatingRevenue")
//     : sorts.sortDescNum(watchArrForSorting, "operatingRevenue");

// console.log(sortedArr);

// useEffect(() => {
//   // debugger;
//   dispatch({ type: "sort" });
// }, [props.tools]);

// useEffect(() => {
//   // debugger;
//   dispatch({ type: "search" });
// }, [props.searchQuery]);

// useEffect(() => {
//   // debugger
//   dispatch({ type: "sort" });
// }, [props.sortQuery]);

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
//       size: "Small",
//       taxation: 200,
//       totalExpenses: 9000,
//       totalRevenue: 10,
//       website: "https://test.com",
//     },
//     id: "-MBnsjHzG5lOOD42DExI",
//     userId: "hM2zJjDOcjVDCRIfs8Ljy2Dbz0U2",
//   },
// ];
// const checked = ["Small", "Large"];

// const arr = test.filter((el) =>
//   checked.some((k) => k.includes(el.customerData.size))
// );

// console.log(checked[0].includes(test[0].customerData.size));
// console.log(arr);
// console.log(test);

/////********************/////

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "search":
//       let watchArrForSearching =
//         state.customers.length !== 0 && props.searchQuery
//           ? state.customers
//           : props.allCustomers;

//       let searchArr = watchArrForSearching.filter((el) =>
//         el.customerData.companyName.toLowerCase().includes(props.searchQuery)
//       );
//       console.log("1. SEARCH state.customers", state.customers);
//       console.log("1. array for searching", watchArrForSearching);
//       return {
//         ...state,
//         customers: searchArr,
//       };

//     case "sort":
//       let watchArrForSorting =
//         state.customers.length !== 0 && (props.sortQuery || props.searchQuery)
//           ? state.customers
//           : props.allCustomers;

//       console.log("2. SORT state.customers", state.customers);
//       console.log("2. array for sorting", watchArrForSorting);

//       let sortedArr = [];
//       switch (props.sortQuery) {
//         case "az":
//           sortedArr = sorts.sortAsc(watchArrForSorting, "companyName");
//           break;
//         case "za":
//           sortedArr = sorts.sortDesc(watchArrForSorting, "companyName");
//           break;
//         case "asc":
//           sortedArr = sorts.sortAscNum(
//             watchArrForSorting,
//             "operatingRevenue"
//           );
//           break;
//         case "des":
//           sortedArr = sorts.sortDescNum(
//             watchArrForSorting,
//             "operatingRevenue"
//           );
//           break;
//         default:
//           sortedArr = watchArrForSorting;
//       }
//       return {
//         ...state,
//         customers: sortedArr,
//       };
//     case "filterOne":
//       let watchArrForFilteringOne =
//         state.customers.length !== 0 && props.filterQueryOne
//           ? state.customers
//           : props.allCustomers;

//       console.log("3. FILTERone state.customers", state.customers);
//       console.log("3. array for filOne", watchArrForFilteringOne);

//       let filterArrOne = [];
//       if (props.filterQueryOne.length) {
//         console.log("ja sam ovde");
//         filterArrOne = watchArrForFilteringOne.filter((el) =>
//           props.filterQueryOne.some((k) => k.includes(el.customerData.size))
//         );
//       } else {
//         filterArrOne = watchArrForFilteringOne;
//       }
//       console.log("filter arr one", filterArrOne);
//       // console.log(props.filterQueryOne);
//       return {
//         ...state,
//         customers: filterArrOne,
//       };
//     // case "filterTwo":
//     //   let watchArrForFilteringTwo =
//     //     state.customers.length !== 0 &&
//     //     (props.filterQueryTwo ||
//     //       props.filterQueryOne)
//     //       ? state.customers
//     //       : props.allCustomers;

//     //       // (props.filterQueryTwo ||
//     //       //   props.filterQueryOne ||
//     //       //   props.sortQuery ||
//     //       //   props.searchQuery)

//     //   let filterArrTwo = [];
//     //   if (props.filterQueryTwo) {
//     //     filterArrTwo = watchArrForFilteringTwo.filter((el) =>
//     //       props.filterQueryTwo.some((k) =>
//     //         k.includes(el.customerData.industry)
//     //       )
//     //     );
//     //   }
//     //   // console.log(filterArrTwo);
//     //   // console.log(props.filterQueryTwo);
//     //   return {
//     //     ...state,
//     //     customers: filterArrTwo,
//     //   };
//     default:
//       console.log(state);
//       return state;
//   }
// };

// let result = props.allCustomers
//   .filter((el) =>
//     el.customerData.companyName.toLowerCase().includes(props.searchQuery)
//   )
//   .filter((elm) =>
//     props.filterQueryOne.some((k) => k.includes(elm.customerData.size))
//   )
//   .filter((elem) =>
//     props.filterQueryTwo.some((j) => j.includes(elem.customerData.size))
//   );

//   console.log('TESTIRAAAAAM', result)

// // console.log(props.allCustomers)
// const [state, dispatch] = useReducer(reducer, { customers: [] });

// useEffect(() => {
//   // debugger;
//   dispatch({ type: "search" });
//   dispatch({ type: "sort" });
//   dispatch({ type: "filterOne" });
//   dispatch({ type: "filterTwo" });
// }, [props.tools]);

// // console.log(props.allCustomers);
// // console.log(state);

// console.log("PRED prikaz", state.customers);
// console.log("PRED prikaz", state.customers);
//   // debugger
//   let showAllCustomers = null;
//   let customersArrayForMap = state.customers.length
//     ? state.customers
//     : props.allCustomers;
//   // console.log(customersArrayForMap)
//   if (customersArrayForMap) {
//     showAllCustomers = customersArrayForMap.map((el) => (
//       <Customer
//         key={el.id}
//         id={el.id}
//         name={el.customerData.companyName}
//         website={el.customerData.website}
//         operatingRevenue={el.customerData.operatingRevenue}
//         size={el.customerData.size}
//         industry={el.customerData.industry}
//       />
//     ));
//   }

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
