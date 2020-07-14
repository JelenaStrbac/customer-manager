import React, { useEffect, useRef, useReducer } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./CustomersList.scss";
import * as actions from "../../../store/actions";
import Customer from "../../../components/Customers/Customer";
import Spinner from "../../../components/UI/Spinner/Spinner";

const sortAsc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a.customerData[field] > b.customerData[field]) {
      return 1;
    }
    if (b.customerData[field] > a.customerData[field]) {
      return -1;
    }
    return 0;
  });
};

const sortDesc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a.customerData[field] > b.customerData[field]) {
      return -1;
    }
    if (b.customerData[field] > a.customerData[field]) {
      return 1;
    }
    return 0;
  });
};

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
        return {
          customers: (state.customers.length !== 0 && props.searchQuery
            ? state.customers
            : props.allCustomers
          ).filter((el) =>
            el.customerData.companyName
              .toLowerCase()
              .includes(props.searchQuery)
          ),
        };
      case "sort":
        let watchArrForSorting =
          state.customers.length !== 0 && props.sortQuery
            ? state.customers
            : props.allCustomers;
        let sortedArr =
          props.sortQuery === "az"
            ? sortAsc(watchArrForSorting, "companyName")
            : props.sortQuery === "za"
            ? sortDesc(watchArrForSorting, "companyName")
            : props.sortQuery === "asc"
            ? sortAsc(watchArrForSorting, "address")
            : sortDesc(watchArrForSorting, "address");

        return {
          ...state,
          customers: sortedArr,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { customers: [] });

  useEffect(() => {
    dispatch({ type: "search" });
  }, [props.searchQuery]);

  useEffect(() => {
    dispatch({ type: "sort" });
  }, [props.sortQuery]);

  console.log(props.allCustomers);
  console.log(state);
  // console.log(props.searchQuery);

  let showAllCustomers = null;
  let customersArrayForMap = state.customers.length
    ? state.customers
    : props.allCustomers;
  if (customersArrayForMap) {
    showAllCustomers = customersArrayForMap.map((el) => (
      <Customer
        key={el.id}
        id={el.id}
        name={el.customerData.companyName}
        website={el.customerData.website}
        address={el.customerData.address}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomers: (token, userId) =>
      dispatch(actions.fetchAllCustomers(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);
