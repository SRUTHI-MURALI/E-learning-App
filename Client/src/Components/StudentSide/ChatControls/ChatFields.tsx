import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInputs";
import { v4 as uuidv4 } from "uuid";
import { receiveMessage, sendMessage } from "../AxiosConfigStudents/AxiosConfig";

interface Message {
  fromSelf: boolean;
  message: string;
}

interface ChatFieldsProps {
  currentChat: any;
  socket: React.MutableRefObject<any>;
}

export default function ChatFields({ currentChat, socket }: ChatFieldsProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentDetails = localStorage.getItem("studentData");
        const students = studentDetails ? JSON.parse(studentDetails) : null;

        const response = await receiveMessage(students?._id, currentChat?._id);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        const studentDetails = localStorage.getItem("studentData");
        studentDetails ? await JSON.parse(studentDetails)._id : null;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg: string) => {
    const studentDetails = localStorage.getItem("studentData");
    const data = studentDetails ? await JSON.parse(studentDetails) : null;
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: data?._id,
      msg,
    });

    await sendMessage(data?._id, currentChat?._id, msg);

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
  }, [socket]);

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
              src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "received"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
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
