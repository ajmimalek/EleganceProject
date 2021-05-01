import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CardBody from "components/Card/CardBody.js";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import profile from "../../assets/img/faces/marc.jpg";
import React, { useState, useEffect } from "react";
import SearchBar from 'material-ui-search-bar';

import Cardstyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import axios from "axios";
import Store from "../Store.json"
import { isAuth } from "helpers/auth";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/localStoreStyle.js";
import { Helmet } from "react-helmet";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
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
  actionIcon:{
    color: theme.palette.primary,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));
const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(Cardstyles);
export default function FamilyWardrobe() {
  const Cardclasses = useCardStyles();
  const classes = useStyles();
  const classesUser = userStyles();
  const [FollowList, setFollowList] = useState([]);
  const [lendtest, setLend] = useState(null);
  
  function handleSearchUser(FullName) {
    
    const Search = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:9000/user/FindUserFollow/` + isAuth()._id+'/'+FullName);
          setFollowList(data);
      } catch (error) {
        getFollowList();
      }
    };
    Search();
      
  };
  const getFollowList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/user/getUserFollow/` + isAuth()._id);
      setFollowList(data);
      console.log(data);
      data.forEach(element => {
        console.log(element.state, "iddd", element.UserFollowers)

      });

    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
      getFollowList();
  }, []);

  const [userClothesList, setUserClothesList] = useState([]);
  function handleUserClothes(Iduser) {
    try {
     
      const getClothesList = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:9000/clothes/getAllClothes/`+Iduser);
            setUserClothesList(data);
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      getClothesList();
    } catch (error) {
      console.log(error.response);
    }
  };
  function handleLendClothes(Idclothes) {
    try {
     
      const lend = async () => {
        try {
          await axios.post(
            `http://localhost:9000/clothes/lend/`+isAuth()._id+'/'+Idclothes+'/'+isAuth().FullName);
            
      const getClothesList = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:9000/clothes/getAllClothes/`+lendtest);
            setUserClothesList(data);
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      getClothesList();
         
        } catch (error) {
          console.log(error.response);
        }
      };
  
      lend();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
    <Helmet>
      <title>Elegance App - Family Wardrobe</title>
    </Helmet>
    <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
              
              <SearchBar
      onChange={(e) => handleSearchUser(e)}
      onRequestSearch={() => console.log('onRequestSearch')}
     
      style={{
        margin: '0 auto',
        maxWidth: 1400
      }}
    /><br></br>
              <GridList className={classesUser.gridList} cols={7}>
              {  FollowList.map(
                            ({ NameUserFollowing, UserFollowing }) => (
          
          <GridListTile key={NameUserFollowing}>
            
            <img src={profile} alt={NameUserFollowing} />
            
            <GridListTileBar
             
             
              
              actionIcon={
                <IconButton className={classesUser.title} 
                onClick={() => {
                  handleUserClothes(UserFollowing);
                  setLend(UserFollowing);
                }
                }>
                  {NameUserFollowing}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    
              
      </CardHeader>
<div className={classes.ClothesList}>
 {userClothesList.length > 0 ? (
                      userClothesList.map(
                        ({ _id,lend,title,size}) => (
                          
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
                            {lend===_id?(
                              <Button color="primary"
                            onClick={() => {
                              handleLendClothes(_id);
                              setLend(_id);
                            }}
                            >Lend</Button>
                            ):lend?(
                            <Button color="primary" disabled
                            >Lend</Button>):(
                            <Button color="primary"
                            onClick={() => {
                              handleLendClothes(_id);
                              setLend(_id);
                            }}
                            >Lend</Button>)}
                            
                          </CardBody>
                          


                        </Card>

                          )
                          )
                        ) : (
                          <b>                   Select your family member!</b>
                        )}
    
</div>





      </Card>









          </GridItem>
        
        </GridContainer>
 
    </>
  );
}
