import  { useState, useEffect } from "react";
import styled from "styled-components";

interface Contact {
  _id: string;
  studentDetails: {
    email: string;
    // Add other relevant properties
  };
}

interface TutorChatContactsProps {
  contacts: Contact[];
  changeChat: (contact: Contact) => void;
}

export default function TutorChatContacts({
  contacts,
  changeChat,
}: TutorChatContactsProps) {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const tutor = localStorage.getItem("tutorData");
        const userData = tutor ? JSON.parse(tutor) : null;

        if (userData) {
          setCurrentUserName(userData?.name);
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

  useEffect(() => {
    const uniqueContacts = contacts.reduce((accumulator: Contact[], contact) => {
      const existingContact = accumulator.find(
        (item) => item._id === contact._id
      );

      if (!existingContact) {
        accumulator.push(contact);
      }

      return accumulator;
    }, []);

    setAllContacts(uniqueContacts);
  }, [contacts]);

  return (
    <Container>
      {currentUserName && (
        <>
          <div className="brand">
            {/* Your brand content */}
          </div>
          <div className="contacts">
            <h1 style={{ color: "white" }}>Students</h1>
            {allContacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <h3>{contact?.studentDetails?.email}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  // Your styling here
`;
