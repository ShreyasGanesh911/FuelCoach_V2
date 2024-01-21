import React, { useEffect } from 'react'
import Measurementscard from '../../components/Measurementscard'
import { useNavigate } from 'react-router-dom'
import Auth from "../../CustomHooks/Auth"
export default function Measurements() {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!Auth())
      navigate('/')
  })
  return (
    <div className='page'>
      <h2 className='py-2'>Measurements</h2>
      <div className='w-100 ' >
      <Measurementscard/>
      <Measurementscard/>
      <Measurementscard/>
      </div>
    </div>
  )
}
