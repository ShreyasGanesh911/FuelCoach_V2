import { useEffect, useState } from 'react'
import FoodTable from '../components/FoodTable'
import LogFoodModal from '../components/LogFoodModal'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
export default function LogFood() {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const [show,setShow] = useState(false)
  const handleClick = ()=>{
    show?setShow(false):setShow(true)
    //console.log(show)
    
  }
  useEffect(()=>{
    if(!cookies.get('MyAuth'))
      navigate('/')
  })
  return (
    <div className='page'>
      {show && <LogFoodModal setShow={setShow}/>}
      <h2 className='overflow-y-hidden py-2 font-regular'>Log Food</h2>
      <div className='w-75 my-5'>
        <FoodTable/>
      </div>
      <div className='w-75' style={{display:'flex',flexFlow:'row-reverse'}}>
        <button className='btn btn-dark ' onClick={handleClick} >Add Food +</button>
      </div>
    </div>
  )
}
