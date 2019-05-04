import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import {clearFridge, removeIngredient} from '../../actions/ingredientAction';
import {CancelTwoTone} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton'
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
}

const clearFridgeStyle = {

	backgroundColor: '#ef56a2',
	border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'25px'
}

const buttonStyleAnd = {
	backgroundColor: '#a86bbc',
	border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'25px'
}



const chipStyle = {
	marginBottom: '5px',
	marginLeft: '5px'
}

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
    style.paddingRight = '30px';
    style.paddingLeft = '800px';
  } else {
    style.paddingRight = '800px';
    style.paddingLeft = '30px';
  }

  return style;
};


function mapStateToProps(state) {
    return(
        {
            fridgeContents: state.fridge.contents
        }
    );
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearFridge: clearFridge,
        removeIngredient: removeIngredient
    }, dispatch);
}

class SearchCard extends Component {
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
    const storeText = this.props.storeText;
    const getText = this.props.getText;
    let fridge;
    let actions;
    if (this.props.ingredient) {

        fridge = this.props.fridgeContents.map((data) => (
        		<Chip key={data.id} 
	        		label={data.name} 
	        		onDelete={(e) => this.props.removeIngredient(data.id)} 
	        		style={chipStyle}
	        		/>
        ));


        /*
        this.props.fridgeContents.map(ingredient => (
            <li onClick={(e) => this.props.removeIngredient(ingredient.id)}
                key={ingredient.id}
            >{ingredient.name}</li>
        ));
        */
        
        actions = (<CardActions className={'actions'}>
                <button style={clearFridgeStyle}
                    onClick={(e) => this.props.clearFridge()}
                    aria-label="Clear items in fridge">
                     empty fridge
                </button>
                <button style={buttonStyle}
                        onClick={(e) => this.props.handleSearch('or')}
                        >find me a recipe (one fridge ingredient)</button>
                <button style={buttonStyleAnd}
                        className='button'
                        onClick={(e) => this.props.handleSearch('and')}
                        >find me a recipe (all fridge ingredients)</button>
            </CardActions>);
    } else {
        fridge = <span/>;
        actions = (<CardActions className={'actions'}>
                  	<button style={buttonStyle}>surprise me</button>
                    <button style={buttonStyle}>high protein</button>
                  </CardActions>);
    }
return (

        <div style={getStyle(this.props.ingredient)}>
                <Card>
                  
                  <CardContent>
                      <span>
                          feeling hungry? <br /><br />
                      </span>

                    <TextField variant="outlined" placeholder={getFlavor(this.props.ingredient)}
                               onKeyDown={(e) => getText(e)} onChange={(e) => storeText(e)}/>
                      <br /><br />

                      {fridge}
                  </CardContent>
                  <Divider variant='middle' />
                    {actions}
                </Card>
            </div>


    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCard);
