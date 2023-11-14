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
  // Your styles here
`;

