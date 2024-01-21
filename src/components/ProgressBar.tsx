import { useEffect, useState } from 'react';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProgressBar() {
    const [value,setValue] = useState<Result[]>([{Consumed:0,Goal:0}])
    type Result={
        Consumed:number,
        Goal:number
    }
    type Data = {
        success:boolean,
        result:Result[]
    }
    type ProgressBar = {pathColor:string,trialColor:string}
    const lessPBar:ProgressBar = {pathColor:'red',trialColor:'red'}
  const highPBar:ProgressBar = {pathColor:'green',trialColor:'#f88'}
  const getData = async()=>{
    const responce = await fetch("http://localhost:4000/user/completed",{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        },
        credentials:"include"
    })
    const data:Data = await responce.json()
    if(data.success){
        setValue(data.result)
    }
  }
  useEffect(()=>{
    getData()
  })
  return (
    <>
            <div className='' style={{width:'250px'}}>
      <CircularProgressbar value={value[0].Consumed} minValue={0}  strokeWidth={5} styles={Math.round((value[0].Consumed/value[0].Goal)*100)>=50?buildStyles(highPBar):buildStyles(lessPBar)} maxValue={value[0].Goal}text={`${Math.round((value[0].Consumed/value[0].Goal)*100)}%`} />
      <h5 className='text-warning text-center py-1 table-font'>{`${value[0].Consumed}/${value[0].Goal}`}</h5>
    </div>
    </>
  )
}
