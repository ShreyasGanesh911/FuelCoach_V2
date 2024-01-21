import {useEffect, useState } from 'react';
import '../App.css'
import '../Styles/OverView.css'
import OverViewCard from '../components/OverViewCard'
import FoodTable from '../components/FoodTable';
import { Link, useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import Auth from '../CustomHooks/Auth';
import ProgressBar from '../components/ProgressBar';
import LogWeightModal from '../components/LogWeightModal';

export default function OverView() {
  const navigate = useNavigate()
  type Result = {
    Age:number,
    Name:string,
    BMI:number|string,
    BMR:number,
    Daily_Intake:number,
    Gender:string,
    Height:number|string,
    Weight:string|number,
    // Consumed:number
  }
  type FetchedData={
    success:boolean,
    message:String,
    result:Result[]
  }
  const[show,setShow] = useState<boolean>(false)
  const getDetails = async()=>{
    const responce = await fetch(`http://localhost:4000/user/about`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      },
      credentials: 'include',
    
    })
    const data:FetchedData = await responce.json()
    if(!data.success){
      localStorage.removeItem("Auth")
      navigate('/') 
    }
    else{
      //setGoal(data.result[0]?.Daily_Intake)
      myObj.push({name:'Name',data:data.result[0].Name,key:"ABC"},{name:"Calories",data:data.result[0].Daily_Intake,key:"DEF"},{name:"BMI",data:data.result[0].BMI,key:"LMN"},{name:"Weight",data:data.result[0].Weight,key:"HIJ"})
      setUserDetails(myObj)
    }    
  
  }
  type List = {
    name:string, data:string|number , key:string
  }
  const myObj:List[] = []
  const[userDetails,setUserDetails] = useState<List[]>()
  useEffect(()=>{
    getDetails()
    if(!Auth())
      navigate('/')
  })
  return (
    <div className='page '>
      {show && <LogWeightModal setShow={setShow} show={show}/>}
      <div className='displayFlex content my-3'>
    {userDetails?.map(({name,data,key})=>{
          return(<OverViewCard  key={key} name={name} data={data}/>)
        })}
      </div>
      <div className='displayFlex my-2'  style={{justifyContent:'space-between'}}>
        <div className='w-50 mx-5' style={{height:'30vh',borderRadius:'5px'}}>
          <Link to='/LogFood' className='nav-link'><FoodTable/></Link>         
        </div>
        <ProgressBar/>
    <div>
    </div>
      </div>
      <section className='line-cover'>
      <LineChart/>
      <div className='w-25 py-5 mx-5 overflow-y-hidden border rounded-2  displayFlex'>
        <h3 className='table-font text-center'>Add weight</h3>
        <button className='btn btn-warning mx-3 ' onClick={()=>setShow(true)} style={{borderRadius:"50%"}}><i className="fa-solid fa-plus"></i></button>
      </div>
      </section>

    </div>
  )
} 