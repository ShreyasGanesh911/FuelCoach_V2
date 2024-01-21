import { Chart as ChartJS,BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
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
  const[dataSet,setDataSet] = useState<Result[]>([{Weight:70,Month:"Jan"}])
  const getData = async()=>{
    const responce = await fetch('http://localhost:4000/weight/getAllWeightLogs',{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      },
      credentials:'include'
    })
    const data:Data = await responce.json()
    setDataSet(data.result)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='w-50 ' style={{marginBottom:'10vh',height:'30vh'}}>
      <Line style={{width:'40%'}}  options={{scales:{y:{min:Math.max(...dataSet.map((e)=>e.Weight))-10,max:Math.max(...dataSet.map((e)=>e.Weight))+10}}}}
      data={{labels:dataSet?.map((e)=>e.Month),datasets:[{label:"Weight",data:dataSet?.map((e)=>e.Weight),backgroundColor:['red'],borderColor:'pink',tension:0.2,fill:false,pointRadius:5}]}}/> 
    </div>
  )
}
