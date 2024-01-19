import { Dispatch, SetStateAction } from "react";
import { FormLayout } from "../../UserCred";
import "../../Styles/SignUp.css";
type Props={
  cred :FormLayout,
  setCred:Dispatch<SetStateAction<FormLayout>>;
}
export default function StepFour({cred,setCred}:Props) {
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
      setCred({...cred,Activity_rate:Number(e.target.value)})
      console.log(cred)
    }
    const handleChangeForRadio = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setCred({...cred,Goal:Number(e.target.value)})
      console.log(cred)
    }
    return (
    <>
    <form className='w-50 border py-4 px-5 bg-white'style={{height:'60vh',borderRadius:'5%'}}>
        <h2>What is your goal</h2>
        <div className="displayFlex my-5"style={{flexDirection:'row',justifyContent:'space-evenly'}} >
    
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" value={1} className="card-input-element" onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Goal===1?'border-warning':''}`}>Lose Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={2} onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Goal===2?'border-warning':''}`}>Gain Weight</h5>
      </label>
    </div>
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="product" className="card-input-element" value={3} onChange={handleChangeForRadio} />
          <h5 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Goal===3?'border-warning':''}`}>Maintaine Weight</h5>
      </label>
    </div>

    </div>
        {/* <form>
            <div>
            <label htmlFor="">Lose Weight</label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            <div>
            <label htmlFor="">Gain Weight / Bulk </label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            <div>
            <label htmlFor="">Maintaine Weight</label>
            <input type="radio" name='goal' value='Lose Weight'/>
            </div>
            
        </form> */}
        <h2>How many times do you workout</h2>
        <select name="activity" className='form-select' value={cred.Activity_rate} onChange={handleChange}>
        <option value={1.2}>Sedentary: little or no exercise</option>
        <option value={1.375}>Light: exercise 1-3 times/week</option>
        <option value={1.550}>Moderate: exercise 3-5 times/week</option>
        <option value={1.725}>Active: daily exercise or intense exercise 6-7 times/week</option>
        <option value={1.990}>Very Active: very intense exercise daily, or physical job</option>
    </select>
      </form>
      
    </>
  )
}
