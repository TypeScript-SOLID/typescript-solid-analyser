import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Footer = () => (
  <footer className="bg-secondary">
    <Container fluid>
      <Row>
        <Col className="text-left">
          <span className="text-muted">© {new Date().getFullYear()} TS SOLID Analyser</span>
        </Col>
        <Col className="text-center">
          <span className="text-muted">© {new Date().getFullYear()} TS SOLID Analyser</span>
        </Col>
        <Col className="text-right">
          <span className="text-muted">© {new Date().getFullYear()} TS SOLID Analyser</span>
        </Col>
      </Row>
    </Container>
  </footer>
);
