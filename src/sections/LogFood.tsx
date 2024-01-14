import React from 'react'
import FoodTable from '../components/FoodTable'

export default function LogFood() {
  return (
    <div className='page'>
      <h2 className='overflow-y-hidden py-2'>Food Log</h2>
      <div className='w-75 my-5'>
        <FoodTable/>
      </div>
      <div className='w-75' style={{display:'flex',flexFlow:'row-reverse'}}>
        <button className='btn btn-dark '>Add Food +</button>
      </div>
    </div>
  )
}
