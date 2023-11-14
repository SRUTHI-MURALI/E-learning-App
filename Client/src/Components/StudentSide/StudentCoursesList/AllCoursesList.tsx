import  { useEffect, useMemo, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image_Url } from "../../../Config/Config";
import {
  getAllCourses,
  getEnrolledCourses,
} from "../AxiosConfigStudents/AxiosConfig";
import SearchBarContainer from "../SearchBar/SearchBarContainer";
import ReactPaginate from "react-paginate";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import SortBarContainer from "../SortBar/SortBarContainer";

interface Course {
  _id: string;
  title: string;
  instructor: {
    name: string;
  };
  photo: string;
  price: number;
}

function AllCoursesList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allCourseList, setAllCourseList] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [searchedCourses, setSearchedCourses] = useState<Course[]>([]);
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);
  const student = localStorage.getItem("studentData");
  const parseData = student ? JSON.parse(student) : null;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourses();
        setAllCourseList(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    const enrolledCoursesData = async (id: string) => {
      try {
        const response = await getEnrolledCourses(id);
        setEnrolledCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };

    if (parseData) {
      enrolledCoursesData(parseData._id);
    }
  }, [parseData]);

  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 4,
  //     slidesToSlide: 1,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1,
  //   },
  // };

  const filteredCourses =
    searchedCourses.length > 0
      ? searchedCourses
      : sortedCourses
      ? sortedCourses.length > 0
        ? sortedCourses
        : allCourseList
      : allCourseList;

  const coursesNotEnrolled = filteredCourses.filter((course) => {
    return !enrolledCourses.some(
      (enrolledCourse) => enrolledCourse._id === course._id
    );
  });

  const PageSize = 8;
  const pageCount = Math.ceil(coursesNotEnrolled.length / PageSize);

  const currentTableData = useMemo(() => {
    const firstPage = currentPage * PageSize;
    const lastPage = Math.min(firstPage + PageSize, coursesNotEnrolled.length);
    return coursesNotEnrolled.slice(firstPage, lastPage);
  }, [currentPage, coursesNotEnrolled]);

  const handlePageClick = (data:any) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Row>
        <Col>
          <SearchBarContainer setSearchedCourses={setSearchedCourses} />
        </Col>
        <Col>
          <SortBarContainer setSortedCourses={setSortedCourses} />
        </Col>
      </Row>
      <Container className="mt-5">
        <p className="allcourses-header">All Courses</p>
        <Row>
          {currentTableData.map((courses) => (
            <Col key={courses._id}>
              <Link
                to={`/studentcoursedetails/${courses._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  style={{ width: "16rem", height: "25rem" }}
                  className="m-2"
                >
                  <Card.Img
                    style={{ height: "200px" }}
                    variant="top"
                    src={`${Image_Url}/${courses.photo}`}
                  />
                  <Card.Body className="mt-4 justify-content-center align-items-center">
                    <Card.Title className="text-center">
                      Course: {courses.title}
                    </Card.Title>
                    <Card.Text className="text-center">
                      By {courses.instructor.name}
                    </Card.Text>
                    <Card.Link>Enroll Now</Card.Link>
                    <Card.Text style={{ float: "right" }}>
                      <FaRupeeSign /> {courses.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <ReactPaginate
        previousLabel={<FaBackward />}
        nextLabel={<TbPlayerTrackNextFilled />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
}

export default AllCoursesList;
