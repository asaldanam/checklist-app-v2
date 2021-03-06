import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initFirestore, initFirebase } from './core/firebase';
import { initializeIcons } from '@uifabric/icons';


import { Provider } from 'react-redux'
import store from "core/redux";

initFirebase();
initFirestore();
initializeIcons();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
