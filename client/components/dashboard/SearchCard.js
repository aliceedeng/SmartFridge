import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

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
}

class SearchCard extends Component {
  /*
  props:
    storeText: Function for updating text field of parent component with most recently entered text in search bar
    getText: Function for querying database for information related to current value in text field
    ingredient: boolean giving whether this search card is for searching ingredients (alternatively recipes)
   */

  render() {
    const storeText = this.props.storeText;
    const getText = this.props.getText;
    
    var cardAdditions

    if (this.props.ingredient) {
    	//will update this with fridge ingredients later
    	cardAdditions = <span></span> 
    } else {
    	cardAdditions = <CardActions>
                  	<button style={buttonStyle}>surprise me</button>
                    <button style={buttonStyle}>high protein</button>
                  </CardActions>
    }

return (

        <div style={getStyle(this.props.ingredient)}>
                <Card>
                  
                  <CardContent>
                      <span>
                          feeling hungry? <br /><br />
                      </span>

                    <TextField variant="outlined" placeholder={getFlavor(this.props.ingredient)}
                               onKeyDown={(e) => getText(e)} onChange={(e) => storeText(e)}></TextField>

                  </CardContent>
                  <Divider variant="middle" />
                  {cardAdditions}
                </Card>
            </div>


    );
  }

}

/*
const SearchCard = () => {

    var getRecipe = this.props.getRecipe;
    return (

        <div style={{paddingTop:'100px', paddingLeft:'30px', paddingRight:'800px'}}>
                <Card>
                	
                  <CardContent>
                      <span>
                      feeling hungry? <br /><br />
                      </span>

                    <TextField variant="outlined" placeholder="enter a dish" onChange={(e) => getRecipe(e)}></TextField>

                  </CardContent>
                  <CardActions>

                  </CardActions>
                </Card>
            </div>


    );
};
*/

export default SearchCard;
