
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logo from '../../../Assets/Images/carouselBody/l1.jpeg';
import { Link } from 'react-router-dom';
import './AdminSidebar.css'
import { Button } from 'react-bootstrap';

function AdminSidebar() {
  return (
    
       <div className='sidebar-container' >
        <Sidebar className='tutorSidebar'>
        <img className='tutorlogo' src={logo} alt="Tutor Logo" />
        <Menu className='tutorsidebarMenu'>
        <MenuItem> <Link to="/studentsList">Students</Link> </MenuItem>
        <MenuItem><Link to="/instructorsList">Instructors</Link></MenuItem>
        
        <MenuItem><Link to='/adminlogin'><Button className='m-3'>Logout</Button></Link></MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default AdminSidebar
