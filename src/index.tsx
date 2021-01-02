import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { dataset } from 'store/actions';
import App from 'containers/app';
import reportWebVitals from 'reportWebVitals';
import './index.css';

store.dispatch(dataset.reconcile());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
