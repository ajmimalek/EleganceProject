/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import { Helmet } from "react-helmet";

const useStyles = makeStyles(styles);

export default function LocalStore() {
  const classes = useStyles();
  return (
    <>
    <Helmet>
      <title>Elegance App - Local Store</title>
    </Helmet>
    <div>
    
    </div>
    </>
  );
}
