import React from 'react'
import { Container, Row } from 'react-bootstrap';

function StudentCourseimage({data}) {
    const baseUrl="https://res.cloudinary.com/dnkc0odiw/image/upload/v1694423417"
    console.log(data,"data2");
    
  return (
    <div>
        <Container className='d-flex justify-content-center align-item-center'>
        <Row>
            <img style={{ height:'450px',
              width: '100%'}} src={`${baseUrl}/${data.courseDetails?.photo}`} />
        </Row>
        </Container>
      
    </div>
  )
}

export default StudentCourseimage
