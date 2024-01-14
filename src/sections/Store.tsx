
import { Chart as ChartJS,BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
import { Line,Bar } from 'react-chartjs-2'
ChartJS.register(BarElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement)
export default function Store() {
  return (
    <div className='page'>
      <h2>Store</h2>
      <div className='w-75  border' style={{height:'50vh'}}>
         <Line data={{labels:['jan','feb','march','april','may'],datasets:[{label:"Weight",data:[68,68.5,71,70],backgroundColor:['red'],borderColor:'pink',tension:0.2,fill:false,pointRadius:5}]}}/> 
        {/* <Bar data={{ labels:["A","B",'C'],datasets:[{label:'Hey',data:[200,300,400]}]}}  /> */}
      </div>
    </div>
  )
}
