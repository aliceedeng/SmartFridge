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
    borderRadius:'25px'
};

const clearFridgeStyle = {

    backgroundColor: '#ef56a2',
    border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'25px'
};

const buttonStyleAnd = {
    backgroundColor: '#a86bbc',
    border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'25px'
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
        let facts = (<ul>
            <li> {'avg calories ' + this.props.summaryFacts.calories}</li>
            <li> {'avg protein ' + this.props.summaryFacts.protein + ' (g)'}</li>
            <li> {'avg sugar ' + this.props.summaryFacts.sugar + ' (g)'}</li>
            <li> {'avg sodium ' + this.props.summaryFacts.sodium + ' (mg)'}</li>
            <li> {'avg cholesterol ' + this.props.summaryFacts.cholesterol + ' (mg)'}</li>
        </ul>);
        let actions;

        actions = (<CardActions className={'actions'}>
            <button style={clearFridgeStyle}
                    onClick={(e) => this.props.clearCookbook()}
                    aria-label="Clear items in fridge">
                empty cookbook
            </button>
        </CardActions>);

return (

            <div style={getStyle(this.props.ingredient)}>
                <Card>

                    <CardContent>
                        {facts}
                    </CardContent>
                    <Divider variant='middle' />
                    {actions}
                </Card>
            </div>


        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CookbookSummary);
