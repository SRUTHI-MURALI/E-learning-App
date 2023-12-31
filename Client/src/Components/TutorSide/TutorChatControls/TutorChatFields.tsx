import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./TutorChatInputs";
import { v4 as uuidv4 } from "uuid";
import {
  receiveMessage,
  sendMessage,
} from "../../StudentSide/AxiosConfigStudents/AxiosConfig";

interface Message {
  fromSelf: boolean;
  message: string;
}

interface TutorData {
  _id: string;
  // Add other relevant properties
}

interface CurrentChat {
  studentDetails: {
    _id: string;
    avatarImage: string; // or any other type
  };
  name: string;
}

interface TutorChatFieldsProps {
  currentChat: CurrentChat | null;
  socket: React.MutableRefObject<any>; // Replace 'any' with the actual socket type
}

export default function TutorChatFields({
  currentChat,
  socket,
}: TutorChatFieldsProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorDetails = localStorage.getItem("tutorData");
        const tutor = tutorDetails ? JSON.parse(tutorDetails) : null;

        const response = await receiveMessage(
          tutor?._id || "",
          currentChat?.studentDetails?._id || ""
        );
        setMessages(response?.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        const tutorDetails = localStorage.getItem("tutorData");
        await JSON.parse(tutorDetails || "{}")._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    const tutorDetails = localStorage.getItem("tutorData");
    const data: TutorData | null = JSON.parse(tutorDetails || "{}");

    socket.current.emit("send-msg", {
      to: currentChat?.studentDetails?._id,
      from: data?._id,
      msg,
    });

    await sendMessage(data?._id || "", currentChat?.studentDetails?._id || "", msg);

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat?.studentDetails?.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat?.name}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={uuidv4()} ref={index === messages.length - 1 ? scrollRef : null}>
            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
              <div className="content ">
                <p>{message?.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
      
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: .9rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
        
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
       
      }
    }
  }
`;
