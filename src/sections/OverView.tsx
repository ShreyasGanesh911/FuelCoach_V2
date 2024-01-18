import { useContext, useEffect, useState } from 'react';
import '../App.css'
import '../Styles/OverView.css'
import OverViewCard from '../components/OverViewCard'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FoodTable from '../components/FoodTable';
import { Link, useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import Auth from '../CustomHooks/Auth';
import {UserContext} from '../Context/userContext';
import { json } from 'stream/consumers';
export default function OverView() {
  const navigate = useNavigate()
  type Result = {
    Age:number,
    Name:string,
    BMI:number|string,
    BMR:number,
    Daily_Intake:number,
    Email:string,
    Gender:string,
    Height:number|string,
    Phone:number,
    Weight:string|number
  }
  type FetchedData={
    success:boolean,
    message:String,
    result:Result[]
  }
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
     // console.log(data.result[0])
     // console.log(data.result[0].Age)
      setGoal(data.result[0]?.Daily_Intake)
      myObj.push({name:'Name',data:data.result[0].Name,key:"ABC"},{name:"Calories",data:data.result[0].Daily_Intake,key:"DEF"},{name:"BMI",data:data.result[0].BMI,key:"LMN"},{name:"Weight",data:data.result[0].Weight,key:"HIJ"})

      setUserDetails(myObj)
    }    
  
  }
  const {user,setUser} = useContext(UserContext)
  
  type List = {
    name:string, data:string|number , key:string
  }
  type ProgressBar = {pathColor:string,trialColor:string}
  const lessPBar:ProgressBar = {pathColor:'red',trialColor:'red'}
  const highPBar:ProgressBar = {pathColor:'green',trialColor:'#f88'}
  const myObj:List[] = []
  const[userDetails,setUserDetails] = useState<List[]>()
  const [cal,setCal] = useState(0)
  const [goal,setGoal] = useState(0)
  useEffect(()=>{
    getDetails()
    if(!Auth())
      navigate('/')
    //setTimeout(()=>setCal(1500),500)
    //console.log(`User: ${user}`)
    
  })
  return (
    <div className='page text-white'>
      <div className='displayFlex content my-5'>
    {userDetails?.map(({name,data,key})=>{
          return(<OverViewCard key={key} name={name} data={data}/>)
        })}
      </div>

      <div className='displayFlex'  style={{justifyContent:'space-between'}}>
        <div className={`w-50 mx-5 `}  style={{height:'30vh',borderRadius:'5px'}}>
          <Link to='/LogFood' className='nav-link'><FoodTable/></Link>
          
        </div>
      <div className='' style={{width:'250px'}}>
      <CircularProgressbar value={cal} minValue={0} strokeWidth={4} styles={Math.round((cal/3000)*100)>=50?buildStyles(highPBar):buildStyles(lessPBar)} maxValue={3000}text={`${Math.round((cal/3000)*100)}%`} />
      <h5 className='text-warning text-center py-3'>{`${cal}/${goal}`}</h5>
    </div>

    <div>
      
    </div>
      </div>
      <LineChart/>
    </div>
  )
}