import Carousel from 'react-bootstrap/Carousel';
import c3 from '../../../Assets/Images/carouselBody/c3.jpeg'
import c4 from '../../../Assets/Images/carouselBody/c4.jpeg'
import c2 from '../../../Assets/Images/carouselBody/c2.jpeg'
import c1 from '../../../Assets/Images/carouselBody/c1.webp'
import './BodyCarousel.css'
import Container from 'react-bootstrap/Container';

function BodyCarousel() {
  return (
    <Container>
    <Carousel>
      <Carousel.Item>
       <img className='bodyCarouselImg' src={c3} />
        
      </Carousel.Item>
      <Carousel.Item>
       <img className='bodyCarouselImg' src={c4}/>
      
        
      </Carousel.Item>
      <Carousel.Item>
       <img className='bodyCarouselImg' src={c2}/>
        
      </Carousel.Item>
      <Carousel.Item>
       <img className='bodyCarouselImg' src={c1}/>
        
      </Carousel.Item>
    </Carousel>
    </Container>
  );
}

export default BodyCarousel;