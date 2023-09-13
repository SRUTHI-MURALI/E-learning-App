
import Table from 'react-bootstrap/Table';
import {AiFillEdit} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im'
import {useState,useEffect} from 'react'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import EditCourseTutorForm from './EditCourseTutorForm';

function TutorCourseTable() {
 
  
    const courseimageurl="https://res.cloudinary.com/dnkc0odiw/image/upload/v1694350814/"
    const[courseList,setCourselist]=useState([])
    const [openPopUp, setOpenPopUp] = useState(false);
    const[courseId,setCourseId]=useState('')

    
    useEffect(() => {
        axios.get('http://localhost:3002/tutor/getallcourses')
          .then((response) => {
          
            setCourselist(response.data.allCourses);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  
        const handleEditCourse = async (Id)=>{
            
            setCourseId(Id)
            
            setOpenPopUp(true);
        }
       
        
        
    
          
  return (

    <div>
       <ToastContainer position='top-center' autoClose={3000}></ToastContainer>

       {openPopUp== false && (
        <>
      <p className='studentlistheading' ><ImArrowRight /> <u>Course List</u></p>
     
      <Table className='mt-5 ms-5' striped bordered hover size="sm">
      <thead>
        <tr >
          <th>#</th>
          <th > Title</th>
          <th >Category</th>
          <th>Description</th>
          <th>Duration</th>
          <th>isApproved</th>
          <th>Price</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Lessons</th>
        </tr>
      </thead>
      <tbody>
          {courseList.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.category.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>
                {course.isApproved ? (
                  <Button variant='info' size="sm" >Approved</Button>
                ) : (
                  <Button variant='secondary' size="sm" >UnApproved</Button>
                )}
              </td>
              <td>{course.price}</td>
              <td><img src={`${courseimageurl}/${course.photo}`} alt='sample' style={{width:"40px"}}/> </td>
              <td><AiFillEdit onClick={() => handleEditCourse(course._id)}/></td>
              <td> <Button variant="link">Lessons</Button></td>
            </tr>
          ))}
        </tbody>
    </Table>
    </>
   )}
    {openPopUp && (
        <div>
            
          <EditCourseTutorForm courseId={courseId} onCloseEdit={()=> setOpenPopUp(false)}/>
          
          
        </div>
      )}
    </div>
  )
}

export default TutorCourseTable


