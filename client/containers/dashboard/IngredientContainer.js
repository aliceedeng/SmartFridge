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
     *  recipes: array of recipes to display in CardList when user has searched for recipes
     *  ingredients: array of ingredients to display in CardList when the user has searched for an ingredient
     *  fridge: array of ingredients the user has currently selected
     *  hasRecipeResults: boolean for whether recipes should be displayed
     *  hasIngredientResults: boolean for whether ingredients should be displayed
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
        this.state = {
            ingredients: [],
            recipes: [],
            fridge: [],
            hasRecipeResults: false,
            hasIngredientResults: false,
        };
    }

    // Updates search text based on latest user action
    storeText(newText) {
        this.searchText = newText.target.value;
    }

    // queries server for recipes
    // NOTE: May be updated to specify page length
    getText(newPress) { // key press: Enter
        if (newPress.keyCode === 13) {
            const ingredient = this.searchText;
            // MODIFY AS NECESSARY USING ARG
            const length = 20;
            let request = '/api/ingredient/name/' + ingredient + '?len=' + length;
            axios.get(request)
                .then(res => {
                    this.setState({ recipes: res.data, hasRecipes: true });
                });
        }
    }


    render() {
        let display;
        display = <SearchCard storeText={this.storeText} getText={this.getText} ingredient={true} />;

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
