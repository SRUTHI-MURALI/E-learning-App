import React, { useState, useEffect } from "react"; // Import React
import Table from "react-bootstrap/Table";
import { AiFillEdit } from "react-icons/ai";
import { ImArrowRight } from "react-icons/im";

import "./CourseTable.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditCourseForm from "./EditCourseForm";
import { Button } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  approveCourse,
  cancelCourse,
  getAllCourse,
} from "../AxiosConfigAdmin/AxiosConfig";

function CourseTable() {
  const [courseList, setCourselist] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 3;

  const navigate = useNavigate();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourse();
        setCourselist(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleLessons = (Id) => {
    navigate(`/adminlessonslist/${Id}`);
  };

  const handleEditCourse = (Id) => {
    setCourseId(Id);
    setOpenPopUp(true);
  };

  const courseStatus = async (course) => {
    try {
      // Display a confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          course.isApproved ? "unapprove" : "approve"
        } the course "${course.title}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        if (!course.isApproved) {
          await approveCourse(course._id);
          course.isApproved = true;
          toast.success(`Course "${course.title}" approved successfully`);
        } else {
          await cancelCourse(course._id);
          course.isApproved = false;
          toast.success(`Course "${course.title}" unapproved successfully`);
        }

        setCourselist([...courseList]);
      }
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error("Error");
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = courseList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

      {!openPopUp && (
        <>
          <p className="studentlistheading">
            <ImArrowRight /> <u>Course List</u>
          </p>

          <Table className="mt-5 ms-5" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Instructor</th>
                <th>isApproved</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>
                  <td>{course?.category.title}</td>
                  <td>{course?.description}</td>
                  <td>{course?.duration}</td>
                  <td>{course?.instructor?.name}</td>
                  <td>
                    {!course?.instructor?.isBlocked ? (
                      course?.isApproved ? (
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => {
                            courseStatus(course);
                          }}
                        >
                          Approved
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            courseStatus(course);
                          }}
                        >
                          Unapproved
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          courseStatus(course);
                        }}
                      >
                        Unapproved
                      </Button>
                    )}
                  </td>
                  <td>{course?.price}</td>
                  <td>
                    <img
                      src={`${Image_Url}/${course?.photo}`}
                      alt="sample"
                      style={{ width: "40px" }}
                    />
                  </td>
                  <td>
                    <AiFillEdit onClick={() => handleEditCourse(course._id)} />
                  </td>
                  <td>
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
          <EditCourseForm
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
          containerClassName={"pagination"} // Remove one of the containerClassName attributes
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default CourseTable;
