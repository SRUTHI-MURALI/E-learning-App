import React from 'react'
import 
 { BsPersonCircle, BsJustify}
 from 'react-icons/bs'
 import '../Css/Admin.css'

 

function AdminHeader() {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' />
        </div>
        <div className='header-left'>
           <h3 style={{color:'#fff'}}>Admin</h3>
        </div>
        <div className='header-right'>
            
           
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default AdminHeader