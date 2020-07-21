import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./Home.scss";
import Toolbar from "../Toolbar/Toolbar";
import CustomersList from "../Customers/CustomersList/CustomersList";
import CustomerCreate from "../Customers/CustomerCreate/CustomerCreate";
import CustomerEdit from "../Customers/CustomerEdit/CustomerEdit";
// import CustomerDelete from "../Customers/CustomerDelete/CustomerDelete";
import CustomerShow from "../Customers/CustomerShow/CustomerShow";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <div className="Home">
      <BrowserRouter>
        <Toolbar />
        <Navbar />
        <Switch>
          <Route path="/" exact component={CustomersList} />
          <Route path="/new" exact component={CustomerCreate} />
          <Route path="/edit/:id" exact component={CustomerEdit} />
          {/* <Route path="/delete/:id" exact component={CustomerDelete} /> */}
          <Route path="/show/:id" exact component={CustomerShow} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Home;
