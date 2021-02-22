import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import plansReducer from '../reducers/plans';
import authenticationReducer from './reducers/AuthReducer';

export const createRootReducer = () => 
    combineReducers({
        authentication: authenticationReducer,
        plansReducer: plansReducer
    });

    const initState = {
        authentication: {
            currentUser: null,
            token: '',
            error: '',
            loading: false,
            isAuthenticated: false
        }
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
