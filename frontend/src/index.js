import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import EleganceBlack from "assets/img/Elegance Black.png";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
// minified version
import "react-toastify/dist/ReactToastify.min.css";
// core components
import "assets/css/material-dashboard-react.css?v=1.9.0";
import styled from "styled-components";
const ResetPasswordPage = React.lazy(() =>
  import("views/Authentification/ResetPasswordPage")
);

//styles
const Loader = styled.div`
  margin-top: 50%;
  & > img {
    width: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  & > p {
    text-align: center;
    font-weight: bold;
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
          <img src={EleganceBlack} alt="Logo Elegance Black" />
          <p>Loading page please wait...</p>
        </Loader>
      }
    >
      <Switch>
        <Route path="/DetailsClothes" component={DetailsClothes} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LoginPage} />
        {/* Add :token after /activate/ */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/activate/" component={ActivatePage} />
        <Route path="/reset/" component={ResetPasswordPage} />
        <Redirect from="/" to="/admin/wardrobe" />
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
