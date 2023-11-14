import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";
import StudentPdfLessons from "./StudentPdfLessons";

interface Course {
  _id: string;
  title: string;
  photo: string;
  courseLessons: any[]; 
  instructor: {
    name: string;
  };
}

function StudentPdfCourses() {
  const [allCourseList, setAllCourseList] = useState<Course[]>([]);
  const [show, setShow] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string[] | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourses();
        setAllCourseList(response.data.allCourses);
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, []);

  const handleQuiz = async (id: any) => {
    setSelectedCourseId(id);
    setShow(true);
  };

  return (
    <Row>
      <Container style={{ marginTop: "120px" }}>
        <h4 style={{ fontFamily: "Vollkorn serif", color: "white", fontStyle: "italic" }} className="m-3">
          PDF Downloads
        </h4>
        {show === false ? (
          <>
            <div className="row">
              <div style={{ cursor: "pointer" }} className="row mt-3">
                {allCourseList.map((courses) => (
                  <React.Fragment key={courses._id}>
                    <div className="col-md-2 mt-4">
                      <img
                        className="bg-white mt-2"
                        src={`${Image_Url}/${courses?.photo}`}
                        style={{ width: "10rem" }}
                        alt=""
                        onClick={() => {
                          handleQuiz(courses._id);
                        }}
                      />
                    </div>
                    <div onClick={() => { handleQuiz(courses._id); }} className="col-lg-2 mt-5">
                      <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>Title: {courses?.title}</h5>
                      <h6 style={{ fontFamily: "Vollkorn serif", color: "white" }}> By : {courses?.instructor?.name}</h6>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        ) : (
          <StudentPdfLessons courseId={selectedCourseId} />
        )}
      </Container>
    </Row>
  );
}

export default StudentPdfCourses;
