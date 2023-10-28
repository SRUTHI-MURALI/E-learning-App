import React, { useState, useEffect } from "react";
import { ImArrowRight } from "react-icons/im";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddQuiz from "./AddQuiz";
import { getAllCourses } from "../AxiosConfigInstructors/AxiosConfig";

import ViewQuiz from "./ViewQuiz";

function TutorQuizTable() {
  const [courseList, setCourseList] = useState([]);
  const [addQuiz, setAddQuiz] = useState(false);
  const [questions,setQuestions]= useState([])
  const [courseId, setCourseId] = useState("");
  const [quiz,setQuiz] = useState([])
  const [view,setView]= useState(false)
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10;

  const tutorData = localStorage.getItem("tutorData");
  const parseData = JSON.parse(tutorData);

  const handleAddQuiz = async (courseId) => {
    setCourseId(courseId);
    setAddQuiz(true);
  };
  const onCloseQuiz= async ()=>{
    setView(false)
  }
  const handleOnClose = async () => {
    setAddQuiz(false);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourseList(response.data.allCourses);
        setQuiz(response.data.quizQuestions)
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [addQuiz]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleView = async (courseId)=>{
    const questionSet= quiz.map((quiz)=>{
      if(quiz?.course=== courseId) {
        return quiz
      }
    })
  
    setQuestions(questionSet)
    setView(true)
  
  }

 
  const offset = currentPage * itemsPerPage;
  const paginatedData = courseList.slice(offset, offset + itemsPerPage);
  return (
    <div>
      <p className="tutorstudentlistheading">
        <ImArrowRight /> <u>Question List</u>
      </p>

      {!addQuiz && !view ? (
        <>
          <Table className="mt-5 ms-5" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              
                <th>View</th>
                <th> Add</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((course, index) => (

                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>             
              
                  <td><Button onClick={()=>handleView(course._id)}>view</Button></td>
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
              containerClassName={"pagination"} 
              activeClassName={"active"}
            />
          </div>
        </>
      ) : ( !view ? (<AddQuiz courseId={courseId} onClose={handleOnClose} />):(
        <ViewQuiz quiz={questions} onClose={onCloseQuiz} />
      )
        
      )}
    </div>
  );
}

export default TutorQuizTable;
