
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import React from "react";
import Store from "../Store.json"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";
import { Helmet } from "react-helmet";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import ClothesChange from "components/FamilyWardrobe/ClothesChange.js";
const userStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ10g0ghYRDZ8Lk3ZHjT8EozD2SgmIxkAQQSA&usqp=CAU',
    title: 'Dali'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'Moha'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ10g0ghYRDZ8Lk3ZHjT8EozD2SgmIxkAQQSA&usqp=CAU',
    title: 'hadidi'
  },{
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'Rzoga'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'Aloulo'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'mahmoud'
  },{
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'Hrouz'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUyPVcIDmUC_W3wQ5Hz-TNKdY0Z0oqvOPtg&usqp=CAU',
    title: 'hsouna'
  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ10g0ghYRDZ8Lk3ZHjT8EozD2SgmIxkAQQSA&usqp=CAU',
    title: 'Bohmid'
  }
  ];
const useStyles = makeStyles(styles);

export default function FamilyWardrobe() {
  const classes = useStyles();
  const classesUser = userStyles();
  return (
    <>
    <Helmet>
      <title>Elegance App - Family Wardrobe</title>
    </Helmet>
    <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
              
              <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={tileData.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search your member family"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
 
            

              <GridList className={classesUser.gridList} cols={7}>
              {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
             
              /*
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classesUser.title} />
                </IconButton>
              }*/
            />
          </GridListTile>
        ))}
      </GridList>
    
              
      </CardHeader>
<div className={classes.ClothesList}>

  {Store.map((clothes, index) => (
    <ClothesChange clothes={clothes} key={index}></ClothesChange>
  ))}
</div>





      </Card>









          </GridItem>

        </GridContainer>
 
    </>
  );
}
