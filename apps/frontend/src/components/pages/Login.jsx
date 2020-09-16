import React, { Fragment, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../../context/auth/authContext';

export const Login = ({ history }) => {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      (async () => {
        await login(code);
        history.push('/repositories');
      })();
    } else {
      toast.error('Something went wrong!');
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  return <Fragment />;
};
