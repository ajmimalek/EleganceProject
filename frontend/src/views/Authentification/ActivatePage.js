import React from "react";
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
import { Slide } from "@material-ui/core";

const useStyles = makeStyles(styles);

// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <>
      <Helmet>
        <title>Elegance App - Activate Your Account</title>
      </Helmet>
      <div>
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
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4 className={classes.cardTitleWhite}>
                        Activate Your Account
                      </h4>
                      <p className={classes.cardCategoryWhite}>
                        Last Step before entering your magical "Fashion Space"
                      </p>
                    </CardHeader>
                    <CardBody>
                      <img
                        alt="Activating Account animation"
                        src={Activating}
                        className={classes.activate}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                    <Button type="button" color="success" className={classes.button}><Check />
                        Activate Your Account
                      </Button>
                    <p className={classes.divider}>or REGISTER again</p>
                      <Button
                        color="primary"
                        className={classes.button}
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
