import { useState, useEffect } from "react";
import styled from "styled-components";

interface Contact {
  _id: string;
  name: string;
  // Add other properties as needed
}

interface ChatContactsProps {
  contacts: Contact[];
  changeChat: (contact: Contact) => void;
}

export default function ChatContacts({ contacts, changeChat }: ChatContactsProps) {
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const students = localStorage.getItem("studentData");
        const userData = students ? JSON.parse(students) : null;

        if (userData) {
          setCurrentUserName(userData.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  const changeCurrentChat = (index: number, contact: Contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Container>
      {currentUserName && (
        <>
          <div className="brand"></div>
          <div className="contacts">
            <h1 style={{ color: 'white' }}>Our Teachers</h1>
            <div className="d-flex flex-column">
              {contacts.map((contact, index) => (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""} m-4`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  //... (your existing styling)
`;

