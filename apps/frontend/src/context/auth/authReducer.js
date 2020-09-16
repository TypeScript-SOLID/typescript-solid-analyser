/* eslint-disable no-duplicate-case */

import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, USER_LOADED } from '../types';

export default (state, action) => {
  switch (action.type) {
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOGIN_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};
