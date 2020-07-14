import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import PrivateRoute from "./components/helper/PrivateRoute";
import * as actions from "./store/actions";

const App = (props) => {
  const onAutoLoginRef = useRef(props.onAutoLogin)

  useEffect(() => {
    onAutoLoginRef.current();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            path="/"
            // exact
            component={Home}
          />
          {/* <Route path="/"  component={Home} /> */}
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

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   let routes = (
//     <Switch>
//       <Route path="/" component={Auth} />
//       <Route path="/auth" component={Auth} />
//     </Switch>
//   );

//   if (isAuthenticated) {
//     routes = (
//       <Switch>
//         <Route path="/" component={Home} />
//       </Switch>
//     );
//   }

//   return (
//     <div className="App">
//       <BrowserRouter>{routes}</BrowserRouter>
//     </div>
//   );
// };
