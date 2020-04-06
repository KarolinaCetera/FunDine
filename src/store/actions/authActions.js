import * as actions from './actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
};

export const authSuccess = (token, userID) => {
    return {
        type: actions.AUTH_SUCCESS,
        token,
        userID
    }
};

export const authError = error => {
    return {
        type: actions.AUTH_ERROR,
        error: error
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actions.AUTH_LOGOUT
    }
};

export const authExpires = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const authProcess = (email, password, isRegistered) => {
    return dispatch => {
        dispatch(authStart());

        const userData = {
            email,
            password,
            returnSecureToken: true
        };

        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBd6B2AZrYYC09X20P5gALfBwHMRqgfp2E';
        if (!isRegistered) {
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBd6B2AZrYYC09X20P5gALfBwHMRqgfp2E';
        }

        axios.post(`${authUrl}`, userData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.userId));
                dispatch(authExpires(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authError(error))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authExpires((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};

