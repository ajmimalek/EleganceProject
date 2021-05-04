import { primaryColor } from "assets/jss/material-dashboard-react";
import { grayColor } from "assets/jss/material-dashboard-react";
import { container } from "assets/jss/material-dashboard-react.js";

const signupPageStyle = (theme) => ({
  formControl: {
    marginLeft: theme.spacing(2),
    marginTop: "5px",
    width: "30%",
    float: "right!important",
  },
  phone: {
    marginLeft: "45px",
    marginTop: "-20px",
    width: "30%",
  },
  city: {
    display: "grid",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    width: "50%",
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
    marginTop: "-20px",
    width: "30%",
  },
  helper: {
    marginTop: "-10px",
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
  mail: {
    marginTop: "-20px",
    width: "30%",
  },
  password: {
    marginTop: "-20px",
    width: "30%",
    marginLeft: "30px",
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
  inputIconsColor: {
    color: "#495057",
  },
});

export default signupPageStyle;