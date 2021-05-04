import React, { Component } from "react";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";
import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import { Card, makeStyles } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(Cardstyles);
export default function ClothesChange(props) {
  const classes = useStyles();
  const Cardclasses = useCardStyles();
  return (
    <Card className={classes.ClothesItemStore}>
      <img
        className={Cardclasses.cardImgTop}
        data-src="holder.js/100px180/"
        alt="100%x180"
        style={{ height: "180px", width: "100%", display: "block" }}
        src={props.clothes.img}
        data-holder-rendered="true"
      />
      <CardBody>
      {props.clothes.price}DT<br></br>
      27534622<br></br>
      <div className={classes.sliderFilter}>
      <Button type="button" color="warning">Edit</Button> <Button type="button" color="danger">Remove</Button>
      </div>
    </CardBody>
    </Card>
    
    );
}
