import { Chart as ChartJS,BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies()

ChartJS.register(BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement)
type Result = {
  Weight:number,
  Month:string
}
type Data = {
  success:boolean,
  result:Result[]
}
export default function LineChart() {
  const navigate = useNavigate()
  const[dataSet,setDataSet] = useState<Result[]>([{Weight:70,Month:"Jan"}])
  const getData = async()=>{
    const responce = await fetch('http://localhost:4000/weight/getAllWeightLogs',{
      method:"GET",
      mode:"cors",
      
      headers:{
        "Content-Type": "application/json",
      },
      credentials:'include'
    })
    const data:Data = await responce.json()
    setDataSet(data.result.reverse())
  }
  useEffect(()=>{
    // if(!cookies.get('AuthToken'))
    // navigate('/')
    getData()
  },[])
  return (
    <div className='w-50 rounded-2 font-regular' style={{marginBottom:'10vh',height:'30vh'}}>
      <Line  className='bg-white font-regular' options={{scales:{y:{min:Math.min(...dataSet.map((e)=>e.Weight))-10,max:Math.max(...dataSet.map((e)=>e.Weight))+10}}}}
      data={{labels:dataSet?.map((e)=>e.Month),datasets:[{label:"Weight",data:dataSet?.map((e)=>e.Weight),backgroundColor:['red'],borderColor:'pink',tension:0.2,fill:false,pointRadius:5}]}}/> 
    </div>
  )
}
