import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Button from 'components/CustomButtons/Button.js';
import React, { Suspense, useState } from "react";
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
  const [valueMin, setValueMin] = useState(50);
  const [valueMax, setValueMax] = useState(150);
  const [modal, setModal] = useState(false);

  const handleInputChange = (value) => {
    setValueMin(value[0]);
    setValueMax(value[1]);
  };


  const classes = useStyless();
  const Cardclasses = useCardStyles();
  const [selectedValue, setSelectedValue] = useState(null);
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




<h3>Price Range</h3>

                    <div className={classes.sliderFilter}>
                      <b>{valueMin}DT </b>
                      <Range
                        min={0}
                        max={500}
                        defaultValue={[50, 150]}
                        ariaLabelGroupForHandles

                        onChange={handleInputChange}

                      />
                      <b>{valueMax}DT </b>
                    </div>

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

                    {Store.map((clothes, index) => (
                      <Clothes clothes={clothes} key={index}></Clothes>
                    ))}
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