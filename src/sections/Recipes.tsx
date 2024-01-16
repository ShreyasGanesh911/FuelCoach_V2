import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from "../CustomHooks/Auth"
export default function Recipes() {
const navigate = useNavigate()
  useEffect(()=>{
    if(!Auth())
      navigate('/')
  })
  return (
    <div className='page'>
      recipes
    </div>
  )
}
