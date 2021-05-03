import React, { useEffect, useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Cities } from "../../variables/city";
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

import styles from "assets/jss/material-dashboard-react/views/registerPage";

import image from "assets/img/bg7.jpg";
import EleganceLogo from "../../assets/img/Elegance Logo.png";
import { Helmet } from "react-helmet";
import { AccountCircle, Email, Phone } from "@material-ui/icons";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import LocationIQ from "react-native-locationiq";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  // Form inputs
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      gender: "",
      city: "",
      mail: "",
      pass: "",
      passConfirm: "",
      textChange: "Get Started",
    },
    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      console.log(values, token);
      if (values && token) {
        if (values.pass === values.passConfirm) {
          formik.setFieldValue("textChange", "Starting");
          setLoading(true);
          console.log(values.textChange);
          // pass values to backend.
          axios
            .post(`${process.env.REACT_APP_API_URL}/register`, {
              FullName: values.name,
              email: values.mail,
              password: values.pass,
              Gender: values.gender,
              city: values.city,
              Phone: values.phone,
              token: token,
            })
            // Clear values after submitting form
            .then((res) => {
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
              setLoading(false);
              // reset the captcha and delete token.
              reCaptcha.current.reset();
              setToken("");
              console.log(res.data.message);
              toast.success("📧 " + res.data.message);
            })
            .catch((err) => {
              // Clear values after Error.
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
              setLoading(false);
              // reset the captcha and delete token.
              reCaptcha.current.reset();
              setToken("");
              console.log(err.response);
              toast.error("⚠️ " + err.response.data.errors);
            });
        } else {
          toast.error("Passwords don't matches 😭");
        }
      } else if (!token) {
        toast.error("✔ You must verify the captcha");
      } else {
        toast.error("🤔 I think you've forgot something, Check your form");
      }
    },
  });
  console.log("Form values : ", formik.values);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const reCaptcha = useRef();

  // GeoLocation
  useEffect(() => {
    var msg;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          var state;
          // Initialize the module (needs to be done only once)
          LocationIQ.init("pk.8bcb38d71951a48b4ae9c937cc42afe0");
          LocationIQ.reverse(lat, lng)
            .then((json) => {
              state = json.address.state;
              msg = state.substring(12, state.length);
              toast.info("📍 You live in " + msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
              console.log(`state : `, msg);
              formik.setFieldValue("city", msg);
            })
            .catch((error) => console.warn(error));
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      );
    } else {
      msg = "Geolocation is not supported by this browser.";
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Elegance App - Register</title>
      </Helmet>
      <div>
        {isAuth() ? <Redirect to="/" /> : null}
        <Header
          absolute
          color="transparent"
          brand={EleganceLogo}
          rightLinks={<HeaderLinks page={"register"} />}
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
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
                      <p>
                      City is detected automatically through your GPS coordinates.
                    </p>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                    <FormControl className={classes.name}>
                      <CustomInput
                        labelText="Full Name..."
                        id="name"
                        error={formik.errors.name ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          type: "text",
                          value: formik.values.name,
                          onChange: formik.handleChange("name"),
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.name && formik.touched.name && (
                          <FormHelperText className={classes.helper}>{formik.errors.name}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.phone}>
                      <CustomInput
                        labelText="Phone number..."
                        id="phone"
                        error={formik.errors.phone ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("phone"),
                          value: formik.values.phone,
                          type: "number",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                          <FormHelperText className={classes.helper}>{formik.errors.phone}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="gender-label"
                          id="Gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange("gender")}
                          className={classes.select}
                        >
                          <MenuItem value={"Male"}>
                            {" "}
                            <Icon
                              className="fa fa-mars"
                              fontSize="small"
                            />{" "}
                            Male
                          </MenuItem>
                          <MenuItem value={"Female"}>
                            {" "}
                            <Icon
                              className="fa fa-venus"
                              fontSize="small"
                            />{" "}
                            Female
                          </MenuItem>
                        </Select>
                        {formik.errors.gender && formik.touched.gender && (
                          <FormHelperText className={classes.helper}>{formik.errors.gender}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.city}>
                        <InputLabel id="demo-simple-select-label">
                          City
                        </InputLabel>
                        <Select
                          labelId="city-label"
                          id="city"
                          value={formik.values.city}
                          onChange={formik.handleChange("city")}
                          className={classes.select}
                        >
                          {Cities.map((option) => (
                            <MenuItem value={option.value} key={option.id}>
                              {option.value}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.errors.city && formik.touched.city && (
                          <FormHelperText className={classes.helper}>{formik.errors.city}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.mail}>
                      <CustomInput
                        labelText="Email..."
                        id="mail"
                        error={formik.errors.mail ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("mail"),
                          value: formik.values.mail,
                          type: "text",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.mail && formik.touched.mail && (
                          <FormHelperText className={classes.helper}>{formik.errors.mail}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.password}>
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        error={formik.errors.pass ? true : false}
                        formControlProps={{
                          fullWidth: false,
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
                          <FormHelperText className={classes.helper}>{formik.errors.pass}</FormHelperText>
                        )}
                      </FormControl>
                      <FormControl className={classes.password}>
                      <CustomInput
                        labelText="Confirm Password"
                        id="passConfirm"
                        error={formik.errors.passConfirm ? true : false}
                        formControlProps={{
                          fullWidth: false,
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
                          <FormHelperText className={classes.helper}>{formik.errors.passConfirm}</FormHelperText>
                        )}
                      </FormControl>
                      <ReCAPTCHA
                        ref={reCaptcha}
                        onChange={(token) => setToken(token)}
                        onExpired={(e) => setToken("")}
                        style={{
                          marginTop: "30px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        type="submit"
                        simple
                        color="primary"
                        size="lg"
                        disabled={loading}
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
  name: Yup.string()
    .min(4, "At least 4 caracters")
    .max(32, "No more than 32 caracters")
    .required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{8}$/, "Phone number must containes 8 digits"),
  gender: Yup.string().required("Gender field cannot be empty"),
  city: Yup.string().required("City field cannot be empty"),
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
  passConfirm: Yup.string()
    .required("You must confirm password")
    .oneOf([Yup.ref("pass"), null], "Passwords must match"),
});
