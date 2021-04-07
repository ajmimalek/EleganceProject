import React, { Component } from "react";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";
import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import { Button, Card, makeStyles } from "@material-ui/core";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(Cardstyles);
export default function Clothes(props) {
  const classes = useStyles();
  const Cardclasses = useCardStyles();
  return (
    <Card className={classes.ClothesItem}>
      <img
        className={Cardclasses.cardImgTop}
        data-src="holder.js/100px180/"
        alt="100%x180"
        style={{ height: "180px", width: "100%", display: "block" }}
        src={props.clothes.img}
        data-holder-rendered="true"
      />
      <CardBody>
        <h4>{props.clothes.name}</h4>
      <button>Details</button> 
      
      <button>Sell</button>
      <button>lend</button>
        
    </CardBody>
    </Card>
    
    );
}
