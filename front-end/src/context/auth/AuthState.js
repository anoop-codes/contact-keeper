import React, { useReducer } from 'react';
import authReducer from './authReducer';
import authContext from './authContext';
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERROR, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';
import setAuthToken from '../../utils/SetAuthToken';


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (data) => {
        const congif = {
            headers: {
                'Content-Type': 'application/json '
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users', data, congif);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data
            })
        }
    }


    const clearError = () => {
        dispatch({
            type: CLEAR_ERROR
        })
    }

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {

            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data
            })
        }
    }

    const login = async (data) => {
        const congif = {
            headers: {
                'Content-Type': 'application/json '
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth', data, congif);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearError,
                loadUser,
                login,
                logout,
                dispatch
            }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;

