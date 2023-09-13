
import Table from 'react-bootstrap/Table';
import {AiFillEdit} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im'
import { Button } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './InstructorTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function InstructorTable() {
    const[instructorList,setInstructorlist]=useState([])

    
    useEffect(() => {
        axios.get('http://localhost:3002/admin/getinstructorlist')
          .then((response) => {
           
            setInstructorlist(response.data.instructor);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  

      const blockInstructor= async (id)=>{
        
        axios.put(`http://localhost:3002/admin/blockinstructor/${id}`)
        .then((response) => {
         
          setInstructorlist(response.data.tutorlist);
        })
        toast.success("successfully blocked")
        window.location.reload();
      }

      const unBlockInstructor= async (id)=>{
        
        axios.put(`http://localhost:3002/admin/unblockinstructor/${id}`)
        .then((response) => {
          
          setInstructorlist(response.data.tutorlist);
        })
        toast.success("successfully unblocked")
        window.location.reload();
      }
     
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
          <th>Edit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {instructorList.map((instructor, index) => (
            <tr key={instructor.id}>
              <td>{index + 1}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
              <td>{instructor.phone}</td>
              <td><AiFillEdit /></td>
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
 
    </div>
  )
}

export default InstructorTable


