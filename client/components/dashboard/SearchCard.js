import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import {clearFridge, removeIngredient, updateSearchType} from '../../actions/ingredientAction';
import {updateSearchFilter, updateSearchFuzzy} from '../../actions/recipeAction';
import Checkbox from '@material-ui/core/Checkbox';

import {
    PROTEIN_FILTER,
    CALORIES_FILTER,
    SODIUM_FILTER,
    CHOLESTEROL_FILTER,
    SUGAR_FILTER, NONE_FILTER
} from '../../constants/searchFilters';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
}

const clearFridgeStyle = {
	backgroundColor: '#ef56a2',
	border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'5px'
}

const buttonStyleAnd = {
	backgroundColor: '#6ba35e',
	border: 'None',
    color: 'White',
    fontSize: '80 px',
    borderRadius:'5px'
}

const chipStyle = {
	marginTop:'5px',
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
            fridgeContents: state.fridge.contents,
            searchType: state.fridge.searchType,
            searchFilter: state.cookbook.searchFilter,
            searchFuzzy: state.cookbook.searchFuzzy
        }
    );
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearFridge: clearFridge,
        updateSearchType: updateSearchType,
        updateSearchFilter: updateSearchFilter,
        removeIngredient: removeIngredient,
        updateSearchFuzzy: updateSearchFuzzy
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
    updateSearchType: function that changes the search type of the fridge store to a new type based on dropdown ('or', 'and', 'sortedOr')
    searchType: current search Type
    searchFilter: includes filtering for special type of recipe search (TODO: allow for multiple filters)
   */

  constructor(props) {
      super(props);
      this.handleFuzzyChange = this.handleFuzzyChange.bind(this);
  }

  handleFuzzyChange(e) {
      this.props.updateSearchFuzzy(!this.props.searchFuzzy);
  }

  render() {
    const storeText = this.props.storeText;
    const getText = this.props.getText
    let fridge;
    let actions;
    let description;
    if (this.props.ingredient) {
    	description = <div style={chipStyle}><button style={clearFridgeStyle}
                    onClick={(e) => this.props.clearFridge()}
                    aria-label="Clear items in fridge">
                     empty fridge
                </button></div>

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

                <Select
		            value={this.props.searchType}
		            onChange={(e) => this.props.updateSearchType(e.target.value)}
		            displayEmpty
		            name="age"
		          >
		            <MenuItem value={'or'}><em>contains at least one ingredient</em></MenuItem>
		            <MenuItem value={'and'}>contains all ingredients</MenuItem>
		            <MenuItem value={'sortedOr'}>most matched</MenuItem>
                    <MenuItem value={'normOr'}>most relevant</MenuItem>
		          </Select>
                <button style={buttonStyleAnd}
                        onClick={() => this.props.handleSearch()}
                        >find me a recipe</button>

            </CardActions>);
    } else {
    	description = <span/>;
        fridge = <span>filter search:  <Select
                    value={this.props.searchFilter}
                    onChange={(e) => this.props.updateSearchFilter(e.target.value)}
                    displayEmpty
                >
                <MenuItem value={NONE_FILTER}><em>no filter</em></MenuItem>
                <MenuItem value={PROTEIN_FILTER}>high protein</MenuItem>
                <MenuItem value={SUGAR_FILTER}>low sugar</MenuItem>
                <MenuItem value={CHOLESTEROL_FILTER}>low cholesterol</MenuItem>
                <MenuItem value={SODIUM_FILTER}>low sodium</MenuItem>
                    <MenuItem value={CALORIES_FILTER}>low calories</MenuItem>
            </Select>     exact keyword:
            <Checkbox
                checked={!this.props.searchFuzzy}
                onChange={this.handleFuzzyChange}
            />
            </span>;
        actions = (<CardActions className={'actions'}>
                
                <button style={buttonStyle} onClick={(e) => this.props.handleRandom()}>surprise me</button>
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
                      {description}
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
