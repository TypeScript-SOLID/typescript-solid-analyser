import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import RepositoriesContext from '../../context/repositories/repositoriesContext';
import RepositoryCard from './RepositoryCard';
import * as uuid from 'uuid';
import { RepositoriesNotFound } from './RepositoriesNotFound';
import { RepositoriesLoading } from './RepositoriesLoading';

export const RepositoriesList = () => {
  const { getRepositories, repositories, filtered, loading } = useContext(RepositoriesContext);

  useEffect(() => {
    getRepositories();
    // eslint-disable-next-line
  }, []);

  if (loading) return <RepositoriesLoading />;
  const repositoriesToDisplay = filtered !== null ? filtered : repositories;
  if (repositoriesToDisplay.length === 0) return <RepositoriesNotFound />;

  const rows = repositoriesToDisplay
    .map((repository, index) => {
      if (index % 2 === 0) {
        const row = [repository];
        if (repositoriesToDisplay[index + 1]) row.push(repositoriesToDisplay[index + 1]);
        return row;
      } else {
        return null;
      }
    })
    .filter((repositories) => repositories !== null);

  return (
    <>
      {rows.map((row) => (
        <Row key={uuid.v4()} className="my-3">
          {row.map((repository) => (
            <Col key={repository.id} md={6} className="mt-3 mt-md-0">
              <RepositoryCard repository={repository} />
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};
