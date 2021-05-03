import React, { useState, useEffect } from "react";
import classNames from "classnames";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import IconButton from "@material-ui/core/IconButton";
// core components
import Button from "components/CustomButtons/Button.js";
import profile from "../../assets/img/faces/marc.jpg";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { Avatar, Hidden,  ListItemText } from "@material-ui/core";
import {
  AccountCircle,
  ExitToApp,
  Feedback,
  Settings,
} from "@material-ui/icons";
import dummyContents from "variables/dummyContents";
import { isAuth } from "helpers/auth";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const history = useHistory();
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  //console.log(isAuth().FullName);
  const goToProfile = (e) => {
    e.preventDefault();
    history.push("/admin/profile");
  }

  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const [lendList, setLendList] = useState([]);
  useEffect(() => {
    const getLendList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/clothes/getAllClothesLend/` + isAuth()._id);
        setLendList(data);
       
      } catch (error) {
        console.log(error.response);
      }
    };

    getLendList();
  }, []);
  
  function handleAcceptLendClothes(lend,Idclothes) {
    try {
     
      const AcceptLendClothes = async () => {
        try {
          await axios.post(
            `http://localhost:9000/clothes/AcceptLend/`+lend+'/'+Idclothes);
            const getLendList = async () => {
              try {
                const { data } = await axios.get(
                  `http://localhost:9000/clothes/getAllClothesLend/` + isAuth()._id);
                setLendList(data);
               
              } catch (error) {
                console.log(error.response);
              }
            };
        
            getLendList();
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      AcceptLendClothes();
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleRefuseLendClothes(lend,Idclothes) {
    try {
     
      const RefuseLendClothes = async () => {
        try {
          await axios.post(
            `http://localhost:9000/clothes/RefuseLend/`+lend+'/'+Idclothes);
            const getLendList = async () => {
              try {
                const { data } = await axios.get(
                  `http://localhost:9000/clothes/getAllClothesLend/` + isAuth()._id);
                setLendList(data);
               
              } catch (error) {
                console.log(error.response);
              }
            };
        
            getLendList();
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      RefuseLendClothes();
    } catch (error) {
      console.log(error.response);
    }
  };

  const [FollowList, setFollowList] = useState([]);
  useEffect(() => {
    const getFollowList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/user/getAllNotifFollow/` + isAuth()._id);
        setFollowList(data);
       
      } catch (error) {
        console.log(error.response);
      }
    };

    getFollowList();
  }, []);
  var IdFollow = null;
  function Followuse(id) {
    IdFollow = id;
  }
  function handleOnUnfollow() {
    try {
     
      axios.post(`http://localhost:9000/user/UnFollow/`+IdFollow);
      const getFollowList = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:9000/user/getAllNotifFollow/` + isAuth()._id);
          setFollowList(data);
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      getFollowList();
    } catch (error) {
      console.log(error.response);
    }
  };

  
  function handleOnfollow() {
    try {
      
      axios.post(`http://localhost:9000/user/follow/`+IdFollow);
      const getFollowList = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:9000/user/getAllNotifFollow/` + isAuth()._id);
          setFollowList(data);
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      getFollowList();
      
    } catch (error) {
      console.log(error.response);
    }
    
  };
  return (
    <div>
      <div className={classes.manager}>
        <IconButton
          color="inherit"
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          {/* To change 5 in span based on logic of notifications */}
          <span className={classes.notifications}>{FollowList.length+lendList.length}</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </IconButton>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                { FollowList.map(
                            ({ _id,NameUserFollowing }) => (
                              <>
                              <MenuItem
                              onClick={handleCloseNotification}
                              className={classes.dropdownItem}
                            >
                              <div className={classes.messageInfo}>
                                <Avatar
                                  alt="User Name"
                                  
                                  className={classes.avatar}
                                /><b>{NameUserFollowing }: </b> Family member request 
                                
                               
                              </div>
                             
                            </MenuItem>
                            <center>
                            <IconButton aria-label="add" className={classes.margin}
                            onClick={() => {
                              Followuse(_id);
                              handleOnfollow();
                            }}
                             >
                  <PersonAddIcon  color="primary" fontSize="large" onClick={() => {
                              Followuse(_id);
                              handleOnfollow();
                            }}/>
                </IconButton>

                
                            <IconButton aria-label="delete"  className={classes.margin}
                            onClick={() => {
                              Followuse(_id);
                              handleOnUnfollow();
                            }}>
                  <PersonAddDisabledIcon fontSize="large" onClick={() => {
                              Followuse(_id);
                              handleOnUnfollow();
                            }} />
                </IconButton>
                            
                           </center>
                            <Divider inset />
                            </>
                            ))
                          }
                { lendList.map(
                            ({ _id,userlend,title,lend }) => (
                              <>
                              <MenuItem
                              onClick={handleCloseNotification}
                              className={classes.dropdownItem}
                            >
                              <div className={classes.messageInfo}>
                               <b>{userlend }: </b> Lend {title} request
                                
                               <Avatar
                                  alt="User Name"
                                  src={'http://localhost:9000/clothes/download/' + _id}
                                  className={classes.avatar}
                                />
                              </div>
                             
                            </MenuItem>
                            <center>
                            <Button color="primary"onClick={() => {
                             handleAcceptLendClothes(lend,_id)
                            }}
                            >Accept</Button>

                            <Button onClick={() => {
                              handleRefuseLendClothes(lend,_id)
                            }}
                            >refuse</Button>
                            
                           </center>
                            <Divider inset />
                            </>
                            ))
                          }
                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <IconButton
          aria-haspopup="true"
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          onClick={handleClickProfile}
          className={classes.buttonLink}
          color="inherit"
        >
          <Avatar src={profile} alt="Rebirth"></Avatar>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              My Profile
            </p>
          </Hidden>
        </IconButton>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <div className={classes.dropdownItem}>
                      {isAuth() ? isAuth().FullName : "First & Last Name"}
                    </div>
                    <MenuItem
                      onClick={goToProfile}
                      className={classes.dropdownItem}
                    >
                      <AccountCircle /> &nbsp; Profile
                    </MenuItem>
                    {/*<MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <Settings /> &nbsp; Settings
                    </MenuItem>*/}
                    <a href="mailto:ajmi.malek@esprit.tn?subject=Elegance App - Feedbacks&cc=achref.aguel@esprit.tn,mahmoud.hadidi1@esprit.tn,ibtissem.kraiem@esprit.tn">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        <Feedback /> &nbsp; Feedbacks
                      </MenuItem>
                    </a>
                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      <ExitToApp /> &nbsp; Log Out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
