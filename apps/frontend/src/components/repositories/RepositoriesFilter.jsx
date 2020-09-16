import React, { useContext, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import RepositoriesContext from '../../context/repositories/repositoriesContext';

export const RepositoriesFilter = () => {
  const { clearFilter, filterRepositories, filtered } = useContext(RepositoriesContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChangeHandler = (e) => {
    if (text.current.value !== '') {
      filterRepositories(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Row className="my-0 my-md-4">
      <Col md={2}></Col>
      <Col>
        <Form id="search">
          <Form.Group className="shadow">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                ref={text}
                type="text"
                placeholder="Search..."
                aria-label="Search"
                onChange={onChangeHandler}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};
