import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import AuthContext from '../../context/auth/authContext';

export const Breadcrumbs = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const breadcrumbs = useBreadcrumbs();

  if (!isAuthenticated || breadcrumbs.length <= 1) return null;

  return (
    <div aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        {breadcrumbs[1].key === '/repositories' ? (
          <li className="breadcrumb-item active" aria-current="page">
            Repositories
          </li>
        ) : (
          <>
            <li className="breadcrumb-item">
              <Link to="/repositories">Repositories</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Results
            </li>
          </>
        )}
      </ol>
    </div>
  );
};
