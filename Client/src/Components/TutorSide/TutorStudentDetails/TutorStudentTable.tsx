
import Table from 'react-bootstrap/Table';
import {AiOutlineClose,AiOutlineCheck} from 'react-icons/ai';
import {ImArrowRight} from 'react-icons/im'

import {useState,useEffect} from 'react'
import axios from 'axios';
import './TutorStudentTable.css'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_Url } from '../../../Config/Config';

function TutorStudentTable() {
    const[studentList,setStudentlist]=useState([])

    
    useEffect(() => {
        axios.get(`${Base_Url}/admin/getstudentlist`)
          .then((response) => {
         
           
            setStudentlist(response.data.students);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);


  return (

    <div>
       <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
      <p className='tutorstudentlistheading' ><ImArrowRight /> <u>Student List</u></p>
     
      <Table className='mt-5 ms-5' striped bordered hover size="sm">
      <thead >
        <tr>
          <th>#</th>
          <th > Name</th>
          <th >Email</th>
          <th>Phone</th>
        
          <th>IsBlocked</th>
        </tr>
      </thead>
      <tbody>
          {studentList.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
             
              <td>
                {student.isBlocked ? (
                   <AiOutlineClose />
                 
                ) : (
                  <AiOutlineCheck />
                )}
              </td>
            </tr>
          ))}
        </tbody>
    </Table>
 
    </div>
  )
}

export default TutorStudentTable


