import React, { Component } from 'react';
import axios from 'axios';


// Import custom components
import SearchCard from '../../components/dashboard/SearchCard';
import IngrDashboard from '../../components/dashboard/IngrDashboard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';
import Grid  from '@material-ui/core/Grid';

class RecipeDashboard extends Component {

    constructor(props) {
        super(props);
        var updateState = this.updateState.bind(this);
        var storeValue = this.storeValue.bind(this);
        var getValue = this.getValue.bind(this);
        this.arg1 = true;
        this.arg2 = '';
        // this.recipes = new Array(10);
        this.state = { recipes: [], hasRecipes: false };
    }

    storeValue(arg) {
        this.arg2 = arg.target.value;
    }

    getValue(arg) { // key press: Enter
        if (arg.keyCode == 13) {
            // console.log("search value:" + this.arg2)
            alert('searched for ' + this.arg2);

            const recipe = this.arg2;
            // MODIFY AS NECESSARY USING ARG
            var length = 20;
            var request = '/api/recipe/name/' + recipe + '?len=' + length;
            axios.get(request)
                .then(res => {
                    this.setState({ recipes: res.data, hasRecipes: true });
                });
        }
        // api/recipe/name/:name

    }


    updateState(arg) {
        if (arg == 'recipe') {
            this.setState({ arg1: true });
            this.arg1 = true;
            // alert('pressed recipe button')
        } else {
            this.setState({ arg1: false });
            this.arg1 = false;
            // alert('pressed ingredients button')
        }

    }


    render() {
        var updateState = this.updateState;
        const recipePage = this.arg1;
        let display;

        var storeValue = this.storeValue;
        var getValue = this.getValue;
        // var componentDidMount = this.componentDidMount;

        display = <SearchCard storeValue={storeValue.bind(this)} getValue={getValue.bind(this)} ingredient={true}/>;

        let recipeCards;

        var recipeList = this.state.recipes;
        if (this.state.hasRecipes) {
            recipeCards = <CardList recipeList={recipeList} />;
        }
        var className = '';
        var gridStyle = {
            direction:'row',
            justify:'flex-start',
            alignItems:'flex-start',
        };
        var gridClass = 'container';
        
return (
            <div>
                <div>
                    <Header updateState={updateState.bind(this)} />
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
