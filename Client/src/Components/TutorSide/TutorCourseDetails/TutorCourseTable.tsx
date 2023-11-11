import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ImArrowRight } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { getUser } from "../AxiosConfigInstructors/AxiosConfig";
import EditCourseTutorForm from "./EditCourseTutorForm";

interface Course {
  _id: string;
  title: string;
  category: {
    title: string;
  };
  description: string;
  duration: string;
  isApproved: boolean;
  instructor: {
    name: string;
    isBlocked: boolean;
  };
  price: number;
  photo: string;
}

function TutorCourseTable() {
  
  
  const tutorData = localStorage.getItem("tutorData");
  const parseData = tutorData ? JSON.parse(tutorData) : null;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const [courseList, setCourselist] = useState<Course[]>([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getUser();
        setCourselist(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [openPopUp]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleLessons = (Id: string) => {
    navigate(`/tutorlessonslist/${Id}`);
  };

  const handleEditCourse = (Id: string) => {
    setCourseId(Id);
    setOpenPopUp(true);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = courseList.slice(offset, offset + itemsPerPage);

  return (
    <div style={{ marginTop: "7rem" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

      {openPopUp === false && (
        <>
          <p className="studentlistheading">
            <ImArrowRight /> <u>My Course List</u>
          </p>

          <Table className="mt-5 ms-5" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Duration</th>
                <th>isApproved</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData
                .filter(
                  (course) => course.instructor.name === parseData?.name
                )
                .map((course, index) => (
                  <tr key={course._id}>
                    <td>{index + 1}</td>
                    <td>{course.title}</td>
                    <td>{course.category.title}</td>
                    <td>{course.description}</td>
                    <td>{course.duration}</td>
                    <td>
                      {!course.instructor.isBlocked ? (
                        course.isApproved ? (
                          <Button variant="info" size="sm">
                            Approved
                          </Button>
                        ) : (
                          <Button variant="secondary" size="sm">
                            UnApproved
                          </Button>
                        )
                      ) : (
                        <Button variant="secondary" size="sm">
                          UnApproved
                        </Button>
                      )}
                    </td>
                    <td>₹{course.price}</td>
                    <td>
                      <img
                        src={`${Image_Url}/${course.photo}`}
                        alt="sample"
                        style={{ width: "40px" }}
                      />
                    </td>
                    <td>
                      <AiFillEdit onClick={() => handleEditCourse(course._id)} />
                    </td>
                    <td>
                      {" "}
                      <Button
                        variant="link"
                        onClick={() => handleLessons(course._id)}
                      >
                        Lessons
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
      {openPopUp && (
        <div>
          <EditCourseTutorForm
            courseId={courseId}
            onCloseEdit={() => setOpenPopUp(false)}
          />
        </div>
      )}

      <div style={{ float: "right", margin: "3px" }}>
        <ReactPaginate
          previousLabel={"Previous "}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(courseList.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default TutorCourseTable;
