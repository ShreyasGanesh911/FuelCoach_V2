import { useState } from 'react'
import FoodTable from '../components/FoodTable'
import LogFoodModal from '../components/LogFoodModal'

export default function LogFood() {
  const [show,setShow] = useState(false)
  const handleClick = ()=>{
    show?setShow(false):setShow(true)
    console.log(show)
  }
  return (
    <div className='page'>
      {show && <LogFoodModal setShow={setShow}/>}
      <h2 className='overflow-y-hidden py-2'>Food Log</h2>
      <div className='w-75 my-5'>
        <FoodTable/>
      </div>
      <div className='w-75' style={{display:'flex',flexFlow:'row-reverse'}}>
        <button className='btn btn-dark ' onClick={handleClick} >Add Food +</button>
      </div>
    </div>
  )
}
