import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
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
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-dashboard-react/views/loginPage";

import image from "assets/img/bg7.jpg";
import Sad from "assets/img/sad.png";
import Wink from "assets/img/wink.png";
import MailSent from "assets/img/mailsent.gif";
import EleganceLogo from "../../assets/img/Elegance Logo.png";
import { Helmet } from "react-helmet";
import { AccountCircle, Facebook, Mail } from "@material-ui/icons";
import CheckBox from "components/CheckBox/CheckBox";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginPage(props) {
  // Open for dialog (forgot pwd)
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <>
      <Helmet>
        <title>Elegance App - Login</title>
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
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Facebook />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Icon className="fa fa-google" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                      <CustomInput
                        labelText="Username..."
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.mail,
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <AccountCircle
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.mail,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                      <div>
                        <FormControlLabel
                          control={<CheckBox name="checkedC" />}
                          label="Remember Me"
                          className={classes.remember}
                        />
                        <Button
                          onClick={handleClickOpen}
                          className={classes.forget}
                          simple
                          color="primary"
                        >
                          <img
                            alt="thinking face"
                            src="https://img.icons8.com/emoji/48/000000/thinking-face.png"
                          />{" "}
                          &nbsp; Forgot Password ?
                        </Button>
                        <Dialog
                          open={open}
                          TransitionComponent={Transition}
                          keepMounted
                          aria-labelledby="alert-dialog-slide-title"
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle id="alert-dialog-slide-title">
                            Forgot your password ? &nbsp;
                            <img alt="sad emoji" src={Sad} /> We've got your
                            back <img alt="wink emoji" src={Wink} /> &nbsp;
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              <img
                                alt="Mail Sent animation"
                                src={MailSent}
                                className={classes.mailsent}
                              />
                              You need only to enter your email adress here and
                              a reset password link will be sent to you.
                            </DialogContentText>
                            <CustomInput
                              labelText="Email Address..."
                              className={classes.mail}
                              id="mail"
                              formControlProps={{
                                fullWidth: true,
                                className: classes.mail,
                              }}
                              inputProps={{
                                type: "email",
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Mail className={classes.inputIconsColor} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="danger">
                              Back to Login
                            </Button>
                            <Button onClick={handleClose} color="success">
                              Get New Password
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg">
                        Get started
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
