import { useState } from "react"

import { Dispatch, SetStateAction } from "react";
import { FormLayout,Props } from "../../UserCred";
import "../../Styles/SignUp.css";
export default function StepThree({cred,setCred,step,setStep}:Props) {
  const [bmi,setBmi] = useState<number>(0)
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:value})
    setBmi(cred.Weight/(cred.Height*cred.Height)*10000)
  }
  return (
    <>
     <form className=' border py-4 px-5 bg-white form-body'>
      <section className="h-75 my-3">
        <div >
        <h2 className="font-monospace my-3">Select your weight</h2>
        <input className="form-range" type="range" name="Weight"  min={30} max={160} value={cred.Weight} step={0.1} onChange={handleOnChange} /> 
    <h3 className="font-monospace mx-2">{cred.Weight} kg</h3>
    </div>
    <div className="my-3 py-2">
    <h2 className="font-monospace my-3">Select your height</h2>
        <input className="form-range" type="range" name="Height"  min={130} max={220} value={cred.Height} onChange={handleOnChange} /> 
    <h3 className="font-monospace mx-2">{cred.Height} cm</h3>
    </div>
    </section>
    <div  style={{display:'flex',justifyContent:"space-between"}}>
      <button className="btn btn-warning" onClick={(e)=>{ e.preventDefault();  setStep(step-1)}}>Prev</button>
      <button className="btn btn-warning" onClick={(e)=>{ e.preventDefault();  setStep(step+1)}}>Next</button>
    </div>
      </form>
     
    </>
  )
}
