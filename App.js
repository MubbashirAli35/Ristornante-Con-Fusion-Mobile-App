import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { Loading } from './components/LoadingComponent';
import { PersistGate } from 'redux-persist/es/integration/react';

const { store } = ConfigureStore();
const { persistor } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={Loading} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}