import React from 'react'
import 
 { BsPersonCircle, BsJustify}
 from 'react-icons/bs'
 import '../Css/Tutor.css'
 

 

function TutorHeader() {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' />
        </div>
        <div className='header-left'>
           <h3 style={{color:'#fff'}}>Tutor</h3>
        </div>
        <div className='header-right'>
            
           
            <BsPersonCircle className='icon'/>
        </div>
    </header>
  )
}

export default TutorHeader