import React from 'react'
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, 
  }
 from 'react-icons/bs'
 import l1 from '../../../Assets/Images/carouselBody/l1.jpeg'
 import '../Css/Tutor.css'
 
function TutorSidebar() {
  return (
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
                <a href="/studentsList">
                <BsPeopleFill className='icon'/> Students   
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/addcourse">
                    <BsFillArchiveFill className='icon'/> Add Course
                </a>
            </li>
            
            
        </ul>
    </aside>
  )
}

export default TutorSidebar