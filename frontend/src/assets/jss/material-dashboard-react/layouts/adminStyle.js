import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";

const appStyle = (theme) => ({
  suspense: {
    marginTop: "50%",
    "& > img": {
      width: "200px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    "& > p": {
      textAlign: "center",
      fontWeight: "bold",
    }
  },
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "70px",
  },
});

export default appStyle;
