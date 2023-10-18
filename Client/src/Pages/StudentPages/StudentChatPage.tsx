import  { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

import ChatFields from "../../Components/StudentSide/ChatControls/ChatFields"
import ChatContacts from "../../Components/StudentSide/ChatControls/ChatContacts";
import ChatWelcome from "../../Components/StudentSide/ChatControls/ChatWelcome";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import { Base_Url } from "../../Config/Config";
import { getInstructors } from "../../Components/StudentSide/AxiosConfigStudents/AxiosConfig";

export default function StudentChatPage() {
  const navigate = useNavigate();
  const socket = useRef(null);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const students = localStorage.getItem("studentData");
        
        if (!students) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(students));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(Base_Url);
      socket.current.emit("add-user", currentUser._id);
    }
    
    return () => {
      
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        if (currentUser) {
          const response = await getInstructors();
          setContacts(response.data.tutorDetails);  
        } 
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);
  

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
console.log(currentChat,'chat');


  return (
    <>
    <StudentHeader/>
    <Container>
      <div className="container">
      
        <ChatContacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <ChatWelcome />
        ) : (
          <ChatFields currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: white;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;