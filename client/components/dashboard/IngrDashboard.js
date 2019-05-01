import React, {Component} from 'react';
import {cyan, pink, purple, orange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {AddShoppingCart, ThumbUp, Assessment, Face} from '@material-ui/icons';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SummaryBox from './SummaryBox';
import Product from './Product';
import Header from '../common/header/Header';


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


/*

            <Grid container spacing={24}>
                <Grid item xs>
                    <SummaryBox Icon={AddShoppingCart}
                                color={pink[600]}
                                title="Total Profit"
                                value="1500k"
                    />
                </Grid>

                <Grid item xs>
                    <SummaryBox Icon={ThumbUp}
                                color={cyan[600]}
                                title="Likes"
                                value="4231"
                    />
                </Grid>

                <Grid item xs>
                    <SummaryBox Icon={Assessment}
                                color={purple[600]}
                                title="Sales"
                                value="460"
                    />
                </Grid>

                <Grid item xs>
                    <SummaryBox Icon={Face}
                                color={orange[600]}
                                title="New Members"
                                value="248"
                    />
                </Grid>

            </Grid>

            <Grid container spacing={24}>
                <Grid item xs>
                    <Product data={data.recentProducts}/>
                </Grid>
            </Grid>
*/
class IngrDashboard extends Component {

  render () {
    var storeValue = this.props.storeValue;
    var getValue = this.props.getValue;
    
return (
        
            <div style={{paddingTop:'100px', paddingLeft:'800px', paddingRight:'30px'}}>
                <Card>
                  <CardContent>
                      <span>
                      feeling hungry? <br /><br />
                      </span>
                    
                    <TextField variant="outlined" placeholder="what's in your fridge?" onKeyDown={(e) => getValue(e)} onChange={(e) => storeValue(e)}></TextField> 
                    
                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
            </div>
        

    );
    }
}


export default IngrDashboard;