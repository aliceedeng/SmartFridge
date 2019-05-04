/*
 * High level component for encapsulating the cookbook page, where users can view nutrition
 * facts about saved recipes
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


// Import custom components
import SearchCard from '../../components/dashboard/SearchCard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';


const divStyle = {
    paddingTop:'20px',
    paddingLeft:'30px',
    paddingRight:'30px'
};

class CookbookDashboard extends Component {
    /*
     * props:
     *  savedRecipes: list of recipes stored by the user when searching
     *  by ingredients or recipe name on the other page
     *
     * ADD STATE RELATING TO AVERAGE VALUES AND SORTING ETC
     */
    constructor(props) {
        super(props);
    }

    render() {
        let recipeCards;
        recipeCards = <CardList resultsData={this.props.savedRecipes} ingredient={false} />;

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div>
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
    return ({
       savedRecipes: state.cookbook.contents
    });
}

export default connect(mapStateToProps)(CookbookDashboard);