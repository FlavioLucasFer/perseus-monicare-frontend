import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from 'screens/Login';
import Measurements from 'screens/Measurements';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact />
        <Route path='/login' component={Login} />
        <Route path='/measurements' component={Measurements} />
      </Switch>
    </Router >
  );
};

export default Routes;