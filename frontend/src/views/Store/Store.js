import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { createBrowserHistory } from "history";
import "views/Store/Store.css";
import { AttachMoney } from "@material-ui/icons";
import Budget from "views/Store/Budget";
// @material-ui/icons
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import "rc-slider/assets/index.css";
import Slide from "@material-ui/core/Slide";
import Carde from "./Card";
import img1 from "../../assets/img/shirt.jpg";
import img2 from "../../assets/img/cap.jpg";
import img3 from "../../assets/img/shoes.jpg";
import img4 from "../../assets/img/trousers.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Store(props) {
  const classes = useStyles();
  const { ...rest } = props;
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
                            body="The fashion industry encompass many different smaller and more niche industries. Often people think of it as just retail/online stores, design houses and brands, and fashion magazines. However, there are other craftspeople and industries in the manufacturing of clothes"
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Accessoires"
                            imagesrc={img2}
                            body="The fashion industry encompass many different smaller and more niche industries. Often people think of it as just retail/online stores, design houses and brands, and fashion magazines. However, there are other craftspeople and industries in the manufacturing of clothes"
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Shoes"
                            imagesrc={img3}
                            body="The fashion industry encompass many different smaller and more niche industries. Often people think of it as just retail/online stores, design houses and brands, and fashion magazines. However, there are other craftspeople and industries in the manufacturing of clothes"
                          />
                        </div>
                        <div className="col-md-3">
                          <Carde
                            title="Trousers"
                            imagesrc={img4}
                            body="The fashion industry encompass many different smaller and more niche industries. Often people think of it as just retail/online stores, design houses and brands, and fashion magazines. However, there are other craftspeople and industries in the manufacturing of clothes"
                          />
                        </div>
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
