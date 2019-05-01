import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
                  <CardActions>

                  </CardActions>
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
