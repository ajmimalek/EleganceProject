import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
// minified version
import "react-toastify/dist/ReactToastify.min.css";
// core components
import "assets/css/material-dashboard-react.css?v=1.9.0";
import styled from "styled-components";
import { isAuth } from "helpers/auth";
const ResetPasswordPage = React.lazy(() =>
  import("views/Authentification/ResetPasswordPage")
);

//styles
const Loader = styled.div`
  margin-top: 50%;
  & > p {
    text-align: center;
    font-weight: bold;
  }
`;
const Spinner = styled.svg`
  animation: rotate 2s linear infinite;
  display: block;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  width: 50px;
  height: 50px;
  & .path {
    stroke: black;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const ActivatePage = React.lazy(() =>
  import("views/Authentification/ActivatePage")
);
const LoginPage = React.lazy(() => import("views/Authentification/LoginPage"));
const Admin = React.lazy(() => import("layouts/Admin.js"));
const RegisterPage = React.lazy(() =>
  import("views/Authentification/RegisterPage")
);
const DetailsClothes = React.lazy(() =>
  import("views/Wardrobe/DetailsClothes")
);

//const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter basename="/">
    <Suspense
      fallback={
        <Loader>
          <Spinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="2"
            />
          </Spinner>
          <p>Loading page please wait...</p>
        </Loader>
      }
    >
      <Switch>
        <Route path="/DetailsClothes" component={DetailsClothes} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/activate/:token" component={ActivatePage} />
        <Route path="/reset/" component={ResetPasswordPage} />
        {isAuth() ? (
          <Redirect from="/" to="/admin/wardrobe" />
        ) : (
          <Redirect from="/" to="/login" />
        )}
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);