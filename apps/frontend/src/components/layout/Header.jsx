import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../../logo.svg';
import AuthContext from '../../context/auth/authContext';

export const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  return (
    <Navbar bg="primary" expand={false} variant="dark">
      <Link className="navbar-brand" to={isAuthenticated ? '/repositories' : '/'}>
        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo" />
        TS SOLID Analyser
      </Link>
      {isAuthenticated ? (
        <div>
          <strong className="mr-2 text-white">
            {user.domain}/{user.login}
          </strong>
          <img src={user.avatar_url} width="30" height="30" alt="avatar" />
          <Button variant="outline-secondary" className="ml-2" title="Logout" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button
          variant="outline-secondary"
          onClick={() => window.location.replace('/api/v1/auth/authorize-in-github')}
          title="Sign in with GitHub"
        >
          <FontAwesomeIcon icon={faGithub} /> Sign in
        </Button>
      )}
    </Navbar>
  );
};
