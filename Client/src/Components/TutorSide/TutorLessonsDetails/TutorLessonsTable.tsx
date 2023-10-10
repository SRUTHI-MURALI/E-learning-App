import Table from "react-bootstrap/Table";
import { ImArrowRight } from "react-icons/im";
import { TiTickOutline } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import "../../AdminSIde/CourseDetails/CourseTable.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Video_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import AddLesson from "../TutorAddCourse/AddLesson";
import Swal from "sweetalert2";
import {
  activateLesson,
  getAllLessons,
  inactivateLesson,
} from "../AxiosConfigInstructors/AxiosConfig";

function TutorLessonsTable() {
  const [lessonsList, setLessonslist] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);

  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 5;

  const { id } = useParams();

  useEffect(() => {
    const getLessons = async (id: string) => {
      try {
        await getAllLessons(id).then((response) => {
          setLessonslist(response.data.allLessons);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getLessons(id);
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleOpenAddForm = async () => {
    setOpenPopUp(true);
  };
  const handleOnClose = async () => {
    setOpenPopUp(false);
  };

  const activeStatus = async (lessons: any) => {
    try {
      // Display a confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          lessons.isActive ? "Disable" : "Activate"
        } the lesson "${lessons.title}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const courseId = id;
        if (!lessons.isActive) {
          await activateLesson(lessons._id, courseId);

          lessons.isActive = true;
          toast.success(`lessons "${lessons.title}" activated successfully`);
        } else {
          await inactivateLesson(lessons._id, courseId);
          lessons.isActive = false;
          toast.success(`lesson "${lessons.title}" disabled successfully`);
        }

        setLessonslist([...lessonsList]);
      }
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error("Error");
    }
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = lessonsList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {openPopUp == false && (
        <>
          <Row>
            <Row>
              <Col>
                <p className="studentlistheading">
                  <ImArrowRight /> <u>Lessons List</u>
                </p>
              </Col>
              <Col>
                <Button
                  onClick={handleOpenAddForm}
                  type="submit"
                  className="addcategorylist"
                >
                  Add Lessons
                </Button>
              </Col>
            </Row>
            <Col>
              <Table className="mt-5 ms-5" striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>PDF Download</th>
                    <th>Video</th>
                    <th>isActive</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((lessons, index) => (
                    <tr key={lessons._id}>
                      <td>{index + 1}</td>
                      <td>{lessons?.title}</td>
                      <td>{lessons?.description}</td>
                      <td>{lessons?.duration}</td>
                      <td>
                        {lessons?.pdf && (
                          <a
                            href={lessons?.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            download // Add 'download' attribute to trigger the download
                          >
                            Download PDF
                          </a>
                        )}
                      </td>
                      <td>
                        <video
                          src={`${Video_Url}/${lessons?.video}`}
                          alt="sample"
                          style={{ width: "40px" }}
                          controls
                        />{" "}
                      </td>
                      <td>
                        {lessons?.isActive ? (
                          <>
                            <TiTickOutline />
                            <Button
                              style={{ marginLeft: "30px" }}
                              onClick={() => {
                                activeStatus(lessons);
                              }}
                            >
                              {" "}
                              Disable
                            </Button>
                          </>
                        ) : (
                          <>
                            <AiOutlineClose />
                            <Button
                              style={{ marginLeft: "30px" }}
                              onClick={() => {
                                activeStatus(lessons);
                              }}
                            >
                              Activate
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
      {openPopUp && (
        <div>
          <AddLesson courseId={id} onClose={handleOnClose} />
        </div>
      )}

      {openPopUp == false && (
        <div style={{ float: "right", margin: "3px" }}>
          <ReactPaginate
            previousLabel={"Previous "}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(lessonsList.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"} // Remove one of the containerClassName attributes
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
}

export default TutorLessonsTable;
