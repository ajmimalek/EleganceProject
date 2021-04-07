import Check from "@material-ui/icons/Check";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import React , { Suspense, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { Helmet } from "react-helmet";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import Clothes from "components/wardrobe/clothes.js"
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import Upload from "./Upload";
import Store from "../Store.json"
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Slide from "@material-ui/core/Slide";
import Button from 'components/CustomButtons/Button.js';
const useStyles = makeStyles(styles);
const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  hostIdentifier: "host-2376rb"
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Wardrobe() {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalColor, setModalColor] = useState(false);
  
  const [checked, setChecked] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  return (

    <>
    <Helmet>
      <title>Elegance App - My Wardrobe</title>
    </Helmet>
    <div>
    
    
      
        
      
   
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
          <div className={classes.addStore}>
            <h4 className={classes.cardTitleWhite}> </h4>
            <Upload />
            </div>
          </CardHeader>
          <SearchProvider
      
    >
      
          <CardBody>
          
          
          <SearchBox />
         
          <h4 color="red">i want to classify my clothes by</h4>
        <Button color="primary" round onClick={() => setModal(true)}> size</Button>
<Button color="primary" round onClick={() => setModalType(true)}> type</Button>
<Button color="primary" round onClick={() => setModalColor(true)}> color</Button>
                    
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
                      onChange={() => setSelectedValue("m")}
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
                      onChange={() => setSelectedValue("l")}
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
                      onChange={() => setSelectedValue("xl")}
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
                      onChange={() => setSelectedValue("xxl")}
                      value="xxl"
                      name="radio button demo"
                      aria-label="XXL"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />XXL
{"Radio:", console.log(selectedValue)}
                    {"Checkbox:", console.log(checked)}

                    <Radio
                      checked={selectedValue === "xxxl"}
                      onChange={() => setSelectedValue("xxxl")}
                      value="xxxl"
                      name="radio button demo"
                      aria-label="XXXL"
                      icon={<FiberManualRecord className={classes.radioUnchecked} />}
                      checkedIcon={<FiberManualRecord className={classes.radioChecked} />}
                      classes={{
                        checked: classes.radio
                      }}
                    />XXXL





                      </DialogContent>
                    </Dialog>



                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modalType
                      }}
                      open={modalType}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setModalType(false)}
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
                            onClick={() => setModalType(false)}
                          >
                            <Close className={classes.modalClose} />
                          </IconButton>
                        </div>
                      </DialogTitle>
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}
                      >
                        
                        
                        Type



                      </DialogContent>
                    </Dialog>



                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modalColor
                      }}
                      open={modalColor}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={() => setModalColor(false)}
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
                            onClick={() => setModalColor(false)}
                          >
                            <Close className={classes.modalClose} />
                          </IconButton>
                        </div>
                      </DialogTitle>
                      <DialogContent
                        id="modal-slide-description"
                        className={classes.modalBody}
                      >
                        
    
    

    color




                      </DialogContent>
                    </Dialog>


          <div className={classes.ClothesList}>
            
                 
        

{Store.map((clothes, index) => (
  <Clothes clothes={clothes} key={index}></Clothes>
))}



</div>

          </CardBody>
          </SearchProvider>
        </Card>
      </GridItem>
    </GridContainer>
    
   
);


    


  
  </div>
  
  </>
  );
  
}

export { Wardrobe as default };