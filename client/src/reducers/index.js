import plansReducer from './plans';
import tasksReducer from './tasks';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    plansReducer: plansReducer,
    tasksReducer: tasksReducer
});

export default allReducers;