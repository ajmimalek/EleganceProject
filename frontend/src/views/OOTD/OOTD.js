import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import imagesStyles from "assets/jss/material-dashboard-react/components/imagesStyles";
import Casual from "../../assets/img/Context/casual.jpg";
import Party from "../../assets/img/Context/party.jpg";
import Seminar from "../../assets/img/Context/Seminar.jpg";
import Work from "../../assets/img/Context/Work.jpg";
import Match from "../../assets/img/perfect_match.gif";
import { rotateIn, bounceInUp } from "react-animations";
import {
  Tooltip,
} from "@material-ui/core";
import Toolstyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Quote from "components/Typography/Quote";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router";
import { Add, ArrowForward } from "@material-ui/icons";

const styles = (theme) => ({
  ...imagesStyles,
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
  contextImage: {
    marginRight: "6%",
    marginLeft: "5%",
    "&:hover": {
      animation: "$rotateIn 2s",
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: "140px",
      marginLeft: "5%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "5px",
      marginLeft: "0px",
    },
  },
  "@keyframes rotateIn": rotateIn,
  match:{
    height: "150px",
    width: "150px",
  },
  center:{
    textAlign: "center",
  },
  spacement:{
    marginLeft: "3%",
    animation: "$bounceInUp 2s",
  },
  up: {
    marginBottom: "70px",
  },
  "@keyframes bounceInUp": bounceInUp,
});

const useToolsStyles = makeStyles(Toolstyles);

const useStyles = makeStyles(styles);


export default function OOTD() {
  //Quotes
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [outfit, setOutfit] = useState(false);
  const [timesClicked, settimesClicked] = useState(0);
  useEffect(() => {
    fetch("http://quotes.rest/qod.json?category=inspire")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuote(data.contents.quotes[0].quote);
        setAuthor(data.contents.quotes[0].author);
      });
  }, []);
  const showOOTD = () => {
    settimesClicked(timesClicked + 1);
    if (timesClicked > 1) {
      setOutfit(false);
      settimesClicked(0);
    } else {
      setOutfit(true);
    }
  };
  const classes = useStyles();
  const classe = useToolsStyles();
  return (
    <>
      <Helmet>
        <title>Elegance App - Outfit Of The Day</title>
      </Helmet>
      {isAuth() ? null : <Redirect to="/login" />}
      <div>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              <span role="img" aria-labelledby="wink">
                🤔
              </span>{" "}
              What are you planing for today ?
            </h4>
            <p className={classes.cardCategoryWhite}>
              Choose between (Casual, Party, Seminars or Work) and let us choose
              your perfect outfit.
            </p>
          </CardHeader>
          <CardBody>
            <Tooltip
              id="tooltip-top"
              title="Casual Outfit"
              placement="top"
              classes={{ tooltip: classe.tooltip }}
            >
              <img
                src={Casual}
                onClick={showOOTD}
                alt="Casual Outfit"
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRoundedCircle +
                  " " +
                  classes.imgFluid +
                  " " +
                  classes.contextImage
                }
              />
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Outfit for Parties"
              placement="top"
              classes={{ tooltip: classe.tooltip }}
            >
              <img
                src={Party}
                onClick={showOOTD}
                alt="outfit for Parties"
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRoundedCircle +
                  " " +
                  classes.imgFluid +
                  " " +
                  classes.contextImage
                }
              />
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Outfit for Seminars"
              placement="top"
              classes={{ tooltip: classe.tooltip }}
            >
              <img
                src={Seminar}
                onClick={showOOTD}
                alt="outfit for Seminars"
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRoundedCircle +
                  " " +
                  classes.imgFluid +
                  " " +
                  classes.contextImage
                }
              />
            </Tooltip>
            <Tooltip
              id="tooltip-top"
              title="Get Ready for work to impress"
              placement="top"
              classes={{ tooltip: classe.tooltip }}
            >
              <img
                src={Work}
                alt="Get Ready for work to impress"
                onClick={showOOTD}
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRoundedCircle +
                  " " +
                  classes.imgFluid +
                  " " +
                  classes.contextImage
                }
              />
            </Tooltip>
          </CardBody>
        </Card>
        <div>
          {outfit ? (
            <div className={classes.center}>
              <img className={classes.spacement} src={Work} alt="1" />
              <Add className={classes.spacement + " " + classes.up} />
              <img className={classes.spacement} src={Work} alt="2" />
              <Add className={classes.spacement + " " + classes.up} />
              <img className={classes.spacement} src={Work} alt="3" />
              <Add className={classes.spacement + " " + classes.up} />
              <img className={classes.spacement} src={Work} alt="4" />
              <ArrowForward className={classes.spacement + " " + classes.up} />
              <img src={Match} alt="The Perfect Match" className={classes.match + " " + classes.spacement} />
            </div>
          ) : null}
        </div>
        <Card>
          <CardHeader color="success">
            <span role="img" aria-labelledby="sun">
              🌞
            </span>{" "}
            Morning Quote
          </CardHeader>
          <CardBody>
            <Quote text={quote} author={author} />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
