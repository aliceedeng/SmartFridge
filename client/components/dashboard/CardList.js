import React, {Component} from 'react';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SummaryBox from './SummaryBox';
import Product from './Product';
import Header from '../common/header/Header';

const data = {
    recentProducts: [
        {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
        {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
        {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
        {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ]
};

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


const CardList = ({recipeList}) => {

    const cardsArray = recipeList.map(recipe => (
        <div style={{paddingBottom:'10px'}}>
           <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {recipe.TITLE}
              </Typography>
              <Typography component="p">
                {recipe["DBMS_LOB.SUBSTR(INSTRUCTIONS,2000,1)"]}
              </Typography>
            </CardContent>
          </Card>
        </div>
        
      )
    );
    
    return (

        <div style={{paddingTop:'0px', paddingLeft:'600px', paddingRight:'100px'}}>
          {cardsArray}       
        </div>


    );
};


export default CardList;
