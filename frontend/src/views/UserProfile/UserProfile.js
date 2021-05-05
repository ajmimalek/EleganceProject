import Divider from "@material-ui/core/Divider";
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import SearchBar from "material-ui-search-bar";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import swal from "sweetalert";
import DefaultAvatar from "../../assets/img/default-avatar.jpg";
import { primaryColor } from "assets/jss/material-dashboard-react";
import { Helmet } from "react-helmet";
import ImageUpload from "components/CustomUpload/ImageUpload";
import { isAuth } from "helpers/auth";
import { Redirect, useHistory } from "react-router";
import {
  FormControl,
  FormHelperText,
  Icon,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";
import { AccountCircle, Mail, Phone } from "@material-ui/icons";
import { useFormik } from "formik";
import { Cities } from "variables/city";
import * as Yup from "yup";
import { getCookie } from "helpers/auth";
import { updateUser } from "helpers/auth";
import { toast, ToastContainer } from "react-toastify";
import { signout } from "helpers/auth";


const imageUserStyle = {
  pictureContainer: {
    position: "relative",
    cursor: "pointer",
    textAlign: "center",
    width: "100%",
  },
  picture: {
    width: "106px",
    height: "106px",
    backgroundColor: "#999999",
    border: "4px solid #CCCCCC",
    color: "#FFFFFF",
    borderRadius: "50%",
    margin: "5px auto",
    overflow: "hidden",
    transition: "all 0.2s",
    WebkitTransition: "all 0.2s",
    "&:hover": { borderColor: primaryColor[0] },
    '& input[type="file"]': {
      cursor: "pointer",
      display: "block",
      height: "100%",
      left: "0",
      opacity: "0 !important",
      position: "absolute",
      top: "0",
      width: "100%",
    },
  },
  pictureSrc: { width: "100%" },
};

const useStylesUser = makeStyles(imageUserStyle);

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    width: "100%",
    marginTop: "18px",
  },
  helperText: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.75rem",
    marginTop: "-7px",
    marginRight: "-6px",
    textAlign: "left",
    fontFamily: "Roboto",
    fontWeight: "400",
    lineHeight: "1.66",
    letterSpacing: "0.03333em",
    width: "100%",
    maxWidth: "100%",
  },
  inputIconsColor: {
    color: "#495057",
  },
  select: {
    "&:after": {
      borderColor: "#bf1922",
    },
    "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
      // hover
      borderBottom: `2px solid #bf1922`,
    },
  },
  upload: {
    textAlign: "center",
    marginTop: "-5px",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const history = useHistory();
  const [picture, setPicture] = useState(DefaultAvatar);
  const [Url, setURL] = useState("");
  const [updating, setUpdating] = useState(false);
  //Form Inputs
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      phone: "",
      gender: "",
      city: "",
      mail: "",
      pass: "",
      passConfirm: "",
      preferences: "",
      textChange: "Update Profile",
    },
    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      const token = getCookie("token");
      console.log(token);
      formik.setFieldValue("textChange", "Updating");
      console.log(URL);
      setLoading(true);
      // pass values to backend.
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/user/update/${isAuth()._id}`,
          {
            FullName: values.name,
            email: values.mail,
            password: values.pass,
            Gender: values.gender,
            city: values.city,
            Phone: values.phone,
            preferences: values.preferences,
            //image: JSON.stringify({data : values.image}),
            image: Url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          updateUser(res, () => {
            formik.setSubmitting(false);
            setLoading(false);
            formik.setFieldValue("textChange", "Update Profile");
            toast.success("✔ Profile Updated Successfully");
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("⚠️ " + err.message);
        });
    },
  });
  //Load actual values on page load
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie("token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const {
          FullName,
          email,
          Gender,
          city,
          Phone,
          preferences,
          image,
        } = res.data;
        setPicture(image);
        formik.setValues({
          name: FullName,
          phone: Phone,
          gender: Gender,
          city: city,
          mail: email,
          preferences: preferences,
          textChange: "Update Profile",
        });
      })
      .catch((err) => {
        toast.error(`⚠️ Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout();
          history.push("/");
        }
      });
  };
  const classesUser = useStylesUser();

  const [idUserConected, SetIdUserConected] = useState(isAuth()._id);
  const [NameUserConected, SetNameUserConected] = useState(isAuth().FullName);

  const [userList, setUserList] = useState([]);

  var IdUserFollowers = null;
  function UserFollowersUse(id) {
    IdUserFollowers = id;
  }
  function handleOnfollow(FullName) {
    const follow = async () => {
      try {
        const Img = isAuth().image;
        const data = {
          idUserConected,
          IdUserFollowers,
          NameUserConected,
          Img,
        };
        await axios.post(`${process.env.REACT_APP_API_URL_USER}/follow`, data);
      } catch (error) {
        console.log(error.response);
      }
    };
    follow();

    swal("Requested family member to: " + FullName).then((value) => {
      getFollowList();
      getUserList();
    });
  }
  function handleOnUnfollow(FullName) {
    const Unfollow = async () => {
      try {
        const data = {
          idUserConected,
          IdUserFollowers,
        };
        await axios.post(
          `${process.env.REACT_APP_API_URL_USER}/UnFollow`,
          data
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    Unfollow();
    swal("Remove: " + FullName).then((value) => {
      getFollowList();
      getUserList();
    });
  }

  function handleSearchUser(FullName) {
    const Search = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL_USER}/FindAllUser/` +
            isAuth()._id +
            "/" +
            FullName
        );
        setUserList(data);
      } catch (error) {
        getUserList();
      }
    };
    Search();
  }
  const getUserList = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_USER}/getAllUser/` + isAuth()._id
      );
      setUserList(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  const [FollowList, setFollowList] = useState([]);
  const getFollowList = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL_USER}/getAllFollow/` + isAuth()._id
      );
      setFollowList(data);
      console.log(data);
      data.forEach((element) => {
        console.log(element.state, "iddd", element.UserFollowers);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getFollowList();
  }, []);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Helmet>
        <title>Elegance App - My Profile</title>
      </Helmet>
      <ToastContainer autoClose={5000} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
              <CardBody>
                <ImageUpload
                  filename={picture}
                  onChange={(e) => {
                    setUpdating(true);
                    //Upload picture to cloudinary
                    const data = new FormData();
                    data.append("file", e.target.files[0]);
                    data.append("upload_preset", "elegance");
                    data.append("cloud_name", "elegance");
                    fetch(
                      "https://api.cloudinary.com/v1_1/elegance/image/upload",
                      {
                        method: "post",
                        body: data,
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log(data);
                        setURL(data.url);
                        toast.success("✔ File Uploaded Successfully");
                        setUpdating(false);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    formik.setFieldValue("image", e.target.files[0]);
                    setPicture(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {updating ? (
                  <p className={classes.upload}>Uploading Picture...</p>
                ) : null}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email Address..."
                      id="mail"
                      error={formik.errors.mail ? true : false}
                      formControlProps={{
                        fullWidth: true,
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
                      <p className={classes.helperText}>{formik.errors.mail}</p>
                    )}
                    <CustomInput
                      labelText="Full Name..."
                      id="name"
                      error={formik.errors.name ? true : false}
                      formControlProps={{
                        fullWidth: true,
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
                      <p className={classes.helperText}>{formik.errors.name}</p>
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
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
                        <FormHelperText className={classes.helper}>
                          {formik.errors.city}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                          <Icon className="fa fa-mars" fontSize="small" /> Male
                        </MenuItem>
                        <MenuItem value={"Female"}>
                          {" "}
                          <Icon className="fa fa-venus" fontSize="small" />{" "}
                          Female
                        </MenuItem>
                      </Select>
                      {formik.errors.gender && formik.touched.gender && (
                        <FormHelperText className={classes.helper}>
                          {formik.errors.gender}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Phone number..."
                      id="phone"
                      error={formik.errors.phone ? true : false}
                      formControlProps={{
                        fullWidth: true,
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
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      error={formik.errors.pass ? true : false}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
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
                      <p className={classes.helperText}>{formik.errors.pass}</p>
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Confirm Password"
                      id="passConfirm"
                      error={formik.errors.passConfirm ? true : false}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
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
                    {formik.errors.passConfirm &&
                      formik.touched.passConfirm && (
                        <p className={classes.helperText}>
                          {formik.errors.passConfirm}
                        </p>
                      )}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="My Preferences"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        value: formik.values.preferences,
                        onChange: formik.handleChange("preferences"),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary" disabled={loading}>
                  {formik.values.textChange}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardBody>
              <SearchBar
                onChange={(e) => handleSearchUser(e)}
                onRequestSearch={() => console.log("onRequestSearch")}
                style={{
                  margin: "0 auto",
                  maxWidth: 800,
                }}
              />
              <br></br>
              {userList.map(({ _id, FullName, v, image }) => {
                return (
                  <div className={classesUser.pictureContainer}>
                    <div className={classesUser.picture}>
                      <img
                        alt="MyPic"
                        src={image}
                        className={classesUser.pictureSrc}
                        id="wizardPicturePreview"
                        title=""
                      />
                    </div>
                    <b>{FullName}</b>
                    <br></br>
                    {FollowList.map(({ UserFollowers, state }) => {
                      return UserFollowers === _id ? (
                        ((v = true),
                        state === "Requested" ? (
                          <Button
                            color="secondary"
                            onClick={() => {
                              UserFollowersUse(_id);
                              handleOnUnfollow(FullName);
                            }}
                          >
                            {state}
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            onClick={() => {
                              UserFollowersUse(_id);
                              handleOnUnfollow(FullName);
                            }}
                          >
                            UnFollow{" "}
                          </Button>
                        ))
                      ) : (
                        <></>
                      );
                    })}
                    {v !== true ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          UserFollowersUse(_id);
                          handleOnfollow(FullName);
                        }}
                      >
                        family member
                      </Button>
                    ) : (
                      <></>
                    )}

                    <Divider inset />
                    <br></br>
                  </div>
                );
              })}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

const yupSchema = Yup.object({
  name: Yup.string()
    .min(4, "At least 4 caracters")
    .max(32, "No more than 32 caracters")
    .required("Name is required"),
  phone: Yup.string().matches(
    /^[0-9]{8}$/,
    "Phone number must containes 8 digits"
  ),
  gender: Yup.string(),
  city: Yup.string(),
  mail: Yup.string()
    .email("Must be a valid email address")
    .required("Email is required"),
  pass: Yup.string()
    .min(8, "At least 8 caracters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include one lowercase character, one uppercase character, a number, and a special character."
    ),
  passConfirm: Yup.string().oneOf(
    [Yup.ref("pass"), null],
    "Passwords must match"
  ),
});
