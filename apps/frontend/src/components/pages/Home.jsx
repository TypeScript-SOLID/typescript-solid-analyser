import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

export const Home = ({ history }) => {
  const { isAuthenticated, loadUser } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/repositories');
      return;
    }
    loadUser();
    //eslint-disable-next-line
  }, [isAuthenticated, history]);

  return <h1>Hello, World!</h1>;
};
