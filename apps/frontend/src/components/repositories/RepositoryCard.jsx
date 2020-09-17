import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faPlay, faTools } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo.svg';
import { Button, Card, Col, Row } from 'react-bootstrap';

const RepositoryCard = ({ repository }) => {
  return (
    <Card className="shadow">
      <Card.Body>
        <Row>
          <Col xs={8} className="text-left">
            <a href={repository.html_url}>
              <h5 className="card-subtitle text-muted">{repository.full_name.split('/').shift()}/</h5>
              <h4 className="card-title text-dark">{repository.name}</h4>
            </a>
          </Col>
          <Col xs={4} className="text-right">
            <img src={logo} className="w-100" alt="logo" />
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-right">
        <Link to={`/analyze/${repository.name}`}>
          <Button variant="outline-primary" className="mx-2" title="Analyze">
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </Link>
        <Button variant="outline-primary" className="mx-2" title="Settings">
          <FontAwesomeIcon icon={faTools} />
        </Button>
        <Link to={`/results/${repository.name}`}>
          <Button variant="outline-primary" className="mx-2" title="Results">
            <FontAwesomeIcon icon={faChartBar} />
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RepositoryCard;
