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
import InputAdornment from "@material-ui/core/InputAdornment";

import axios from 'axios';
import Footer from "components/FooterLogin/Footer.js";
import { Phone } from "@material-ui/icons";
import {

  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import styles from "assets/jss/material-dashboard-react/views/registerPage";
import image from "assets/img/bg7.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

import {
  FormControl,
  Slide,



} from "@material-ui/core";



// Slide animation for forget Password
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export default function DetailsClothes(props) {

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      title: "",
      description:"",
      type:"",
      brand:"",
      size:"",
            
      
      textChange: "Update Clothes",
    },

    validationSchema: yupSchema,
    // Submit data to backend
    onSubmit: (values, onSubmitProps) => {
      console.log(values);
      if (values) {

        formik.setFieldValue("textChange", "Updating Clothes");

        console.log(values.textChange);
        
        // pass values to backend.
        axios
          .post(`${process.env.REACT_APP_WARDROBE_URL}/CompleteNewClothes`, {
            // le
            title: values.title,
            description:values.description,
            type:values.type,
            

            
          })
          // Clear values after submitting form
          .then((res) => {
            onSubmitProps.setSubmitting(false);
            // hedha yfaragh formulaire mb3d submit 
            onSubmitProps.resetForm();
            props.history.push('/admin/wardrobe');    


          })
          .catch((err) => {
            // Clear values after Error.
            onSubmitProps.setSubmitting(false);
            onSubmitProps.resetForm();




          });


      }


      else {
        toast.error("🤔 I think you've forgot something, Check your form");
      }
    },



  });
  console.log("Form values : ", formik.values);



  function getParametresRequete(requeteNavigateur) {
    //On transforme les + en espaces
    requeteNavigateur = requeteNavigateur.split('+').join(' ');
    var parametres = {};
    var elements;
    var expressionReguliere = /[?&]?([^=]+)=([^&]*)/g;
    while (elements = expressionReguliere.exec(requeteNavigateur)) {
      parametres[decodeURIComponent(elements[1])] = decodeURIComponent(elements[2]);
    }
    return parametres;
  }
  //Utilisation
  var requete = getParametresRequete(document.location.search);


  const id = requete.id;

  console.log("hhh", id);
  //props.history.push('/DetailsClothes');
  



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
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Clothes</h4>
                  <p className={classes.cardCategoryWhite}>Complete your new clothes</p>
                </CardHeader>
                <CardBody>
                <form onSubmit={formik.handleSubmit}>
                  <GridContainer>
                    <FormControl className={classes.phone}>
                      <CustomInput
                        labelText="title..."
                        id="title"
                        error={formik.errors.title ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("title"),
                          value: formik.values.title,
                          type: "text",
                          startAdornment: (
                            <InputAdornment position="start">
                             
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.title && formik.touched.title && (
                        <FormHelperText className={classes.helper}>{formik.errors.title}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl className={classes.phone}>
                      <CustomInput
                        labelText="description..."
                        id="description"
                        error={formik.errors.description ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("description"),
                          value: formik.values.description,
                          type: "text",
                          startAdornment: (
                            <InputAdornment position="start">
                              
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.description && formik.touched.descriptions && (
                        <FormHelperText className={classes.helper}>{formik.errors.description}</FormHelperText>
                      )}
                    </FormControl>
                    <FormControl className={classes.mail}>
                      <CustomInput
                        labelText="type..."
                        id="type"
                        error={formik.errors.type ? true : false}
                        formControlProps={{
                          fullWidth: false,
                        }}
                        inputProps={{
                          required: true,
                          onChange: formik.handleChange("type"),
                          value: formik.values.type,
                          type: "text",
                          startAdornment: (
                            <InputAdornment position="start">
                              
                            </InputAdornment>
                          ),
                        }}
                      />
                      {formik.errors.type&& formik.touched.type && (
                        <FormHelperText className={classes.helper}>{formik.errors.type}</FormHelperText>
                      )}
                    </FormControl>







                  </GridContainer>
                  <GridContainer>



                  </GridContainer>
                  </form> 
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit">{formik.values.textChange}</Button>
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


const yupSchema = Yup.object({
  title: Yup.string()

    .required("title is required"),
    type: Yup.string()

    .required("title is required"),
   
});