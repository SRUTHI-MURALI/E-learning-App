import  { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Image_Url } from '../../../Config/Config';
import { getTutorProfile } from '../AxiosConfigStudents/AxiosConfig';

interface TutorDetails {
  _id: string;
  photo: string;
  name: string;
  qualification: string;
  email: string;
  phone: string;
  experience: number;
  about: string;
}

interface TutorCourse {
  _id: string;
  photo: string;
}

interface TutorData {
  tutorDetails: TutorDetails;
  tutorCourses: TutorCourse[];
}

export default function TutorProfile() {
  const [tutorData, setTutorData] = useState<TutorData | null>(null);
  const { id } = useParams<{ id: string }>() as { id: string };

  useEffect(() => {
    const getTutorData = async (id: string) => {
      try {
        const response = await getTutorProfile(id);
        setTutorData(response.data);
      } catch (error) {
        console.log({ error });
      }
    };
    getTutorData(id);
  }, [id]);

  return (
    <section>
      <Container style={{ marginTop: '120px' }} className="py-5">
        <Row>
          {tutorData && (
            <>
              <Col lg="4" key={tutorData.tutorDetails._id}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <Card.Img
                      src={`${Image_Url}/${tutorData.tutorDetails?.photo}`}
                      className="rounded-circle"
                      style={{ width: '150px' }}
                    />
                    <p className="text-muted mb-1">{tutorData.tutorDetails?.name}</p>
                    <p className="text-muted mb-1">{tutorData.tutorDetails?.qualification}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="8">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>Full Name</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">{tutorData.tutorDetails?.name}</Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Email</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">{tutorData.tutorDetails?.email}</Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Phone</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">{tutorData.tutorDetails?.phone}</Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Experience</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorData.tutorDetails?.experience} Years
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Specialisations</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">{tutorData.tutorDetails?.qualification}</Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>About</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">{tutorData.tutorDetails?.about}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <p className="allcourses-header"> Courses By {tutorData?.tutorDetails?.name}</p>
          {tutorData?.tutorCourses.map((course) => (
            <Col md={3} key={course._id}>
              <Link to={`/studentcoursedetails/${course._id}`}>
                <div className="mb-4" style={{ height: '200px' }}>
                  <Card.Body className="text-center">
                    <Card.Img
                      style={{ height: '200px' }}
                      variant="top"
                      src={`${Image_Url}/${course?.photo}`}
                    />
                  </Card.Body>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
