import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/reducers';
import Routes from './routes';

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
