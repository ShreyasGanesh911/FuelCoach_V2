import {useState } from "react";
import {Props} from "../../UserCred";
import "../../Styles/SignUp.css";


export default function StepTwo({cred,setCred,step,setStep}:Props) {
  type DOB = {
    month:number,
    year:number
  }
   const dob:DOB = {month:1,year:2000}
     const d = new Date()
const [userdate,setUserDate] = useState<DOB>(dob)
const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setCred({...cred,[e.target.name]:e.target.value})

}
const handleChangeForRadio =(e:React.ChangeEvent<HTMLInputElement>)=>{
  const value = Number(e.target.value)
  setCred({...cred,Food_pref:value})
}
const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  setCred({...cred,Age:d.getFullYear()-Number(userdate.year),DOB:`${userdate.year}-0${userdate.month}-01`})
  console.log(cred)
  setStep(step+1)
}
const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setCred({...cred,[e.target.name]:e.target.value})
  console.log(cred)
  console.log(e.target.value)
}
  return (
    <>
      <form className='border py-4 px-5 bg-white text-black form-body' onSubmit={handleSubmit} >
        <section className="h-75 my-3">
        <h4 className="font-monospace ">Select your gender</h4>
      <div className="displayFlex my-2"style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="Gender"  className="card-input-element" onChange={handleChange} value="M" />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Gender==='M'?'border-warning':''}`}>Male</h5>
      </label>
    </div>
    <div className="w-50 " > 
      <label className="w-100 " >
        <input type="radio" name="Gender" className="card-input-element" onChange={handleChange} value="F" />
          <h5 className={`card-input py-3 font-monospace border text-center bg-light ${cred.Gender==='F'?'border-warning':''}`}>Female</h5>
      </label>
    </div>
    </div>
    <h4 className="font-monospace ">What is your date of birth</h4>
    <section className="displayFlex" style={{display:'felx' , justifyContent:'space-evenly'}}>
    <div className="w-25">
      <label htmlFor="">Month</label>
      <input type='number' className="form-control" name="month" value={cred.month} onChange={handleDateChange} min={1} max={12} required/>   
    </div>
    <div className="w-25">
    <label htmlFor="">Year</label>   
      <input type='number' className="form-control" name='year' min={1950} value={cred.year} onChange={handleDateChange} max={d.getFullYear()-18} required/>    
    </div>
    </section>
    <h4 className="font-monospace my-2">Food Preferencer</h4>
    <section className="displayFlex my-1"style={{flexDirection:'row',justifyContent:'space-evenly'}}>
     
      <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="Food_pref" value={1} className="card-input-element" onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Food_pref===1?'border-warning':''}`}>Vegetarian</h5>
      </label>
    </div>
      <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="Food_pref" value={2} className="card-input-element" onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Food_pref===2?'border-warning':''}`}>Eegetarian</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="Food_pref" className="card-input-element" value={3} onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3  text-center bg-light border ${cred.Food_pref===3?'border-warning':''}`}>Non-Vegetarian</h5>
      </label>
    </div>
    </section>
    </section>
    <div className="my-2" style={{display:'flex',justifyContent:"space-between"}}>
      <button className="btn btn-warning" onClick={(e)=>{ e.preventDefault();  setStep(step-1)}} >Prev</button>
      <button className="btn btn-warning">Next</button>
    </div>
      </form>
    </>
  )
}
