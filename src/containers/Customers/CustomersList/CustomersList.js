import React, { useEffect, useRef, useReducer } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";
import * as sorts from "../../../components/helper/SortingFunctions";
import Customer from "../../../components/Customers/Customer";
import Spinner from "../../../components/UI/Spinner/Spinner";

const CustomersList = (props) => {
  const fetchAllCustomersRef = useRef(props.fetchAllCustomers);
  const tokenRef = useRef(props.token);
  const userIdRef = useRef(props.userId);

  useEffect(() => {
    fetchAllCustomersRef.current(tokenRef.current, userIdRef.current);
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case "search":
        let watchArrForSearching =
          state.customers.length !== 0 && props.searchQuery
            ? state.customers
            : props.allCustomers;

        let searchArr = watchArrForSearching.filter((el) =>
          el.customerData.companyName.toLowerCase().includes(props.searchQuery)
        );
        // console.log(searchArr);
        return {
          ...state,
          customers: searchArr,
        };
      case "sort":
        let watchArrForSorting =
          state.customers.length !== 0 && (props.sortQuery || props.searchQuery)
            ? state.customers
            : props.allCustomers;
        // console.log(watchArrForSorting);
        let sortedArr = [];
        switch (props.sortQuery) {
          case "az":
            sortedArr = sorts.sortAsc(watchArrForSorting, "companyName");
            break;
          case "za":
            sortedArr = sorts.sortDesc(watchArrForSorting, "companyName");
            break;
          case "asc":
            sortedArr = sorts.sortAscNum(
              watchArrForSorting,
              "operatingRevenue"
            );
            break;
          case "des":
            sortedArr = sorts.sortDescNum(
              watchArrForSorting,
              "operatingRevenue"
            );
            break;
          default:
            sortedArr = watchArrForSorting;
        }
        return {
          ...state,
          customers: sortedArr,
        };
      case "filterOne":
        let watchArrForFilteringOne =
          state.customers.length !== 0 && props.filterQueryOne
            ? state.customers
            : props.allCustomers;

        let filterArrOne = [];
        if (props.filterQueryOne) {
          filterArrOne = watchArrForFilteringOne.filter((el) =>
            props.filterQueryOne.some((k) => k.includes(el.customerData.size))
          );
          // filterArrOne = watchArrForFilteringOne.filter((el) =>
          //   props.filterQueryOne.some((elm) => el.customerData.size === elm)
          // );
        }
        // console.log(filterArrOne);
        // console.log(props.filterQueryOne);
        return {
          ...state,
          customers: filterArrOne,
        };
      case "filterTwo":
        let watchArrForFilteringTwo =
          state.customers.length !== 0 &&
          (props.filterQueryTwo ||
            props.filterQueryOne ||
            props.sortQuery ||
            props.searchQuery)
            ? state.customers
            : props.allCustomers;

        let filterArrTwo = [];
        if (props.filterQueryTwo) {
          filterArrTwo = watchArrForFilteringTwo.filter((el) =>
            props.filterQueryTwo.some((k) =>
              k.includes(el.customerData.industry)
            )
          );
        }
        console.log(filterArrTwo);
        console.log(props.filterQueryTwo);
        return {
          ...state,
          customers: filterArrTwo,
        };
      default:
        return state;
    }
  };
  // console.log(props.allCustomers)
  const [state, dispatch] = useReducer(reducer, { customers: [] });

  useEffect(() => {
    // debugger;
    dispatch({ type: "search" });
    dispatch({ type: "sort" });
    dispatch({ type: "filterOne" });
    dispatch({ type: "filterTwo" });
  }, [props.tools]);

  // console.log(props.allCustomers);
  // console.log(state);

  // debugger
  let showAllCustomers = null;
  let customersArrayForMap = state.customers.length
    ? state.customers
    : props.allCustomers;
  // console.log(state.customers);
  if (customersArrayForMap) {
    showAllCustomers = customersArrayForMap.map((el) => (
      <Customer
        key={el.id}
        id={el.id}
        name={el.customerData.companyName}
        website={el.customerData.website}
        // address={el.customerData.address}
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
