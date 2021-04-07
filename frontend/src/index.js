import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import ActivatePage from "views/Authentification/ActivatePage";
import LoginPage from "views/Authentification/LoginPage";
import RegisterPage from "views/Authentification/RegisterPage";

//const hist = createBrowserHistory();


ReactDOM.render(
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={LoginPage} />
      {/* Add :token after /activate/ */}
      <Route path="/register" component={RegisterPage} />
      <Route path="/activate/" component={ActivatePage} />
      <Redirect from="/" to="/admin/wardrobe" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
