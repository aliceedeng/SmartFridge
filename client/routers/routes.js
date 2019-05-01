import React, {Fragment} from 'react';

// Import routing components
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

// Import custom components
import RecipeDashboard from '../containers/dashboard/RecipeContainer';
import IngredientDashboard from '../containers/dashboard/IngredientContainer';
import NotFound from '../components/error/NotFound';

const Router = () => (
    <Fragment>
      <BrowserRouter>
          <Switch>
              <Route exact path='/'>
                  <Redirect to='/recipes'/>
              </Route>
              <Route exact path="/ingredients" component={IngredientDashboard}/>
              <Route exact path='/recipes' component={RecipeDashboard}/>
              <Route component={NotFound} />
          </Switch>
      </BrowserRouter>
    </Fragment>
);

export default Router;
