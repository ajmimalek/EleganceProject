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
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from 'axios';
import Footer from "components/FooterLogin/Footer.js";
import { isAuth } from "helpers/auth";
import styles from "assets/jss/material-dashboard-react/views/registerPage";
import image from "assets/img/bg7.jpg";
import { Redirect } from "react-router";
import {
  FormControl,
  FormHelperText,
  Slide,
  InputLabel,
  MenuItem,
  Select,

} from "@material-ui/core";
const useStyles = makeStyles(styles);

// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function DetailsClothes(props) {
  const classes = useStyles();
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
  
  
  const id=requete.id;
  console.log("hhh",id);
  //props.history.push('/DetailsClothes');


  // Form inputs
  const formik = useFormik({
    initialValues: {
      title:"",
        description:"",
        type:"",
        size:"",
        brand:"",
        
      
    },
    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
    
        if (values.pass === values.passConfirm) {
          formik.setFieldValue("textChange", "Starting");
        
          console.log(values.textChange);
          // pass values to backend.
          axios
            .post(`${process.env.REACT_APP_API_URL_CLOTHES}/CompleteNewClothes`, {
            

              title: values.title,
              description: values.description,
              type: values.type,
              size: values.size,
              brand: values.brand,
              id
            
            })
            // Clear values after submitting form
            .then((res) => {
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
              props.history.push('/admin/wardrobe');
              // reset the captcha and delete token.
              
            })
            .catch((err) => {
              // Clear values after Error.
              onSubmitProps.setSubmitting(false);
              onSubmitProps.resetForm();
             
              // reset the captcha and delete token.
            
              console.log(err.response);
            
            });
        } else {
     
        }
    },
  });








  return (
    <div>
           {isAuth() ? null : <Redirect to="/login" />}
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
            <GridItem xs={12} sm={12} md={8}>
              <Card>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Clothes</h4>
                  <p className={classes.cardCategoryWhite}>Complete your new clothes</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        labelText="Title (name)"
                        error={formik.errors.title ? true : false}
                        id="title"
                        
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: formik.handleChange("title"),
                          value: formik.values.title,
                         
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Brand"
                        name="brand"
                        error={formik.errors.brand ? true : false}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: formik.handleChange("brand"),
                          value: formik.values.brand,
                        }}

                      />
                    </GridItem>
                    
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Size
                        </InputLabel>
                        <Select
                          labelId="gender-label"
                          id="size"
                        
                          
                          value={formik.values.size}
                          onChange={formik.handleChange("size")}
                          className={classes.select}
                        >
                          <MenuItem value={"s"}>
                            S
                          </MenuItem>
                          <MenuItem value={"m"}>
                            M
                          </MenuItem>
                          <MenuItem value={"l"}>
                            L
                          </MenuItem>
                          <MenuItem value={"xl"}>
                            XL
                          </MenuItem>
                          <MenuItem value={"xxl"}>
                            XXL
                          </MenuItem>
                          <MenuItem value={"xxxl"}>
                            XXXL
                          </MenuItem>
                        </Select>
                        {formik.errors.size && formik.touched.size && (
                          <FormHelperText className={classes.helper}>{formik.errors.size}</FormHelperText>
                        )}
                      </FormControl>


                    </GridContainer>
                  <GridContainer>
                    
                  <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                          Type
                        </InputLabel>
                        <Select
                          labelId="gender-label"
                          id="type"
                         
                          value={formik.values.type}
                          onChange={formik.handleChange("type")}
                          className={classes.select}
                        >
                          <MenuItem value={"Jacket"}>
                          Jacket
                          </MenuItem>
                          <MenuItem value={"Jeane"}>
                          Jeane
                          </MenuItem>
                        
                          <MenuItem value={"Sweater"}>
                          Sweater
                          </MenuItem>
                          <MenuItem value={"Shirt"}>
                          Shirt
                          </MenuItem>
                          <MenuItem value={"Man suit"}>
                          Man suit
                          </MenuItem>
                         
                        </Select>
                        {formik.errors.type && formik.touched.type && (
                          <FormHelperText className={classes.helper}>{formik.errors.type}</FormHelperText>
                        )}
                      </FormControl>
 <GridItem xs={12} sm={12} md={8}>
                      <CustomInput
                        labelText="Description"
                        name="description"
                        error={formik.errors.description ? true : false}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: formik.handleChange("description"),
                          value: formik.values.description,
                          multiline: true,
                          rows: 3
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit" >Update Clothes</Button>
                </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
const yupSchema = Yup.object({
  title: Yup.string()
    .required("Name is required"),
 
   
    brand: Yup.string().required("brand field cannot be empty"),
    description: Yup.string().required("City field cannot be empty"),
    
    size: Yup.string().required("brand field cannot be empty"),
    type: Yup.string().required("City field cannot be empty"),
  
});
