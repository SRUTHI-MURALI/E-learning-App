import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../Assets/Images/carouselBody/l1.jpeg'
import './TutorSideBar.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';

function TutorSideBar() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:3002/tutor/getCourseCategory');
            setCategories(res.data);
          
           
            
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData(); // Call the fetchData function when the component mounts
      }, [categories]);
     
    
  return (
    <div className='sidebar-container'>
        <Sidebar className='tutorSidebar'>
        <img className='tutorlogo' src={logo} alt="Tutor Logo" />
        <Menu className='tutorsidebarMenu'>
          <SubMenu  label="My Courses">
          <MenuItem> MERN </MenuItem>
          <MenuItem>PYTHON</MenuItem>
          </SubMenu>
          <MenuItem> Create Course </MenuItem>
          <MenuItem>Add Lessons</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default TutorSideBar;
