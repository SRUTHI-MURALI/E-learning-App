import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Image_Url } from '../../../Config/Config'

function StudenetCoursePurchase({data}) {
  
    return (
        <div >
          <Container className="d-flex text-center m-5">
          <Row>
          <Card className='mt-5'>
         
          <Card.Body >

          <img src={`${Image_Url}/${data.courseDetails?.photo}`} />
            <Card.Title style={{color:'rgb(80, 100, 198)',fontWeight:'bolder',fontSize:'30px', margin:'15px'}}>Enroll Now </Card.Title>
            <Card.Text >Rate: {data.courseDetails?.price}</Card.Text>
            <Card.Text >Duration:{data.courseDetails?.duration} </Card.Text>
            <Card.Text >Ratings: 4.5</Card.Text>
            <Card.Text>Offers: </Card.Text>
            <Card.Text>Instructor: </Card.Text>
            <Button>Buy Now </Button> 
            <Card.Text>Start your learning Now !!!</Card.Text>
           
    
          </Card.Body>
         
        </Card>
        
          </Row>
          </Container>
        </div>
      )
    
}

export default StudenetCoursePurchase
