import { Container } from "react-bootstrap";

import quiz from "../../../../Assets/Images/carouselBody/quiz.jpeg";
import QA from "../../../../Assets/Images/carouselBody/Q&A.jpeg";
import pdf from "../../../../Assets/Images/carouselBody/pdf.png";
import mentor from "../../../../Assets/Images/carouselBody/mentor.webp";
import "./Cards.css";

import { Link } from "react-router-dom";

function BasicExample() {
  return (
    <>
      <Container className="mt-5">
        <h1
          className="text-center text-white"
          style={{ textDecoration: "underline"}}
        >
          Our Best Services
        </h1>
      </Container>
      <div className="container mt-5">
    <div className="row">
     
     <div className="col-lg-6">
     <Link to={"/studentquizpage"}  style={{textDecoration:'none'}}>
            <div className="row mt-3">
                <div className="col-md-2 ">
                    <img className="bg-white mt-2"
                        src={quiz} style={{width:'4rem'}}
                        alt=""
                    />
                </div>
                <div className="col-lg-10">
                <h4 style={{fontFamily:"Vollkorn serif",color:'white'}}>Learn Through Quizes</h4>
                    <p style={{color:"#5B5B5B",fontFamily:"Open Sans sans-serif"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscg elit. Donec id diam dapibus, sodales odio quis, fringilla mauris. In ut egestas orci. Nullam vel laoreet dui. Sed est quam, blandit quis sapien sed,
                    </p>
                </div>
            </div>
            </Link>
        </div>
    
        <div className="col-lg-6">
           <Link to="/studentpdfs" style={{textDecoration:'none'}}>
           <div className="row mt-3">
                <div className="col-md-2">
                <img className="bg-white mt-2"
                        src={pdf} style={{width:'4rem'}}
                        alt=""
                    />
                </div>
                <div className="col-lg-10">
                    <h4 style={{fontFamily:"Vollkorn serif", color:'white'}}>Download PDF Notes</h4>
                    <p style={{color:"#5B5B5B",fontFamily:"Open Sans sans-serif"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscg elit. Donec id diam dapibus, sodales odio quis, fringilla mauris. In ut egestas orci. Nullam vel laoreet dui. Sed est quam, blandit quis sapien sed,
                    </p>
                </div>
            </div>
           </Link>
        </div>
        <div className="col-lg-6">
        <Link to="/chat" style={{textDecoration:'none'}}>
           <div className="row mt-3">
                <div className="col-md-2 ">
                <img className="bg-white mt-2"
                        src={QA} style={{width:'4rem'}}
                        alt=""
                    />
                </div>
                <div className="col-lg-10">
                <h4 style={{fontFamily:"Vollkorn serif",color:'white'}}>Ask Your Doubts Anytime</h4>
                    <p style={{color:"#5B5B5B",fontFamily:"Open Sans sans-serif"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscg elit. Donec id diam dapibus, sodales odio quis, fringilla mauris. In ut egestas orci. Nullam vel laoreet dui. Sed est quam, blandit quis sapien sed,
                    </p>
                </div>
            </div>
           </Link>
        </div>
        <div className="col-lg-6">
        <Link to="/mentoring" style={{textDecoration:'none'}}>
            <div className="row mt-3">
                <div className="col-md-2 ">
                    <img className="bg-white mt-2"
                        src={mentor} style={{width:'4rem'}}
                        alt=""
                    />
                </div>
                <div className="col-lg-10">
                <h4 style={{fontFamily:"Vollkorn serif",color:'white'}}>One-to-One Mentoring</h4>
                    <p style={{color:"#5B5B5B",fontFamily:"Open Sans sans-serif"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscg elit. Donec id diam dapibus, sodales odio quis, fringilla mauris. In ut egestas orci. Nullam vel laoreet dui. Sed est quam, blandit quis sapien sed,
                    </p>
                </div>
            </div>
            </Link>
        </div>
    </div>
</div>

    </>
  );
}

export default BasicExample;
