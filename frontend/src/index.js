import React , { Suspense }from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
// core components
import "assets/css/material-dashboard-react.css?v=1.9.0";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ActivatePage = React.lazy(() => import("views/Authentification/ActivatePage"));
const LoginPage = React.lazy(() => import("views/Authentification/LoginPage"));
const Admin = React.lazy(() => import("layouts/Admin.js"));
const RegisterPage = React.lazy(() => import("views/Authentification/RegisterPage"));
const DetailsClothes  = React.lazy(() => import("views/Wardrobe/DetailsClothes"));





const hist = createBrowserHistory();



//const hist = createBrowserHistory();



ReactDOM.render(
  <BrowserRouter basename="/">
<Suspense fallback={
  <><center>
     <Loader
            type="Circles"
            color="red"
            height={100}
            width={100}
            timeout={300000} //3 secs
          />
            <p>Loading page please wait...</p>
            </center></>
        }>

    <Switch>
    <Route
 path="/DetailsClothes"
 component={DetailsClothes}
 />
 
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={LoginPage} />

      {/* Add :token after /activate/ */}
      <Route path="/register" component={RegisterPage} />
      <Route path="/activate/" component={ActivatePage} />

      <Route path="/register" component={RegisterPage} />

      <Redirect from="/" to="/admin/wardrobe" />
    </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
