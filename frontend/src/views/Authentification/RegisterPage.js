import React, { useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import { AccountCircle, Email, Facebook, Room } from "@material-ui/icons";
import CheckBox from "components/CheckBox/CheckBox";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ReCAPTCHA from "react-google-recaptcha";
import LocationIQ from "react-native-locationiq";
import swal from "sweetalert";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  // Gender prop
  const [gender, setGender] = useState("male");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  // Google Recaptcha API
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const reCaptcha = useRef();
  const onSignup = () => {
    if (!token) {
      setError("You must verify the Captcha");
      return;
    }
    setError("");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/` + "user/signup-with-recaptcha",
        {
          token,
          email: "sfshd@sfsdf.sdf",
        }
      )
      .then((resp) => {
        swal(
          "Registred",
          "You are now officially part of Elegance members.",
          "success"
        );
      })
      .catch(({ response }) => {
        // Get the response from data
        setError(response.data.error);
      })
      .finally(() => {
        // Reset the Captcha
        reCaptcha.current.reset();
        setToken("");
      });
  };

  // GeoLocation
  const [open, setOpen] = useState(false);

  const getCity = (lat, lng) => {
    var state;
    // Initialize the module (needs to be done only once)
    LocationIQ.init("pk.8bcb38d71951a48b4ae9c937cc42afe0");
    LocationIQ.reverse(lat, lng)
      .then((json) => {
        state = json.address.state;
        swal("You live in...", state.substring(12, state.length), "info");
        return state;
      })
      .catch((error) => console.warn(error));
    return state;
  };

  const getCordinates = (position) => {
    const lat = position.coords.latitude + "";
    const lng = position.coords.longitude + "";
    console.log("Latitude: " + lat + " Longitude: " + lng);
    getCity(lat, lng);
  };

  const handleLocationErrors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        swal(
          "Permission Denied",
          "User denied the request for Geolocation!",
          "error"
        );
        break;
      case error.POSITION_UNAVAILABLE:
        swal(
          "Position Unavailable",
          "Location information is unavailable!",
          "error"
        );
        break;
      case error.TIMEOUT:
        swal("TimeOut", "The request to get user location timed out!", "error");
        break;
      case error.UNKNOWN_ERROR:
        swal("Unknown", "An unknown error occurred!", "error");
        break;
      default:
        console.log("Error: " + error);
    }
  };

  const getLocation = () => {
    var msg;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCordinates,
        handleLocationErrors
      );
      msg = getCity();
      console.log(`msg = `, msg);
    } else {
      msg = "Geolocation is not supported by this browser.";
    }
    return msg;
  };

  // City prop
  const defaultProps = {
    options: Cities,
    getOptionLabel: (option) => option.value,
  };
  const index = Cities.indexOf(getLocation);
  console.log(`index of Location `, index);
  const [value, setValue] = useState(Cities[index]);

  return (
    <>
      <Helmet>
        <title>Elegance App - Register</title>
      </Helmet>
      <div>
        <Header
          absolute
          color="transparent"
          brand={EleganceLogo}
          rightLinks={<HeaderLinks page={"register"} />}
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
              <GridItem xs={12} sm={12} md={8}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Register</h4>
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
                        labelText="Full Name..."
                        id="name"
                        formControlProps={{
                          fullWidth: false,
                          className: classes.name,
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
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          onChange={handleChange}
                          color="secondary"
                        >
                          <MenuItem value={"male"}>
                            {" "}
                            <Icon
                              className="fa fa-mars"
                              fontSize="small"
                            />{" "}
                            Male
                          </MenuItem>
                          <MenuItem value={"female"}>
                            {" "}
                            <Icon
                              className="fa fa-venus"
                              fontSize="small"
                            />{" "}
                            Female
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <div className={classes.city}>
                        <Autocomplete
                          {...defaultProps}
                          id="selectCity"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="City" />
                          )}
                        />
                        <Button
                          justIcon
                          round
                          color="primary"
                          id="gps"
                          onClick={getLocation}
                        >
                          <Room />
                        </Button>
                      </div>
                      <CustomInput
                        labelText="Email..."
                        id="mail"
                        formControlProps={{
                          fullWidth: false,
                          className: classes.mail,
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Confirm Password"
                        id="passConfim"
                        formControlProps={{
                          fullWidth: false,
                          className: classes.password,
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
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: false,
                          className: classes.password,
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
                      <ReCAPTCHA
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        ref={reCaptcha}
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setToken(token)}
                        onExpired={(e) => setToken("")}
                      />
                      <FormControlLabel
                        control={<CheckBox name="checkedC" />}
                        label="I agree to the terms and conditions."
                        className={classes.remember}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={() => onSignup()}
                      >
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
