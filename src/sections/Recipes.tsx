import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from "../CustomHooks/Auth"
import Cookies from 'universal-cookie'
export default function Recipes() {
  const cookies = new Cookies()
const navigate = useNavigate()
  useEffect(()=>{
    if(!cookies.get('MyAuth'))
    navigate('/')
  })
  return (
    <div className='page'>
      recipes
    </div>
  )
}
