import  { useState, useEffect } from "react";
import { Row, Col, Container} from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Card from "react-bootstrap/Card";
import "./Body2.css";
import { Link } from "react-router-dom";
import { getInstructors } from "../../AxiosConfigStudents/AxiosConfig";
import { Image_Url } from "../../../../Config/Config";

function BasicExample() {
  const [tutorDetails, setTutorDetails] = useState([]);

  useEffect(() => {
    const getTutorData = async () => {
      try {
        const response = await getInstructors();
        setTutorDetails(response.data.tutorDetails);
      } catch (error) {
        console.log({ error });
      }
    };
    getTutorData();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container className="mt-5 cardLayout ">
       <h1
          className="text-center m-5"
          style={{ textDecoration: "underline", color:' aqua'}}
        >
          Our Teachers
        </h1>
      <Row> 
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {tutorDetails.map((tutor, index) => (
          <Col md={3} key={tutor._id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/tutordetails/${tutor?._id}`}
            >
              <div style={{ width: "18rem" ,height:'25rem'}}>
                <Card.Img style={{ height: "14rem" }} variant="top" src={`${Image_Url}/${tutor?.photo}`} />
                <Card.Body>
                  <Card.Title className="text-center" > {tutor?.name}</Card.Title>
                  <Card.Text className="text-center m-2" style={{color:'white'}}>
                    Experience:
                    {tutor?.experience} Years
                  </Card.Text>
                  <Card.Text className="text-center" style={{color:'white'}}>
                    Specialized in : 
                     {tutor?.qualification}
                  </Card.Text>

                 
                </Card.Body>
              </div>
              
            </Link>
          </Col>
        ))}
        </Carousel>
      </Row>
    </Container>
  );
}

export default BasicExample;
