import"../../Styles/SignUp.css"
// import { useState } from 'react';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
export default function StepTwo() {
//     const d = new Date()
// const [date,setdate] = useState(`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`)
  return (
    <>
      <form className='w-50 border py-4 px-5 bg-white text-black'style={{height:'60vh',borderRadius:'5%'}}>
        <h2 className="font-monospace ">Select your gender</h2>
      <div className="displayFlex my-5"style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="gender" className="card-input-element" />
          <h4 className="card-input py-3 font-monospace text-center bg-light">Male</h4>
      </label>
    </div>
    <div className="w-50 " > 
      <label className="w-100 " >
        <input type="radio" name="gender" className="card-input-element" />
          <h4 className="card-input py-3 font-monospace text-center bg-light">Female</h4>
      </label>
    </div>
    </div>
    <h2 className="font-monospace ">What is your date of birth</h2>
    <div className="displayFlex my-3">
    <input type="date" />
    </div>
      </form>
    </>
  )
}
