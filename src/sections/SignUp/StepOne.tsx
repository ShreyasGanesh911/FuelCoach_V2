import {useState} from "react";
import {Form,Props} from "../../UserCred";
import "../../Styles/SignUp.css";
import { MyToastError } from "../../components/Toastbar";
type Data = {
  success:boolean,
  message:string
}
export default function StepOne({cred,setCred,step,setStep}:Props) {
  const checkUser = async()=>{
    const responce = await fetch('http://localhost:4000/user/checkUserExists',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      credentials:'include',
      body:JSON.stringify({Email:cred.Email,Phone:Number(cred.Phone)})
    })
    const data:Data = await responce.json()
    if(data.success)
      return true
    else{
      MyToastError(data.message)
      return false
    }
      
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(cred.Phone.toString().length!==12)
      return MyToastError("Enter a valid phone number")
    if(await checkUser())
      setStep(step+1) 
  }
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const name = e.target.name
    const value = e.target.value
    setCred({...cred,[name]:value})
    if(value==="")
    setForm({...form,[name]:true})
    setForm({...form,[name]:false})
  }

  const [form,setForm] = useState<Form>({Email:false,Password:false,Name:false,Phone:false})
  return (
    <>
      <form className=" form-body border py-4 px-5 bg-white" onSubmit={handleSubmit}>
        <section className="h-75 my-3">
    <div className="form-floating mb-3">
  <input type="text" className="form-control" name="Name" value={cred.Name} required onChange={handleOnChange}/>
  <label htmlFor="floatingInput">Name</label>  
  </div>
    <div className="form-floating mb-3">
  <input type="email" className="form-control" name="Email" required onChange={handleOnChange} value={cred.Email}/>
  <label htmlFor="floatingInput">Email</label>  
  </div>
    <div className="form-floating mb-3">
  <input type="tel" className="form-control" name="Phone" required onChange={handleOnChange} value={cred.Phone} maxLength={12} min={0}/>
  <label htmlFor="floatingInput">Phone</label>  
  </div>
    <div className="form-floating mb-3">
  <input type='password' className="form-control" name="Password" required onChange={handleOnChange} value={cred.Password} minLength={8}/>
  <label htmlFor="floatingInput">Password</label>  
  </div>
  </section>
  <div style={{display:'flex',flexFlow:'row-reverse'}}>
    <button className="btn btn-warning" > Next</button>
  </div>
      </form>
    </>
  );
}
