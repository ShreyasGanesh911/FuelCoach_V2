import { Chart as ChartJS,BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
import { Line,Bar } from 'react-chartjs-2'
ChartJS.register(BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement)
export default function LineChart() {
  return (
    <div className='w-100 ' style={{marginBottom:'10vh',height:'30vh'}}>
      <Line style={{width:'40%'}} data={{labels:['jan','feb','march','april','may'],datasets:[{label:"Weight",data:[68,68.5,71,70],backgroundColor:['red'],borderColor:'pink',tension:0.2,fill:false,pointRadius:5}],
        
    }}/> 
    </div>
  )
}
