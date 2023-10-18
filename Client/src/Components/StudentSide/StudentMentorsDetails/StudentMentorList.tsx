import React, { useEffect, useState, useRef } from "react";
import { getInstructors } from "../AxiosConfigStudents/AxiosConfig";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import t1 from "../../../Assets/Images/tutors/t1.avif";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Image_Url } from "../../../Config/Config";

interface StudentMentorsListProps {
  studentData: object;
}
function StudentMentorList({ studentData }: StudentMentorsListProps) {
  const [tutorDetails, setTutorDetails] = useState([]);
  const [showCall, setShowCall] = useState(false);
  const studentMeetingContainerRef = useRef(null);

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

  function generateToken(tokenServerUrl, userID) {
    // Obtain the token interface provided by the App Server
    return fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }
  const handleMentoring = async (tutorid) => {
    const tutorID = tutorid;

    const studentID = studentData._id;

    if (tutorID) {
      await generateToken(
        "https://nextjs-token.vercel.app/api",
        studentID
      ).then((res) => {
        const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1484647939,
          res.token,
          tutorID,
          studentID,
          studentData.name
        );

        const zp = ZegoUIKitPrebuilt.create(token);

        zp.joinRoom({
          container: studentMeetingContainerRef.current,
          sharedLinks: [
            {
              name: "Personal link",
              url: window.location.href,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          showTurnOffRemoteCameraButton: true,
          showTurnOffRemoteMicrophoneButton: true,
          showRemoveUserButton: true,
        });
      });
    }
    setShowCall(true);
  };
  return (
    <Container>
      <Row>
        {showCall == false ? (
          <Container>
            <>
              {tutorDetails.map((tutor, index) => (
                <Card className="m-3 ">
                  <>
                    <Row>
                      <Col key={tutor?._id} xs={12} md={2}>
                        <Card.Img src={`${Image_Url}/${tutor?.photo}`} style={{ width: "180px" }} />
                      </Col>
                      <Col xs={12} md={10}>
                        <Card.Body>
                          <Col xs={12} md={5}>
                            <Card.Title>NAME: {tutor?.name}</Card.Title>
                            <Card.Text>
                              SUBJECT: {tutor?.qualification}
                            </Card.Text>
                            <Card.Text>
                              Experience: {tutor?.experience}
                            </Card.Text>
                            <Card.Text>Duration: {tutor?.time}</Card.Text>
                          </Col>
                          <Col xs={12} md={5}>
                            <Button
                              variant="primary"
                              type="submit"
                              className="float-end"
                              onClick={() => {
                                handleMentoring(tutor._id);
                              }}
                            >
                              Join
                            </Button>
                          </Col>
                        </Card.Body>
                      </Col>
                    </Row>
                  </>
                </Card>
              ))}
            </>
          </Container>
        ) : (
          <div
            className="studentCallContainer"
            ref={studentMeetingContainerRef}
            style={{ width: "100vw", height: "100vh" }}
          >
            Student Meeting Container
          </div>
        )}
      </Row>
    </Container>
  );
}

export default StudentMentorList;
