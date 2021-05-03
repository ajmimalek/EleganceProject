import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import DeleteIcon from '@material-ui/icons/Delete';

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";

import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { Helmet } from "react-helmet";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";


import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Slide from "@material-ui/core/Slide";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { isAuth } from "helpers/auth";
import { Redirect } from "react-router";
import swal from 'sweetalert';
import SearchBar from 'material-ui-search-bar';
import { Tooltip } from '@material-ui/core';
import Color from "../../assets/img/couleur.jpg";
import Toolstyles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import Size from "../../assets/img/size-guide.png";
import Type from "../../assets/img/type.jpg";
import CardIcon from 'components/Card/CardIcon';
import { Language } from '@material-ui/icons';

const useToolsStyles = makeStyles(Toolstyles);

const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useCardStyles = makeStyles(Cardstyles);
const Wardrobe = (props) => {
  const Cardclasses = useCardStyles();
  const classes = useStyles();
  const classe = useToolsStyles();
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalColor, setModalColor] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const [modalSell, setModalSell] = useState(false);
  const [Id, setID] = useState(null);

  const [checked, setChecked] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    sell: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const [price, setprice] = useState(null);
  const handleChangePrice = e => {
    const { price, value } = e.currentTarget;
    setprice(value);
  };
  
  const handleToggle = value => {
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
    const clothing = async () => {
      try {
        
       
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL_CLOTHES}/getClothesByClothing/`+ isAuth()._id,newChecked);
        setErrorMsg('');
        setFilesList(data);
        if(newChecked.length==0){
          getFilesList();
        }
        
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    clothing();
  };
  

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png|jfif)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("idUser", isAuth()._id);



      setErrorMsg("");
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL_CLOTHES}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      );
      console.log("test const { data } =", data);
      props.history.push("/DetailsClothes?id=" + data._id);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const [id, setId] = useState(null);

  const handleSelSubmit = async (event) => {
    event.preventDefault();

    try {
      const sell = price;

      const data = {
        sell,
        Id,
      };

      setErrorMsg("");
      await axios.post(`${process.env.REACT_APP_API_URL_CLOTHES}/sellClothes`, data);

      props.history.push("/list");
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  function deleteClothes(Id) {
    swal({
      title: "Are you sure you want to delete this suit ?",
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.post('http://localhost:9000/clothes/delete/' + Id);
          const getFilesList = async () => {
            try {
              const { data } = await axios.get(
                `${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/` + isAuth()._id
              );
              setErrorMsg("");
              setFilesList(data);
            } catch (error) {
              error.response && setErrorMsg(error.response.data);
            }
          };
          swal("Poof! Your suit has been deleted!", {
            icon: "success",
          });
          getFilesList();
        } else {
          swal("Your suit is safe!");
        }
      });
  }

  /*  const handleDelete = async (event) => {
      event.preventDefault();
  
      try {
  
  
  
        await axios.post(`http://localhost:9000/clothes/sellClothes`, data);
        props.history.push('/list');
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
  */
 //handleSearchClothes
 function handleSearchClothes(clothes){
  const search = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_CLOTHES}/getSearchClothes/` + isAuth()._id+'/'+clothes
    );
    setErrorMsg("");
    setFilesList(data);
  } catch (error) {
    getFilesList();
  }
};

search();
 }
 const getFilesList = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/` + isAuth()._id
    );
    setErrorMsg("");
    setFilesList(data);
  } catch (error) {
    error.response && setErrorMsg(error.response.data);
  }
};
  const [filesList, setFilesList] = useState([]);
  useEffect(() => {
    

    getFilesList();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Elegance App - My Wardrobe</title>
      </Helmet>
      <div>
        {isAuth() ? null : <Redirect to="/login" />}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">

                <h4 className={classes.cardTitleWhite}>
                  {" "}
                    Filter by
                  </h4>
                <Tooltip
                  id="tooltip-top"
                  title="Color"
                  placement="top"
                  classes={{ tooltip: classe.tooltip }}
                >
                  <img
                    src={Color}
                    alt="Choose from our colors"
                    onClick={() => setModalColor(true)}
                    className={
                      classes.imgRaised +
                      " " +
                      classes.imgRoundedCircle +
                      " " +
                      classes.imgFluid +
                      " " +
                      classes.contextImage
                    }
                  />
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Size"
                  placement="top"
                  classes={{ tooltip: classe.tooltip }}
                >
                  <img
                    src={Size}
                    alt="Choose from those sizes"
                    onClick={() => setModal(true)}
                    className={
                      classes.imgRaised +
                      " " +
                      classes.imgRoundedCircle +
                      " " +
                      classes.imgFluid +
                      " " +
                      classes.contextImage
                    }
                  />
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Type"
                  placement="top"
                  classes={{ tooltip: classe.tooltip }}
                >
                  <img
                    src={Type}
                    alt="Choose from types"
                    onClick={() => setModalType(true)}
                    className={
                      classes.imgRaised +
                      " " +
                      classes.imgRoundedCircle +
                      " " +
                      classes.imgFluid +
                      " " +
                      classes.contextImage
                    }
                  />
                </Tooltip>
                <Button
                  className={classes.addClothes}
                  color="primary"
                  round
                  onClick={() => setModalUpload(true)}
                >
                  {" "}
                    Add Clothes
                  </Button>


                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modalUpload,
                  }}
                  open={modalUpload}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setModalUpload(false)}
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
                        onClick={() => setModalUpload(false)}
                      >
                        <Close className={classes.modalClose} />
                      </IconButton>
                    </div>
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    <Form className="search-form" onSubmit={handleOnSubmit}>
                      {errorMsg && <p className="errorMsg">{errorMsg}</p>}

                      <div className="upload-section">
                        <Dropzone
                          onDrop={onDrop}
                          onDragEnter={() => updateBorder("over")}
                          onDragLeave={() => updateBorder("leave")}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div
                              {...getRootProps({ className: "drop-zone" })}
                              ref={dropRef}
                            >
                              <input {...getInputProps()} />

                              <p>Drag and drop a clothes OR click here to select a clothes</p>


                              {file ? (
                                <div>
                                  <strong>Selected clothes</strong>: {file.name}
                                </div>

                              ) : (<div>
                                <strong>-----------------------------------------------------</strong>
                              </div>)}

                            </div>
                          )}
                        </Dropzone>
                        {previewSrc ? (
                          isPreviewAvailable ? (
                            <div className="image-preview">
                              <img
                                className="preview-image"
                                src={previewSrc}
                                alt="Preview"
                              />
                            </div>
                          ) : (
                            <div className="preview-message">
                              <p>No preview available for this clothes</p>
                            </div>
                          )
                        ) : (
                          <div className="preview-message">
                            <p></p>
                          </div>
                        )}
                      </div>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardBody>
                {/**Here */}
                <SearchBar
      onChange={(e) => handleSearchClothes(e)}
      onRequestSearch={() => console.log('onRequestSearch')}
     
      style={{
        margin: '0 auto',
        maxWidth: 1400
      }}
    />
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal,
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
                  >Size
                      </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    <Radio
                      checked={selectedValue === "s"}
                      onChange={() => {setSelectedValue("s");
                      const getFilesList = async () => {
                        try {
                          const Value="s";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                      value="s"
                      name="radio button demo"
                      aria-label="S"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      S
                      <Radio
                      checked={selectedValue === "m"}
                      onChange={() => {setSelectedValue("m");
                      const getFilesList = async () => {
                        try {
                          const Value="m";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                    value="m"
                      name="radio button demo"
                      aria-label="M"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      M
                      <Radio
                      checked={selectedValue === "l"}
                      onChange={() => {setSelectedValue("l");
                      const getFilesList = async () => {
                        try {
                          const Value="l";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                      value="l"
                      name="radio button demo"
                      aria-label="L"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      L
                      <Radio
                      checked={selectedValue === "xl"}
                      onChange={() => {setSelectedValue("xl");
                      const getFilesList = async () => {
                        try {
                          const Value="xl";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                      value="xl"
                      name="radio button demo"
                      aria-label="XL"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      XL
                      <Radio
                      checked={selectedValue === "xxl"}
                      onChange={() => {setSelectedValue("xxl");
                      const getFilesList = async () => {
                        try {
                          const Value="xxl";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                      value="xxl"
                      name="radio button demo"
                      aria-label="XXL"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      XXL
                      {("Radio:", console.log(selectedValue))}
                    {("Checkbox:", console.log(checked))}
                    <Radio
                      checked={selectedValue === "xxxl"}
                      
                      onChange={() => {setSelectedValue("xxxl");
                      const getFilesList = async () => {
                        try {
                          const Value="xxxl";
                         
                          const { data } = await axios.get(`${process.env.REACT_APP_API_URL_CLOTHES}/getAllClothes/`+Value+'/'+ isAuth()._id);
                          setErrorMsg('');
                          setFilesList(data);
                          
                          
                        } catch (error) {
                          error.response && setErrorMsg(error.response.data);
                        }
                      };
                  
                      getFilesList();
                    }}
                      value="xxxl"
                      name="radio button demo"
                      aria-label="XXXL"
                      icon={
                        <FiberManualRecord
                          className={classes.radioUnchecked}
                        />
                      }
                      checkedIcon={
                        <FiberManualRecord className={classes.radioChecked} />
                      }
                      classes={{
                        checked: classes.radio,
                      }}
                    />
                      XXXL
                    </DialogContent>
                </Dialog>

                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modalType,
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
                   Clothing
                  </DialogTitle>
                  <DialogContent
                    id="modal-slide-description"
                    className={classes.modalBody}
                  >
                    
                    
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Jacket")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Jacket

                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Jeane")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Jeane

                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Shirt")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Shirt
                 <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Man suit")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> suit

   <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle("Sweater")}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    /> Sweater

                    </DialogContent>
                </Dialog>

                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modalColor,
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
                    Color
                    </DialogContent>
                </Dialog>

                <div className={classes.ClothesList}>
                  {filesList.length > 0 ? (
                    filesList.map(
                      ({ _id, title ,size}) => (
                        <Card className={classes.ClothesItem}>
                          <img
                            className={Cardclasses.cardImgTop}
                            data-src="holder.js/100px180/"
                            alt="100%x180"
                            style={{ height: "175px", width: "100%", display: "block" }}
                            src={'http://localhost:9000/clothes/download/' + _id}
                            data-holder-rendered="true"
                          />
                          <CardHeader color="primary" icon>
                            <CardIcon color="primary">
                            <IconButton aria-label="delete" onClick={() => deleteClothes(_id)}>
                              <DeleteIcon />
                            </IconButton>
                            </CardIcon>
                          </CardHeader>
                          
                          <CardBody>
                            <h4>{title}</h4>Size: {size}
                            <Button>Details</Button>
                          </CardBody>
                          <b>Add to local store
                            <IconButton color="secondary" onClick={() => setModalSell(true)} aria-label="add to shopping cart">
                              <AddShoppingCartIcon onClick={() => setID(_id)} />
                            </IconButton>

                          </b>

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
                                        labelText="add your price"
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
                                <Button color="primary" type="submit" onClick={() => setModalSell(false)}>Add Price</Button>

                              </Form>




                            </DialogContent>
                          </Dialog>

                        </Card>

                      )
                    )

                  ) : (
                    <b> No clothes found. Please add some.</b>
                  )}
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </React.Fragment>
  );
};

export default Wardrobe;
