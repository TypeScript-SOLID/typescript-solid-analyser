import React, { useContext, useEffect, useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AnalysesContext from '../../context/analyses/analysesContext';
import RepositoriesContext from '../../context/repositories/repositoriesContext';
import { Col, Row, Spinner } from 'react-bootstrap';

export const Analyze = () => {
  const { repositoryName } = useParams();
  let { performing, performAnalysis } = useContext(AnalysesContext);
  const { repositories } = useContext(RepositoriesContext);

  useEffect(() => {
    const repository = repositories.find((repository) => repository.name === repositoryName);
    performAnalysis(repository.url, repository.full_name);
    // eslint-disable-next-line
  }, []);

  useMemo(() => {
    performing = true;
  }, []);

  if (!performing) return <Redirect to={`/results/${repositoryName}`} />;
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
};
