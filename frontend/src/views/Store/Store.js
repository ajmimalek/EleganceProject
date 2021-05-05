import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { createBrowserHistory } from "history";
import { AttachMoney } from "@material-ui/icons";
import Budget from "views/Store/Budget";
// @material-ui/icons
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "rc-slider/assets/index.css";
import Carde from "./Card";
import img1 from "../../assets/img/shirt.jpg";
import img2 from "../../assets/img/cap.jpg";
import img3 from "../../assets/img/shoes.jpg";
import img4 from "../../assets/img/trousers.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import elegance from "assets/img/Elegance Logo.png";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
};
const history = createBrowserHistory();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Loader = styled.div`
  margin-top: 30%;
  & > p {
    text-align: center;
    font-weight: bold;
  }

`;
const Spinner = styled.svg`
  animation: rotate 2s linear infinite;
  display: block;
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  width: 50px;
  height: 50px;
  & .path {
    stroke: black;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;
const CardContainer = styled.div`
  width: 230px;
  overflow: hidden;
  box-shadow: 0px 0px 15px -5px;
  transition: 0.5s;
  animation: ease-in;
  & :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
  }
 
}
`;
const CardImage = styled.div`
& img{
  overflow: hidden;
  height: 240px;
}

`;
const CardContent = styled.div`

  margin: 1rem;
  margin-top: 0.5rem;

`;
const CardTitle = styled.div`
& h3{
  margin: 0;
  padding: 0;
}

  margin-bottom: 0.5rem;

`;
const CardBodyy = styled.div`
& p{
  margin: 0;
  padding: 0;
}

`;



export default function Store(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [listClothes, setListeClothes] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (type) => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_STORE_URL}/` + type)
      .then((res) => {
        setLoading(false);
        setListeClothes(res.data);
        console.log(res.data);
      })
      .catch();
    setOpen(true);
  };


  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="Store">
        <Helmet>
          <title>Elegance App - Store</title>
        </Helmet>

        <div>
          <h4>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      {" "}
                      <AttachMoney /> What is your budget ?
                    </h4>
                    <p className={classes.cardCategoryWhite}></p>
                  </CardHeader>
                  <CardBody>
                    <br />
                    <Budget></Budget>
                    <br />
                    <div className="container-fluid d-flex justify-content-center">
                      <div className="row">
                        <div className="col-md-3">
                          <Carde
                            title="T-shirt"
                            imagesrc={img1}
                            onClick={(e) => {
                              console.log("tshirt clicked");
                              handleClickOpen("tshirt");
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Accessoires"
                            imagesrc={img2}
                           
                            onClick={() => {
                              handleClickOpen("accessoires");
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Shoes"
                            imagesrc={img3}
                           
                            onClick={() => {
                              handleClickOpen("shoes");
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Trousers"
                            imagesrc={img4}
                           
                            onClick={() => {
                              handleClickOpen("trousers");
                            }}
                          />
                        </div>
                        <Dialog
                      fullScreen
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                    >
                      <AppBar className={classes.appBar}>
                        <Toolbar>
                          <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                          
                          <Typography     variant="h6" className={classes.title}>

                            <img  height= "50px" alt="elegance emoji" src={elegance}>
                              
                              </img>
                          </Typography>
                        </Toolbar>
                      </AppBar>

                      {console.log("listClothes", listClothes)}
                      {listClothes.map(({ Image, Price, Title }) => (
                        <>
                          <CardImage>
                            <img src={Image} />
                          </CardImage>
                          <CardContent>
                            <CardTitle>
                              <h3>
                                <strong>{Title}</strong>
                              </h3>
                            </CardTitle>
                            <CardBodyy>
                              <p>
                                <strong>{Price}</strong>
                              </p>
                              <Button
                                variant="outlined"
                                color="primary"
                                target="_blank"
                                href="https://shopa.tn/categorie/mode-homme/vetements-homme/pulls-gilets-homme/"
                              >
                                Check in Website
                              </Button>
                            </CardBodyy>
                          </CardContent>
                        </>
                      ))}
                      {loading ? (
                        <Loader>
                          <Spinner viewBox="0 0 50 50">
                            <circle
                              className="path"
                              cx="25"
                              cy="25"
                              r="20"
                              fill="none"
                              strokeWidth="2"
                            />
                          </Spinner>
                          <p>Exploaring the web, please wait...</p>{" "}
                        </Loader>
                      ) : null}
                    </Dialog>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </h4>
        </div>
      </div>
    </>
  );
}