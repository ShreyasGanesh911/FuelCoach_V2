import { motion } from 'framer-motion';
import{useState } from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {NavLink,Outlet} from 'react-router-dom';

import '../Styles/Sidebar.css'
export default function SideBar() {

  type Menuitem = {favicon:string,tag:string,link:string}
  const menuitems:Menuitem[] = [
    {favicon:"fa-solid fa-chart-simple",tag:'Overview',link:'/overview'},
    {favicon:"fa-solid fa-utensils",tag:'Log Food',link:'/LogFood'},
    {favicon:"fa-solid fa-ruler",tag:'Measurements',link:'/measurements'},
    {favicon:"fa-solid fa-bowl-food",tag:'Recipes',link:'/recipes'},
    {favicon:"fa-solid fa-newspaper",tag:'Blog',link:'/blogs'},
    {favicon:"fa-solid fa-store",tag:'Store',link:'/store'},
    {favicon:"fa-solid fa-user",tag:'Profile',link:'/profile'},
    {favicon:"fa-solid fa-notes-medical",tag:'Health Log',link:'/profile'},
    {favicon:"fa-solid fa-question",tag:'About',link:'/profile'},
    {favicon:"fa-solid fa-right-from-bracket",tag:'Log Out',link:'/login'},
    ]

  const [close,setClose] = useState(false)
  const hide:string = 'visually-hidden';
  const show:string = '';

  return (
    <>
<Sidebar id='side'  backgroundColor='#ffffff'  transitionDuration={800} collapsed={close} collapsedWidth='5vw' width='15vw' className='text-black position-fixed my-5' >
  <Menu id='sidebar' className='my-5 ' style={{}}>
    {menuitems.map(({favicon,tag,link})=>{
      return(
        <MenuItem key={tag}> <NavLink to={link}  className='nav-link'><i className={`${favicon} mx-2`}></i><span className={`${!close?show:hide}`}>{tag}</span></NavLink> </MenuItem>
      )
    })}
    <MenuItem><button className='btn btn-dark' onClick={()=>!close?setClose(true):setClose(false)}><motion.i className={`fa-solid fa-caret-up fa-rotate-${close===false?270:90}`}></motion.i></button></MenuItem>
  </Menu>
  
</Sidebar>
<Outlet/>
</>

  )
}
