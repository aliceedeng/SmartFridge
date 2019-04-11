import React, {Component} from 'react';

// Import custom components
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/common/header/Header';

class DashboardContainer extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
        	<div>
	        	<div>
	 				<Header/>
	 			</div>
	 			<div>
	        		<Dashboard/>
	         	</div>
         	</div>
        )
    }

}

export default DashboardContainer;