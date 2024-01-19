import { useState } from "react"
import { Dispatch, SetStateAction } from "react";
import { FormLayout } from "../../UserCred";
import "../../Styles/SignUp.css";
type Props={
  cred :FormLayout,
  setCred:Dispatch<SetStateAction<FormLayout>>;
}

export default function StepThree({cred,setCred}:Props) {
  const [bmi,setBmi] = useState<number>(0)
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:value})
    setBmi(cred.Weight/(cred.Height*cred.Height)*10000)
  }
  return (
    <>
     <form className='w-50 border py-4 px-5 bg-white'style={{height:'60vh',borderRadius:'5%'}}>
        <h2 className="font-monospace my-3">Select your weight</h2>
        <input className="form-range" type="range" name="Weight"  min={30} max={160} value={cred.Weight} step={0.1} onChange={handleOnChange} /> 
    <h3 className="font-monospace">{cred.Weight} kg</h3>
    <h2 className="font-monospace my-3">Select your height</h2>
        <input className="form-range" type="range" name="Height"  min={130} max={220} value={cred.Height} onChange={handleOnChange} /> 
    <h3 className="font-monospace">{cred.Height} cm</h3>
      </form>
     
    </>
  )
}
