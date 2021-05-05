import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { primaryColor } from "assets/jss/material-dashboard-react";
import PropTypes from "prop-types";

const imageUploadStyle = {
  pictureContainer: {
    position: "relative",
    cursor: "pointer",
    textAlign: "center",
    width: "100%",
  },
  picture: {
    width: "20%",
    height: "25%",
    backgroundColor: "#999999",
    border: "4px solid #CCCCCC",
    color: "#FFFFFF",
    borderRadius: "50%",
    margin: "5px auto",
    overflow: "hidden",
    transition: "all 0.2s",
    WebkitTransition: "all 0.2s",
    "&:hover": { borderColor: primaryColor[0] },
    '& input[type="file"]': {
      cursor: "pointer",
      display: "block",
      height: "100%",
      left: "0",
      opacity: "0 !important",
      position: "absolute",
      top: "0",
      width: "100%",
    },
  },
  pictureSrc: { width: "100%" },
};

const useStyles = makeStyles(imageUploadStyle);

export default function ImageUpload(props) {
  const classes = useStyles();
  const { filename, onChange } = props;

  return (
    <div className={classes.pictureContainer}>
      <div className={classes.picture}>
        <img
          src={filename}
          className={classes.pictureSrc}
          id="wizardPicturePreview"
          title=""
          alt="Preview"
        />
        <input type="file" id="wizard-picture" onChange={onChange} name="photo" accept="image/png, image/jpeg, image/jfif" />
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  filename: PropTypes.string,
  onChange: PropTypes.func
};
