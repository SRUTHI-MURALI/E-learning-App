
import Table from 'react-bootstrap/Table';
import {AiFillEdit} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im'
import { Button } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './StudentTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentTable() {
    const[studentList,setStudentlist]=useState([])

    
    useEffect(() => {
        axios.get('http://localhost:3002/admin/getstudentlist')
          .then((response) => {
           
            setStudentlist(response.data.students);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  
     

      const blockStudent= async (id)=>{
        
        axios.put(`http://localhost:3002/admin/blockstudent/${id}`)
        .then((response) => {
         
          setStudentlist(response.data.students);
        })
        toast.success("successfully blocked")
        window.location.reload();
      }

      const unBlockStudent= async (id)=>{
        
        axios.put(`http://localhost:3002/admin/unblockstudent/${id}`)
        .then((response) => {
          
          setStudentlist(response.data.students);
        })
        toast.success("successfully unblocked")
        window.location.reload();
      }

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
          <th>Edit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {studentList.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td><AiFillEdit /></td>
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
 
    </div>
  )
}

export default StudentTable


