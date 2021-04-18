import React, { useState, useRef, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";

import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";

import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { Helmet } from "react-helmet";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, SearchBox } from "@elastic/react-search-ui";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Slide from "@material-ui/core/Slide";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);
const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  hostIdentifier: "host-2376rb",
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useCardStyles = makeStyles(Cardstyles);
const Wardrobe = (props) => {
  const Cardclasses = useCardStyles();
  const classes = useStyles();
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

      setErrorMsg("");
      const { data } = await axios.post(
        `http://localhost:9000/clothes/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("test const { data } = ", data);
      props.history.push("/DetailsClothes?id=" + data._id);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  const [id, setId] = useState(null);

  const handleSelSubmit = async (event) => {
    event.preventDefault();

    try {
      const { sell } = state;

      const data = {
        sell,
        Id,
      };

      setErrorMsg("");
      await axios.post(`http://localhost:9000/clothes/sellClothes`, data);

      props.history.push("/list");
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  
  function deleteClothes(Id){
  axios.post('http://localhost:9000/clothes/delete/' + Id);
  props.history.push('/list');
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
const [filesList, setFilesList] = useState([]);
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/clothes/getAllClothes`
        );
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Elegance App - My Wardrobe</title>
      </Helmet>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <div className={classes.addStore}>
                  <h4 className={classes.cardTitleWhite}>
                    {" "}
                    <b>i want to classify my clothes by</b>
                    <Button
                      color="primary"
                      round
                      onClick={() => setModal(true)}
                    >
                      {" "}
                      size
                    </Button>
                    <Button
                      color="primary"
                      round
                      onClick={() => setModalType(true)}
                    >
                      {" "}
                      type
                    </Button>
                    <Button
                      color="primary"
                      round
                      onClick={() => setModalColor(true)}
                    >
                      {" "}
                      color
                    </Button>
                  </h4>
                  <Button
                    color="primary"
                    round
                    onClick={() => setModalUpload(true)}
                  >
                    {" "}
                    Add Clothes
                  </Button>
                </div>

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
              <SearchProvider>
                <CardBody>
                  <SearchBox />

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
                        onChange={() => setSelectedValue("m")}
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
                        onChange={() => setSelectedValue("l")}
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
                        onChange={() => setSelectedValue("xl")}
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
                        onChange={() => setSelectedValue("xxl")}
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
                        onChange={() => setSelectedValue("xxxl")}
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
                      paper: classes.modalColor,
                    }}
                    open={modalColor}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setModalColor(false)}
                    aria-labelledby="modal-slide-title"
                    aria-describedby="modal-slide-description"
                  >
                    0
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
                    {filesList.length > 0 ? (
                      filesList.map(
                        ({ _id,title }) => (
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
                              <h4>{title}</h4>
                              <button>Details</button><button onClick={() => deleteClothes(_id)} >Delete</button>
                             
                              
             

                             

                            </CardBody>
                            <b>Add to local store<button  onClick={() => setModalSell(true)}> <button
                          
                          
                          
                          onClick={() => setID(_id)}
                        >Sell</button></button>
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
                              <Form.Control
                                type="text"
                                name="sell"
                                value={state.sell || ''}
                                placeholder="add your price"
                                onChange={handleInputChange}
                              />
                            </Form.Group>
          </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                          Submit
        </Button>
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
              </SearchProvider>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </React.Fragment>
  );
};

export default Wardrobe;
