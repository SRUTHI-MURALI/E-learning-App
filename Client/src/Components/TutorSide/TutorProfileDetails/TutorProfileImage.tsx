import React , {useState}from 'react'
import { Image_Url } from '../../../Config/Config'
import profilesample from '../../../Assets/Images/pic2.png'
import { Card } from 'react-bootstrap'
import TutorEditProfileForm from './TutorEditProfileForm'

function TutorProfileImage({tutor}) {
    const [showEdit,setShowEdit]= useState(false)

    const handleEditProfile = async()=>{
        setShowEdit(true)
    }
  return (
    <>
   {showEdit==false ?(
        <Card onClick={handleEditProfile} style={{ width: '18rem',height:'18rem' }}>
        <Card.Body className='justify-content-center d-flex m-5'>
    {tutor.photo ?(
          <td><img src={`${Image_Url}/${tutor?.photo}`} alt='sample' style={{width:"40px"}} /> </td>
    ):(
        <>
         <td><img src={profilesample} alt='sample' style={{width:"100px"}}/> </td>
         
        </>
       
    )}
   
   </Card.Body>
    </Card>
   ):(
    <TutorEditProfileForm tutor={tutor}  onClose={()=>setShowEdit(false)}/>
   )}
    
 
    </>
   
  )
}

export default TutorProfileImage
