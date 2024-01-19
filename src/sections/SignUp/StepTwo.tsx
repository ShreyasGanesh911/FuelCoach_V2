import { Dispatch, SetStateAction } from "react";
import { FormLayout } from "../../UserCred";
import "../../Styles/SignUp.css";
type Props={
  cred :FormLayout,
  setCred:Dispatch<SetStateAction<FormLayout>>;
}
export default function StepTwo({cred,setCred}:Props) {
//     const d = new Date()
// const [date,setdate] = useState(`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`)
const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  setCred({...cred,[e.target.name]:e.target.value})
  console.log(cred)
  console.log(e.target.value)
}
  return (
    <>
      <form className='w-50 border py-4 px-5 bg-white text-black'style={{height:'60vh',borderRadius:'5%'}}>
        <h2 className="font-monospace ">Select your gender</h2>
      <div className="displayFlex my-5"style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    
    <div className="w-50  " > 
      <label className="w-100 " >
        <input type="radio" name="Gender"  className="card-input-element" onChange={handleChange} value="M" />
          <h4 className={`card-input py-3 font-monospace text-center bg-light border ${cred.Gender==='M'?'border-warning':''}`}>Male</h4>
      </label>
    </div>
    <div className="w-50 " > 
      <label className="w-100 " >
        <input type="radio" name="Gender" className="card-input-element" onChange={handleChange} value="F" />
          <h4 className={`card-input py-3 font-monospace border text-center bg-light ${cred.Gender==='F'?'border-warning':''}`}>Female</h4>
      </label>
    </div>
    </div>
    <h2 className="font-monospace ">What is your date of birth</h2>
    <div className="displayFlex my-3">
    <input type="date" />
    </div>
      </form>
    </>
  )
}
