import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import {clearBook} from '../../actions/recipeAction';
import {CancelTwoTone} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

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

const buttonStyle = {
    backgroundColor: '#f4bf42',
    border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'5px'
};

const buttonStyleAnd = {
    backgroundColor: '#a86bbc',
    border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'25px'
};

const gridStyle = {
    marginTop:'100px',
    marginLeft:'30px'
}

const clearFridgeStyle = {

    backgroundColor: '#ef56a2',
    border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'5px',
    marginLeft:'10px',
    marginTop:'20px',
    marginBottom:'10px'
};



const chipStyle = {
    marginBottom: '5px',
    marginLeft: '5px'
};

const getFlavor = function (isIngredient) {
    if (isIngredient) {
        return `what's in your fridge?`;
    } else {
        return `enter a dish`;
    }
};

const getStyle = function(isIngredient) {
    let style = {
        paddingTop: '100px'
    };
    if (isIngredient) {
        style.paddingRight = '800px';
        style.paddingLeft = '30px';
    } else {
        style.paddingRight = '800px';
        style.paddingLeft = '30px';
    }

    return style;
};


function mapStateToProps(state) {
    return(
        {
            summaryFacts: state.cookbook.summary
        }
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearCookbook: clearBook
    }, dispatch);
}

class CookbookSummary extends Component {
    /*
    props:
      fridgeContents: array giving the current ingredients in the fridge
      clearFridge: function for clearing the contents of the fridge (given no arguments)
      removeIngredient: function for removing a particular ingredient from the fridge (given id as argument)
      storeText: Function for updating text field of parent component with most recently entered text in search bar
      getText: Function for querying database for information related to current value in text field
      ingredient: boolean giving whether this search card is for searching ingredients (alternatively recipes)
     */

    render() {
        let factsTable = <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">average calories</TableCell>
                <TableCell align="right">average protein</TableCell>
                <TableCell align="right">average sugar</TableCell>
                <TableCell align="right">average sodium</TableCell>
                <TableCell align="right">average cholesterol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
                <TableRow>
                  <TableCell align="right">{this.props.summaryFacts.calories.toFixed(2)}</TableCell>
                  <TableCell align="right">{this.props.summaryFacts.protein.toFixed(2) + ' (g)'}</TableCell>
                  <TableCell align="right">{this.props.summaryFacts.sugar.toFixed(2) + ' (g)'}</TableCell>
                  <TableCell align="right">{this.props.summaryFacts.sodium.toFixed(2) + ' (mg)'}</TableCell>
                  <TableCell align="right">{this.props.summaryFacts.cholesterol.toFixed(2) + ' (mg)'}</TableCell>
                </TableRow>
            
            </TableBody>
          </Table>

        
        let actions;

        actions = (<CardActions className={'actions'}>
            <button style={clearFridgeStyle}
                    onClick={(e) => this.props.clearCookbook()}
                    aria-label="Clear items in fridge">
                clear cookbook
            </button>
        </CardActions>);

return (
            <Grid container spacing={24} style={gridStyle}>
                <Grid item xs={7}>
                    
                        <Card>

                            <CardContent>
                                {factsTable}
                            
                                
                            </CardContent>
                            
                            {actions}
                        </Card>
                    
                </Grid>
            </Grid>
            


        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CookbookSummary);
