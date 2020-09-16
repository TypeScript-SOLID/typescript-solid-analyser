import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';

export const RepositoriesLoading = () => {
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
