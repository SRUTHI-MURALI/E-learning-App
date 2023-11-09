import  { useState, useEffect } from "react";
import styled from "styled-components";


export default function TutorChatWelcome() {
  const [userName, setUserName] = useState("");


  useEffect(() => {
    async function fetchUserName() {
      try {
        const userData = localStorage.getItem("tutorData");
        if (userData) {
          const tutor = JSON.parse(userData);
          

          setUserName(tutor);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserName();
  }, []);

  return (
    <Container>
      {/* <img src={} alt="" /> */}
      <h1>
        Welcome, <span>{userName?.name}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color:black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;