import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Base_Url } from '../../../Config/Config';

function SearchBarContainer({ setSearchedCourses }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axios.post(`${Base_Url}/student/searchitem`, { searchvalue: searchValue });
        setSearchedCourses(response.data.courseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div className="float-end" style={{ marginTop: '150px' }}>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchBarContainer;
