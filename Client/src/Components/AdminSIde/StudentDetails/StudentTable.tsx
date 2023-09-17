
import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import { Button } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './StudentTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../Config/Config';

function StudentTable() {
    const[studentList,setStudentlist]=useState([])
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const itemsPerPage = 2;
   

    
    useEffect(() => {
        axios.get(`${Base_Url}/admin/getstudentlist`)
          .then((response) => {
           
            setStudentlist(response.data.students);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

      
      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };
  
     

      const blockStudent= async (id)=>{
        
        axios.put(`${Base_Url}/admin/blockstudent/${id}`)
        .then((response) => {
         
          setStudentlist(response.data.students);
        })
        toast.success("successfully blocked")
        window.location.reload();
      }

      const unBlockStudent= async (id)=>{
        
        axios.put(`${Base_Url}/admin/unblockstudent/${id}`)
        .then((response) => {
          
          setStudentlist(response.data.students);
        })
        toast.success("successfully unblocked")
        window.location.reload();
      }

      const offset = currentPage * itemsPerPage;
      const paginatedData = studentList.slice(offset, offset + itemsPerPage);

  return (

    <div>
       <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
      <p className='studentlistheading' ><ImArrowRight /> <u>Student List</u></p>
     
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
          {paginatedData.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                {student.isBlocked ? (
                  <Button onClick={()=>{unBlockStudent(student._id)}}>Unblock</Button>
                ) : (
                  <Button onClick={()=>{blockStudent(student._id)}}>Block</Button>
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
        pageCount={Math.ceil(studentList.length / itemsPerPage)}
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

export default StudentTable


