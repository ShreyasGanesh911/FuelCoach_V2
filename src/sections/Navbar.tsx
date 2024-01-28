import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
export default function Navbar() {
  const cookies = new Cookies()
  const[auth,setAuth]=useState(false)
  const getToken=():void=>{
    const token = cookies.get('MyAuth')
    !token?setAuth(false):setAuth(true)
  }
  useEffect(()=>{
    getToken()
  },[])
  return (
    <>
        <nav className="navbar fixed-top bg-white " style={{opacity:0.9}} >
  <div className="container-fluid">
    <div className="navbar-brand displayFlex mx-5" >
    <i className="fa-solid fa-charging-station fs-2 overflow-y-hidden mx-2 text-warning"></i>
      <span className='text-warning overflow-y-hidden fs-4'style={{fontFamily:"monospace"}}>Fuel Coach </span>
      <span className='text-warning'> </span>

    </div>
    {auth?
      <ul className='navbar-nav mx-3'>
      <Link to='/profile'><li className="nav-item bg-warning "style={{width:'50px',height:'50px',borderRadius:'50%'}}>
      <img style={{objectFit:'contain',width:'100%',height:'100%'}} src="https://m.media-amazon.com/images/I/41jLBhDISxL.jpg" alt="" />
         </li></Link>
      </ul>:
      <></>  
  }
    
  </div>
</nav>
  
    </>
  )
}
