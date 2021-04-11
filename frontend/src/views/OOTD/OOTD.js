import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
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
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              What are you planing for today ?
            </h4>
            <p className={classes.cardCategoryWhite}>
              Choose between (Work, Seminairs, Party or Casual) and let us choose your perfect Outfit.
            </p>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </div>
    </>
  );
}
