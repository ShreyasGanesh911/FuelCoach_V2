import { useState } from "react"
import"../../Styles/SignUp.css"
export default function StepThree() {
  const [weight,setWeight] = useState(35)
  const [height,setHeight] = useState(180)
  return (
    <>
     <form className='w-50 border py-4 px-5 bg-white'style={{height:'60vh',borderRadius:'5%'}}>
        <h2 className="font-monospace my-3">Select your weight</h2>
        <input className="form-range" type="range" name="" id="" min={30} max={160} value={weight} step={0.1} onChange={(e)=>setWeight(Number(e.target.value))} /> 
    <h3 className="font-monospace">{weight} kg</h3>
    <h2 className="font-monospace my-3">Select your height</h2>
        <input className="form-range" type="range" name="" id="" min={130} max={200} value={height} onChange={(e)=>setHeight(Number(e.target.value))} /> 
    <h3 className="font-monospace">{height} cm</h3>
      </form>
     
    </>
  )
}
