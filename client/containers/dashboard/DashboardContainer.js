import React, {Component} from 'react';

// Import custom components
import Dashboard from '../../components/dashboard/Dashboard';
import IngrDashboard from '../../components/dashboard/IngrDashboard';
import Header from '../../components/common/header/Header';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
        var updateState = this.updateState.bind(this);
        this.arg1 = true;
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
        if (recipePage) {
            display = <Dashboard />
        } else {
            display = <IngrDashboard/>
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