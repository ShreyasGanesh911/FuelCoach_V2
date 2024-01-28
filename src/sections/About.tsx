import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function About() {
    const cookies = new Cookies()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!cookies.get('MyAuth'))
        navigate('/')
      })
  return (
    <div className='page font-regular'>
       <h2 className='overflow-y-hidden p-3'>About</h2>

       <section className='bg-dark text-white w-75 displayFlex p-3' style={{flexDirection:'column'}}>
       <div className="w-100  text-center">
        <h1 className=" font-monospace text-warning p-3"> <i className="fa-solid fa-charging-station fs-2 overflow-y-hidden mx-2 text-warning"></i>Fuel Coach</h1>
      </div>
        <p className='w-75 text-center'>
        Fuel Coach is a user-friendly diet app that simplifies the journey to a healthier lifestyle. 
        <br />
        Built with MYSQL, Node.js, Express, and React.
        The design is straightforward, simple to use and responsive.    
        
        </p>
        <div className='displayFlex'>
        Repository:
        <a className='mx-3 list-group-item  list-group-item-warning active ' rel="noreferrer" target='_blank' href="https://github.com/ShreyasGanesh911/FuelCoach_V2">GitHub FuelCoach</a>
       
        </div>
        </section>
    </div>
  )
}
