import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import axios from 'axios';
import Footer from "components/FooterLogin/Footer.js";


import styles from "assets/jss/material-dashboard-react/views/loginPage";

import image from "assets/img/bg7.jpg";
import {
  Slide,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function getParametresRequete(requeteNavigateur)
{
 //On transforme les + en espaces
 requeteNavigateur = requeteNavigateur.split('+').join(' ');
 var parametres = {};
 var elements;
 var expressionReguliere = /[?&]?([^=]+)=([^&]*)/g;
 while (elements = expressionReguliere.exec(requeteNavigateur))
 {
 parametres[decodeURIComponent(elements[1])] = decodeURIComponent(elements[2]);
 }
 return parametres;
}
//Utilisation
var requete = getParametresRequete(document.location.search);


export default function DetailsClothes() {
  console.log(requete.id);
  const classes = useStyles();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [type, setType] = useState(null);
  const [size, setSize] = useState(null);
  const [brand, setBrand] = useState(null);
  const handleChange = e => {
    const {title, value} = e.currentTarget;
    setTitle({[title]: value});
};
const handleChangeDescription = e => {
  const {description, value} = e.currentTarget;
  setDescription({[description]: value});
};
const handleChangeType = e => {
  const {type, value} = e.currentTarget;
  setType({[type]: value});
};
const handleChangeSize = e => {
  const {size, value} = e.currentTarget;
  setSize({[size]: value});
};
const handleChangeBrand = e => {
  const {brand, value} = e.currentTarget;
  setBrand({[brand]: value});
};
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("test", title);
    try {


const id=requete.id;

      const data = {
        title,
        description,
        type,
        size,
        brand,
        id

      };
      console.log("test", data);

      await axios.post(`http://localhost:9000/clothes/sellClothes`, data);

    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem onSubmit={handleOnSubmit} xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Clothes</h4>
                  <p className={classes.cardCategoryWhite}>Complete your new clothes</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Title (name)"
                    
                        id="title"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChange(e)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Brand"
                        name="brand"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChangeBrand(e)
                        }}

                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Size"
                        name="size"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChangeSize(e)
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Type"
                        name="type"
                       
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChangeType(e)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Description"
                        name="description"
                       
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChangeDescription(e),
                          multiline: true,
                          rows: 3
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" onClick={handleOnSubmit}>Update Clothes</Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
