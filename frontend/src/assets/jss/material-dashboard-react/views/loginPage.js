import { container } from "assets/jss/material-dashboard-react.js";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
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
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
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
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
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
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    display: "flex",
    marginTop: "30px",
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
  },
  facebook: {
     height: "47px",
     marginRight: "10px",
     backgroundColor: "#3A5A97",
     display: "inline-flex",
     alignItems: "center",
     color: "white",
     borderRadius: "2px",
     padding: "0 3 3 0",
     border: "1px solid transparent",
     boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px",
     "&:hover": {
        backgroundColor: "#4e71ba",
     },
  },
  inputIconsColor: {
    color: "#495057"
  },
  mailsent: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "40px",
  },
  mail:{
    marginTop: "10px",
  },
  submit: {
    marginLeft: "200px",
  },
  forget: {
    marginTop: "12px",
    float: "right!important",
    marginRight: "-20px",
    "& img": {
      height: "25px",
      weight: "25px",
    }
  }
};

export default signupPageStyle;
