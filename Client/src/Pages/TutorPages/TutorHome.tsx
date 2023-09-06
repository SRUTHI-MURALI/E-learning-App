
import TutorHeader from '../../Components/TutorSide/TutorHomePage/TutorHeader/TutorHeader';
import TutorSideBar from '../../Components/TutorSide/TutorHomePage/TutorSideBar/TutorSideBar';
import { Col, Row } from 'react-bootstrap';

function TutorHome() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden',backgroundColor:"rgb(139, 179, 198)"}}>
      <Row style={{ height: '100%' }}>
        <Col xs={12} md={2} style={{ padding: 0 }}>
          <TutorSideBar />
        </Col>
        <Col  xs={12} md={10} style={{ padding: 0 }}>
           <TutorHeader />
        </Col>
      </Row>
    </div>
  );
}

export default TutorHome;
