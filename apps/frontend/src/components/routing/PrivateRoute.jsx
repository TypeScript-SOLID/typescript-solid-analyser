import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return <Route {...rest} render={(props) => (!isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)} />;
};
