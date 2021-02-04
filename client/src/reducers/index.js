import plansReducer from './plans';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    plansReducer: plansReducer
});

export default allReducers;