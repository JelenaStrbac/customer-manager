import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import PrivateRoute from "./components/helper/PrivateRoute";
import * as actions from "./store/actions";

const App = (props) => {
  const onAutoLoginRef = useRef(props.onAutoLogin);

  useEffect(() => {
    onAutoLoginRef.current();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            path="/"
            component={Home}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
