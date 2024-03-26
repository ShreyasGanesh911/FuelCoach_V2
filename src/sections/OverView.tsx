import {useEffect, useState } from 'react';
import '../App.css'
import '../Styles/OverView.css'
import OverViewCard from '../components/OverViewCard'
import FoodTable from '../components/FoodTable';
import { Link, useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import ProgressBar from '../components/ProgressBar';
import LogWeightModal from '../components/LogWeightModal';
import Cookies from 'universal-cookie';
import { UserResult } from '../Types';
export default function OverView() {
  const cookies = new Cookies()
  const navigate = useNavigate()

  type FetchedData={
    success:boolean,
    message:String,
    result:UserResult[]
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
      
      cookies.remove('MyAuth')
      localStorage.removeItem("Auth")
      navigate('/') 
    }
    else{
      //setGoal(data.result[0]?.Daily_Intake)
      console.log(data.result)
      myObj.push({name:'Name',data:data.result[0].Name,key:"ABC"},{name:"Calories",data:data.result[0].Daily_Intake,key:"DEF"},{name:"BMI",data:data.result[0].BMI,key:"LMN"},{name:"Weight",data:data.result[0].Weight,key:"HIJ"})
      myObj.length = 4
      setUserDetails(myObj)
    }    
  
  }
  type List = {
    name:string, data:string|number , key:string
  }
  const myObj:List[] = []
  const[userDetails,setUserDetails] = useState<List[]>([{name:"",data:"",key:""}])
  useEffect(()=>{
    // if(!cookies.get('AuthToken'))
    // navigate('/')
    getDetails()
   
  },[])
  return (
    <div className='page '>
      {show && <LogWeightModal setShow={setShow} show={show}/>}
      <div className='displayFlex content my-4'>
    {userDetails.map(({name,data,key})=>{
          return(<OverViewCard  key={name+key} name={name} data={data}/>)
        })}
      </div>
      <div className='displayFlex'  style={{justifyContent:'space-between',marginTop:'5vh',marginBottom:'5vh'}}>
        <div className='w-50 mx-5' style={{height:'30vh',borderRadius:'5px'}}>
          <Link to='/LogFood' className='nav-link'><FoodTable/></Link>         
        </div>
        <ProgressBar/>
    <div>
    </div>
      </div>
      <section className='line-cover'>
      <LineChart/>
      <div className='w-25 py-5 mx-5 overflow-y-hidden  rounded-2 bg-white displayFlex'>
        <h3 className=' text-dark text-center'>Add weight</h3>
        <button className='btn btn-warning mx-3 ' onClick={()=>setShow(true)} style={{borderRadius:"50%"}}>+</button>
      </div>
      </section>

    </div>
  )
} 