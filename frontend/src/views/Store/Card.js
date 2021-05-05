import React from "react";
import "./Card.css";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";






const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));



export default function Card({ title, imagesrc, body, onClick }, props) {
  const classes = useStyles();

  

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
        <button onClick={onClick} type="button">
          <a>view more</a>
        </button>
      </div>
     
    </div>
  );
 
}
