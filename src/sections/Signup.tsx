import '../App.css'
import StepOne from './SignUp/StepOne'
import { useState } from 'react'
import StepThree from './SignUp/StepThree'
import StepTwo from './SignUp/StepTwo'
import StepFour from './SignUp/StepFour'
import { MyToastError } from '../components/Toastbar'
import { ToastContainer } from 'react-toastify'
import StepFive from './SignUp/StepFive'
import { FormLayout } from '../UserCred'


export default function Signup() {
  const checkCredentials = (num:number)=>{
    switch(num){
      case 1 :{
        if(cred.Name===""){
           MyToastError("Name can't be empty")
           return false
        }
        
        else if(cred.Email==="" )
        return MyToastError("Email can't be empty")
        else if(cred.Password==="")
        return MyToastError("Password can't be empty")
        else if(cred.Password.length<=8)
        return MyToastError("Password must be atleast 8 characters long")
        else if(cred.Phone.toString().length!==10)
        return MyToastError("Invalid phone number")
        
      }
    }
    return true
  }
  const userCred:FormLayout = {Name:'',Email:'',Phone:91,Password:'',Gender:'',Weight:35,Height:180,BMI:0,BMR:0,Age:0,Daily_Intake:0,Food_pref:0,Activity_rate:0,Goal:0,DOB:'',month:1,year:2000}
  const[step,setStep] = useState(1)
  const[cred,setCred] = useState<FormLayout>(userCred)
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const bool = checkCredentials(step)
    if(bool)
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
