import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Button, Card } from 'react-bootstrap';
import RepositoriesContext from '../../context/repositories/repositoriesContext';
import AnalysesContext from '../../context/analyses/analysesContext';

export const Results = () => {
  const { repositoryName } = useParams();
  const { results } = useContext(AnalysesContext);
  const { repositories } = useContext(RepositoriesContext);
  const [repository] = useState(repositories.find((repository) => repository.name === repositoryName));
  const [analysisResult] = useState(results[repository.full_name]);

  return (
    <>
      <h1>Results: {repositoryName}</h1>
      <Accordion defaultActiveKey="0">
        {analysisResult.map((analysisResult, index) => {
          return (
            <Card key={analysisResult.pluginName}>
              <Accordion.Toggle
                as={Card.Header}
                variant="link"
                eventKey={`${index}`}
                className="d-flex align-items-center justify-content-between h4"
                style={{ cursor: 'pointer' }}
              >
                <div className="btn-link">{analysisResult.pluginName}</div>
                {analysisResult.result ? (
                  <div className="text-success">SUCCESS</div>
                ) : (
                  <div className="text-danger">FAILED</div>
                )}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>{analysisResult.result ? 'Test passed' : 'Test failed'}</Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </>
  );
};
