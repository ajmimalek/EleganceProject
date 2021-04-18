/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Fingerprint, PersonAdd } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/login/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { page } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {page === "login" ? (
          <Button
            href="/register"
            color="transparent"
            className={classes.navLink}
          >
            <PersonAdd className={classes.icons} /> Register
          </Button>
        ) : (
          <Button href="/login" color="transparent" className={classes.navLink}>
            <Fingerprint className={classes.icons} /> Login
          </Button>
        )}
      </ListItem>
    </List>
  );
}

HeaderLinks.propTypes = {
  page: PropTypes.oneOf(["login", "register"]),
};
