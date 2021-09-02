import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Login from 'screens/Login';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact />
        <Route path='/login' component={Login} />
      </Switch>
    </Router >
  );
};

export default Routes;