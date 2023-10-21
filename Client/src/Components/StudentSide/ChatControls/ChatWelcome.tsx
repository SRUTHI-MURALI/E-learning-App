import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function ChatWelcome() {
  const [userName, setUserName] = useState("");


  useEffect(() => {
    async function fetchUserName() {
      try {
        const userData = localStorage.getItem("studentData");
        if (userData) {
          const student = JSON.parse(userData);
          

          setUserName(student);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserName();
  }, []);

  return (
    <Container>
    {/* Add an optional responsive image */}
    {/* <img src={} alt="" /> */}
    
    <h1>
      Welcome, <span>{userName?.name}!</span>
    </h1>
    
    <h3 className="text-center">
      Please select a chat to start messaging.
    </h3>
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