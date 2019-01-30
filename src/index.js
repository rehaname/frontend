import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './css/index.css';
import App from './App';
import AppStore from './container/App/AppStore';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render((
  <Provider store={AppStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
