import {
  Route,
  Switch,
} from 'react-router-dom';

import Login from 'screens/Login';
import Measurements from 'screens/Measurements';

function Routes() {
  return (
		<>
			<Switch>
				<Route path="/" exact />
				<Route path="/login" component={Login} />
				<Route path="/measurements" component={Measurements} />
			</Switch>
		</>
  );
};

export default Routes;