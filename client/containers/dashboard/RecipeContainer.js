import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {PROTEIN_FILTER,
        CALORIES_FILTER,
        SODIUM_FILTER,
        CHOLESTEROL_FILTER,
        SUGAR_FILTER} from '../../constants/searchFilters';
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
        this.handleRandom = this.handleRandom.bind(this);
        this.searchText = '';
        this.state = { recipes: [], hasRecipes: false };
    }

    // populates the list of recipes with a random set of recipes
    handleRandom() {
        const request = '/api/recipe/random';
        axios.get(request)
            .then(res => {
                this.setState({recipes:res.data, hasRecipes: true});
            });
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
            if (this.props.searchFilter === PROTEIN_FILTER) {
                request = '/api/recipe/protein/' + recipe + '?len=' + length;
            } else if (this.props.searchFilter === SUGAR_FILTER) {
                request = '/api/recipe/sugar/' + recipe + '?len=' + length;
            } else if (this.props.searchFilter === CHOLESTEROL_FILTER) {
                // TODO
            } else if (this.props.searchFilter === SODIUM_FILTER) {
                // TODO
            } else if (this.props.searchFilter === CALORIES_FILTER) {
                // TODO
            } else {
                request = '/api/recipe/name/' + recipe + '?len=' + length;
            }
            console.log(request);
            axios.get(request)
                .then(res => {
                    this.setState({ recipes: res.data, hasRecipes: true });
                });
        }
    }


    render() {
        let display;
        display = <SearchCard storeText={this.storeText}
                              getText={this.getText}
                              handleRandom={this.handleRandom}
                              ingredient={false} />;

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

function mapStateToProps(state) {
    return {
        searchFilter: state.cookbook.searchFilter
    };
}

export default connect(mapStateToProps)(RecipeDashboard);
