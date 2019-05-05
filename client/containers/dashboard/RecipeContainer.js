import React, { Component } from 'react';
import axios from 'axios';


// Import custom components
import SearchCard from '../../components/dashboard/SearchCard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

//styling for the div containing all the recipe cards
const divStyle = {
    paddingTop:'20px',
    paddingLeft:'30px',
    paddingRight:'30px'
}

class RecipeDashboard extends Component {
    /*
     * Component encapsulating functionality related to recipe search, including recipe search bar and
     * card of returned recipes
     *
     * Props: None
     *
     * State:
     *  recipes: array of recipes to display in CardList
     *  hasRecipes: boolean for whether recipes should be displayed
     *
     * Fields/Functions:
     *  searchText: current record of what has been typed
     *  storeText: updates searchText to reflect current search value
     *  getText: queries server for recipes matching searchText
     */

    constructor(props) {
        super(props);
        this.storeText = this.storeText.bind(this);
        this.getText = this.getText.bind(this);
        this.searchText = '';
        this.searchFilter = 'NONE';
        this.updateSearchFilter = this.updateSearchFilter.bind(this);
        // this.recipes = new Array(10);
        this.state = { recipes: [], hasRecipes: false };
    }

    updateSearchFilter(newFilter) {
      console.log(this.searchFilter);
      this.searchFilter = newFilter;
    }

    // Updates search text based on latest user action
    storeText(newText) {
        this.searchText = newText.target.value;
    }

    // queries server for recipes
    // NOTE: May be updated to specify page length
    getText(newPress) { // key press: Enter
        if (newPress.keyCode === 13) {
            const recipe = this.searchText;
            // MODIFY AS NECESSARY USING ARG
            const length = 20;
            // add additional filtering
            var request = ''
            console.log(this.searchFilter);
            if (this.searchFilter == 'PROTEIN')
                request = '/api/recipe/protein/' + recipe + '?len=' + length;
            else if (this.searchFilter == 'SUGAR')
                request = '/api/recipe/sugar/' + recipe + '?len=' + length;
            else // TODO
                request = '/api/recipe/name/' + recipe + '?len=' + length;
            console.log(request);
            axios.get(request)
                .then(res => {
                    this.setState({ recipes: res.data, hasRecipes: true });
                });
        }
    }


    render() {
        let display;
        display = <SearchCard storeText={this.storeText} getText={this.getText} ingredient={false} updateSearchFilter={this.updateSearchFilter}/>;

        let recipeCards;
        if (this.state.hasRecipes) {
            recipeCards = <CardList resultsData={this.state.recipes} ingredient={false} cookbook={false}/>;
        }

return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div>
                        {display}
                    </div>
                    <div style= {divStyle}>

                                { recipeCards }


                    </div>
                </div>
            </div >

        );
    }

}

export default RecipeDashboard;
