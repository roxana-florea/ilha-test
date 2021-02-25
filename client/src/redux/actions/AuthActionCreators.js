import axios from 'axios';

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
} = require('./AuthActionTypes');

//Register
const registerRequest = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

const registerSuccess = (user) => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            user,
        },
    };
};

const registerFail = (error) => {
    return {
        type: REGISTER_FAILED,
        payload: error
    };
};

export const signUp = (user, history) => {
    return function (dispatch) {
        dispatch(registerRequest());
        axios({
            method: 'post',
            url: '/signUp',
            data: user,
        })
            .then((res) => {
                const { data } = res.data;
                dispatch(registerSuccess(data));
                history.push('/');
            })
            .catch((error) => {
                if (error)
                window.alert('400: ALL fields are required.')
                dispatch(registerFail(error))/// Check errors!!!!!
            });
    };
};

//Access
const accessRequest = () => {
    return {
        type: ACCESS_REQUEST
    };
};

const accessApproved = (token, username, userId) => {
    return {
        type: ACCESS_APPROVED,
        payload: {
            token,
            username,
            userId,
        }
    };
};

const accessFailed = (error) => {
    return {
        type: ACCESS_DENIED,
        payload: error
    };
};

export const signIn = (payload, history) => {
    return function (dispatch) {
        dispatch(accessRequest);
        axios({
            method: 'post',
            url: '/signIn',
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('USER-TOKEN')}`,
            }
        })
            .then((response) => {
                const { token, username, userId } = response.data;
                localStorage.setItem('USER-TOKEN', token);
                localStorage.setItem('USER-NAME', username);
                localStorage.setItem('USER-ID', userId);
                dispatch(accessApproved(token, username, userId));
                history.push('/Dashboard');
            })
            .catch((error) => {
                if (error)
                window.alert('401: Invalid E-mail or password')
                dispatch(accessFailed(error)); ///Check Error!!!
            })
    };
};

//Sign-out
export const signoutRequest = () => {
    return {
        type: SIGNOUT_REQUEST
    };
};

export const signoutSuccess = () => {
    return {
        type: SIGNOUT_SUCCESS
    };
};

export const signoutFailed = () => {
    return {
        type: SIGNOUT_FAILED
    };
};

export const signOut = function(history) {
    return function (dispatch) {
        dispatch(signoutRequest());
        localStorage.clear();
        history.push('/');
        if (localStorage.getItem('USER-TOKEN')) {
            dispatch(signoutFailed());
        } else {
            dispatch(signoutSuccess());
        }
    };
};