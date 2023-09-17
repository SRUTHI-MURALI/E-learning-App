
import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import { Button } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './InstructorTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../Config/Config';
import ReactPaginate from 'react-paginate'; 


function InstructorTable() {
    const[instructorList,setInstructorlist]=useState([])
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const itemsPerPage = 2;

    
    useEffect(() => {
        axios.get(`${Base_Url}/admin/getinstructorlist`)
          .then((response) => {
           
            setInstructorlist(response.data.instructor);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

  

      const blockInstructor= async (id)=>{
        
        axios.put(`${Base_Url}/admin/blockinstructor/${id}`)
        .then((response) => {
         
          setInstructorlist(response.data.tutorlist);
        })
        toast.success("successfully blocked")
        window.location.reload();
      }

      const unBlockInstructor= async (id)=>{
        
        axios.put(`${Base_Url}/admin/unblockinstructor/${id}`)
        .then((response) => {
          
          setInstructorlist(response.data.tutorlist);
        })
        toast.success("successfully unblocked")
        window.location.reload();
      }
     
      const offset = currentPage * itemsPerPage;
      const paginatedData = instructorList.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <p className='instructorlistheading' ><ImArrowRight /> <u>Instructor List</u></p>
      <ToastContainer position='top-center'></ToastContainer>
      <Table className='mt-5 ms-5' striped bordered hover size="sm">
      <thead >
        <tr>
          <th>#</th>
          <th > Name</th>
          <th >Email</th>
          <th>Phone</th>
         
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {paginatedData.map((instructor, index) => (
            <tr key={instructor.id}>
              <td>{index + 1}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phone}</td>
              
              
              <td>
                {instructor.isBlocked ? (
                  <Button onClick={()=>{unBlockInstructor(instructor._id)}}>Unblock</Button>
                ) : (
                  <Button onClick={()=>{blockInstructor(instructor._id)}}>Block</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
    </Table>
 
    <div style={{float:'right' , margin:'3px', }}>
        <ReactPaginate 
        previousLabel={'Previous '} 
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(instructorList.length / itemsPerPage)}
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

export default InstructorTable


