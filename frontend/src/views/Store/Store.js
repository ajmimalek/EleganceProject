import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import "views/Store/Store.css"
import Button from "components/CustomButtons/Button.js";
import { AttachMoney } from "@material-ui/icons";
import Budget from "views/Store/Budget";
import Shoes from "./Shoes";
import Cap from "./Cap";
import Trousers from "./Trousers";
import Shirt from "./Shirt";
// core components

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Store() {
  const classes = useStyles();
  const history = useHistory();
  const showProducts = () => {
    history.replace("./validate");
  };
  return (
    <>
    <Helmet>
      <title>Elegance App - Store</title>
    </Helmet>
    <div>
      <hr></hr>
      <h4 class="valide">  <AttachMoney /> What is your budget ?</h4>
    </div> <br></br> <hr></hr>
    <Budget></Budget><hr></hr>
    <Shoes></Shoes><br></br>
    <Cap></Cap><br></br>
    <Trousers></Trousers><br></br>
    <Shirt></Shirt><br></br>
    
    <div onClick={showProducts} class="validate"><Button type="button" color="primary">Validate</Button></div>
    </>
  );
}
