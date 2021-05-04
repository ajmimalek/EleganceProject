import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import "views/Store/Store.css"
import Button from "components/CustomButtons/Button.js";
import { AttachMoney } from "@material-ui/icons";
import Budget from "views/Store/Budget";
import Shoes from "../../assets/img/shoes.svg";
import Cap from "../../assets/img/cap.svg";
import Trousers from "../../assets/img/trousers.svg";
import Shirt from "../../assets/img/shirt.svg";
import { Checkbox } from "@material-ui/core";
// @material-ui/icons
import Wink from "assets/img/Elegance Black.png";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import 'rc-slider/assets/index.css';


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

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
//const history = createBrowserHistory();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Store(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
    setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
  return (
    <>
     <div className="Store">
    <Helmet>
      <title>Elegance App - Store</title>
    </Helmet>
   
    <div>
      <h4 className="valide"> 
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}> <AttachMoney /> What is your budget ?</h4>
            <p className={classes.cardCategoryWhite}>
            </p>
          </CardHeader>
          <CardBody>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer> 
      </h4>
    </div>
     <br></br>
    <Budget></Budget>
    <div className="container"  >
        <div > <img alt="Cap emoji" src={Cap} /><Checkbox></Checkbox> </div>
        <div> <img alt="Trousers emoji" src={Trousers} /><Checkbox></Checkbox> </div>
        <div> <img alt="Shirt emoji" src={Shirt} /> <Checkbox></Checkbox></div>
        <div> <img alt="Shoes emoji" src={Shoes} />  <Checkbox></Checkbox> </div>
    </div>
    <div  className="validate">
      <Button onClick={handleClickOpen} type="button" color="primary">
        validate
      </Button>
    </div>
              <Dialog
                          open={open}
                          TransitionComponent={Transition}
                          keepMounted
                          aria-labelledby="alert-dialog-slide-title"
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle id="alert-dialog-slide-title">
                            <img alt="wink emoji" src={Wink} /> &nbsp;
                          </DialogTitle>
                          <DialogContent>
                                <Button type="button" color="success" >check in website</Button>
                                <Button type="button" color="success" >check in website</Button>
                                <Button type="button" color="success" >check in website</Button>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="danger">
                              Back to Store
                            </Button>
                          </DialogActions>
              </Dialog>
      </div>
    
    </>
  );
}
