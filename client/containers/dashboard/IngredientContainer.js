import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


// Import custom components
import SearchCard from '../../components/dashboard/SearchCard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';

class IngredientDashboard extends Component {
    /*
     * Component encapsulating functionality related to recipe search, including recipe search bar and
     * card of returned recipes
     *
     * Props:
     *  fridge: array of ingredients the user has currently selected, made available through store
     *
     * State:
     *  recipes: array of recipes to display in CardList when user has searched for recipes
     *  ingredients: array of ingredients to display in CardList when the user has searched for an ingredient
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
            hasRecipeResults: false,
            hasIngredientResults: false,
        };
    }

    /*
     * Adds an item to the fridge with a given name and id -- not sure this
     * should even be here with redux refactoring
     *
     * DEPRECATED
     */
    addToFridge(name, id) {
        const ingredient = {
            name: name,
            id: id
        };
        this.setState(state => ({
            ingredients:[state.ingredients, ingredient]
        }));
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
            // MODIFY AS NECESSARY WITH STATE VALUE / PROPS VALUE
            const length = 50;
            let request = '/api/ingredient/name/' + ingredient + '?len=' + length;
            axios.get(request)
                .then(res => {
                    this.setState({
                        ingredients: res.data,
                        hasIngredientResults: true,
                        hasRecipeResults: false,
                        recipes: []
                    });
                });
        }
    }


    render() {
         let display;
        display = <SearchCard
            storeText={this.storeText}
            getText={this.getText}
            ingredient={true}
        />;

        let resultsCards;
        if (this.state.hasRecipeResults) {
            resultsCards = <CardList
                resultsData={this.state.recipes}
                ingredient={false} />;
        }
        if (this.state.hasIngredientResults) {
            resultsCards = <CardList resultsData={this.state.ingredients} ingredient={true} />;
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
                        { resultsCards }
                    </div>
                </div>
            </div >

        );
    }

}

export default IngredientDashboard;
