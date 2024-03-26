import {Props } from "../../Types/UserCred";
import "../../Styles/SignUp.css";
export default function StepThree({cred,setCred,step,setStep}:Props) {
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:Number(value)})
  }
  return (
    <>
     <form className=' border py-4 px-5 bg-white form-body'>
      <section className="h-75 my-3 font-regular">
        <div >
        <h3 className=" my-3">Select your weight</h3>
        <input className="form-range" type="range" name="Weight"  min={30} max={160} value={cred.Weight} step={0.1} onChange={handleOnChange} /> 
    <h3 className=" mx-2">{cred.Weight} kg</h3>
    </div>
    <div className="my-3 py-2">
    <h3 className=" my-3">Select your height</h3>
        <input className="form-range" type="range" name="Height"  min={130} max={220} value={cred.Height} onChange={handleOnChange} /> 
    <h3 className=" mx-2">{cred.Height} cm</h3>
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
