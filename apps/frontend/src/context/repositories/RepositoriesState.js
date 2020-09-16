import React, { useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import RepositoriesContext from './repositoriesContext';
import repositoriesReducer from './repositoriesReducer';
import { CLEAR_FILTER, FILTER_REPOSITORIES, GET_REPOSITORIES } from '../types';

const RepositoriesState = (props) => {
  const initialState = {
    repositories: [],
    filtered: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(repositoriesReducer, initialState);

  const getRepositories = async () => {
    try {
      const response = await axios.get('/api/v1/repositories');
      dispatch({ type: GET_REPOSITORIES, payload: response.data });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const filterRepositories = (text) => dispatch({ type: FILTER_REPOSITORIES, payload: text });
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <RepositoriesContext.Provider
      value={{
        repositories: state.repositories,
        filtered: state.filtered,
        loading: state.loading,
        getRepositories,
        filterRepositories,
        clearFilter,
      }}
    >
      {props.children}
    </RepositoriesContext.Provider>
  );
};

export default RepositoriesState;
