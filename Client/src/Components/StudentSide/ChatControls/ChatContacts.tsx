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
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  border-radius: 1rem;
  background-color:  rgb(101, 118, 159);
  
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
