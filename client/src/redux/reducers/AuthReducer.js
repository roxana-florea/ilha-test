const jwt = require('jsonwebtoken');
// const signOut = require('../actions/AuthActionCreators');

const {
    ACCESS_REQUEST,
    ACCESS_APPROVED,
    ACCESS_DENIED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    SIGNOUT_REQUEST,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAILED
} = require('../actions/AuthActionTypes');

export const validToken = (token) => {
    let decoded = jwt.decode(token);
    // return new Date(decoded.exp * 2000) > new Date() ? decoded : signOut();
    return new Date(decoded.exp * 2000) > new Date() ? decoded : null;
};
const initState = {
    currentUser: localStorage.getItem('USER-TOKEN')
        ? validToken(localStorage.getItem('USER-TOKEN'))
        : null,
    token: localStorage.getItem('USER-TOKEN')
        ? localStorage.getItem('USER-TOKEN')
        : null,
    error: '',
    loading: false,
    isAuthenticated: false
};

const authenticationReducer = function (state = initState, action) {
    switch (action.type) {
        case ACCESS_REQUEST:
        case REGISTER_REQUEST:
        case SIGNOUT_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            };
        case ACCESS_DENIED:
        case REGISTER_FAILED:
        case SIGNOUT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                currentUser: null,
                isAuthenticated: false
            };
        case REGISTER_SUCCESS:
        case ACCESS_APPROVED:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                currentUser: action.payload.user,
                isAuthenticated: true
            };
        case SIGNOUT_SUCCESS:
            localStorage.removeItem('USER-TOKEN');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                currentUser: null,
                token: ''
            };
        default:
            return {
                ...state
            };
    }
}

export default authenticationReducer;