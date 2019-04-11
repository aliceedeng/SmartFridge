import React, {Fragment} from 'react';

// Import routing components
import {Route, Switch} from 'react-router-dom';

// Import custom components
import MainLayout from '../components/common/layout/MainLayout';
import NotFound from '../components/error/NotFound';
//import LoginForm from '../containers/auth/LoginContainer';
//import SignUpForm from '../containers/auth/SignUpContainer';
import Dashboard from '../containers/dashboard/DashboardContainer';
//import Search from '../components/search/Search'
//import Authentication from './Authentication';

const Router = () => (
    <Fragment>
        <Switch>
            <Route exact path="/" component={Dashboard}/>

            <Route component={NotFound}/>
        </Switch>
    </Fragment>
);

export default Router;
