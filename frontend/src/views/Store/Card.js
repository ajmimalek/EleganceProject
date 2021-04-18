import React from 'react';
import './Card.css';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import elegance from "assets/img/Elegance Logo.png";
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/CustomButtons/Button.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }));

function Card ({title,imagesrc,body},props){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    
const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
    setOpen(false);
  };

    return(
        <div className='card-container'>
            <div className="image-container">
                <img src={imagesrc}/>

            </div>
            <div className="card-content">
                     <div className="card-title">
                            <h2><strong>{title}</strong></h2>  

                     </div>
                        <div className="card-body">
                             <p>{body}</p> 

                        </div>
            </div>
            <div className="btn">
                <button onClick={handleClickOpen} type="button" >
                    <a >
                        view more 
                    </a>
                </button>

            </div>
            <Dialog  fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                  <AppBar className={classes.appBar}>
                      <Toolbar>
                         <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                             <CloseIcon />
                               </IconButton>
                                  <Typography variant="h6" className={classes.title}>
                                       <img className="elegance" alt="elegance emoji" src={elegance} />
                                     </Typography>
                      </Toolbar>
                     </AppBar>
          </Dialog>

            

        </div>
    )
}
export default Card ;