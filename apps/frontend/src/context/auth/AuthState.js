import React, { useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, USER_LOADED } from '../types';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['X-XSRF-TOKEN'] = document.cookie.split('=').pop(); //TODO

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      const response = await axios.get('/api/v1/auth/current-user');
      dispatch({ type: USER_LOADED, payload: response.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const login = async (code) => {
    try {
      const response = await axios.post('/api/v1/auth/github-signin', { code });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      toast.success('Login complete!');
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
      toast.error(err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/v1/auth/signout', { asdf: 'asdf' });
    } catch (err) {
      toast.error(err.response.data.message);
    }
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
