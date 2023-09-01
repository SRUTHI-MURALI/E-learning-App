import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import quiz from '../../../Assets/Images/carouselBody/quiz.jpeg'
import QA from '../../../Assets/Images/carouselBody/Q&A.jpeg'
import pdf from '../../../Assets/Images/carouselBody/pdf.png'
import './Cards.css'
import {Col,Row} from 'react-bootstrap'

function BasicExample() {
  return (
    <Container className='mt-5'>
    <Row className='cardlayout'>
      <Col xs={12} lg={3}>
      <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={QA} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
       </Col>
      <Col xs={12} lg={3}>
      <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={quiz} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
       </Col>
      <Col xs={12} lg={3}>
      <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={pdf} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
       </Col>
      <Col xs={12} lg={3}>
      <Card style={{ width: '18rem' }}  >
      <Card.Img  variant="top" src={pdf} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
       </Col>
    </Row>
    </Container>
   
  );
}

export default BasicExample;