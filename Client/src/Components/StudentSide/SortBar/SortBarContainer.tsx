import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Row,Form } from 'react-bootstrap';
import { Base_Url } from '../../../Config/Config';


function SortBarContainer({setSortedCourses}) {
    const [sortValue, setSortValue] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        if (sortValue) {
            console.log(sortOrder,sortValue,'kjhjkhjk');
            
          const response = await axios.post(`${Base_Url}/student/sortitem`, { sortValue,sortOrder });
       
          
          setSortedCourses(response.data.courseData) 
          
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
                        as="select" 
                        onChange={(e) => setSortValue(e.target.value)} 
                        className="mr-sm-2"
                        style={{ width: '8rem' }}
                    >
                        <option value="price">Price </option>
                        <option value="duration">Duration</option>
                    </Form.Control>
                    </Col>
              <Col xs="auto">
                <Form.Control
                    as="select"
                    onChange={(e) => setSortOrder(e.target.value)} 
                    className="mr-sm-2"
                    style={{ width: '8rem' }}
                >
                    <option value="asc">Low to high</option>
                    <option value="desc">High to Low</option>
                </Form.Control>
                </Col>
              <Col xs="auto">
                <Button type="submit">Sort</Button>
              </Col>
            </Row>
          </Form>
        </div>
      )
}

export default SortBarContainer
