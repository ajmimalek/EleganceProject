import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/HeaderLogin/Header.js";
import HeaderLinks from "components/HeaderLogin/HeaderLinks.js";
import Footer from "components/FooterLogin/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/activatePage";

import image from "assets/img/bg7.jpg";
import EleganceLogo from "../../assets/img/Elegance Logo.png";
import Activating from "../../assets/img/activate.gif";
import { Helmet } from "react-helmet";
import { Check, PersonAdd } from "@material-ui/icons";
import jwt from "jsonwebtoken";
import axios from "axios";
import { isAuth } from "helpers/auth";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles(styles);

export default function ActivatePage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  // retrieve params into a variable
  const params = useParams();

  // print params to console
  console.log("params :", params);

  const [formData, setFormData] = useState({
    FullName: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    /* get token from params like /activate/token
       then decode this token and get name
    */
    let token = params.token;
    let { FullName } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, FullName, token });
    }

    console.log("data : ", token, FullName);
  }, [params]);
  const { FullName, token } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token,
      })
      .then((res) => {
        setFormData({
          ...formData,
          show: false,
        });
        console.log(res.data.message);
        toast.success("✔ " + res.data.message);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error("⚠️ " + err.response.data.errors);
      });
  };

  return (
    <>
      <Helmet>
        <title>Elegance App - Activate Your Account</title>
      </Helmet>
      <div>
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer autoClose={5000}/>
        <Header
          absolute
          color="transparent"
          brand={EleganceLogo}
          rightLinks={<HeaderLinks page={"login"} />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <Card className={classes[cardAnimaton]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4 className={classes.cardTitleWhite}>
                      Hey {FullName}, Activate Your Account
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                      Last Step before entering your magical "Fashion Space"
                    </p>
                  </CardHeader>
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <CardBody>
                      <img
                        alt="Activating Account animation"
                        src={Activating}
                        className={classes.activate}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        color="success"
                        className={classes.button}
                        type="submit"
                      >
                        <Check />
                        Activate Your Account
                      </Button>
                      <p className={classes.divider}>or REGISTER again</p>
                      <Button
                        color="primary"
                        className={classes.button}
                        href="/register"
                      >
                        <PersonAdd /> Register
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    </>
  );
}
