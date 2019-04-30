import React, {Component} from 'react';
import axios from 'axios';


// Import custom components
import Dashboard from '../../components/dashboard/Dashboard';
import IngrDashboard from '../../components/dashboard/IngrDashboard';
import CardList from '../../components/dashboard/CardList';
import Header from '../../components/common/header/Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        var updateState = this.updateState.bind(this);
        var storeValue = this.storeValue.bind(this);
        var getValue = this.getValue.bind(this)
        this.arg1 = true;
        this.arg2 = "";
        this.recipes = new Array(10);
        this.state = {recipes: []};
    }

    storeValue(arg) {
        console.log("storing value: "+ arg.target.value);
        this.arg2 = arg.target.value;
    }

    getValue(arg) { //key press: Enter
        if(arg.keyCode == 13) {
            //console.log("search value:" + this.arg2)
            alert('searched for ' + this.arg2)

            const recipe = this.arg2;
            var returnedRecipes = new Array(10);

            axios.get('/api/recipe/name/'+recipe)
                .then(res => {
                    //console.log(res);
                    //console.log(res.data)

                    //TEMPORARY: limiting the full query to 10 here, hopefully should change
                    //once Steph is able to limit it in oracledb
                    var i;
                    for (i = 0; i < returnedRecipes.length; i++) {
                        
                        returnedRecipes[i] = res.data[i]
                        console.log(returnedRecipes[i])
                    }
                    
                    //store results
                    this.recipes = returnedRecipes;
                    this.setState({recipes:returnedRecipes});
                    console.log(this.state)
                })
        }
        //api/recipe/name/:name
        
    }

    
    updateState(arg) {
        if (arg == 'recipe') {
            this.setState({arg1:true});
            this.arg1 = true;
            //alert('pressed recipe button')
        } else {
            this.setState({arg1:false});
            this.arg1 = false;
            //alert('pressed ingredients button')
        }

    }


    render() {
        var updateState = this.updateState;
        const recipePage = this.arg1;
        console.log(recipePage)
        let display;

        var storeValue = this.storeValue;
        var getValue = this.getValue;
        //var componentDidMount = this.componentDidMount;

        if (recipePage) {
            display = <Dashboard storeValue = {storeValue.bind(this)} getValue = {getValue.bind(this)}/>
        } else {
            display = <IngrDashboard storeValue = {storeValue.bind(this)} getValue = {getValue.bind(this)}/>
        }

        let recipeCards;

        var recipeList = this.recipes;
        if (recipeList) {
            console.log("creating Recipe cards...");
            recipeCards = <CardList recipeList={recipeList}/>
        }

        return (
        	<div>
	        	<div>
	 				<Header updateState = {updateState.bind(this)}/>
	 			</div>
                
                {display}
                {recipeCards}
         	</div>

        )
    }

}

export default DashboardContainer;
