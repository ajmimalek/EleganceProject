import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import SearchBar from 'material-ui-search-bar';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import DefaultAvatar from "../../assets/img/default-avatar.png";
import { primaryColor } from "assets/jss/material-dashboard-react";
import avatar from "assets/img/faces/marc.jpg";
import { Helmet } from "react-helmet";
import ImageUpload from "components/CustomUpload/ImageUpload";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router";

const imageUserStyle = {
  "pictureContainer": {
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
  "pictureSrc": { width: "100%" },
};

const useStylesUser = makeStyles(imageUserStyle);



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const classesUser = useStylesUser();

  const [idUserConected, SetIdUserConected] = useState(isAuth()._id);
  const [NameUserConected, SetNameUserConected] = useState(isAuth().FullName);
  const [testFollow, SetTestFollow] = useState(false);

  var IdUserFollowers = null;
  function UserFollowersUse(id) {
    IdUserFollowers = id;
  }
  function handleOnfollow() {
    try {
      const data = {
        idUserConected,
        IdUserFollowers,
        NameUserConected
      };
      axios.post(`http://localhost:9000/user/follow`, data);
      window.location.reload(false);
      
    } catch (error) {
      console.log(error.response);
    }
    
  };
  function handleOnUnfollow() {
    try {
      const data = {
        idUserConected,
        IdUserFollowers
      };
      axios.post(`http://localhost:9000/user/UnFollow`, data);
      window.location.reload(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const getUserList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/user/getAllUser/` + isAuth()._id);
        setUserList(data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getUserList();
  }, []);

  const [FollowList, setFollowList] = useState([]);
  useEffect(() => {
    const getFollowList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/user/getAllFollow/` + isAuth()._id);
        setFollowList(data);
        console.log(data);
        data.forEach(element => {
          console.log(element.state, "iddd", element.UserFollowers)

        });

      } catch (error) {
        console.log(error.response);
      }
    };

    getFollowList();
  }, []);

  return (
    <div>
      {isAuth() ? null : <Redirect to="/login" />}
      <Helmet>
        <title>Elegance App - My Profile</title>
      </Helmet>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <ImageUpload />
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
          
            <CardBody>
            <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />

              {
                userList.map(
                  ({ _id, FullName,v }) => {
                    return (
                      <div className={classesUser.pictureContainer}>
                        <div className={classesUser.picture}>
                          <img
                            src={DefaultAvatar}
                            className={classesUser.pictureSrc}
                            id="wizardPicturePreview"
                            title=""
                          />

                        </div>
                        <b>{FullName}</b><br></br>
                        {
                          FollowList.map(
                            ({ UserFollowers, state }) => {
                              return (
                                UserFollowers === _id ? (
                                  v=true,
                                  state === "Requested" ? (
                                    <Button color="secondary"
                                      onClick={() => {
                                        UserFollowersUse(_id);
                                        handleOnUnfollow();
                                      }
                                      }>{state}</Button>
                                  ) : (
                                    <Button color="primary"
                                      onClick={() => {
                                        UserFollowersUse(_id);
                                      handleOnUnfollow();
                                      }
                                      }>UnFollow </Button>
                                  )
                                ) :
                                  (
                                    <p></p>
                                    )

                              )
                            })}{v!==true?(
                          <Button color="primary"
                            onClick={() => {
                              UserFollowersUse(_id);
                              handleOnfollow();
                            }
                            }>family member</Button>
                        ):
                        (
                          <p></p>
                        )

                        }


                        <br></br>
                      </div>

                    )
                  })

              }

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
