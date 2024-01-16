import { useEffect, useState } from 'react';
import '../App.css'
import '../Styles/OverView.css'
import OverViewCard from '../components/OverViewCard'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FoodTable from '../components/FoodTable';
import { Link, useNavigate } from 'react-router-dom';
import LineChart from '../components/LineChart';
import Auth from '../CustomHooks/Auth';

export default function OverView() {
  const navigate = useNavigate()
  type List = {
    name:string, data:string|number
  }
  type ProgressBar = {pathColor:string,trialColor:string}
  const lessPBar:ProgressBar = {pathColor:'red',trialColor:'red'}
  const highPBar:ProgressBar = {pathColor:'green',trialColor:'#f88'}
  const myObj:List[] = [{name:'name',data:"joe Smith"},{name:"Calories ",data:3205},{name:'BMI',data:21.5},{name:'weight',data:'45kg'}]
  const [cal,setCal] = useState(0)
  useEffect(()=>{
    if(!Auth())
      navigate('/')
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

    <div>
      
    </div>
      </div>
      <LineChart/>
    </div>
  )
}