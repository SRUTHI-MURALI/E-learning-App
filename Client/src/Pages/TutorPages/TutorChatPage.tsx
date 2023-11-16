import  { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { Base_Url } from "../../Config/Config";

import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorChatContacts from "../../Components/TutorSide/TutorChatControls/TutorChatContacts";
import TutorChatFields from "../../Components/TutorSide/TutorChatControls/TutorChatFields";
import TutorChatWelcome from "../../Components/TutorSide/TutorChatControls/TutorChatWelcome";
import { getEnrolledStudents } from "../../Components/TutorSide/AxiosConfigInstructors/AxiosConfig";

interface Tutor {
  _id: string;
  // Add other properties as needed
}

interface Contact {
  _id: string;
  name:string;
  studentDetails: {
    name: string;
    // Add other relevant properties
  };
}

export default function TutorChatPage() {
  const navigate = useNavigate();
  const socket = useRef<Socket | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentChat, setCurrentChat] = useState<any | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<Tutor | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const tutorDetails = localStorage.getItem("tutorData");

        if (!tutorDetails) {
          navigate("/tutorlogin");
        } else {
          setCurrentUser(JSON.parse(tutorDetails));
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
          const response = await getEnrolledStudents(currentUser._id);
          console.log(response,'contacts');
          
          setContacts(response.data.filteredOrders);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat: Contact) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <TutorHeader />
      <Container style={{ marginTop: "5rem" }}>
        <div className="container">
          <TutorChatContacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <TutorChatWelcome />
          ) : (
            <TutorChatFields currentChat={currentChat} socket={socket} />
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
