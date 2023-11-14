import  { useState, useEffect } from "react";
import { ImArrowRight } from "react-icons/im";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import AddQuiz from "./AddQuiz";
import { getAllCourses } from "../AxiosConfigInstructors/AxiosConfig";
import ViewQuiz from "./ViewQuiz";

interface Course {
  _id: string;
  title: string;
}

interface QuizQuestion {
  _id: string;
  course: string;
  
  // Add other quiz question properties as needed
}

function TutorQuizTable() {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [addQuiz, setAddQuiz] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [view, setView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10;

  const handleAddQuiz = async (courseId: string) => {
    setCourseId(courseId);
    setAddQuiz(true);
  };

  const onCloseQuiz = async () => {
    setView(false);
  };

  const handleOnClose = async () => {
    setAddQuiz(false);
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourseList(response.data.allCourses);
        setQuiz(response.data.quizQuestions);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [addQuiz]);

  const handlePageChange = ({ selected }: { selected: number })=> {
    setCurrentPage(selected);
  };

  const handleView = async (courseId: string) => {
    const questionSet = quiz.filter((quiz) => quiz?.course === courseId);
    setQuestions(questionSet);
    setView(true);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedData = courseList.slice(offset, offset + itemsPerPage);

  return (
    <div style={{ marginTop: "7rem" }}>
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
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course?.title}</td>
                  <td>
                    <Button onClick={() => handleView(course._id)}>view</Button>
                  </td>
                  <td>
                    <Button onClick={() => handleAddQuiz(course._id)}>Add</Button>
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
      ) : (
        !view ? (
          <AddQuiz courseId={courseId} onClose={handleOnClose} />
        ) : (
          <ViewQuiz quiz={questions} onClose={onCloseQuiz} />
        )
      )}
    </div>
  );
}

export default TutorQuizTable;
