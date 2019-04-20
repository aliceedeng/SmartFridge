import React, {Component} from 'react';

// Import custom components
import Dashboard from '../../components/dashboard/Dashboard';
import IngrDashboard from '../../components/dashboard/IngrDashboard';
import Header from '../../components/common/header/Header';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        var updateState = this.updateState.bind(this);
        var getRecipe = this.getRecipe.bind(this);
        this.arg1 = true;
        this.arg2 = "";
    }

    getRecipe(arg) {
        console.log(arg.target.value)
        this.arg2 = arg
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

        var getRecipe = this.getRecipe;

        if (recipePage) {
            display = <Dashboard getRecipe = {getRecipe.bind(this)}/>
        } else {
            display = <IngrDashboard getRecipe = {getRecipe.bind(this)}/>
        }

        return (
        	<div>
	        	<div>
	 				<Header updateState = {updateState.bind(this)}/>
	 			</div>

                {display}

         	</div>

        )
    }

}

export default DashboardContainer;
