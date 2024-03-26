import {Props} from "../../Types/UserCred";
import "../../Styles/SignUp.css";
export default function StepFour({cred,setCred,step,setStep}:Props) {
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
      setCred({...cred,Activity_rate:Number(e.target.value)})
      console.log(cred)
    }
    const handleChangeForRadio = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setCred({...cred,Goal:Number(e.target.value)})
      console.log(cred)
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      const BMI = Number(((cred.Weight/(cred.Height*cred.Height))*10000).toFixed(2))
      console.log(BMI)
      let BMR
      if(cred.Gender==='M')
         BMR = ((10*cred.Weight) + (6.25*cred.Height) - (5*cred.Age) + 5)
      else
          BMR = ((10*cred.Weight) + (6.25*cred.Height) - (5*cred.Age) - 161)
      console.log(BMR)
      let intake = Math.ceil(BMR * cred.Activity_rate)
      switch(cred.Goal){
        case 1: {intake-=250;break}
        case 2: {intake+=250;break}
        default: intake+=0
      }
      console.log(Math.ceil(intake))
      setCred({...cred,BMI:BMI,Daily_Intake:intake,BMR:BMR})
      setStep(step+1)
        
    }
    return (
    <>
    <form className='border py-4 px-5 bg-white form-body font-regular' onSubmit={handleSubmit}>
      <section className="h-75 my-3">
        <h4>What is your goal</h4>
        <div className="displayFlex my-3"style={{flexDirection:'row',justifyContent:'space-evenly'}} >
    
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" value={1} className="card-input-element" onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3  text-center bg-light border ${cred.Goal===1?'border-warning':''}`}>Lose Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={2} onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3  text-center bg-light border ${cred.Goal===2?'border-warning':''}`}>Gain Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={3} onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3  text-center bg-light border ${cred.Goal===3?'border-warning':''}`}>Maintaine Weight</h5>
      </label>
    </div>

    </div>
        <h4 className=" my-3">How many times do you workout</h4>
        <select name="activity" className='form-select font-regular my-5' value={cred.Activity_rate} onChange={handleChange}>
        <option value={1.2}>Sedentary: little or no exercise</option>
        <option value={1.375}>Light: exercise 1-3 times/week</option>
        <option value={1.550}>Moderate: exercise 3-5 times/week</option>
        <option value={1.725}>Active: daily exercise or intense exercise 6-7 times/week</option>
        <option value={1.900}>Very Active: very intense exercise daily, or physical job</option>
    </select>
    </section>
    <div className="font-regular" style={{display:'flex',justifyContent:"space-between"}}>
      <button className="btn btn-warning font-regular" onClick={(e)=>{ e.preventDefault();  setStep(step-1)}}>Prev</button>
      <button className="btn btn-warning" >Next</button>
    </div>
      </form>
      
    </>
  )
}
