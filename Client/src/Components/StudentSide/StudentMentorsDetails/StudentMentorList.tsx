import  { useEffect, useState, useRef } from "react";
import { getInstructors } from "../AxiosConfigStudents/AxiosConfig";
import { Button, Container, Row } from "react-bootstrap";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Image_Url } from "../../../Config/Config";
import "./studentMentor.css";

interface StudentMentorsListProps {
  studentData: {
    _id: string;
    name: string;
  };
}

function StudentMentorList({ studentData }: StudentMentorsListProps) {
  const [tutorDetails, setTutorDetails] = useState<any[]>([]);
  const [showCall, setShowCall] = useState(false);
  const studentMeetingContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleUnload = () => {
      setShowCall(false);
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  function generateToken(tokenServerUrl: string, userID: string) {
    // Obtain the token interface provided by the App Server
    return fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }

  const handleMentoring = async (tutorid: string) => {
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
          studentData?.name
        );

        const zp = ZegoUIKitPrebuilt.create(token);

        zp.joinRoom({
          container: studentMeetingContainerRef.current!,
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
    <Container style={{ marginTop: "120px" }}>
      <Row>
        {showCall === false ? (
          <Container>
            <>
              {tutorDetails.map((tutor) => (
                <div className="row" key={tutor?._id}>
                  <div className="row mt-3">
                    <div className="col-md-2">
                      <img
                        className="bg-white mt-2"
                        src={`${Image_Url}/${tutor?.photo}`}
                        style={{ width: "100px" }}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-8">
                      <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>
                        NAME: {tutor?.name}
                      </h5>
                      <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>
                        Qualification: {tutor?.qualification}
                      </h5>
                      <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>
                        Experience: {tutor?.experience}
                      </h5>
                      <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>
                        Online Duration: {tutor?.startOnline} am to {tutor?.onlineEnd} pm
                      </h5>
                    </div>
                    <div className="col-lg-2">
                      <Button
                        variant="primary"
                        type="submit"
                        className="me-5 join-button"
                        size="lg"
                        onClick={() => {
                          handleMentoring(tutor._id);
                        }}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
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
