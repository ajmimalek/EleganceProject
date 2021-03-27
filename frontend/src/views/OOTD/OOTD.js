import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";


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

export default function OOTD() {
  const classes = useStyles();
  return (
    <>
    <Helmet>
      <title>Elegance App - Outfit Of The Day</title>
    </Helmet>
    <div>
      
    </div>
    </>
  );
}
