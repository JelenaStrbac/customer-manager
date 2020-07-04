import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import PrivateRoute from "./containers/helper/PrivateRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/"
            component={Home}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;





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
