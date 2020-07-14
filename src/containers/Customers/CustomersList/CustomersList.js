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
          customers: (state.customers.length !== 0 && props.query
            ? state.customers
            : props.allCustomers
          ).filter((el) =>
            el.customerData.companyName.toLowerCase().includes(props.query)
          ),
        };
      case "sortOne":
        let arrForWatchSorting =
          state.customers.length !== 0 && props.sortQueryOne
            ? state.customers
            : props.allCustomers;
        let sortedArr =
          props.sortQueryOne === "az"
            ? sortAsc(arrForWatchSorting, "companyName")
            : sortDesc(arrForWatchSorting, "companyName");
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
  }, [props.query]);

  useEffect(() => {
    dispatch({ type: "sortOne" });
  }, [props.sortQueryOne]);

  console.log(props.allCustomers);
  console.log(state);
  console.log(props.query);

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
    query: state.tools.query,
    sortQueryOne: state.tools.sortQueryOne,
    sortQueryTwo: state.tools.sortQueryTwo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomers: (token, userId) =>
      dispatch(actions.fetchAllCustomers(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);

// const CustomersList = (props) => {
//   const [customersArr, setCustomersArr] = useState(props.allCustomers);

//   const fetchAllCustomersRef = useRef(props.fetchAllCustomers);
//   const tokenRef = useRef(props.token);
//   const userIdRef = useRef(props.userId);

//   useEffect(() => {
//     fetchAllCustomersRef.current(tokenRef.current, userIdRef.current);
//   }, []);

//   useEffect(() => {
//     setCustomersArr(
//       props.allCustomers.filter((el) =>
//         el.customerData.companyName.toLowerCase().includes(props.query)
//       )
//     );
//   }, [props.query]);

//   console.log(props.allCustomers);
//   console.log(customersArr);

//   let showAllCustomers = null;
//   let customersArrayForMap = customersArr.length
//     ? customersArr
//     : props.allCustomers;
//   if (customersArrayForMap) {
//     showAllCustomers = customersArrayForMap.map((el) => (
//       <Customer
//         key={el.id}
//         id={el.id}
//         name={el.customerData.companyName}
//         website={el.customerData.website}
//       />
//     ));
//   }

//   console.log(customersArrayForMap);
//   if (props.isLoading) {
//     showAllCustomers = <Spinner />;
//   }

//   return (
//     <div className="CustomersList">
//       <Link to="/new" className="AddCustomerButton">
//         <div className="Plus">+</div>
//         <div>Add customer</div>
//       </Link>
//       <div className="CustomersBreakdown">
//         {showAllCustomers ? showAllCustomers : null}
//       </div>
//     </div>
//   );
// };
