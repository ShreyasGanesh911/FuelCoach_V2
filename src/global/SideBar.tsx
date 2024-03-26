import { motion } from 'framer-motion';
import{useState } from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {NavLink,Outlet, useNavigate} from 'react-router-dom';
import { sideBarMenu } from '../Types';
import '../Styles/Sidebar.css'
import Cookies from 'universal-cookie';
export default function SideBar() {
  const cookie = new Cookies()
  const navigate = useNavigate()
const handleClick = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
  e.preventDefault()
  cookie.remove('MyAuth', { path: '/' })
  await fetch('http://localhost:4000/clear',{credentials:'include'})
  
  localStorage.removeItem('Auth')
  navigate('/')
}
  type Menuitem = {favicon:string,tag:string,link:string}
  const menuitems:Menuitem[] = sideBarMenu

  const [close,setClose] = useState(false)
  const hide:string = 'visually-hidden';
  const show:string = '';
//React.MouseEvent<HTMLButtonElement, MouseEvent>
  return (
    <>
<Sidebar id='side'  backgroundColor='#ffffff'  transitionDuration={800} collapsed={close} collapsedWidth='6vw' width='15vw' className='text-black position-fixed my-5' >
  <Menu id='sidebar' className='my-5 ' style={{}}>
    {menuitems.map(({favicon,tag,link})=>{
      return(
        <MenuItem key={tag}> <NavLink to={link}  className='nav-link'><i className={`${favicon} mx-2`}></i><span className={`${!close?show:hide}`}>{tag}</span></NavLink> </MenuItem>
      )
    })}
     <MenuItem><button className='btn btn-dark' onClick={handleClick}><motion.i className={`fa-solid fa-right-from-bracket mx-1`}></motion.i><span className={`${!close?show:hide}`}>Log Out</span></button></MenuItem>
    <MenuItem><button className='btn btn-dark' onClick={()=>!close?setClose(true):setClose(false)}><motion.i className={`fa-solid fa-caret-up fa-rotate-${close===false?270:90}`}></motion.i></button></MenuItem>
  </Menu>
  
</Sidebar>
<Outlet/>
</>

  )
}
