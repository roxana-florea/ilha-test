import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { createStore } from 'redux'; -only temporarily disabled
// import allReducers from './reducers';
// import createRootReducer from './redux/store'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
// import { applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'; - only temp disabled!
// import thunkMiddleware from 'redux-thunk'; 
import makeStore from './redux/store';


// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// const store = createStore(createRootReducer, composedEnhancer);
const store = makeStore();

ReactDOM.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store} >
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
