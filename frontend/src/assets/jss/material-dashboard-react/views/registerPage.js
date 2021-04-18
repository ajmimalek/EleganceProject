import { primaryColor } from "assets/jss/material-dashboard-react";
import { container } from "assets/jss/material-dashboard-react.js";

const signupPageStyle = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    marginTop: "5px",
    width: "35%",
    float: "right!important",
  },
  city: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5px",
    width: "50%",
    "& #gps": {
      marginTop: "-64px",
      marginLeft: "-50px",
    },
  },
  container: {
    ...container,
    zIndex: "2",
    width: "90%",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
  },
  name: {
    marginTop: "10px",
    width: "45%",
  },
  mail: {
    marginTop: "10px",
    width: "30%",
  },
  password: {
    marginTop: "10px",
    width: "30%",
    marginLeft: "25px",
    float: "right!important",
    [theme.breakpoints.down("sm")]: {
       display: "flex",
       flexFlow: "row nowrap",
       marginLeft: "15px",
    },
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  socialIcons: {
    maxWidth: "44px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  remember: {
    color: "#495057",
    marginTop: "10px",
  },
});

export default signupPageStyle;
