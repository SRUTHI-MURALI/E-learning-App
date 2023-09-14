import React from 'react'
import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import { Button, Col, Row } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './CourseCategoriesTable.css'
import AddCategory from './AddCategory';
import { Base_Url } from '../../../Config/Config';

function CourseCategoriesTable() {

  const[categoryList,setCategorylist]=useState([])
  const [openPopUp, setOpenPopUp] = useState(false);
 
    
    useEffect(() => {
        axios.get(`${Base_Url}/admin/getcategorylist`)
          .then((response) => {
           
            setCategorylist(response.data.categories);
            console.log(categoryList,"category");
            
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  
      const handleOpenDialog = () => {
        setOpenPopUp(true);
      
        
      };
    
  return (
    <div>
      <Row>
        <Row>
        <Col>
        <p className='categorylistheading' ><ImArrowRight /> <u>Course Categories</u></p>
        </Col>
        <Col>
        <Button onClick={handleOpenDialog} type='submit' className='addcategorylist'>Add Category</Button>
        </Col>
        </Row>
       
      <Col>
      {openPopUp==false &&(
    <Table className='mt-5 ms-5' striped bordered hover size="sm">
     <thead >
       <tr>
         <th>#</th>
         <th > Title</th>
         <th >Description</th>
         
       </tr>
     </thead>
     <tbody>
         {categoryList.map((category, index) => (
           <tr key={category._id}>
             <td>{index + 1}</td>
             <td>{category.title}</td>
             <td>{category.description}</td>
            
           
           </tr>
         ))}
       </tbody>
   </Table>
        )}
        </Col>
      </Row>

      {openPopUp && (
        <div>
          <AddCategory onClose={()=> setOpenPopUp(false)}/>
         
        </div>
      )}
    
   
   
     </div>
    
    
  )
}

export default  CourseCategoriesTable

