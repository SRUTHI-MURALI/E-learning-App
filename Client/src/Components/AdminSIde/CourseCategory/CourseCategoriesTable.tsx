import React from 'react'
import Table from 'react-bootstrap/Table';
import {ImArrowRight} from 'react-icons/im'
import {AiFillEdit,AiOutlineClose,AiOutlineCheck} from 'react-icons/ai';
import { Button, Col, Row } from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './CourseCategoriesTable.css'
import AddCategory from './AddCategory';
import { Base_Url } from '../../../Config/Config';
import EditCategoryForm from './EditCategoryForm';
import ReactPaginate from 'react-paginate'; 
import Swal from 'sweetalert2';

function CourseCategoriesTable() {

  const[categoryList,setCategorylist]=useState([])
  const[categoryId,setCategoryId]=useState('')
  const [openPopUp, setOpenPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 5;
 
    
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

      const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
      };

      const categoryStatus = async (category) => {
        try {
          // Display a confirmation dialog using SweetAlert
          const result = await Swal.fire({
            title: `Are you sure you want to ${
              category.isActive ? 'Inactivate' : 'Activate'
            } the category "${category.title}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          });
    
          if (result.isConfirmed) {
            if (!category.isActive) {
             await  axios.put(`${Base_Url}/admin/activatecategory/${category._id}`)
              category.isActive = true;
              toast.success(`category ${category.title} approved successfully`);
            
            } else {
              await axios.put(`${Base_Url}/admin/inactivatecategory/${category._id}`)
              category.isActive = false;
              toast.success(`category "${category.title}" unapproved successfully`);
            
            }
          
            setCategorylist([...categoryList]);
            console.log(categoryList,"hhh");
            
          }
        } catch (error) {
          // Handle errors and display an error message to the user
          toast.error('Error');
        }
      };
    
      
      const EditCategory= async (id)=>{
        setCategoryId(id)
            
        setEditPopUp(true);
       
       
      }
      const offset = currentPage * itemsPerPage;
      const paginatedData = categoryList.slice(offset, offset + itemsPerPage);
    
  return (
    <div>
      <Row>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
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
         {paginatedData.map((category, index) => (
           <tr key={category._id}>
             <td>{index + 1}</td>
             <td>{category.title}</td>
             <td>{category.description}</td>
             <td><AiFillEdit onClick={()=>{EditCategory(category._id)}} /></td>
             <td>
                {category.isActive ? (
                  <>
                  <AiOutlineCheck  onClick={()=>{categoryStatus(category)}}/>
                  
                  </>
                ) : (
                  <AiOutlineClose  onClick={()=>{categoryStatus(category)}}/>
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

      <div style={{float:'right' , margin:'3px', }}>
        <ReactPaginate 
        previousLabel={'Previous '} 
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(categoryList.length / itemsPerPage)}
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

export default  CourseCategoriesTable

