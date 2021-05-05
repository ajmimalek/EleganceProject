import React from "react";
//import "./Card.css";
import { makeStyles } from '@material-ui/core/styles';
//import PropTypes from "prop-types";
import styled from "styled-components";




const CardContainer = styled.div`
  width: 230px;
  overflow: hidden;
  box-shadow: 0px 0px 15px -5px;
  transition: 0.5s;
  animation: ease-in;
  & :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
  }
 
}

`;
const CardImage = styled.div`
& img{
  overflow: hidden;
  height: 240px;
}

`;
const CardContent = styled.div`

  margin: 1rem;
  margin-top: 0.5rem;

`;
const CardTitle = styled.div`
& h3{
  margin: 0;
  padding: 0;
}

  margin-bottom: 0.5rem;

`;
const CardBody = styled.div`
& p{
  margin: 0;
  padding: 0;
}

`;
const CardBtn = styled.div`

  display: flex;
  justify-content: center;

& button{
  padding: 0.5rem;
  background-color:#BF1922;
  border:none;
  transition: 0.2s;
  margin-bottom: 0.5rem;
  border-radius: 3px;
   :hover{
    background: #e32832;
    transform:scale(1.1);
  }
  text-transform: uppercase;
  color:#02174c ;
  text-decoration: none;
  font-weight: bold;
  
}`;







const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));



export default function Card({ title, imagesrc, body, onClick }, props) {
  const classes = useStyles();

  

  return (
    <CardContainer>
      <CardImage>
        <img src={imagesrc} />
      </CardImage>
      <CardContent>
        <CardTitle>
          <h3>
            <strong>{title}</strong>
          </h3>
        </CardTitle>
        <CardBody>
          <p>
            <strong>{body}</strong>
          </p>
        </CardBody>
      </CardContent>
      <CardBtn>
        <button onClick={onClick} type="button">
        view more
        </button>
      </CardBtn>
     
    </CardContainer>
  );
 
}
