import { useEffect, useState } from 'react'
import FoodTable from '../components/FoodTable'
import LogFoodModal from '../components/LogFoodModal'
import Auth from '../CustomHooks/Auth'
import { useNavigate } from 'react-router-dom'
export default function LogFood() {
  const navigate = useNavigate()
  const [show,setShow] = useState(false)
  const handleClick = ()=>{
    show?setShow(false):setShow(true)
    //console.log(show)
    
  }
  useEffect(()=>{
    if(!Auth())
      navigate('/')
  })
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
