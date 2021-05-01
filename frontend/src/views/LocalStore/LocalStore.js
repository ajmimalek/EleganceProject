import { Form, Row, Col } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Slider, { Range } from 'rc-slider';
import CustomInput from "components/CustomInput/CustomInput.js";
import 'rc-slider/assets/index.css';
import Button from "components/CustomButtons/Button.js";
import React, { Suspense, useState, useEffect } from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { isAuth } from "helpers/auth";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Clothes from "components/LocalStore/Clothes.js";
import MyStore from "components/LocalStore/MyStore.js";


import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";
import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import { Helmet } from "react-helmet";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyless = makeStyles(styles);
const useCardStyles = makeStyles(Cardstyles);

export default function LocalStore() {
  
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueALL, setSelectedValueALL] = useState(null);
  const [valueMin, setValueMin] = useState(50);
  const [valueMax, setValueMax] = useState(150);
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalSell, setModalSell] = useState(false);  
  const [checked, setChecked] = React.useState([]);
  const [price, setprice] = useState(null);
  const handleChangePrice = e => {
    const {price, value} = e.currentTarget;
    setprice(value);
  };

  //handle slidre range price
  const handleInputChange = (value) => {
    setSelectedValueALL(500);
    setValueMin(value[0]);
    setValueMax(value[1]);
   console.log(value[0],value[1]);
      const getFilesList = async () => {
        try {
          
          if(selectedValue!=null && checked!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+value[1]+'/'+value[0]+'/'+selectedValue,checked);
            setErrorMsg('');
            setFilesList(data);
          }else if(checked!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothing/`+value[1]+'/'+value[0],checked);
            setErrorMsg('');
            setFilesList(data);    
        }else if(selectedValue!=null){
            const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+value[1]+'/'+value[0]+'/'+selectedValue);
            setErrorMsg('');
            setFilesList(data);
        }else{
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+value[1]+'/'+value[0]);
          setErrorMsg('');
          setFilesList(data);
        }
          
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };
  
      getFilesList();
   
  
  };
  const [state, setState] = useState({
    sell: "",
  });
  const [Id, SetID] = useState(null);

  const handleSelSubmit = async (event) => {
    event.preventDefault();

    try {
      const  sell  = price;

      const data = {
        sell,
        Id,
      };

      setErrorMsg("");
      await axios.post(`http://localhost:9000/clothes/sellClothes`, data);
      const getFilesListUser = async () => {
        try {
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothesUser/`+isAuth()._id);
          setErrorMsg('');
          setFilesListUser(data);
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };
  
      getFilesListUser();
     
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
 
  const classes = useStyless();
  const Cardclasses = useCardStyles();
  const handleToggle = value => {
    setSelectedValueALL(500);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    console.log("checked",checked);
    } else {
      newChecked.splice(currentIndex, 1);
      console.log("nochecked",checked);
    }
    setChecked(newChecked);
console.log(newChecked);
    const getFilesList = async () => {
      try {
        if(selectedValue!=null){
        const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+selectedValue,newChecked);
        setErrorMsg('');
        setFilesList(data);
        if(newChecked.length==0){
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+selectedValue);
          setErrorMsg('');
          setFilesList(data);
        }
      }else{
        const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothing/`+valueMax+'/'+valueMin,newChecked);
        setErrorMsg('');
        setFilesList(data);
        if(newChecked.length==0){
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin);
          setErrorMsg('');
          setFilesList(data);
        }
      }
        
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  };
  
  function deleteClothes(Id){
    axios.post('http://localhost:9000/clothes/delete/' + Id);
    
    const getFilesListUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothesUser/`+isAuth()._id);
        setErrorMsg('');
        setFilesListUser(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
    getFilesListUser();
  }

  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  const [filesListUser, setFilesListUser] = useState([]);

  useEffect(() => {
    const getFilesListUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothesUser/`+isAuth()._id);
        setErrorMsg('');
        setFilesListUser(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesListUser();
  }, []);
 

  return (
    <>

    

      <Helmet>
        <title>Elegance App - Local Store</title>
      </Helmet>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div className={classes.addStore}>
                  <h4 className={Cardclasses.cardTitleWhite}>Ariana's Store </h4>
                  

                    <Button  className={classes.addClothes} color="primary" round onClick={() => setModal(true)}> my store</Button>
                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modal
                      }}
                      open={modal}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setModal(false)}
                      aria-labelledby="modal-slide-title"
                      aria-describedby="modal-slide-description"
                    >
                      <DialogTitle
                        id="classic-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                      >

                        
                          <h4 className={classes.modalTitle}>My store</h4>
                          
                  
                      </DialogTitle>
                      
                    
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}
                      >
                          <b>if you want to add clothes in your store, go to your wardrobe... </b>
   
                         <div className={classes.ClothesList}>

                         {filesListUser.length > 0 ? (
                      filesListUser.map(
                        ({ _id,sell,title,size}) => (
                          <Card className={classes.ClothesItem}>
                            <img
                              className={Cardclasses.cardImgTop}
                              data-src="holder.js/100px180/"
                              alt="100%x180"
                              style={{ height: "175px", width: "100%", display: "block" }}
                              src={'http://localhost:9000/clothes/download/' + _id}
                              data-holder-rendered="true"
                            />
                            <CardBody>
                            <p> {title}<br></br>
                              Price: {sell}DT<br></br>
                              Size: {size}</p>
                              
                              <b>25148752</b>
                              <div className={classes.sliderFilter}>
                              <IconButton aria-label="update" onClick={() => setModalSell(true)} className={classes.margin}>
          <UpdateIcon fontSize="small" onClick={() => SetID(_id)} />
        </IconButton>
        <Dialog
                    classes={{
                      root: classes.center,
                      paper: classes.modalSell
                    }}
                    open={modalSell}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setModalSell(false)}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description"
                  >
                    <DialogTitle
                      id="classic-modal-slide-title"
                      disableTypography
                      className={classes.modalHeader}
                    >

                      <div className={classes.addStore}>

                        <IconButton
                          className={classes.modalCloseButton}
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          onClick={() => setModalSell(false)}
                        >
                          <Close className={classes.modalClose} />
                        </IconButton>
                      </div>
                    </DialogTitle>
                    <DialogContent
                      id="modal-slide-description"
                      className={classes.modalBody}
                    >


<Form className="search-form" onSubmit={handleSelSubmit}>
                        <Row>
                          <Col>
                            <Form.Group controlId="title">
                              
                      <CustomInput
                        labelText="add your new price"
                        name="price"
                       
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => handleChangePrice(e),
                          multiline: true,
                          rows: 2
                        }}
                      />
                            </Form.Group>
          </Col>
                        </Row>
                        <Button color="primary" type="submit" onClick={() => setModalSell(false)}>Update Price</Button>
                       
                      </Form>




                      </DialogContent>
                  </Dialog>

         <IconButton aria-label="delete"  onClick={() => deleteClothes(_id)}className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
                            </CardBody>

                          </Card>

                        )
                      )
                    ) : (
                      <b>                   No clothes found in your local store!</b>
                    )}


</div>

                      </DialogContent>
                    </Dialog>

                  </div>
              </CardHeader>
              <div className={classes.clothes}>

                <Card>
                  <h2>Find what you need: ALL<Radio
                    checked={selectedValueALL === null}
                    onChange={() => {
                    setSelectedValueALL(null);
                    setSelectedValue(null);
                    const getFilesList = async () => {
       try { 
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes`);
          setErrorMsg('');
          setFilesList(data);
        
       } catch (error) {
         error.response && setErrorMsg(error.response.data);
       }
     };
 
     getFilesList();
                                }           }
                    value="ALL"
                    name="radio button demo"
                    aria-label="ALL"
                    icon={<FiberManualRecord className={classes.radioUnchecked} />}
                    checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                    classes={{
                      checked: classes.radio
                    }}
                  />
               </h2>
                   <CardBody>

                    <h3>Size</h3>


                    <Radio
                      checked={selectedValue === "s"}
                      onChange={() => {setSelectedValue("s");
                      setSelectedValueALL(500);
                      const getFilesList = async () => {
         try {
           const Value="s";
           
           if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }
         } catch (error) {
           error.response && setErrorMsg(error.response.data);
         }
       };
   
       getFilesList();
                                  }           }
                      value="s"
                      name="radio button demo"
                      aria-label="S"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />S
        <Radio
                      checked={selectedValue === "m"}
                      onChange={() => {setSelectedValue("m");
                      setSelectedValueALL(500);
                      const getFilesList = async () => {
         try {
           const Value="m";
           console.log("vvvalue",Value);
           if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }
         } catch (error) {
           error.response && setErrorMsg(error.response.data);
         }
       };
   
       getFilesList();
                                  }           }
                      value="m"
                      name="radio button demo"
                      aria-label="M"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />M
      <Radio
                      checked={selectedValue === "l"}
                      onChange={() => {setSelectedValue("l");
                      setSelectedValueALL(500);
                      const getFilesList = async () => {
         try {
           const Value="l";
           if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }
         } catch (error) {
           error.response && setErrorMsg(error.response.data);
         }
       };
   
       getFilesList();
                                  }           }
                      value="l"
                      name="radio button demo"
                      aria-label="L"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />L
        <Radio
                      checked={selectedValue === "xl"}
                      onChange={() => {setSelectedValue("xl");
                      setSelectedValueALL(500);
                      const getFilesList = async () => {
         try {
           const Value="xl";
           console.log("vvvalue",Value);   
            if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }
      
         } catch (error) {
           error.response && setErrorMsg(error.response.data);
         }
       };
   
       getFilesList();
                                  }           }
                      value="xl"
                      name="radio button demo"
                      aria-label="XL"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />XL
      <Radio
                      checked={selectedValue === "xxl"}
                      onChange={() => {setSelectedValue("xxl");
                      setSelectedValueALL(500);
                     const getFilesList = async () => {
        try {
          const Value="xxl";
          console.log("vvvalue",checked.length);
          if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }
      
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };
  
      getFilesList();
                                 }           }
                      value="xxl"
                      name="radio button demo"
                      aria-label="XXL"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />XXL

                    <Radio
                      checked={selectedValue === "xxxl"}
                      onChange={() => {setSelectedValue("xxxl");
                      setSelectedValueALL(500);
                      const getFilesList = async () => {
         try {
           const Value="xxxl";
           console.log("vvvalue",Value);
           if(checked.length!=0){
            const { data } = await axios.post(`http://localhost:9000/clothes/getAllSellClothesByClothingAndSize/`+valueMax+'/'+valueMin+'/'+Value+'/',checked);
            setErrorMsg('');
            setFilesList(data);
          }else{
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
          }    console.log("valueMax",valueMax,"valueMin",valueMin);
           
         } catch (error) {
           error.response && setErrorMsg(error.response.data);
         }
       };
   
       getFilesList();
                                  }           }
                      value="xxxl"
                      name="radio button demo"
                      aria-label="XXXL"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />XXXL




<h3>Price Range</h3>

                   
                      <b>{valueMin}DT </b>
                      <Range
                        min={0}
                        max={500}
                        defaultValue={[50, 150]}
                        ariaLabelGroupForHandles

                        onChange={handleInputChange}

                      />
                      <b>{valueMax}DT </b>
                   

                    <h3>Clothing</h3>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Jacket")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Jacket
<br></br>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Jeane")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Jeane
<br></br>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Shirt")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Shirt
<br></br>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("watch")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> watch<br></br>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Man suit")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Man suit<br></br>

   <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Sweater")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Sweater
                    </CardBody>

                </Card>


                <CardBody>

                  <div className={classes.ClothesList}>

                  {filesList.length > 0 ? (
                      filesList.map(
                        ({ _id,sell,title,size}) => (
                          <Card className={classes.ClothesItem}>
                            <img
                              className={Cardclasses.cardImgTop}
                              data-src="holder.js/100px180/"
                              alt="100%x180"
                              style={{ height: "175px", width: "100%", display: "block" }}
                              src={'http://localhost:9000/clothes/download/' + _id}
                              data-holder-rendered="true"
                            />
                            <CardBody>
                            <p> {title}<br></br>
                              Price: {sell}DT<br></br>
                              Size: {size}</p>
                              
                              <b>25148752</b>
                            </CardBody>

                          </Card>

                        )
                      )
                    ) : (
                      <b>                   No clothes found in local store!</b>
                    )}


                  </div>








                </CardBody>
              </div>

            </Card>
          </GridItem>

        </GridContainer>
      </div>

    </>
  );
}