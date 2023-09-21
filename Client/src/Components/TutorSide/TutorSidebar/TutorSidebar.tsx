import React from 'react'
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, 
  }
 from 'react-icons/bs'
 import l1 from '../../../Assets/Images/carouselBody/l1.jpeg'
 import '../Css/Tutor.css'
import { Row ,Col} from 'react-bootstrap'
 
function TutorSidebar() {
  return (
    <Row>
        <Col>
        <aside id="sidebar" className= "sidebar-responsive">
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img style={{height:'150px'}} src={l1} />
            </div>
            
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/tutorallcourses">
                    <BsFillArchiveFill className='icon'/> Courses
                </a>
            </li>
           
            <li className='sidebar-list-item'>
                <a href="/tutorstudentslist">
                <BsPeopleFill className='icon'/> Students   
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/addcourse">
                    <BsFillArchiveFill className='icon'/> Add Course
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/tutorquizlist">
                <BsPeopleFill className='icon'/> Quizes   
                </a>
            </li>
            
        </ul>
    </aside>
   
        </Col>
    </Row>
  )
}

export default TutorSidebar

