import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from '../../../../Assets/Images/carouselBody/l1.jpeg'
import './TutorSideBar.css';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TutorSideBar() {
  const [categories, setCategories] = useState([]);

    

    useEffect(() => {
      axios.get('http://localhost:3002/tutor/getCourseCategory')
        .then((response) => {
          console.log(response.data);
          setCategories(response.data.Category);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  return (
    <div className='sidebar-container'>
        <Sidebar className='tutorSidebar'>
        <img className='tutorlogo' src={logo} alt="Tutor Logo" />
        <Menu className='tutorsidebarMenu'>
        <SubMenu label='My Courses'>
      {
        categories.map((category) => (
          // Use parentheses to return JSX
          <MenuItem key={category.id}>{category.title}</MenuItem>
        )
        )}
      
        
    </SubMenu>
          <MenuItem> <Link to="/tutorcreatecourse">Create Course</Link> </MenuItem>
          <MenuItem>Add Lessons</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default TutorSideBar;
