import Carousel from "react-bootstrap/Carousel";
import c3 from "../../../../Assets/Images/img1.avif";
import c4 from "../../../../Assets/Images/img2.avif";

import c5 from "../../../../Assets/Images/kk.jpg";
import "./BodyCarousel.css";


function  BodyCarousel() {
  return (
    <div className="bodyContainer">
      <Carousel>
        <Carousel.Item >
          <img className="bodyCarouselImg" style={{height:'40rem'}} src={c5} />
          
        </Carousel.Item>
        <Carousel.Item >
          <img className="bodyCarouselImg" style={{height:'40rem'}} src={c4} />
          
        </Carousel.Item>
        <Carousel.Item >
          <img className="bodyCarouselImg" style={{height:'40rem'}} src={c3} />
          
        </Carousel.Item>
       
      </Carousel>
    </div>
  );
}

export default BodyCarousel;
