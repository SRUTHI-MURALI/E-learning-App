import React from 'react'
import 
{ BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  }
 from 'react-icons/bs'
 import '../Css/Admin.css'
 import l1 from '../../../Assets/Images/carouselBody/l1.jpeg'


 

function AdminSidebar() {
  return (
    <aside id="sidebar" className= "sidebar-responsive">
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img style={{height:'150px'}} src={l1}   />
            </div>
            
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="allCoursesList">
                    <BsFillArchiveFill className='icon'/> Courses
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="courseCategoryList">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="instructorsList">
                <BsPeopleFill className='icon'/> Instructors
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/studentsList">
                <BsPeopleFill className='icon'/> Students   
                </a>
            </li>
            
            
            
        </ul>
    </aside>
  )
}

export default AdminSidebar