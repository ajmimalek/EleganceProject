import {
  boxShadow,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.js";
import { rotateIn } from "react-animations";
import imagesStyles from "assets/jss/material-dashboard-react/components/imagesStyles";

const localStoreStyle = (theme) => ({
  ...imagesStyles,
  contextImage: {
    marginRight: "6%",
    marginLeft: "5%",
    "&:hover": {
      animation : "$rotateIn 2s",
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
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: whiteColor
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  ClothesItem: {
    width: "176px",
    "margin-right": "15px",
    marginTop: "20px"
  },
  ClothesItemStore: {
    width: "250px",
    "margin-right": "15px",
    marginTop: "20px"
  },
  filterLocalStore: {
    width: "345px",
    "margin-right": "15px",
    marginTop: "20px"
   
  },
  ClothesList: {
    
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
clothes:{
  display: "flex",
  flexWrap: "no wrap",
  flexDirection: "row",
},
sliderFilter:{
    width: "290px",
    display: "flex",
    flexWrap: "no wrap",
    flexDirection: "row",
  },
  addClothes:{
    float: "right",
  }
});

export default localStoreStyle;
