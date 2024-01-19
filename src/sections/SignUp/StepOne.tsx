import { Dispatch, SetStateAction, useState } from "react";
import { FormLayout,Form } from "../../UserCred";
import "../../Styles/SignUp.css";
type Props={
  cred :FormLayout,
  setCred:Dispatch<SetStateAction<FormLayout>>;
}
export default function StepOne({cred,setCred}:Props) {
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:value})
    if(value==="")
    setForm({...form,[name]:true})
    setForm({...form,[name]:false})
  }
  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    const name = e.currentTarget.id
    console.log(name)
    setForm({...form,[name]:true})
  }
  const [form,setForm] = useState<Form>({Email:false,Password:false,Name:false,Phone:false})
  return (
    <>
      <form className="w-50 border py-4 px-5 bg-white" style={{ height: "60vh",borderRadius:'5%' }}>
        <div className="mb-3" onClick={handleClick} id="Name">
    <label htmlFor="exampleInputEmail1 " className="form-label font-monospace">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="Name" value={cred.Name} onChange={handleOnChange}/>
    {cred.Name.length<2 &&<div id="emailHelp" className="form-text text-danger">Enter your Name*</div>}
  </div>
        <div className="mb-3" onClick={handleClick} id="Email">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Email</label>
    <input type="email" className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" name="Email" onChange={handleOnChange} value={cred.Email}/>
    {cred.Email.length<1?<div id="emailHelp" className="form-text text-danger">Enter your Email*</div>:<></>}
  </div>
      <div className="mb-3" onClick={handleClick} id="Phone">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Phone</label>
    <input type="number" className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" name="Phone" onChange={handleOnChange} value={cred.Phone} maxLength={10} min={0}/>
    {cred.Phone.toString().length<10?<div id="emailHelp" className="form-text text-danger">Enter your phone*</div>:<></>}
  </div>
        <div className="mb-3" onClick={handleClick} id="Password">
    <label htmlFor="exampleInputEmail1" className="form-label font-monospace">Password</label>
    <input type='password' className="form-control" id="exampleInputPhone1" aria-describedby="emailHelp" name="Password" onChange={handleOnChange} value={cred.Password} minLength={8} />
    {cred.Password.length<2?<div id="emailHelp" className="form-text text-danger">Enter your Password*</div>:<></>}
  </div>
      </form>

      {/* <label htmlFor="activity">What describes you the most</label>
    <select name="activity" className='form-select' id="">
        <option value="1">Sedentary: little or no exercise</option>
        <option value="2">Light: exercise 1-3 times/week</option>
        <option value="3">Moderate: exercise 4-5 times/week</option>
        <option value="4">Active: daily exercise or intense exercise 3-4 times/week</option>
        <option value="5">Very Active: intense exercise 6-7 times/week</option>
        <option value="6">Extra Active: very intense exercise daily, or physical job</option>
    </select> */}
    </>
  );
}
