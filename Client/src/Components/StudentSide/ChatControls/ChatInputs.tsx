import { useState } from "react";

import { IoMdSend } from "react-icons/io";
import styled from "styled-components";


export default function ChatInputs({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  
  
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
    <form className="input-container ms-5" onSubmit={(event) => sendChat(event)}>
      <div className="row">
        <div className="col-lg-8 col-md-8">
          <input
            style={{ borderRadius: '8px', height: '50px', width: '70%', maxWidth: '550px', textAlign:'center'}}
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
        </div>
        <div className="col-lg-4 col-md-4">
          <button type="submit" className="btn btn-primary">
            <IoMdSend />
          </button>
        </div>
      </div>
    </form>
  </Container>
  
  );
}

const Container = styled.div`

  
  
 
  
 

  

  
};
`