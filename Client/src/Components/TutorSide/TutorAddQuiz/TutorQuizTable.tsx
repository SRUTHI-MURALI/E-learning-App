import React, { useState, useEffect } from "react";
import axios from "axios";
import { Base_Url } from "../../../Config/Config";
import { ImArrowRight } from "react-icons/im";
import { Button, Table } from "react-bootstrap";

import ReactPaginate from "react-paginate";
import AddQuiz from "./AddQuiz";

function TutorQuizTable() {
  const [courseList, setCourseList] = useState([]);
  const [addQuiz, setAddQuiz] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10;

  const tutorData = localStorage.getItem("tutorData");
  const parseData = JSON.parse(tutorData);

  const handleAddQuiz = async (courseId) => {
    setCourseId(courseId);
    setAddQuiz(true);
  };

  const handleOnClose = async () => {
    setAddQuiz(false);
  };

  useEffect(() => {
    axios
      .get(`${Base_Url}/tutor/getallcourses`)
      .then((response) => {
        setCourseList(response.data.allCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [addQuiz]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = courseList.slice(offset, offset + itemsPerPage);
  return (
    <div>
      <p className="tutorstudentlistheading">
        <ImArrowRight /> <u>Question List</u>
      </p>

      {!addQuiz ? (
        <>
          <Table className="mt-5 ms-5" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total Questions</th>
                <th>View</th>
                <th> Add</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>
                  <td>{course?.quizQuestions}</td>
                  <td></td>
                  <td>
                    <Button onClick={() => handleAddQuiz(course._id)}>
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

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
        </>
      ) : (
        <AddQuiz courseId={courseId} onClose={handleOnClose} />
      )}
    </div>
  );
}

export default TutorQuizTable;
