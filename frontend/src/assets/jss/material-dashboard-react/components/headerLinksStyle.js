import { primaryColor } from "assets/jss/material-dashboard-react";
import {
  defaultFont,
  whiteColor,
} from "assets/jss/material-dashboard-react.js";

import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";

const headerLinksStyle = (theme) => ({
  ...dropdownStyle(theme),
  linkText: {
    color: "white",
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px 20px",
  },
  icons: {
    [theme.breakpoints.down("sm")]: {
      color: "white",
    },
  },
  buttonLink: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "0 15px 0",
      width: "100%",
      "& svg": {
        width: "34px",
        height: "36px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%",
      },
    },
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  notifications: {
    zIndex: "4",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid " + whiteColor,
      right: "4px",
      fontSize: "9px",
      background: primaryColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      display: "none",
    },
  },
  manager: {
    display: "inline-block",
  },
  messageInfo: {
    width: "100%",
    display: "flex",
    background: "none",
    border: "none",
  },
  avatar: {
    marginRight: "10px",
    marginLeft: "-15px",
  },
  secondaryText:{
    [theme.breakpoints.down("sm")]: {
      color: "gray",
    },
  }
});

export default headerLinksStyle;
