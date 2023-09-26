import React from "react";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";

function TutorHome() {
  return (
    <div className="grid-container">
      <TutorHeader />
      <TutorSidebar />
    </div>
  );
}

export default TutorHome;
