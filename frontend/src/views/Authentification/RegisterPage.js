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
import {
  AccountCircle,
  Email,
  Facebook,
  Phone,
  Room,
} from "@material-ui/icons";
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
// minified version
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router";

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  // Form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    mail: "",
    pass: "",
    passConfirm: "",
    textChange: "Get Started",
  });
  const [gender, setGender] = useState("");

  const { name, phone, city, mail, pass, passConfirm, textChange } = formData;
  // handle change from input
  const handleTextChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleChange = (e) => {
    setGender(e.target.value);
  }
  // Submit data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && mail && pass && gender && city && phone) {
      if (pass === passConfirm) {
        setFormData({ ...formData, textChange: "Starting" });
        // pass values to backend.
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            Fullname: name,
            email: mail,
            password: pass,
            Gender: gender,
            city,
            Phone: phone,
          })
          // Clear values after submitting form
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              phone: "",
              city: "",
              mail: "",
              pass: "",
              passConfirm: "",
              textChange: "Submitted",
            });
            toast.success(res.data.message);
          })
          .catch((err) => {
            // Clear values after Error.
            setFormData({
              ...formData,
              name: "",
              phone: "",
              city: "",
              mail: "",
              pass: "",
              passConfirm: "",
              textChange: "Get Started",
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error("Please fill all fields");
    }
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
        toast.error("User denied the request for Geolocation!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        break;
      case error.POSITION_UNAVAILABLE:
        toast.error("Location information is unavailable!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case error.TIMEOUT:
        toast.error("The request to get user location timed out!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case error.UNKNOWN_ERROR:
        toast.error("An unknown error occurred!", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
                      <CustomInput
                        labelText="Phone number..."
                        id="phone"
                        formControlProps={{
                          fullWidth: false,
                          className: classes.phone,
                        }}
                        inputProps={{
                          type: "number",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="gender-label"
                          id="Gender"
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
                          id="City"
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
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      />
                      <FormControlLabel
                        control={<CheckBox name="checkedC" />}
                        label="I agree to the terms and conditions."
                        className={classes.remember}
                      />
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
