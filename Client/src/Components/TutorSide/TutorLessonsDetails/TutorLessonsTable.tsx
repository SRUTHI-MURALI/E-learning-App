import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import {AiFillEdit} from 'react-icons/ai';
import {useState,useEffect} from 'react'
import axios from 'axios';
import '../../AdminSIde/CourseDetails/CourseTable.css'
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url,Video_Url } from '../../../Config/Config';
import ReactPaginate from 'react-paginate'; 
import {  useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import AddLesson from '../TutorAddCourse/AddLesson';


function TutorLessonsTable() {
    const[lessonsList,setLessonslist]=useState([])
    const [openPopUp, setOpenPopUp] = useState(false);
   
   
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const itemsPerPage = 5;

    const {id} = useParams()

    useEffect(() => {
        axios.get(`${Base_Url}/tutor/getalllessons/${id}`)
          .then((response) => {
        
          
            setLessonslist(response.data.allLessons);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

      const handleOpenAddForm = async ()=>{
            
        
        setOpenPopUp(true);
    }
         const offset = currentPage * itemsPerPage;
          const paginatedData = lessonsList.slice(offset, offset + itemsPerPage);
    


  return (
    <div>
       <Row>
        <Row>
          <Col>
          <p className='studentlistheading' ><ImArrowRight /> <u>Lessons List</u></p>
          </Col>
          <Col>
          <Button onClick={handleOpenAddForm} type='submit' className='addcategorylist'>Add Lessons</Button>
          </Col>
        </Row>
       
       
      <Col>
       
       {openPopUp== false && (
      <>
     
     
      <Table className='mt-5 ms-5' striped bordered hover size="sm">
      <thead>
        <tr >
          <th>#</th>
          <th >Title</th>
          <th>Description</th>
          <th>Duration</th>
          
          
          <th>Video</th>
        
        </tr>
      </thead>
      <tbody>
          {paginatedData.map((lessons, index) => (
            <tr key={lessons._id}>
              <td>{index + 1}</td>
              <td>{lessons?.title}</td>
             
              <td>{lessons?.description}</td>
              <td>{lessons?.duration}</td>
            
             
            
              <td><video src={`${Video_Url}/${lessons?.video}`} alt='sample' style={{width:"40px"}} controls/> </td>
            
           
            </tr>
          ))}
        </tbody>
    </Table>
    </>
     )}

     
</Col>
      </Row>
    {openPopUp && (
        <div>
            
          <AddLesson  courseId={id}/>
          
          
        </div>
      )}

   


<div style={{float:'right' , margin:'3px', }}>
        <ReactPaginate 
        previousLabel={'Previous '} 
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(lessonsList.length / itemsPerPage)}
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

export default TutorLessonsTable
