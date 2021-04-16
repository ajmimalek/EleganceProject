import React, { useEffect, useState } from "react";
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
import { AccountCircle, Email, Facebook, Phone } from "@material-ui/icons";
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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router-dom";

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
    e.persist();
    setFormData({ ...formData, [text]: e.target.value });
    console.log("New value : ", e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setGender(e.target.value);
    console.log(e.target.value);
  };
  // Submit data to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, phone, gender, city, mail, pass, passConfirm);
    if (name && mail && pass && gender && city && phone) {
      if (pass === passConfirm) {
        setFormData({ ...formData, textChange: "Starting" });
        console.log(textChange);
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
            setGender("");
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
            setGender("");
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches 😭");
      }
    } else {
      toast.error("🤔 I think you've forgot something, Check your form");
    }
  };

  // City prop
  const defaultProps = {
    options: Cities,
    getOptionLabel: (option) => option.value,
    getOptionSelected: (option) => (option ? option : ""),
  };
  const [value, setValue] = useState(Cities[5]);
  const [inputValue, setInputValue] = React.useState("");

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
              setInputValue(msg);
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
        {isAuth() ? <Redirect to="/admin/wardrobe" /> : null}
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
                  <form className={classes.form} onSubmit={handleSubmit}>
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
                        onChange={handleTextChange("name")}
                        value={name}
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
                        onChange={handleTextChange("phone")}
                        value={phone}
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
                          className={classes.select}
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
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            handleTextChange("city");
                          }}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                            handleTextChange("city");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="City"
                              className={classes.primary}
                              onChange={handleTextChange("city")}
                              value={value}
                            />
                          )}
                        />
                      </div>
                      <CustomInput
                        labelText="Email..."
                        id="mail"
                        onChange={handleTextChange("mail")}
                        value={mail}
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
                        id="passConfirm"
                        onChange={handleTextChange("passConfirm")}
                        value={passConfirm}
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
                        onChange={handleTextChange("pass")}
                        value={pass}
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
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" simple color="primary" size="lg">
                        {textChange}
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
