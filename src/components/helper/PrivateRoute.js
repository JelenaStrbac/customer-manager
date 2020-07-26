import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth",
            state: { from: props.location },
          }}
        />
        // <Redirect to="/auth"  />
      );
    }}
  />
);

export default PrivateRoute;

//   export default PrivateRoute;
// const PrivateRoute = ({ isAuthenticated, ...props }) => {
//   // debugger
//   console.log('test')
//   return isAuthenticated ? <Route {...props} />  : <Redirect to={{ pathname: "/auth", state: { from: props.location} }} />;
// };
// const PrivateRoute = ({ isAuthenticated, ...props }) => {
//   // debugger
//   console.log('test')
//   return isAuthenticated ? <Route {...props} /> : <Redirect to="/auth" />;
// };

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/auth" }} />
//       )
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   isAuthenticated: PropTypes.object.isRequired,
//   component: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.idToken !== null,
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, null, null, { pure: false })(PrivateRoute)
// );
