import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from 'components/CustomButtons/Button.js';
import React, { Suspense, useState, useEffect } from "react";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Store from "../Store.json"
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
import DialogActions from "@material-ui/core/DialogActions";
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
  const [valueMin, setValueMin] = useState(50);
  const [valueMax, setValueMax] = useState(150);
  const [modal, setModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  //handle slidre range price
  const handleInputChange = (value) => {
    setValueMin(value[0]);
    setValueMax(value[1]);
   console.log(value[0],value[1]);
      const getFilesList = async () => {
        try {
          if(selectedValue==null){
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+value[1]+'/'+value[0]);
          setErrorMsg('');
          setFilesList(data);
        }else{
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+value[1]+'/'+value[0]+'/'+selectedValue);
          setErrorMsg('');
          setFilesList(data);
        }
          
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      };
  
      getFilesList();
   
  
  };


  const classes = useStyless();
  const Cardclasses = useCardStyles();
  const [checked, setChecked] = React.useState([]);
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);

    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  
  const [filesList, setFilesList] = useState([]);
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
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
                  <p >

                    <Button color="primary" round onClick={() => setModal(true)}> my store</Button>
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

                        <div className={classes.addStore}>
                          <h4 className={classes.modalTitle}>My store</h4>
                          <b>to add clothing to your store click on the link</b>
                          <IconButton
                            className={classes.modalCloseButton}
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => setModal(false)}
                          >
                            <Close className={classes.modalClose} />
                          </IconButton>
                        </div>
                      </DialogTitle>
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}
                      >
                         <div className={classes.ClothesList}>

{Store.map((clothes, index) => (
  <MyStore clothes={clothes} key={index}></MyStore>
))}
</div>

                      </DialogContent>
                    </Dialog>

                  </p></div>
              </CardHeader>
              <div className={classes.clothes}>

                <Card>
                  <h2>Find what you need</h2>
                  <CardBody>

                    <h3>Size</h3>


                    <Radio
                      checked={selectedValue === "s"}
                      onChange={() => setSelectedValue("s")}
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
                      const getFilesList = async () => {
         try {
           const Value="m";
           console.log("vvvalue",Value);
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
           console.log("valueMax",valueMax,"valueMin",valueMin);
           console.log("data",data);
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
                      const getFilesList = async () => {
         try {
           const Value="l";
           console.log("vvvalue",Value);
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
           console.log("valueMax",valueMax,"valueMin",valueMin);
           console.log("data",data);
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
                      const getFilesList = async () => {
         try {
           const Value="xl";
           console.log("vvvalue",Value);
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
           console.log("valueMax",valueMax,"valueMin",valueMin);
           console.log("data",data);
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
                     const getFilesList = async () => {
        try {
          const Value="xxl";
          console.log("vvvalue",Value);
          const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
          setErrorMsg('');
          setFilesList(data);
          console.log("valueMax",valueMax,"valueMin",valueMin);
          console.log("data",data);
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
                      const getFilesList = async () => {
         try {
           const Value="xxxl";
           console.log("vvvalue",Value);
           const { data } = await axios.get(`http://localhost:9000/clothes/getAllSellClothes/`+valueMax+'/'+valueMin+'/'+Value);
           setErrorMsg('');
           setFilesList(data);
           console.log("valueMax",valueMax,"valueMin",valueMin);
           console.log("data",data);
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
                      onClick={() => handleToggle("shart")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> shart
<br></br>
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("watch")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> watch


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
                      <b>                   No clothes found. Please add some.</b>
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