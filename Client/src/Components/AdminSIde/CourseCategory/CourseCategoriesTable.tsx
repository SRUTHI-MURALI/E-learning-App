import React from 'react'
import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import {AiFillEdit,AiOutlineClose,AiOutlineCheck} from 'react-icons/ai';
import { Button, Col, Row } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import axios from 'axios';
import './CourseCategoriesTable.css'
import AddCategory from './AddCategory';
import { Base_Url } from '../../../Config/Config';
import EditCategoryForm from './EditCategoryForm';

function CourseCategoriesTable() {

  const[categoryList,setCategorylist]=useState([])
  const[categoryId,setCategoryId]=useState('')
  const [openPopUp, setOpenPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
 
    
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

      const InActivateCourse= async (id)=>{
        
        axios.put(`${Base_Url}/admin/inactivatecategory/${id}`)
        .then((response) => {
         
          setCategorylist(response.data.categories);
        })
       
        window.location.reload();
      }

      const ActivateCourse= async (id)=>{
        
        axios.put(`${Base_Url}/admin/activatecategory/${id}`)
        .then((response) => {
         
          setCategorylist(response.data.categories);
        })
       
        window.location.reload();
      }

      const EditCategory= async (id)=>{
        setCategoryId(id)
            
        setEditPopUp(true);
       
       
      }
    
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
      {openPopUp==false && editPopUp==false ? (
    <Table className='mt-5 ms-5' striped bordered hover size="sm">
     <thead >
       <tr>
         <th>#</th>
         <th > Title</th>
         <th >Description</th>
         <th>Edit</th>
         <th>isActive</th>
       </tr>
     </thead>
     <tbody>
         {categoryList.map((category, index) => (
           <tr key={category._id}>
             <td>{index + 1}</td>
             <td>{category.title}</td>
             <td>{category.description}</td>
             <td><AiFillEdit onClick={()=>{EditCategory(category._id)}} /></td>
             <td>
                {category.isActive ? (
                  <>
                  <AiOutlineCheck  onClick={()=>{InActivateCourse(category._id)}}/>
                  
                  </>
                ) : (
                  <AiOutlineClose  onClick={()=>{ActivateCourse(category._id)}}/>
                )}
              </td>
           </tr>
         ))}
       </tbody>
   </Table>
        ):null}
        </Col>
      </Row>

      {openPopUp && (
        <div>
          <AddCategory onClose={()=> setOpenPopUp(false)}/>
         
        </div>
      )}
    
    {editPopUp && (
        <div>
            
          <EditCategoryForm categoryId={categoryId} onCloseEdit={()=> setEditPopUp(false)}/>
          
          
        </div>
      )}
   
     </div>
    
    
  )
}

export default  CourseCategoriesTable

