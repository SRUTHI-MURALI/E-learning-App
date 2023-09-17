
import Table from 'react-bootstrap/Table';
import {AiFillEdit} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './CourseTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditCourseForm from './EditCourseForm';
import { Button } from 'react-bootstrap';
import { Base_Url,Image_Url } from '../../../Config/Config';
import ReactPaginate from 'react-paginate'; 

function CourseTable() {
    
    const[courseList,setCourselist]=useState([])
    const [openPopUp, setOpenPopUp] = useState(false);
    const[courseId,setCourseId]=useState('')
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const itemsPerPage = 5;

    
    useEffect(() => {
        axios.get(`${Base_Url}/admin/getallcourses`)
          .then((response) => {
          
            setCourselist(response.data.allCourses);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

  
        const handleEditCourse = async (Id)=>{
            
            setCourseId(Id)
            
            setOpenPopUp(true);
        }
       
        
        const cancelApproval= async (id)=>{
        
            axios.put(`${Base_Url}/admin/cancelcourse/${id}`)
            .then((response) => {
             
              setCourselist(response.data.allcourses);
            })
            toast.success("successfully cancelled approval")
            window.location.reload();
          }
    
          const approve= async (id)=>{
            
            axios.put(`${Base_Url}/admin/approvecourse/${id}`)
            .then((response) => {
              
              setCourselist(response.data.allcourses);
            console.log(response.data);
        
            })
            toast.success("successfully approved ")
            window.location.reload(); 
            
          }

          const offset = currentPage * itemsPerPage;
          const paginatedData = courseList.slice(offset, offset + itemsPerPage);
    
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
          <th>Instructor</th>
          <th>isApproved</th>
          <th>Price</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Lessons</th>
        </tr>
      </thead>
      <tbody>
          {paginatedData.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course?.title}</td>
              <td>{course?.category.title}</td>
              <td>{course?.description}</td>
              <td>{course?.duration}</td>
              <td>{course?.instructor?.name}</td>
              <td>
                {course.isApproved ? (
                  <Button variant='info' size="sm" onClick={()=>{cancelApproval(course._id)}}>Approved</Button>
                ) : (
                  <Button variant='secondary' size="sm" onClick={()=>{approve(course._id)}}>UnApproved</Button>
                )}
              </td>
              <td>{course.price}</td>
              <td><img src={`${Image_Url}/${course.photo}`} alt='sample' style={{width:"40px"}}/> </td>
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
            
          <EditCourseForm courseId={courseId} onCloseEdit={()=> setOpenPopUp(false)}/>
          
          
        </div>
      )}


<div style={{float:'right' , margin:'3px', }}>
        <ReactPaginate 
        previousLabel={'Previous '} 
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(courseList.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'pagination'} // Remove one of the containerClassName attributes
        activeClassName={'active'}
      />
      </div>
    </div>
  )
}

export default CourseTable


