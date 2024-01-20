import '../App.css'
import '../Styles/OverView.css'
import '../Styles/Home.css'
import { Link } from 'react-router-dom'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
export default function Home() {
  return (
    <div className='introPage  displayFlex bg-white'>
      
      <div className='dotBody w-75' style={{minHeight:'60vh',height:'auto'}}>
      <h1 className=' w-50 font-dotted dotBody-black text-warning mx-5 my-5' style={{fontSize:'90px'}}>Fuel Coach</h1>
        <section className='my-2' style={{minHeight:'40vh',height:'auto'}}>
        <h3 className='text-dark px-2 mx-5  w-25 font-monospace '>FuelCoach: "Personalized nutrition for your unique journey. Elevate your health, one delicious meal at a time."</h3>
        <div className='mx-5 ' style={{display:'flex',flexFlow:'row-reverse'}}> <button className='btn btn-dark btn-lg font-monospace'><Link to='/login' className='nav-link'>Login</Link></button> <button className='font-monospace btn btn-dark btn-lg mx-5'><Link to='/signup' className='nav-link'>Get started</Link></button></div>
        </section>
       
      </div>
    </div>
  )
}
