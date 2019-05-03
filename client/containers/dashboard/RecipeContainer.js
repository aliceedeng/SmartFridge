import React, { Component } from 'react';
import axios from 'axios';


// Import custom components
import SearchCard from '../../components/dashboard/SearchCard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';

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
        // this.recipes = new Array(10);
        this.state = { recipes: [], hasRecipes: false };
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
            let request = '/api/recipe/name/' + recipe + '?len=' + length;
            axios.get(request)
                .then(res => {
                    this.setState({ recipes: res.data, hasRecipes: true });
                });
        }
    }


    render() {
        let display;
        display = <SearchCard storeText={this.storeText} getText={this.getText} ingredient={false} />;

        let recipeCards;
        if (this.state.hasRecipes) {
            recipeCards = <CardList recipeList={this.state.recipes} />;
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
                    <div>
                        { recipeCards }
                    </div>
                </div>
            </div >

        );
    }

}

export default RecipeDashboard;