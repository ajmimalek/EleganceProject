import React, { useEffect, useState } from "react";
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

import styles from "assets/jss/material-dashboard-react/views/resetPwdPage";

import image from "assets/img/bg7.jpg";
import EleganceLogo from "../../assets/img/Elegance Logo.png";
import { Helmet } from "react-helmet";
import { Fingerprint, PersonAdd } from "@material-ui/icons";
import { isAuth } from "helpers/auth";
import { Redirect, useHistory, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles(styles);

export default function ResetPasswordPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // retrieve params into a variable
  const params = useParams();
  const history = useHistory();

  // print params to console
  console.log("params :", params);

  useEffect(() => {
    // Extract token from params like /reset/token
    let token = params.token;
    if (token) {
      setToken(token);
    }
  }, []);

  // Form inputs
  const formik = useFormik({
    initialValues: {
      pass: "",
      passConfirm: "",
      textChange: "Change password",
    },
    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      formik.setFieldValue("textChange", "Setting new password");
      setLoading(true);
      // pass values to backend.
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
          newPassword: values.pass,
          resetPasswordLink: token
      })
      .then(res => {
        console.log(res.data.message);
        //Clear values after submitting
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        setLoading(true);
        toast.success("✔ " + res.data.message);
        setLoading(false);
        history.push("/login");
      })
      .catch(err => {
        console.log(err.response.data);
        toast.error('❌ Something is wrong try again ', err.response.data.error);
      });
    },
  });
  

  return (
    <>
      <Helmet>
        <title>Elegance App - Reset Password</title>
      </Helmet>
      <div>
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer autoClose={5000} />
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
                  <form onSubmit={formik.handleSubmit}
                  className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Reset Your Password</h4>
                      <p>Set a new password...</p>
                    </CardHeader>
                    <CardBody>
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
                      <CustomInput
                        labelText="Confirm Password"
                        id="passConfirm"
                        error={formik.errors.passConfirm ? true : false}
                        formControlProps={{
                          fullWidth: true,
                          className: classes.mail,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("passConfirm"),
                          value: formik.values.passConfirm,
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
                      {formik.errors.passConfirm && formik.touched.passConfirm && (
                        <p className={classes.helperText}>
                          {formik.errors.passConfirm}
                        </p>
                      )}
                      <Button
                        type="submit"
                        simple
                        color="primary"
                        size="lg"
                        className={classes.button}
                      >
                        {formik.values.textChange}
                      </Button>
                    </CardBody>
                  </form>
                  <p className={classes.divider}>Or You Can...</p>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      className={classes.buttonFooter}
                      color="info"
                      href="/register"
                    >
                      <PersonAdd /> Register
                    </Button>
                    <Button
                      color="success"
                      className={classes.buttonFooter}
                      href="/login"
                    >
                      <Fingerprint /> Login
                    </Button>
                  </CardFooter>
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
  pass: Yup.string()
    .required("Password is required")
    .min(8, "At least 8 caracters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ),
  passConfirm: Yup.string()
    .required("You must confirm password")
    .oneOf([Yup.ref("pass"), null], "Passwords must match"),
});