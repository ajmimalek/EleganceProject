import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Helmet } from "react-helmet";
const useStyles = makeStyles(styles);

function Wardrobe() {
  const classes = useStyles();
  return (
    <>
    <Helmet>
      <title>Elegance App - My Wardrobe</title>
    </Helmet>
  <div>
  </div>
  </>
  );
}

export { Wardrobe as default };