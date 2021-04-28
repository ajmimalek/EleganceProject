import React from "react";
import classNames from "classnames";
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
// core components
import profile from "../../assets/img/faces/marc.jpg";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { Avatar, Hidden, IconButton, ListItemText } from "@material-ui/core";
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
          <span className={classes.notifications}>5</span>
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
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div className={classes.messageInfo}>
                        <Avatar
                          alt="User Name"
                          src={profile}
                          className={classes.avatar}
                        />
                        <ListItemText
                          classes={{ secondary: classes.secondaryText }}
                          primary={dummyContents.text.subtitle}
                          secondary={dummyContents.text.date}
                        />
                      </div>
                    </MenuItem>
                    <Divider inset />
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div className={classes.messageInfo}>
                        <Avatar
                          alt="User Name"
                          src={profile}
                          className={classes.avatar}
                        />
                        <ListItemText
                          classes={{ secondary: classes.secondaryText }}
                          primary={dummyContents.text.subtitle}
                          secondary={dummyContents.text.date}
                        />
                      </div>
                    </MenuItem>
                    <Divider inset />
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div className={classes.messageInfo}>
                        <Avatar
                          alt="User Name"
                          src={profile}
                          className={classes.avatar}
                        />
                        <ListItemText
                          classes={{ secondary: classes.secondaryText }}
                          primary={dummyContents.text.subtitle}
                          secondary={dummyContents.text.date}
                        />
                      </div>
                    </MenuItem>
                    <Divider inset />
                    <MenuItem
                      onClick={handleCloseNotification}
                      className={classes.dropdownItem}
                    >
                      <div className={classes.messageInfo}>
                        <Avatar
                          alt="User Name"
                          src={profile}
                          className={classes.avatar}
                        />
                        <ListItemText
                          classes={{ secondary: classes.secondaryText }}
                          primary={dummyContents.text.subtitle}
                          secondary={dummyContents.text.date}
                        />
                      </div>
                    </MenuItem>
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
          <Avatar src={isAuth() ? isAuth().image : profile} alt="Rebirth"></Avatar>
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
