import '../App.css'
import StepOne from './SignUp/StepOne'
import { useState } from 'react'
import StepThree from './SignUp/StepThree'
import StepTwo from './SignUp/StepTwo'
import StepFour from './SignUp/StepFour'
export default function Signup() {
  const[step,setStep] = useState(1)
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setStep(step + 1);
    console.log(step);
  };
  const handlePrev=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    setStep(step-1)
 }
  return (
    <div className='introPage ' style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      <div  className = 'gender-div w-75 displayFlex ' style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      {step===1 && <StepOne /> }
      {step===2 && <StepTwo /> }
      {step===3 && <StepThree /> }
      {step===4 && <StepFour /> }
      <div className='w-50 bg-white'style={{display:'flex',justifyContent:'space-evenly'}}>
  
    { step!==1 &&
    <button className="btn btn-warning" onClick={handlePrev}>Prev</button>
    }
    {step!==4 &&
      <button type='submit' className="btn btn-warning" onClick={handleNext}>Next</button>}
      </div>
      </div>

    </div>
  )
}
