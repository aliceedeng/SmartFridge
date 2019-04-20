import React, {Component} from 'react';

// Import custom components
import Dashboard from '../../components/dashboard/Dashboard';
import IngrDashboard from '../../components/dashboard/IngrDashboard';
import Header from '../../components/common/header/Header';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        var updateState = this.updateState.bind(this);
        var storeValue = this.storeValue.bind(this);
        this.arg1 = true;
        this.arg2 = "";
    }

    storeValue(arg) {
        console.log("storing value: "+ arg.target.value);
        this.arg2 = arg.target.value;
    }

    getValue(arg) { //key press: Enter
        if(arg.keyCode == 13) {
            //console.log("search value:" + this.arg2)
            alert('searched for ' + this.arg2)
        }   
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

        if (recipePage) {
            display = <Dashboard storeValue = {storeValue.bind(this)} getValue = {getValue.bind(this)}/>
        } else {
            display = <IngrDashboard storeValue = {storeValue.bind(this)} getValue = {getValue.bind(this)}/>
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
