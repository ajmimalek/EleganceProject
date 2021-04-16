import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import imagesStyles from "assets/jss/material-dashboard-react/components/imagesStyles";
import Casual from "../../assets/img/Context/casual.jpeg";
import Party from "../../assets/img/Context/party.jpg";
import Seminar from "../../assets/img/Context/Seminar.jpg";
import Work from "../../assets/img/Context/Work.jpg";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Tooltip,
} from "@material-ui/core";
import Toolstyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Quote from "components/Typography/Quote";

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
    [theme.breakpoints.up("lg")]: {
      marginRight: "140px",
      marginLeft: "5%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "5px",
      marginLeft: "0px",
    },
  },
});

const useToolsStyles = makeStyles(Toolstyles);

const useStyles = makeStyles(styles);

// Slide animation for work context Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OOTD(props) {
  // Open for dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const classe = useToolsStyles();
  return (
    <>
      <Helmet>
        <title>Elegance App - Outfit Of The Day</title>
      </Helmet>
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
                onClick={handleClickOpen}
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
            <Dialog
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                Choose your field of work...
              </DialogTitle>
              <DialogContent></DialogContent>
            </Dialog>
          </CardBody>
        </Card>
        <Card>
          <CardHeader color="success">Morning Quote</CardHeader>
          <CardBody>
            <Quote
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
              author="Someone famous in Source Title"
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
