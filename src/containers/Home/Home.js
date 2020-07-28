import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./Home.scss";
import Toolbar from "../Toolbar/Toolbar";
import CustomersList from "../Customers/CustomersList/CustomersList";
import CustomerCreate from "../Customers/CustomerCreate/CustomerCreate";
import CustomerEdit from "../Customers/CustomerEdit/CustomerEdit";
import CustomerShow from "../Customers/CustomerShow/CustomerShow";
import Navbar from "../Navbar/Navbar";
import Documentation from "../../components/Documentation/Documentation";
import Backdrop from "../../components/UI/Modal/Backdrop/Backdrop";

const Home = () => {
  const [toolbarIsVisible, setToolbarIsVisible] = useState(false);

  const toolbarClosedHandler = () => {
    setToolbarIsVisible(false);
  };

  const toolbarToggleHandler = () => {
    setToolbarIsVisible(!toolbarIsVisible);
    console.log(toolbarIsVisible);
  };

  return (
    <div className="Home">
      <BrowserRouter>
        <Backdrop
          open={toolbarIsVisible}
          toolbarClosedHandler={toolbarClosedHandler}
        />
        <Toolbar open={toolbarIsVisible} />
        <Navbar toolbarClicked={toolbarToggleHandler} />
        <Switch>
          <Route path="/" exact component={CustomersList} />
          <Route path="/new" exact component={CustomerCreate} />
          <Route path="/edit/:id" exact component={CustomerEdit} />
          <Route path="/show/:id" exact component={CustomerShow} />
          <Route path="/documentation" exact component={Documentation} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Home;
