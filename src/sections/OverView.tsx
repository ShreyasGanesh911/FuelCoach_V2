import { useEffect, useState } from 'react';
import '../App.css'
import '../Styles/OverView.css'
import OverViewCard from '../components/OverViewCard'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FoodTable from '../components/FoodTable';
import { Link } from 'react-router-dom';
import LineChart from '../components/LineChart';
export default function OverView() {
  type List = {
    name:string, data:string|number
  }
  // const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // const date = new Date();
  type ProgressBar = {pathColor:string,trialColor:string}
  const lessPBar:ProgressBar = {pathColor:'red',trialColor:'red'}
  const highPBar:ProgressBar = {pathColor:'green',trialColor:'#f88'}
  const myObj:List[] = [{name:'name',data:"joe Smith"},{name:"Calories ",data:3205},{name:'BMI',data:21.5},{name:'weight',data:'45kg'}]
  const [cal,setCal] = useState(0)
  useEffect(()=>{
    setTimeout(()=>setCal(1500),500)
  })
  return (
    <div className='page text-white'>
      <div className='displayFlex content my-5'>
    {myObj.map(({name,data})=>{
          return(<OverViewCard key={name} name={name} data={data}/>)
        })}
      </div>

      <div className='displayFlex'  style={{justifyContent:'space-between'}}>
        <div className={`w-50 mx-5 `}  style={{height:'30vh',borderRadius:'5px'}}>
          <Link to='/LogFood' className='nav-link'><FoodTable/></Link>
          
        </div>
      <div className='' style={{width:'250px'}}>
      <CircularProgressbar value={cal} minValue={0} strokeWidth={4} styles={Math.round((cal/3000)*100)>=50?buildStyles(highPBar):buildStyles(lessPBar)} maxValue={3000}text={`${Math.round((cal/3000)*100)}%`} />
      <h5 className='text-warning text-center py-3'>{`${cal}/3000`}</h5>
    </div>
    {/* <div className='text-black border px-3 py-5' style={{width:'250px'}}>
      <h1 className="overflow-y-hidden">{date.getDate()}</h1> <h1 className="overflow-y-hidden">{month[date.getMonth()]}</h1>
    </div> */}
    <div>
      
    </div>
      </div>
      {/* <div className='text-warning' style={{display:'flex',flexFlow:'row-reverse',width:'85%'}}>
      <h5>{`${cal}/3000`}</h5>
      </div> */}

      {/* <div className=' displayFlex border my-5 ' style={{width:"90%"}}>
        <h5 className='text-black py-2'>{quotes[Math.floor(Math.random()*10)]}</h5>
       
      </div> */}
      <LineChart/>
    </div>
  )
}