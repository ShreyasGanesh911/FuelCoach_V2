import '../App.css'
import StepOne from './SignUp/StepOne'
import { useState } from 'react'
import StepThree from './SignUp/StepThree'
import StepTwo from './SignUp/StepTwo'
import StepFour from './SignUp/StepFour'
import { ToastContainer } from 'react-toastify'
import StepFive from './SignUp/StepFive'
import { FormLayout } from '../Types/UserCred'
import { form } from '../Types'

export default function Signup() {
  const userCred:FormLayout = form
  const[step,setStep] = useState(1)
  const[cred,setCred] = useState<FormLayout>(userCred)
  return (
    <div className='introPage ' style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      <div  className = 'gender-div w-75 displayFlex ' style={{display:'flex',justifyContent:'center',alignItems:'center',flexFlow:'column'}}>
      {step===1 && <StepOne cred={cred} setCred={setCred} step={step} setStep={setStep}/> }
      {step===2 && <StepTwo cred={cred} setCred={setCred} step={step} setStep={setStep} /> }
      {step===3 && <StepThree cred={cred} setCred={setCred} step={step} setStep={setStep}/> }
      {step===4 && <StepFour cred={cred} setCred={setCred} step={step} setStep={setStep}/> }
      {step===5 && <StepFive cred={cred} setCred={setCred} step={step} setStep={setStep}/> }
      </div>
      <ToastContainer/>
    </div>
  )
}
