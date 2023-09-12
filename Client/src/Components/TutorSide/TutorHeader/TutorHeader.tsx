import React from 'react'
import 
 { BsPersonCircle, BsJustify}
 from 'react-icons/bs'
 import '../Css/Tutor.css'
import { useSelector } from 'react-redux'
import { logout, selecttutor } from '../../ReduxComponents/TutorSlice'
import { Link, useNavigate } from 'react-router-dom'
 
import { useDispatch } from 'react-redux'
 

function TutorHeader() {

  const tutor=useSelector(selecttutor)

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout= async ()=>{
    await dispatch(logout)
    navigate('/tutorlogin')
  }
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' />
        </div>
        <div className='header-left'>
           <h3 style={{color:'#fff'}}>{tutor.name}</h3>
        </div>
        <div className='header-right'>
            
           
           <Link to='' onClick={handleLogout}> <BsPersonCircle className='icon'/>Logout </Link>
        </div>
    </header>
  )
}

export default TutorHeader