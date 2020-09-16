import React from 'react';
import { RepositoriesFilter, RepositoriesList } from '../repositories';

export const Repositories = () => {
  return (
    <>
      <RepositoriesFilter />
      <RepositoriesList />
    </>
  );
};
