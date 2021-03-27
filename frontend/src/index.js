import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import LoginPage from "views/LoginPage/LoginPage";

const hist = createBrowserHistory();


ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={LoginPage} />
      <Redirect from="/" to="/admin/wardrobe" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
