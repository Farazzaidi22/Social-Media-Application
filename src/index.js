import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import { SnackbarProvider } from 'notistack';

import Slide from '@material-ui/core/Slide';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <SnackbarProvider 
          maxSnack={4} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          TransitionComponent={Slide}>
            <App />
      </SnackbarProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);