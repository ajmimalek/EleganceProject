import React from "react";
import "./Card.css";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import elegance from "assets/img/Elegance Logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



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

function Card({ title, imagesrc, body }, props) {
  const [loading, setLoading] = useState(false);
  const [Image, setImage] = useState("");
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState("");
  const [listClothes, setListeClothes] = useState([]);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_STORE_URL}/tshirt`)
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
    <div className="card-container">
      <div className="image-container">
        <img src={imagesrc} />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>
            <strong>{title}</strong>
          </h3>
        </div>
        <div className="card-body">
          <p>
            <strong>{body}</strong>
          </p>
        </div>
      </div>
      <div className="btn">
        <button onClick={handleClickOpen} type="button">
          <a>view more</a>
        </button>
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
            <Typography variant="h6" className={classes.title}>
              <img className="elegance" alt="elegance emoji" src={elegance} />
            </Typography>
          </Toolbar>
        </AppBar>
      
        {console.log("listClothes",listClothes)}
        {listClothes.map(
          ({Image,Price,Title})=>(
            <>
            
      <div className="image-container">
        <img src={Image} />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>
            <strong>{Title}</strong>
          </h3>
        </div>
        <div className="card-body">
          <p>
            <strong>{Price}</strong>
          </p>
          <Button variant="outlined" color="primary" href="https://shopa.tn/categorie/mode-homme/vetements-homme/pulls-gilets-homme/">Check in Website</Button>
        </div>
      </div>
      

</>
          )
        )
    
      }
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
  );
}
export default Card;
