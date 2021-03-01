import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import plansReducer from './reducers/PlansReducer';
import authenticationReducer from './reducers/AuthReducer';
import jwt from 'jsonwebtoken';

const createRootReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    plansReducer: plansReducer,
  });

export const validToken = (token) => {
  let decoded = jwt.decode(token);
  return new Date(decoded.exp * 2000) > new Date() ? decoded : null;
};

const initState = {
  authentication: {
    currentUser: localStorage.getItem('USER-TOKEN')
      ? validToken(localStorage.getItem('USER-TOKEN'))
      : null,
    token: localStorage.getItem('USER-TOKEN')
      ? localStorage.getItem('USER-TOKEN')
      : null,
    username: localStorage.getItem('USER-TOKEN')
      ? localStorage.getItem('USER-NAME')
      : null,
    userId: localStorage.getItem('USER-TOKEN')
      ? localStorage.getItem('USER-ID')
      : null,
    error: '',
    loading: false,
    isAuthenticated: localStorage.getItem('USER-TOKEN') ? true : false,
  },
};

export default function makeStore(initialState = initState) {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('./reducers/AuthReducer', () => {
      const nextReducer = require('./reducers/AuthReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

