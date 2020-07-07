import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import PrivateRoute from "./components/helper/PrivateRoute";

const App = (props) => {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <PrivateRoute
            isAuthenticated={props.isAuthenticated}
            path="/"
            exact
            component={Home}
          /> */}
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
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

export default connect(mapStateToProps, null)(App);




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
