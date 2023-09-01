
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Col,Row} from 'react-bootstrap'
import './Body1.css'
import a1 from '../../../../Assets/Images/carouselBody/hb1.avif'

function WithHeaderExample() {
  return (
   
        <Container className='mt-5'>
        <Card className='aboutCard'>
        <Row>
        <Col xs={12} md={7}>
            <h1 style={{textAlign:'center'}} className='mt-5'>About Us</h1>
            <p style={{textAlign:'center'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </Col>
        <Col xs={12} md={5}>
            <img className='aboutCardimg' src={a1}/>
        </Col>
        </Row>
        </Card>
        </Container>
   
    
   
  );
}

export default WithHeaderExample;