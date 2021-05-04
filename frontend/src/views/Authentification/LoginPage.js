import React, { useState } from "react";
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
import { Facebook, Mail } from "@material-ui/icons";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect, useHistory } from "react-router";
import axios from "axios";
import { authenticate } from "helpers/auth";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "helpers/auth";

const useStyles = makeStyles(styles);

// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginPage(props) {
  const history = useHistory();
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

  // Form Inputs
  const formik = useFormik({
    initialValues: {
      mail: "",
      pass: "",
      textChange: "Get Started",
    },
    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      console.log(process.env.REACT_APP_API_URL);
      if (values) {
        formik.setFieldValue("textChange", "Starting");
        console.log(values.textChange);
        // pass values to backend.
        axios
          .post(`${process.env.REACT_APP_API_URL}/login`, {
            email: values.mail,
            password: values.pass,
          })
          //Authenticate user after login & Clear Data
          .then((res) => {
            console.log("here is the then");
            authenticate(res, () => {
              console.log("authenticate");
              //if authenticate but not admin redirect to /user
              // if admin redirect to /admin
              // Add this when we fix the admin path
              /*isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private'); */
              // Adding this temporarily
              history.push("/admin/wardrobe");
              toast.success(`😍 Hey ${res.data.user.FullName}, Welcome back!`);
            });
          })
          .catch((err) => {
            console.log("here is the catch");
            // Clear values after Error.
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();
            console.log(err.response);
            toast.error("⚠️ " + err.response.data.errors);
          });
      } else {
        toast.error("🤔 I think you've forgot something, Check your form");
      }
    },
  });
  console.log("Login Form values : ", formik.values);
  const [loading, setLoading] = useState(false);

  //Form inputs for Forgot Password
  const formikForgot = useFormik({
    initialValues: {
      mail: "",
      textChange: "Get New Password",
    },
    validationSchema: yupForgotSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      formikForgot.setFieldValue("textChange", "Getting New Password");
      console.log(values.textChange);
      // pass values to backend.
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email: values.mail,
        })
        .then((res) => {
          //Clear values after submitting
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
          setLoading(true);
          toast.success(`📧 Please check your email`);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error("⚠️ " + err.response.data.errors);
        });
    }
  });
  console.log("Forgot Form values : ", formikForgot.values);

  return (
    <>
      <Helmet>
        <title>Elegance App - Login</title>
      </Helmet>
      <div>
        {isAuth() ? <Redirect to="/" /> : null}
        <Header
          absolute
          color="transparent"
          brand={EleganceLogo}
          rightLinks={<HeaderLinks page={"login"} />}
          {...rest}
        />
        <ToastContainer autoClose={5000} />
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
                  <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <CardBody>
                      <CustomInput
                        labelText="Email Address..."
                        id="mail"
                        error={formik.errors.mail ? true : false}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.mail,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          value: formik.values.mail,
                          onChange: formik.handleChange("mail"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <Mail className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.mail && formik.touched.mail && (
                        <p className={classes.helperText}>
                          {formik.errors.mail}
                        </p>
                      )}
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        error={formik.errors.pass ? true : false}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.mail,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("pass"),
                          value: formik.values.pass,
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                      {formik.errors.pass && formik.touched.pass && (
                        <p className={classes.helperText}>
                          {formik.errors.pass}
                        </p>
                      )}
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
                          <img alt="sad emoji" src={Sad} /> We've got your back{" "}
                          <img alt="wink emoji" src={Wink} /> &nbsp;
                        </DialogTitle>
                        <form onSubmit={formikForgot.handleSubmit}>
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
                              id="mail"
                              error={formikForgot.errors.mail ? true : false}
                              formControlProps={{
                                fullWidth: true,
                                className: classes.mail,
                              }}
                              inputProps={{
                                required: true,
                                type: "text",
                                value: formikForgot.values.mail,
                                onChange: formikForgot.handleChange("mail"),
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Mail className={classes.inputIconsColor} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {formikForgot.errors.mail &&
                              formikForgot.touched.mail && (
                                <p className={classes.helperText}>
                                  {formikForgot.errors.mail}
                                </p>
                              )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="danger">
                              Back to Login
                            </Button>
                            <Button
                              type="submit"
                              color="success"
                              disabled={loading}
                            >
                              {formikForgot.values.textChange}
                            </Button>
                          </DialogActions>
                        </form>
                      </Dialog>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        type="submit"
                        simple
                        color="primary"
                        size="lg"
                        className={classes.submit}
                      >
                        {formik.values.textChange}
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

const yupSchema = Yup.object({
  mail: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  pass: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 caracters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ),
});

const yupForgotSchema = Yup.object({
  mail: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
});